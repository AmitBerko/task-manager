'use client'
import { useState, useCallback, useMemo } from 'react'
import { Stack } from '@mui/material'
import ActionsBar from './ActionsBar'
import MultiSelector from './MultiSelector'
import TaskList from './TaskList'
import { PriorityFilter, Task } from '@/lib/types'
import TaskDialog from './TaskDialog'

export default function TasksManager({ initialTasks }: { initialTasks: Task[] }) {
	const [tasks, setTasks] = useState(initialTasks)
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [isMultiSelect, setIsMultiSelect] = useState(false)
	const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All')
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)

	const visibleTasks = useMemo(() => {
		if (priorityFilter === 'All') {
			return tasks
		}

		return tasks.filter((task) => task.priority === priorityFilter)
	}, [tasks, priorityFilter])

	const toggleMultiSelect = () => {
		setIsMultiSelect((prev) => !prev)
		setSelectedIds([])
	}

	const handleSelect = useCallback((id: string, checked: boolean) => {
		setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)))
	}, [])

	const handleDelete = useCallback((id: string) => {
		setTasks((prev) => prev.filter((t) => t.id !== id))
	}, [])

	const handleBulkDelete = () => {
		setTasks((prev) => prev.filter((t) => !selectedIds.includes(t.id)))
		setSelectedIds([])
	}

	const openAddTaskDialog = () => {
		setTaskToEdit(null)
		setIsDialogOpen(true)
	}

	const addTask = (task: Omit<Task, 'createdAt' | 'id'>) => {
		const newTask = {
			...task,
			createdAt: new Date(),
			id: window.crypto.randomUUID(),
		}
		setTasks((prevTasks) => [...prevTasks, newTask])
	}

	const openEditDialog = (task: Task) => {
		setTaskToEdit(task)
		setIsDialogOpen(true)
	}

	const editTask = (editedTask: Task) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
		)
	}

	return (
		<Stack spacing={2} width="100%">
			<ActionsBar
				openAddTaskDialog={openAddTaskDialog}
				filter={priorityFilter}
				onFilterChange={setPriorityFilter}
			/>

			<MultiSelector
				isMultiSelect={isMultiSelect}
				selectedCount={selectedIds.length}
				toggleMultiSelect={toggleMultiSelect}
				handleBulkDelete={handleBulkDelete}
			/>

			<TaskList
				tasks={visibleTasks}
				isMultiSelect={isMultiSelect}
				handleSelect={handleSelect}
				handleDelete={handleDelete}
				openEditDialog={openEditDialog}
			/>

			<TaskDialog
				open={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onAdd={addTask}
				onEdit={editTask}
				taskToEdit={taskToEdit ?? undefined}
			/>
		</Stack>
	)
}
