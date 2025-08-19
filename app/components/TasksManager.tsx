'use client'
import { useState, useCallback, useMemo } from 'react'
import { Stack } from '@mui/material'
import ActionsBar from './ActionsBar'
import MultiSelector from './MultiSelector'
import TaskList from './TaskList'
import { Task } from '@/lib/types'

export default function TasksManager({ initialTasks }: { initialTasks: Task[] }) {
	const [tasks, setTasks] = useState(initialTasks)
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [isMultiSelect, setIsMultiSelect] = useState(false)

	const visibleTasks = useMemo(() => tasks, [tasks])

	const toggleMultiSelect = () => {
		setIsMultiSelect((prev) => !prev)
		setSelectedIds([])
	}

  const handleBulkDelete = () => {
    setTasks((prev) => prev.filter((t) => !selectedIds.includes(t.id)))
    setSelectedIds([])
  }

  // Same function everytime so should use useCallback
	const handleSelect = useCallback((id: string, checked: boolean) => {
		setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)))
	}, [])

	const handleDelete = useCallback((id: string) => {
		setTasks((prev) => prev.filter((t) => t.id !== id))
	}, [])


	return (
		<Stack spacing={2} width="100%">
			<ActionsBar />

			<MultiSelector
				isMultiSelect={isMultiSelect}
				selectedCount={selectedIds.length}
				toggleMultiSelect={toggleMultiSelect}
				handleBulkDelete={handleBulkDelete}
			/>

			<TaskList
				tasks={tasks}
				isMultiSelect={isMultiSelect}
				handleSelect={handleSelect}
				handleDelete={handleDelete}
			/>
		</Stack>
	)
}
