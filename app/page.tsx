import { Container, Stack } from '@mui/material'
import React from 'react'
import Header from './components/Header'
import TasksManager from './components/TasksManager'

export default function TasksPage() {
	return (
		<Container maxWidth="md">
			<Stack rowGap={3} sx={{ mt: { xs: 1.5, sm: 4 }, alignItems: 'center' }}>
				<Header />
        <TasksManager />
			</Stack>
		</Container>
	)
}
