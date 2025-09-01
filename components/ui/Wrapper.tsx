import { Box, styled } from '@mui/material'

export const Wrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	width: '100%',
	backgroundColor: theme.palette.background.paper,
	borderRadius: '1rem',
	border: `solid 1px ${theme.palette.divider}`,
}))
