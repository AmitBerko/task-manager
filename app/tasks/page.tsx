import { Container } from '@mui/material'
import React from 'react'
import Header from '@/components/layout/Header'
import TasksManager from '@/components/tasks/TasksManager'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function TasksPage() {
  const session = await getServerSession(authOptions)
  console.log(session)
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
      {JSON.stringify(session)}
		</Container>
	)
}
