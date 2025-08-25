'use client'

import { useCallback, useState, useMemo } from 'react'
import { Stack } from '@mui/material'
import ActionsBar from './ActionsBar'
import TaskList from './TaskList/TaskList'
import { Filter, Task } from '@/types/types'
import TaskDialog from './TaskDialog'
import { useTasks } from '@/contexts/TasksProvider'

export default function TasksManager() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
	const [filter, setFilter] = useState<Filter>({ search: '', priority: 'All' })
	const { tasks } = useTasks()

	const filteredTasks = useMemo(() => {
		let filtered = tasks

		// Filter by priority
		if (filter.priority !== 'All') {
			filtered = filtered.filter((task) => task.priority === filter.priority)
		}

		// Filter by title and description
		if (filter.search.trim()) {
			const searchTerm = filter.search.toLowerCase().trim()
			filtered = filtered.filter(
				(task) =>
					task.title.toLowerCase().includes(searchTerm) ||
					task.description?.toLowerCase().includes(searchTerm)
			)
		}

		return filtered
	}, [tasks, filter])

	const openAddDialog = useCallback(() => {
		setTaskToEdit(null)
		setIsDialogOpen(true)
	}, [])

	const openEditDialog = useCallback((task: Task) => {
		setTaskToEdit(task)
		setIsDialogOpen(true)
	}, [])

	const closeDialog = useCallback(() => {
		setIsDialogOpen(false)
		setTaskToEdit(null)
	}, [])

	return (
		<Stack spacing={2} sx={{ width: '100%', flex: 1, minHeight: 0 }}>
			<ActionsBar openAddDialog={openAddDialog} filter={filter} setFilter={setFilter} />
			<TaskList tasks={filteredTasks} openEditDialog={openEditDialog} />
			<TaskDialog open={isDialogOpen} onClose={closeDialog} taskToEdit={taskToEdit} />
		</Stack>
	)
}
