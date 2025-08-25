'use client'

import { getSampleTasks } from '@/lib/data'
import { Task } from '@/lib/types'
import { createContext, useContext, useCallback, useState, type ReactNode } from 'react'

type TasksContextType = {
	tasks: Task[]
	addTask: (task: Omit<Task, 'createdAt' | 'id'>) => void
	updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
	deleteTask: (id: string) => void
}

const TasksContext = createContext<TasksContextType | null>(null)

function TasksProvider({ children }: { children: ReactNode }) {
	const [tasks, setTasks] = useState<Task[]>(getSampleTasks())

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

	return (
		<TasksContext.Provider
			value={{
				tasks,
				addTask,
				updateTask,
				deleteTask,
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
