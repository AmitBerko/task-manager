import { Box, FormControl, MenuItem, Select } from '@mui/material'
import { FilterAltOutlined as FilterIcon } from '@mui/icons-material'
import React from 'react'
import { Priority } from '@prisma/client'
import type { PriorityFilter } from '@/types/types'

type Props = {
	priority: PriorityFilter
	handlePriorityChange: (priority: PriorityFilter) => void
}

export default function FilterByPriority({ priority, handlePriorityChange }: Props) {
	return (
		<FormControl fullWidth size="small">
			<Select
				value={priority}
				onChange={(e) => handlePriorityChange(e.target.value)}
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
				<MenuItem value={'All'}>All</MenuItem>
				{Object.values(Priority).map((priority) => (
					<MenuItem key={priority} value={priority}>
						{priority}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
