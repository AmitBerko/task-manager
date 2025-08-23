import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import './globals.css'
import ThemeModeProvider from '@/contexts/ThemeModeProvider'
import TasksProvider from '@/contexts/TasksProvider'

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
						<TasksProvider>{children}</TasksProvider>
					</ThemeModeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
