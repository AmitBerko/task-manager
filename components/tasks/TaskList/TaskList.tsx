import React, { useCallback, useState } from 'react'
import TaskItem from './TaskItem'
import { Box, Stack } from '@mui/material'
import { Task } from '@/lib/types'
import { useTasks } from '@/contexts/TasksProvider'
import MultiSelector from './MultiSelector'
import NoTasksFound from './NoTasksFound'

type Props = {
	tasks: Task[]
	openEditDialog: (task: Task) => void
}

function TaskList({ tasks, openEditDialog }: Props) {
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [isMultiSelect, setIsMultiSelect] = useState(false)
	const { deleteTask } = useTasks()

	// Exact same function is passed to every task item so usecallback should be used
	const handleSelect = useCallback((id: string, isChecked: boolean) => {
		setSelectedIds((prev) => (isChecked ? [...prev, id] : prev.filter((i) => i !== id)))
	}, [])

	const toggleMultiSelect = () => {
		setSelectedIds([])
		setIsMultiSelect((prev) => !prev)
	}

	const bulkDelete = () => {
		selectedIds.forEach((id) => deleteTask(id))
		setSelectedIds([])
		setIsMultiSelect(false)
	}

	return (
		<Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
			<MultiSelector
				isMultiSelect={isMultiSelect}
				selectedIds={selectedIds}
				toggleMultiSelect={toggleMultiSelect}
				bulkDelete={bulkDelete}
			/>
			<Stack
				rowGap={2.5}
				sx={(theme) => ({
					flex: 1,
					minHeight: 0,
					overflowY: 'auto',
					pr: '7px',
					'&::-webkit-scrollbar': { width: '7px' },
					'&::-webkit-scrollbar-track': {
						background: theme.palette.background.paper,
						borderRadius: '10px',
					},
					'&::-webkit-scrollbar-thumb': {
						background: theme.palette.text.secondary,
						borderRadius: '10px',
					},
				})}
			>
				{tasks.length > 0 ? (
					tasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							handleSelect={handleSelect}
							handleDelete={deleteTask}
							openEditDialog={openEditDialog}
							isMultiSelect={isMultiSelect}
						/>
					))
				) : (
					<NoTasksFound />
				)}
			</Stack>
		</Box>
	)
}

export default TaskList
