import { Typography, IconButton, Checkbox, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Wrapper from '@/components/Wrapper'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Task } from '@/lib/types'

type Props = Task & {
	isMultiSelect: boolean
	handleCheck: (taskId: string, isChecked: boolean) => void
}

export default function TaskItem({
	id,
	title,
	description,
	priority,
	createdAt,
	isMultiSelect,
	handleCheck,
}: Props) {
	return (
		<Wrapper styles={{ p: 2 }}>
			<Box display="flex" width="100%" alignItems="flex-start">
				{isMultiSelect && (
					<Checkbox
						disableRipple
						onChange={(e) => handleCheck(id, e.target.checked)}
						sx={{
							p: 0,
							mr: 1.5,
						}}
					/>
				)}

				<Box flexGrow={1}>
					<Typography variant="body1" fontSize="1.1rem" fontWeight="bold" sx={{ mb: 0.5 }}>
						{title}
					</Typography>
					{description && (
						<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
							{description}
						</Typography>
					)}
					<TaskFooter priority={priority} createdAt={createdAt} />
				</Box>
				{!isMultiSelect && (
					<Box display="flex" alignItems="center" gap={1}>
						<IconButton size="small">
							<EditIcon color="secondary" />
						</IconButton>
						<IconButton size="small">
							<DeleteIcon color="secondary" />
						</IconButton>
					</Box>
				)}
			</Box>
		</Wrapper>
	)
}

function TaskFooter({ priority, createdAt }: { priority: string; createdAt: Date }) {
	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'High':
				return 'rgb(239, 68, 68)'
			case 'Medium':
				return 'rgb(234, 179, 8)'
			case 'Low':
				return 'rgb(34, 197, 94)'
			default:
				return 'text.secondary' // Fallback, shouldn't happen
		}
	}

	return (
		<Box display="flex" alignItems="center" gap={2} mt={0.25}>
			<Box display="flex" alignItems="center" gap={0.75}>
				<Box
					sx={{
						width: 8,
						height: 8,
						borderRadius: '50%',
						bgcolor: getPriorityColor(priority),
					}}
				/>
				<Typography variant="body2" color="text.secondary">
					{priority}
				</Typography>
			</Box>
			<Box display="flex" alignItems="center" gap={0.5}>
				<CalendarTodayIcon
					sx={{
						fontSize: '1rem',
						color: 'text.secondary',
					}}
				/>
				<Typography variant="body2" color="text.secondary" fontSize="0.8rem">
					{createdAt.toLocaleDateString()}
				</Typography>
			</Box>
		</Box>
	)
}
