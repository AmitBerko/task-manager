'use client'
import createAppTheme from '@/lib/theme'
import { ThemeMode } from '@/types/types'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type ThemeContextType = {
	mode: ThemeMode
	toggleThemeMode: () => void
}

const ThemeModeContext = createContext<ThemeContextType | null>(null)
function ThemeModeProvider({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState<ThemeMode>('dark')
	const [didHydrate, setDidHydrate] = useState(false)

	const toggleThemeMode = () => {
		setMode((prevMode) => {
			const newMode = prevMode === 'dark' ? 'light' : 'dark'
			localStorage.setItem('mode', newMode)
			return newMode
		})
	}

	useEffect(() => {
		const previousMode = localStorage.getItem('mode')
		setMode(previousMode === 'light' ? 'light' : 'dark')
		setDidHydrate(true)
	}, [])

	const theme = createAppTheme(mode)

	return (
		<ThemeModeContext.Provider value={{ mode, toggleThemeMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{didHydrate && children}
			</ThemeProvider>
		</ThemeModeContext.Provider>
	)
}

export const useThemeMode = (): ThemeContextType => {
	const context = useContext(ThemeModeContext)
	if (!context) {
		throw new Error('useThemeMode must be used within an ThemeModeProvider')
	}
	return context
}

export default ThemeModeProvider
