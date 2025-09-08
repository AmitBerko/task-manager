'use client'

import { Box, Button, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Search as SearchIcon, FilterAltOutlined as FilterIcon } from '@mui/icons-material'
import { Wrapper } from '@/components/ui/Wrapper'
import { Filter, PriorityFilter } from '@/types/types'
import { useDialog } from '@/contexts/DialogProvider'
import { Priority } from '@prisma/client'
import { labels } from '@/config/labels'
import FilterByPriority from './FilterByPriority'
import FilterBySearch from './FilterBySearch'

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
					<FilterBySearch search={filter.search} handleSearchChange={handleSearchChange} />
				</Grid>

				<Grid minWidth={135}>
					<FilterByPriority
						priority={filter.priority}
						handlePriorityChange={handlePriorityChange}
					/>
				</Grid>

				<Grid size="grow" display="flex">
					<Button
						onClick={() => openDialog({ mode: 'Create' })}
						variant="contained"
						size="small"
						fullWidth
					>
						{labels.tasks.addTask}
					</Button>
				</Grid>
			</Grid>
		</Wrapper>
	)
}
