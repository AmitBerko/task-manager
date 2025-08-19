import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { CssBaseline } from '@mui/material'
import type { Metadata } from 'next'
import './globals.css'
import ThemeModeProvider from '@/contexts/ThemeModeProvider'

export const metadata: Metadata = {
	title: 'Task Manager',
	description: 'פרויקט חפיפה :)',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ThemeModeProvider>
						<CssBaseline />
						{children}
					</ThemeModeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
