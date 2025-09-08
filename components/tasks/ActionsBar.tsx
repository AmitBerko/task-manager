'use client'

import { Box, Button, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Search as SearchIcon, FilterAltOutlined as FilterIcon } from '@mui/icons-material'
import { Wrapper } from '@/components/ui/Wrapper'
import { Filter, PriorityFilter } from '@/types/types'
import { useDialog } from '@/contexts/DialogProvider'

type Props = {
	filter: Filter
	setFilter: (filter: Filter) => void
}

export default function ActionsBar({ filter, setFilter }: Props) {
	const { openDialog } = useDialog()
	const handleSearchChange = (search: string) => {
		setFilter({ ...filter, search })
	}

	const handlePriorityChange = (priority: PriorityFilter) => {
		setFilter({ ...filter, priority })
	}

	return (
		<Wrapper sx={{ p: { xs: 2, sm: 3 } }}>
			<Grid container spacing={2} sx={{ width: '100%', alignItems: 'stretch' }}>
				<Grid size={{ xs: 12, sm: 5.5 }}>
					<TextField
						fullWidth
						placeholder="Search tasks..."
						value={filter.search}
						onChange={(e) => handleSearchChange(e.target.value)}
						size="small"
						variant="outlined"
						slotProps={{ input: { startAdornment: <SearchIcon sx={{ ml: 1, mr: 1 }} /> } }}
					/>
				</Grid>

				<Grid minWidth={135}>
					<FormControl fullWidth size="small">
						<Select
							value={filter.priority}
							onChange={(e) => handlePriorityChange(e.target.value as PriorityFilter)}
							displayEmpty
							sx={{
								height: '100%',
								display: 'flex',
								alignItems: 'center',
							}}
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

				<Grid size="grow" display="flex">
					<Button
						onClick={() => openDialog({ mode: 'Create' })}
						variant="contained"
						size="small"
						fullWidth
					>
						Add Task
					</Button>
				</Grid>
			</Grid>
		</Wrapper>
	)
}
