import { Box, SxProps, Theme, useTheme } from '@mui/material'
import React from 'react'

type Props = {
	children: React.ReactNode
	styles?: SxProps<Theme>
}

export default function Wrapper({ children, styles }: Props) {
	const theme = useTheme()
	return (
		<Box
			sx={{
				p: 3,
				display: 'flex',
				width: '100%',
				bgcolor: 'background.paper',
				borderRadius: '1rem',
				border: `solid 1px ${theme.palette.divider}`,
				...styles,
			}}
		>
			{children}
		</Box>
	)
}
