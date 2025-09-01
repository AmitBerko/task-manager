import { Container } from '@mui/material'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<Container
			maxWidth="md"
			sx={{
				minHeight: '100svh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				p: 2,
			}}
		>
			{children}
		</Container>
	)
}
