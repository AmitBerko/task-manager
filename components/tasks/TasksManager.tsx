'use client'

import { useState, useMemo } from 'react'
import { Stack } from '@mui/material'
import ActionsBar from './ActionsBar'
import TaskList from './TaskList/TaskList'
import { Filter } from '@/types/types'
import { DialogProvider } from '@/contexts/DialogProvider'
import { Task } from '@prisma/client'

export default function TasksManager({ tasks }: { tasks: Task[] }) {
	const [filter, setFilter] = useState<Filter>({ search: '', priority: 'All' })

	const filteredTasks = useMemo(() => {
		let filtered = tasks

		if (filter.priority !== 'All') {
			filtered = filtered.filter((task) => task.priority === filter.priority)
		}

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

	return (
		<DialogProvider>
			<Stack spacing={2} sx={{ width: '100%', flex: 1, minHeight: 0 }}>
				<ActionsBar filter={filter} setFilter={setFilter} />
				<TaskList tasks={filteredTasks} />
			</Stack>
		</DialogProvider>
	)
}
