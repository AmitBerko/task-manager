import { Typography, IconButton, Checkbox, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Wrapper from '@/components/Wrapper'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Priority, Task } from '@/lib/types'
import { memo } from 'react'

type Props = {
	task: Task
	handleSelect: (id: string, isChecked: boolean) => void
	handleDelete: (id: string) => void
	openEditDialog: (task: Task) => void
	isMultiSelect: boolean
}

export default memo(function TaskItem({
	task: { id, title, description, priority, createdAt },
	isMultiSelect,
	handleSelect,
	handleDelete,
	openEditDialog,
}: Props) {
  console.log('render')
	return (
		<Wrapper styles={{ p: 2 }}>
			<Box display="flex" width="100%" alignItems="flex-start">
				{isMultiSelect && (
					<Checkbox
						disableRipple
						onChange={(e) => handleSelect(id, e.target.checked)}
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
						<IconButton
							onClick={() => openEditDialog({ id, title, description, priority, createdAt })}
							size="small"
						>
							<EditIcon color="secondary" />
						</IconButton>
						<IconButton onClick={() => handleDelete(id)} size="small">
							<DeleteIcon color="secondary" />
						</IconButton>
					</Box>
				)}
			</Box>
		</Wrapper>
	)
})

export function PriorityCircle({ priority }: { priority: Priority }) {
	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'High':
				return '#ef4444'
			case 'Medium':
				return '#eab308'
			case 'Low':
				return '#22c55e'
			default:
				return '#6b7280'
		}
	}

	return (
		<Box
			sx={{
				width: 8,
				height: 8,
				borderRadius: '50%',
				bgcolor: getPriorityColor(priority),
			}}
		/>
	)
}

function TaskFooter({ priority, createdAt }: { priority: Priority; createdAt: Date }) {
	return (
		<Box display="flex" alignItems="center" gap={2} mt={0.25}>
			<Box display="flex" alignItems="center" gap={0.75}>
				<PriorityCircle priority={priority} />
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
