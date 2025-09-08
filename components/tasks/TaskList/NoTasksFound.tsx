import { Box, Typography } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff'

export default function NoTasksFound() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				mt: 2,
				color: 'text.secondary',
			}}
		>
			<SearchOffIcon sx={{ fontSize: 48, mb: 2 }} />
			<Typography variant="h6">No tasks to show</Typography>
			<Typography variant="body2" textAlign="center">
				Try removing existing filters or adding a new task
			</Typography>
		</Box>
	)
}
