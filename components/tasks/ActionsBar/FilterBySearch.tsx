import { TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import React from 'react'

type Props = {
	search: string
	handleSearchChange: (search: string) => void
}

export default function FilterBySearch({ search, handleSearchChange }: Props) {
	return (
		<TextField
			fullWidth
			placeholder="Search tasks..."
			value={search}
			onChange={(e) => handleSearchChange(e.target.value)}
			size="small"
			variant="outlined"
			slotProps={{ input: { startAdornment: <SearchIcon sx={{ ml: 1, mr: 1 }} /> } }}
		/>
	)
}
