import { Container, Stack } from '@mui/material'
import React from 'react'
import Header from './components/Header'
import { getSampleTasks } from '@/lib/data'
import TasksManager from './components/TasksManager'

export default function TasksPage() {
	// Doing it this way so its easier to switch to db if needed
	const tasks = getSampleTasks()
	return (
		<Container maxWidth="md">
			<Stack rowGap={3} sx={{ mt: { xs: 1.5, sm: 4 }, alignItems: 'center' }}>
				<Header />
        <TasksManager initialTasks={tasks} />
			</Stack>
		</Container>
	)
}
