'use client'

import {
	Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material'
import React from 'react'
import { Search as SearchIcon, FilterAltOutlined as FilterIcon } from '@mui/icons-material'
import Wrapper from '@/components/Wrapper'
import { PriorityFilter } from '@/lib/types'

type Props = {
	filter: PriorityFilter
	onFilterChange: (value: PriorityFilter) => void
	openAddTaskDialog: () => void
}

export default function ActionsBar({ filter, onFilterChange, openAddTaskDialog }: Props) {
	const handleFilterChange = (e: SelectChangeEvent) => {
		onFilterChange(e.target.value as PriorityFilter)
	}

	return (
		<Wrapper>
			<Grid container spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
				{/* Search Input */}
				<Grid size={6.5}>
					<TextField
						fullWidth
						placeholder="Search tasks..."
						size="small"
						variant="outlined"
						slotProps={{ input: { startAdornment: <SearchIcon sx={{ ml: 1, mr: 1 }} /> } }}
					/>
				</Grid>

				{/* Filter Select */}
				<Grid size={2.5}>
					<FormControl fullWidth size="small">
						<Select
							value={filter}
							onChange={handleFilterChange}
							displayEmpty
							sx={{
								height: '100%',
								display: 'flex',
								alignItems: 'center',
							}}
							// Used this to insert the Filter icon
							renderValue={(value) => {
								return (
									<Box sx={{ display: 'flex', gap: 1 }}>
										<FilterIcon />
										{value}
									</Box>
								)
							}}
						>
							<MenuItem value="All">All</MenuItem>
							<MenuItem value="High">High</MenuItem>
							<MenuItem value="Medium">Medium</MenuItem>
							<MenuItem value="Low">Low</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				{/* Add Task Button */}
				<Grid size={3}>
					<Button onClick={openAddTaskDialog} variant="contained" size="small" fullWidth>
						Add Task
					</Button>
				</Grid>
			</Grid>
		</Wrapper>
	)
}
