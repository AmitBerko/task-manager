import { Priority } from "@prisma/client"

export type ThemeMode = 'light' | 'dark'

export type TaskPayload = {
	title: string
	description?: string
	priority: Priority
}

export type PriorityFilter = 'All' | Priority

export type Filter = {
	search: string
	priority: PriorityFilter
}

export type ActionResponse<T = null> = Promise<
	{ success: true; data: T } | { success: false; error: string }
>