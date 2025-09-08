import React from 'react'
import { Dialog, DialogTitle, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDialog } from '@/contexts/DialogProvider'
import TaskForm from './TaskForm'

export default function TaskDialog() {
	const { isDialogOpen, dialogOptions, closeDialog } = useDialog()
	const isEditing = dialogOptions.mode === 'Edit'

	return (
		<Dialog
			open={isDialogOpen}
			onClose={closeDialog}
			fullWidth
			maxWidth="sm"
			slotProps={{
				paper: {
					sx: {
						borderRadius: 2,
						backgroundImage: 'none',
					},
				},
			}}
		>
			<DialogTitle
				component={'div'}
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					pb: 1,
				}}
			>
				<Typography variant="h6" fontWeight="bold">
					{isEditing ? 'Edit Task' : 'Create New Task'}
				</Typography>
				<IconButton onClick={closeDialog} size="small">
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<TaskForm />
		</Dialog>
	)
}
