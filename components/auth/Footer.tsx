import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function Footer({ isLogin }: { isLogin: boolean }) {
	return (
		<Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
			<Typography
				variant="body2"
				sx={{
					color: 'text.secondary',
					fontSize: '0.85rem',
				}}
			>
				{isLogin ? "Don't have an account? " : 'Already have an account? '}
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
						{isLogin ? 'Sign up' : 'Sign in'}
					</Typography>
				</Link>
			</Typography>
		</Box>
	)
}
