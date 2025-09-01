"use client"

import React, { useCallback, useState } from 'react'
import TaskItem from './TaskItem'
import { Box, Stack } from '@mui/material'
import MultiSelector from './MultiSelector'
import NoTasksFound from './NoTasksFound'
import { Task } from '@prisma/client'

type Props = {
	tasks: Task[]
}

function TaskList({ tasks }: Props) {
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [isMultiSelect, setIsMultiSelect] = useState(false)

	// Exact same function is passed to every task item so usecallback should be used
	const handleSelect = useCallback((id: string, isChecked: boolean) => {
		setSelectedIds((prev) => (isChecked ? [...prev, id] : prev.filter((i) => i !== id)))
	}, [])

	const toggleMultiSelect = () => {
		setSelectedIds([])
		setIsMultiSelect((prev) => !prev)
	}

	return (
		<Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
			<MultiSelector
				isMultiSelect={isMultiSelect}
				selectedIds={selectedIds}
				toggleMultiSelect={toggleMultiSelect}
			/>
			<Stack
				rowGap={2.5}
				sx={(theme) => ({
					flex: 1,
					minHeight: 0,
					overflowY: 'auto',
					pr: '7px',
					'&::-webkit-scrollbar': { width: '7px' },
					'&::-webkit-scrollbar-track': {
						background: theme.palette.background.paper,
						borderRadius: '10px',
					},
					'&::-webkit-scrollbar-thumb': {
						background: theme.palette.text.secondary,
						borderRadius: '10px',
					},
				})}
			>
				{tasks.length > 0 ? (
					tasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							handleSelect={handleSelect}
							isMultiSelect={isMultiSelect}
						/>
					))
				) : (
					<NoTasksFound />
				)}
			</Stack>
		</Box>
	)
}

export default TaskList
