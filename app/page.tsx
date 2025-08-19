import { Container, Stack } from '@mui/material'
import React from 'react'
import Header from './components/Header'
import ActionsBar from './components/ActionsBar'
import TaskList from './components/TaskList'

export default function TodosPage() {
	return (
		<Container maxWidth="md">
			<Stack rowGap={3} sx={{ mt: { xs: 1.5, sm: 4 }, alignItems: 'center' }}>
				<Header />
				<ActionsBar />
        <TaskList />
			</Stack>
		</Container>
	)
}
