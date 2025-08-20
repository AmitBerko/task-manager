import React, { useCallback, useState } from 'react'
import TaskItem from './TaskItem'
import { Box, Stack } from '@mui/material'
import { Task } from '@/lib/types'
import { useTasks } from '@/contexts/TasksProvider'
import MultiSelector from './MultiSelector'

type Props = {
  tasks: Task[]
	openEditDialog: (task: Task) => void
}

function TaskList({ tasks, openEditDialog }: Props) {
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [isMultiSelect, setIsMultiSelect] = useState(false)
	const { deleteTask } = useTasks()

	const handleSelect = useCallback(
		(id: string, isChecked: boolean) => {
			console.log('selected id:', id)
			setSelectedIds((prev) => (isChecked ? [...prev, id] : prev.filter((i) => i !== id)))
		},
		[setSelectedIds]
	)

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
		<Box width="100%">
			<MultiSelector
				isMultiSelect={isMultiSelect}
				selectedIds={selectedIds}
				toggleMultiSelect={toggleMultiSelect}
				bulkDelete={bulkDelete}
			/>
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
