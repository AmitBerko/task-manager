import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Header({ isLogin }: { isLogin: boolean }) {
	return (
		<Box sx={{ textAlign: 'center', mb: 4 }}>
			<Typography
				variant="h4"
				sx={{
					fontWeight: 'bold',
					mb: 1,
					fontSize: { xs: '1.65rem', sm: '1.9rem' },
				}}
			>
				Task Manager
			</Typography>
			<Typography
				variant="body2"
				sx={{
					color: 'text.secondary',
					fontSize: '0.9rem',
				}}
			>
				{isLogin ? 'Sign in' : 'Register'} to track your tasks
			</Typography>
		</Box>
	)
}
