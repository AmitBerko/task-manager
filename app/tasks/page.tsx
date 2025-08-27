import { Container } from '@mui/material'
import React from 'react'
import Header from '@/components/layout/Header'
import TasksManager from '@/components/tasks/TasksManager'
import { getTasks } from '@/lib/actions/tasks'

export default async function TasksPage() {
  // const tasks = await getTasks()

	return (
		<Container
			maxWidth="md"
			sx={{
				height: '100svh',
				py: {xs: 2, sm: 3, md: 5},
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Header />
			<TasksManager />
		</Container>
	)
}
