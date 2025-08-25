import { Container } from '@mui/material'
import React from 'react'
import Header from '@/components/layout/Header'
import TasksManager from '@/components/tasks/TasksManager'

export default function TasksPage() {
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
