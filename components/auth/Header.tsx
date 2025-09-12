import { labels } from '@/config/labels'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Header({ isLogin }: { isLogin: boolean }) {
	const { signIn, register, headerSubtitle } = labels.authForm

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
				{labels.general.appTitle}
			</Typography>
			<Typography
				variant="body2"
				sx={{
					color: 'text.secondary',
					fontSize: '0.9rem',
				}}
			>
				{isLogin ? signIn : register} {headerSubtitle}
			</Typography>
		</Box>
	)
}
