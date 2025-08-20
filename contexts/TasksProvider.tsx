'use client'

import { getSampleTasks } from '@/lib/data'
import { PriorityFilter, Task } from '@/lib/types'
import { createContext, useContext, useCallback, useState, type ReactNode, useMemo } from 'react'

type TasksContextType = {
	// Core state
	tasks: Task[]
	priorityFilter: PriorityFilter
	setPriorityFilter: React.Dispatch<React.SetStateAction<PriorityFilter>>

	// Selection state
	selectedIds: string[]
	setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
	isMultiSelect: boolean
	setIsMultiSelect: React.Dispatch<React.SetStateAction<boolean>>

	// Actions - clean, focused functions
	addTask: (task: Omit<Task, 'createdAt' | 'id'>) => void
	updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
	deleteTask: (id: string) => void
	bulkDeleteTasks: () => void
}

const TasksContext = createContext<TasksContextType | null>(null)

function TasksProvider({ children }: { children: ReactNode }) {
	const [tasks, setTasks] = useState<Task[]>(getSampleTasks())
	const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All')
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [isMultiSelect, setIsMultiSelect] = useState(false)

	const visibleTasks = useMemo(() => {
		if (priorityFilter === 'All') {
			return tasks
		}

		return tasks.filter((task) => task.priority === priorityFilter)
	}, [tasks, priorityFilter])

	const addTask = useCallback((taskData: Omit<Task, 'createdAt' | 'id'>) => {
		const newTask: Task = {
			...taskData,
			id: window.crypto.randomUUID(),
			createdAt: new Date(),
		}
		setTasks((prev) => [...prev, newTask])
	}, [])

	const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
		setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
	}, [])

	const deleteTask = useCallback((id: string) => {
		setTasks((prev) => prev.filter((task) => task.id !== id))
	}, [])

	const bulkDeleteTasks = useCallback(() => {
		setTasks((prev) => prev.filter((task) => !selectedIds.includes(task.id)))
		setSelectedIds([])
	}, [selectedIds])

	return (
		<TasksContext.Provider
			value={{
				tasks: visibleTasks,
				priorityFilter,
				setPriorityFilter,
				selectedIds,
				setSelectedIds,
				isMultiSelect,
				setIsMultiSelect,
				addTask,
				updateTask,
				deleteTask,
				bulkDeleteTasks,
			}}
		>
			{children}
		</TasksContext.Provider>
	)
}

export const useTasks = (): TasksContextType => {
	const context = useContext(TasksContext)
	if (!context) {
		throw new Error('useTasks must be used within a TasksProvider')
	}
	return context
}

export default TasksProvider
