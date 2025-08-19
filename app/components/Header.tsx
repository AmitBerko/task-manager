'use client'

import { useThemeMode } from '@/contexts/ThemeModeProvider'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import ChecklistIcon from '@mui/icons-material/Checklist'
import React from 'react'

export default function Header() {
	const { mode, toggleThemeMode } = useThemeMode()
	const theme = useTheme()

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%',
				py: { xs: 1, sm: 2 },
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: { xs: 44, sm: 52 },
						height: { xs: 44, sm: 52 },
						borderRadius: '12px',
						bgcolor: 'background.paper',
						border: `1px solid ${theme.palette.divider}`,
					}}
				>
					<ChecklistIcon
						sx={{
							color: theme.palette.primary.main,
							fontSize: { xs: '1.2rem', sm: '1.5rem' },
						}}
					/>
				</Box>

				<Typography
					variant="h1"
					sx={{
						fontSize: { xs: '1.8rem', sm: '2.8rem', md: '3.2rem' },
						fontWeight: 'bold',
					}}
				>
					Task Manager
				</Typography>
			</Box>

			<IconButton
				onClick={toggleThemeMode}
				sx={{
					width: { xs: 44, sm: 52 },
					height: { xs: 44, sm: 52 },
					borderRadius: '12px',
					bgcolor: 'background.paper',
					border: `1px solid ${theme.palette.divider}`,
				}}
			>
				{mode === 'light' ? (
					<DarkModeIcon
						sx={{
							fontSize: { xs: '1.3rem', sm: '1.5rem' },
							color: 'black',
						}}
					/>
				) : (
					<LightModeIcon
						sx={{
							fontSize: { xs: '1.3rem', sm: '1.5rem' },
							color: '#ffd711',
						}}
					/>
				)}
			</IconButton>
		</Box>
	)
}
