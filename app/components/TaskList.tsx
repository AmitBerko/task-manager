import React, { useCallback } from 'react'
import TaskItem from './TaskItem'
import { Box, Stack } from '@mui/material'
import { Task } from '@/lib/types'
import { useTasks } from '@/contexts/TasksProvider'

type Props = {
	openEditDialog: (task: Task) => void
}

function TaskList({ openEditDialog }: Props) {
	const { tasks, setSelectedIds, isMultiSelect, deleteTask } = useTasks()

	const handleSelect = useCallback(
		(id: string, isChecked: boolean) => {
			console.log('selected id:', id)
			setSelectedIds((prev) => (isChecked ? [...prev, id] : prev.filter((i) => i !== id)))
		},
		[setSelectedIds]
	)

	return (
		<Box width="100%">
			<Stack rowGap={2.5}>
				{tasks.map((task) => (
					<TaskItem
						key={task.id}
						task={task}
						handleSelect={handleSelect}
						handleDelete={deleteTask}
						openEditDialog={openEditDialog}
						isMultiSelect={isMultiSelect}
					/>
				))}
			</Stack>
		</Box>
	)
}

// Memoize the component - it will only rerender if props actually change
export default TaskList
