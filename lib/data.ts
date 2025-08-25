import { Task } from './types'

// This is some placeholder data
const tasks: Task[] = [
	{
		id: '2408dd82-b3fb-4d8b-8013-b6b412fbff41',
		title: 'Example 1',
		description: 'This is an example task',
		createdAt: new Date(),
		priority: 'High',
	},
	{
		id: 'a991bbb9-0d15-4b59-9dd6-4de9bc90d4d0',
		title: 'Example 2',
		description: 'Another example :)',
		createdAt: new Date('2025-08-20'),
		priority: 'Low',
	},
]

export const getSampleTasks = () => {
	return tasks
}
