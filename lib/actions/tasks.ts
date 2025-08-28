'use server'

import { TaskPayload } from '@/types/types'
import { getServerSession } from 'next-auth'
import { prisma } from '../prisma'
import { revalidatePath } from 'next/cache'
import { authOptions } from '../authOptions'
import { Task } from '@prisma/client'

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

export const addTask = async ({ title, description, priority }: TaskPayload): Promise<Task> => {
	const session = await getServerSession(authOptions)
	const userId = session?.user.id

	if (!userId) {
		throw new Error('Authentication required')
	}

	if (!title || !priority || !['High', 'Medium', 'Low'].includes(priority)) {
		throw new Error('Invalid input')
	}

	const task = await prisma.task.create({ data: { title, description, priority, userId } })

	revalidatePath('/tasks')
	return task
}

export const updateTask = async ({
	taskId,
	title,
	description,
	priority,
}: TaskPayload & { taskId: string }): Promise<Task> => {
	const session = await getServerSession(authOptions)
	const userId = session?.user.id

	if (!userId) {
		throw new Error('Authentication required')
	}

	if (!title || !priority || !['High', 'Medium', 'Low'].includes(priority)) {
		throw new Error('Invalid input')
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
	return task
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
