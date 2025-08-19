import React from 'react'
import TaskItem from './TaskItem'
import { Box, Stack } from '@mui/material'
import { Task } from '@/lib/types'

type Props = {
	tasks: Task[]
	handleSelect: (id: string, isChecked: boolean) => void
	handleDelete: (id: string) => void
	openEditDialog: (task: Task) => void
	isMultiSelect: boolean
}

export default function TaskList({ tasks, isMultiSelect, handleSelect, handleDelete, openEditDialog }: Props) {
	return (
		<Box width="100%">
			<Stack rowGap={2.5}>
				{tasks.map((task) => (
					<TaskItem
						key={task.id}
						task={task}
						handleSelect={handleSelect}
						handleDelete={handleDelete}
						openEditDialog={openEditDialog}
						isMultiSelect={isMultiSelect}
					/>
				))}
			</Stack>
		</Box>
	)
}
