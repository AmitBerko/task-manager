import { bulkDeleteTasks } from '@/lib/actions/tasks'
import { DeleteOutline, Deselect, SelectAll } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'

type Props = {
	isMultiSelect: boolean
	selectedIds: string[]
	toggleMultiSelect: () => void
}

export default function MultiSelector({ isMultiSelect, selectedIds, toggleMultiSelect }: Props) {
	const handleBulkDelete = async () => {
		await bulkDeleteTasks(selectedIds)
		toggleMultiSelect()
	}

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
						onClick={toggleMultiSelect}
						sx={{
							color: 'text.secondary',
						}}
					>
						<SelectAll />
					</IconButton>
				) : (
					<>
						<Button
							variant="contained"
							color="error"
							startIcon={<DeleteOutline />}
							onClick={handleBulkDelete}
							disabled={selectedIds.length === 0}
							sx={{
								textTransform: 'none',
								borderRadius: 2,
							}}
						>
							Delete {selectedIds.length}
						</Button>
						<IconButton
							onClick={toggleMultiSelect}
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
