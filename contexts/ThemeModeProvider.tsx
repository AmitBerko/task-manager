'use client'
import createAppTheme from '@/lib/theme'
import { ThemeMode } from '@/lib/types'
import { ThemeProvider } from '@mui/material'
import { createContext, useContext, useState, type ReactNode } from 'react'

type ThemeContextType = {
	mode: ThemeMode
	toggleThemeMode: () => void
}

const ThemeModeContext = createContext<ThemeContextType | null>(null)
function ThemeModeProvider({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState<ThemeMode>('dark') // Save in local storage later

	const toggleThemeMode = () => {
		setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'))
	}

  const theme = createAppTheme(mode)

	return (
		<ThemeModeContext.Provider value={{ mode, toggleThemeMode }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
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
