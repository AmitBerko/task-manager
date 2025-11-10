'use client'

import React from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { IconButton, useTheme } from '@mui/material'
import { useThemeMode } from '@/contexts/ThemeModeProvider'

export default function ThemeToggle() {
	const theme = useTheme()
	const { mode, toggleThemeMode } = useThemeMode()

	return (
		<IconButton
			onClick={toggleThemeMode}
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
			{mode === 'light' ? (
				<DarkModeIcon
					className="icon"
					sx={{
						fontSize: { xs: '1.3rem', sm: '1.5rem' },
						color: 'black',
					}}
				/>
			) : (
				<LightModeIcon
					className="icon"
					sx={{
						fontSize: { xs: '1.3rem', sm: '1.5rem' },
						color: '#ffd711',
					}}
				/>
			)}
		</IconButton>
	)
}
