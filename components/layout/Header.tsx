import { Box, Typography } from '@mui/material'
import React from 'react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
				pb: { xs: 2 },
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
				<Typography
					variant="h1"
					sx={{
						fontSize: { xs: '1.8rem', sm: '2.8rem', md: '3.2rem' },
						fontWeight: 'bold',
            textAlign: 'center'
					}}
				>
					Task Manager
				</Typography>
			</Box>
			<ThemeToggle />
		</Box>
	)
}
