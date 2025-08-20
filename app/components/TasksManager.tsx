'use client'

import { useCallback, useState } from 'react'
import { Stack } from '@mui/material'
import ActionsBar from './ActionsBar'
import MultiSelector from './MultiSelector'
import TaskList from './TaskList'
import { Task } from '@/lib/types'
import TaskDialog from './TaskDialog'

export default function TasksManager() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

	const openAddDialog = () => {
		setTaskToEdit(null)
		setIsDialogOpen(true)
	}

	const openEditDialog = useCallback((task: Task) => {
		setTaskToEdit(task)
		setIsDialogOpen(true)
	}, [])

	const closeDialog = () => {
		setIsDialogOpen(false)
		setTaskToEdit(null)
	}

	return (
		<Stack spacing={2} width="100%">
			<ActionsBar openAddDialog={openAddDialog} />
			<MultiSelector />
			<TaskList openEditDialog={openEditDialog} />
			<TaskDialog open={isDialogOpen} onClose={closeDialog} taskToEdit={taskToEdit} />
		</Stack>
	)
}
