import { Box, Container, Typography } from '@mui/material'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box
			sx={{
				minHeight: '100svh',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Container maxWidth="sm">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						py: { xs: 2, sm: 3 },
					}}
				>
					<Box textAlign="center" maxWidth={450}>
						<Typography
							variant="h4"
							gutterBottom
							sx={{
								fontSize: { xs: '1.75rem', sm: '2.125rem' },
                fontWeight: 'bold',
                color: 'text.primary'
							}}
						>
							Welcome to Task Manager
						</Typography>
						<Typography
							variant="body1"
							sx={{
								fontSize: { xs: '0.9rem', sm: '1rem' },
                mb: 2.25,
                color: 'text.secondary'
							}}
						>
							Login or register in order to track your tasks
						</Typography>
					</Box>
					{children}
				</Box>
			</Container>
		</Box>
	)
}
