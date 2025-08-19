'use client'
import { tasks } from '@/lib/data'
import React, { useState } from 'react'
import TaskItem from './TaskItem'
import { Box, Button } from '@mui/material'
import { CheckBoxOutlineBlank, DeleteOutline, Close } from '@mui/icons-material'

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
		<>
			<Box
				sx={{
					display: 'flex',
					gap: 2,
          justifyContent: 'space-between',
					width: '100%',
				}}
			>
        {/* Needs a big redesign */}
				{!isMultiSelect ? (
					<Button
						variant="outlined"
						startIcon={<CheckBoxOutlineBlank />}
						onClick={handleMultiSelect}
						sx={{
							textTransform: 'none',
							borderRadius: 1.5,
						}}
					>
						Multi Select
					</Button>
				) : (
					<>

						<Button
							variant="text"
							startIcon={<Close />}
							onClick={() => {
                setTasksToDelete([])
								setIsMultiSelect(false)
							}}
							sx={{
                textTransform: 'none',
								color: 'text.secondary',
								minWidth: 'auto',
								px: 2,
							}}
              >
							Cancel
						</Button>
            {tasksToDelete.length > 0 && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteOutline />}
                onClick={handleBulkDelete}
                sx={{
                  textTransform: 'none',
                  borderRadius: 1.5,
                }}
              >
                Delete {tasksToDelete.length}
              </Button>
            )}
					</>
				)}
			</Box>

			{tasks.map((task) => (
				<TaskItem
					key={task.id}
					id={task.id}
					title={task.title}
					description={task.description}
					priority={task.priority}
					createdAt={new Date()}
					isMultiSelect={isMultiSelect}
					handleCheck={handleCheck}
				/>
			))}
		</>
	)
}

