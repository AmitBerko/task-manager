import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import Providers from './Providers'
import './globals.css'

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
					<Providers>{children}</Providers>
				</AppRouterCacheProvider>
			</body>
		</html>
	)
}
