import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import Providers from './Providers'
import './globals.css'
import { labels } from '@/config/labels'

export const metadata: Metadata = {
	title: labels.general.appTitle,
	description: labels.general.metadataDescription,
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
