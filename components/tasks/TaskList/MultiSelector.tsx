import LoadingButton from '@/components/common/LoadingButton'
import { bulkDeleteTasks } from '@/lib/actions/tasks'
import { DeleteOutline, Deselect, SelectAll } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
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
						<BulkDeleteButton
							handleBulkDelete={handleBulkDelete}
							selectedAmount={selectedIds.length}
						/>
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

type BulkDeleteProps = {
	handleBulkDelete: () => Promise<void>
	selectedAmount: number
}

function BulkDeleteButton({ handleBulkDelete, selectedAmount }: BulkDeleteProps) {
	return (
		<LoadingButton
			onClickAsync={handleBulkDelete}
			startIcon={<DeleteOutline />}
			variant="contained"
			color="error"
			disabled={selectedAmount === 0}
			sx={{
				textTransform: 'none',
				borderRadius: 2,
			}}
		>
			Delete {selectedAmount}
		</LoadingButton>
	)
}
