import { Box, Typography } from '@mui/material'
import ChecklistIcon from '@mui/icons-material/Checklist'
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
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: { xs: 44, sm: 52 },
						height: { xs: 44, sm: 52 },
						borderRadius: '12px',
						bgcolor: 'background.paper',
						border: '1px solid',
						borderColor: 'divider',
					}}
				>
					<ChecklistIcon
						sx={{
							color: 'primary.main',
							fontSize: { xs: '1.2rem', sm: '1.5rem' },
						}}
					/>
				</Box>

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
