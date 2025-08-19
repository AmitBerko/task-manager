import { DeleteOutline, Deselect, SelectAll } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'

type Props = {
	isMultiSelect: boolean
	selectedCount: number
	toggleMultiSelect: () => void
	handleBulkDelete: () => void
}

export default function MultiSelector({
	isMultiSelect,
	selectedCount,
	toggleMultiSelect,
	handleBulkDelete,
}: Props) {
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
							disabled={selectedCount === 0}
							sx={{
								textTransform: 'none',
								borderRadius: 2,
							}}
						>
							Delete {selectedCount}
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
