'use client'

import { CircularProgress, IconButton, useTheme } from '@mui/material'
import React, { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut } from 'next-auth/react'

export default function Signout() {
	const theme = useTheme()
	const [isLoading, setIsLoading] = useState(false)

	const handleSignout = async () => {
		setIsLoading(true)
		await signOut({ redirect: true, callbackUrl: '/login' })
	}

	return (
		<IconButton
			onClick={handleSignout}
			sx={{
				width: { xs: 44, sm: 52 },
				height: { xs: 44, sm: 52 },
				borderRadius: '12px',
				bgcolor: 'background.paper',
				border: `1px solid ${theme.palette.divider}`,
				transition: 'none',
				'&:hover .icon': {
					transform: 'scale(1.1)',
				},
			}}
		>
			{isLoading ? (
				<CircularProgress color="error" size={22} thickness={5} />
			) : (
				<LogoutIcon
					className="icon"
					sx={{
						color: 'error.main',
						fontSize: { xs: '1.3rem', sm: '1.6rem' },
						transition: 'all 0.1s ease-in-out',
					}}
				/>
			)}
		</IconButton>
	)
}
