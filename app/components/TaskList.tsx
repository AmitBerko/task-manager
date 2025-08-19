'use client'
import { tasks } from '@/lib/data'
import React, { useState } from 'react'
import TaskItem from './TaskItem'
import { Box, IconButton, Typography, Button, Stack } from '@mui/material'
import { DeleteOutline, Close, SelectAll } from '@mui/icons-material'

export default function TaskList() {
	const [isMultiSelect, setIsMultiSelect] = useState(false)
	const [tasksToDelete, setTasksToDelete] = useState<string[]>([]) // Array of task ids

	const handleCheck = (taskId: string, checked: boolean) => {
		setTasksToDelete((prev) => (checked ? [...prev, taskId] : prev.filter((id) => id !== taskId)))
	}

	const handleMultiSelect = () => {
		setTasksToDelete([])
		setIsMultiSelect((prev) => !prev)
	}

	const handleBulkDelete = () => {
		console.log('Deleting tasks:', tasksToDelete)
	}

	return (
		<Box width="100%">
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					mb: 2,
				}}
			>
				<Typography
					variant="h5"
					sx={{
						fontWeight: 'bold',
					}}
				>
					My Tasks
				</Typography>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					{!isMultiSelect ? (
						<IconButton
							onClick={handleMultiSelect}
							sx={{
								color: 'text.secondary',
							}}
						>
							{/* Maybe add a tooltip later */}
							<SelectAll />
						</IconButton>
					) : (
						<>
							<Button
								variant="contained"
								color="error"
								startIcon={<DeleteOutline />}
								onClick={handleBulkDelete}
								disabled={tasksToDelete.length === 0}
								sx={{
									textTransform: 'none',
									borderRadius: 2,
								}}
							>
								Delete {tasksToDelete.length}
							</Button>
							<IconButton
								onClick={() => {
									setTasksToDelete([])
									setIsMultiSelect(false)
								}}
								sx={{
									color: 'text.secondary',
								}}
							>
								<Close />
							</IconButton>
						</>
					)}
				</Box>
			</Box>
			<Stack rowGap={2.5}>
				{tasks.map((task) => (
					<TaskItem
						key={task.id}
						id={task.id}
						title={task.title}
						description={task.description}
						priority={task.priority}
						createdAt={task.createdAt}
						isMultiSelect={isMultiSelect}
						handleCheck={handleCheck}
					/>
				))}
			</Stack>
		</Box>
	)
}
