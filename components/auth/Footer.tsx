import { labels } from '@/config/labels'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function Footer({ isLogin }: { isLogin: boolean }) {
	const { signIn, register, noAccount, yesAccount } = labels.authForm

	return (
		<Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
			<Typography
				variant="body2"
				sx={{
					color: 'text.secondary',
					fontSize: '0.85rem',
				}}
			>
				{isLogin ? noAccount : yesAccount}{' '}
				<Link style={{ textDecoration: 'none' }} href={isLogin ? '/register' : '/login'}>
					<Typography
						component="span"
						sx={{
							color: 'primary.main',
							textDecoration: 'none',
							fontWeight: 'bold',
							'&:hover': { textDecoration: 'underline' },
						}}
					>
						{isLogin ? register : signIn}
					</Typography>
				</Link>
			</Typography>
		</Box>
	)
}
