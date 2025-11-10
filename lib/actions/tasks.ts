'use server'

import { ActionResponse, TaskPayload } from '@/types/types'
import { getServerSession } from 'next-auth'
import { prisma } from '../prisma'
import { revalidatePath } from 'next/cache'
import { authOptions } from '../authOptions'
import { Task } from '@prisma/client'
import { taskSchema } from '../validations'
import { ValidationError } from 'yup'

export const getTasks = async (): Promise<Task[]> => {
	const session = await getServerSession(authOptions)
	const userId = session?.user.id
	if (!userId) {
		throw new Error('Authentication required')
	}

	const tasks = await prisma.task.findMany({
		where: {
			userId,
		},
	})

	return tasks
}

export const addTask = async ({
	title,
	description,
	priority,
}: TaskPayload): ActionResponse<Task> => {
	try {
		await taskSchema.validate({ title, description, priority })
		const session = await getServerSession(authOptions)
		const userId = session?.user.id

		if (!userId) {
			throw new Error('Authentication required')
		}

		const task = await prisma.task.create({ data: { title, description, priority, userId } })

		revalidatePath('/tasks')
		return { success: true, data: task }
	} catch (error) {
		if (error instanceof ValidationError) {
			return { success: false, error: error.message }
		} else {
			return { success: false, error: `Something went wrong: ${error}` }
		}
	}
}

export const updateTask = async ({
	taskId,
	title,
	description,
	priority,
}: TaskPayload & { taskId: string }): ActionResponse<Task> => {
	try {
		await taskSchema.validate({ title, description, priority })
		const session = await getServerSession(authOptions)
		const userId = session?.user.id

		if (!userId) {
			throw new Error('Authentication required')
		}

		const user = await prisma.user.findUnique({ where: { id: userId }, select: { tasks: true } })

		if (!user?.tasks.find((task) => task.id === taskId)) {
			throw new Error('Task not found or access denied')
		}

		const task = await prisma.task.update({
			where: { id: taskId },
			data: { title, description, priority },
		})

		revalidatePath('/tasks')
		return { success: true, data: task }
	} catch (error) {
		return { success: false, error: `Something went wrong: ${error}` }
	}
}

export const deleteTask = async (taskId: string) => {
	const session = await getServerSession(authOptions)
	const userId = session?.user.id

	if (!userId) {
		throw new Error('Authentication required')
	}

	await prisma.task.deleteMany({
		where: {
			id: taskId,
			userId: userId,
		},
	})

	revalidatePath('/tasks')
}

export const bulkDeleteTasks = async (taskIds: string[]) => {
	const session = await getServerSession(authOptions)
	const userId = session?.user.id

	if (!userId) {
		throw new Error('Authentication required')
	}

	await prisma.task.deleteMany({
		where: {
			id: { in: taskIds },
			userId,
		},
	})

	revalidatePath('/tasks')
}
