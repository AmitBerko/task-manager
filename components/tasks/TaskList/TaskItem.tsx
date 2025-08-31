import { memo, useTransition } from 'react'
import { Typography, IconButton, Checkbox, Box, CircularProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Task, Priority } from '@prisma/client'
import { PriorityCircle } from '@/components/ui/PriorityCircle'
import { Wrapper } from '@/components/ui/Wrapper'
import { deleteTask } from '@/lib/actions/tasks'
import { useDialog } from '@/contexts/DialogProvider'

type Props = {
	task: Task
	handleSelect: (id: string, isChecked: boolean) => void
	isMultiSelect: boolean
}

export default memo(function TaskItem({ task, isMultiSelect, handleSelect }: Props) {
	const { openDialog } = useDialog()
	const { id, priority, title, description, createdAt } = task
	return (
		<Wrapper sx={{ p: 2 }}>
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
						<IconButton onClick={() => openDialog({ mode: 'Edit', task })} size="small">
							<EditIcon color="secondary" />
						</IconButton>
						<DeleteButton deleteTask={() => deleteTask(id)} />
					</Box>
				)}
			</Box>
		</Wrapper>
	)
})

function DeleteButton({ deleteTask }: { deleteTask: () => Promise<void> }) {
	const [isPending, startTransition] = useTransition()

	return (
		<IconButton
			onClick={() => {
				startTransition(async () => deleteTask())
			}}
			size="small"
		>
			{isPending ? (
				<CircularProgress color="secondary" size={24} thickness={5} />
			) : (
				<DeleteIcon color="secondary" />
			)}
		</IconButton>
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
