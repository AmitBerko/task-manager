export type ThemeMode = 'light' | 'dark'

export type Priority = 'High' | 'Medium' | 'Low'

export type TaskPayload = {
	title: string
	description: string
	priority: Priority
}

export type Task = TaskPayload & {
	id: string
	createdAt: Date
}

export type PriorityFilter = 'All' | 'High' | 'Medium' | 'Low'

export type Filter = {
	search: string
	priority: PriorityFilter
}

export type ActionResponse<T = null> = Promise<
	{ success: true; data: T } | { success: false; error: string }
>