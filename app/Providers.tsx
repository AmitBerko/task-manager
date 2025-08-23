'use client'

import ThemeModeProvider from '@/contexts/ThemeModeProvider'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ThemeModeProvider>{children}</ThemeModeProvider>
		</SessionProvider>
	)
}
