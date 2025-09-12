import { Box, Typography } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import { labels } from '@/config/labels'

export default function NoTasksFound() {
	const { noTasksToShow, noTasksHint } = labels.tasks
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
			<Typography variant="h6">{noTasksToShow}</Typography>
			<Typography variant="body2" textAlign="center">
				{noTasksHint}
			</Typography>
		</Box>
	)
}
