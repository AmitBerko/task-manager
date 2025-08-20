import { useTasks } from '@/contexts/TasksProvider'
import { DeleteOutline, Deselect, SelectAll } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'

export default function MultiSelector() {
	const { selectedIds, isMultiSelect, setIsMultiSelect, bulkDeleteTasks } = useTasks()
	return (
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
						onClick={() => setIsMultiSelect((prev) => !prev)}
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
							onClick={bulkDeleteTasks}
							disabled={selectedIds.length === 0}
							sx={{
								textTransform: 'none',
								borderRadius: 2,
							}}
						>
							Delete {selectedIds.length}
						</Button>
						<IconButton
							onClick={() => setIsMultiSelect((prev) => !prev)}
							sx={{
								color: 'text.secondary',
							}}
						>
							<Deselect />
						</IconButton>
					</>
				)}
			</Box>
		</Box>
	)
}
