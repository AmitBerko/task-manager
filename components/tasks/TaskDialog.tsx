import React, { useState, useEffect, useTransition } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Stack,
	Typography,
	Box,
	IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { Priority } from '@/types/types'
import { PriorityCircle } from '../common/PriorityCircle'
import { addTask, updateTask } from '@/lib/actions/tasks'
import { useDialog } from '@/contexts/DialogProvider'
import LoadingButton from '../common/LoadingButton'

export default function TaskDialog({}) {
	const { isDialogOpen, dialogOptions, closeDialog } = useDialog()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [priority, setPriority] = useState<Priority>('Medium')

	const canSubmit = !!title.trim()
	const isEditing = dialogOptions.mode === 'Edit'

	useEffect(() => {
		if (!isDialogOpen) return

		if (isEditing) {
			const { title, description, priority } = dialogOptions.task
			setTitle(title)
			setDescription(description)
			setPriority(priority)
		} else {
			setTitle('')
			setDescription('')
			setPriority('Medium')
		}
	}, [dialogOptions])

	const handleSubmit = async () => {
		if (isEditing) {
			await updateTask({
				taskId: dialogOptions.task.id,
				title,
				description,
				priority,
			})
		} else {
			await addTask({
				title,
				description,
				priority,
			})
		}

		closeDialog()
	}

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
						backgroundImage: 'none', // Remove the weird background color
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

			<DialogContent sx={{ px: 3 }}>
				<Stack spacing={3} mt={1}>
					<TextField
						label="Task Title"
						fullWidth
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						variant="outlined"
					/>

					<TextField
						label="Description (Optional)"
						fullWidth
						multiline
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						variant="outlined"
					/>

					<FormControl fullWidth>
						<InputLabel>Priority Level</InputLabel>
						<Select
							value={priority}
							label="Priority Level"
							onChange={(e) => setPriority(e.target.value as Priority)}
						>
							<MenuItem value="High">
								<Box display="flex" alignItems="center" gap={1}>
									<PriorityCircle priority="High" />
									<Typography>High Priority</Typography>
								</Box>
							</MenuItem>
							<MenuItem value="Medium">
								<Box display="flex" alignItems="center" gap={1}>
									<PriorityCircle priority="Medium" />
									<Typography>Medium Priority</Typography>
								</Box>
							</MenuItem>
							<MenuItem value="Low">
								<Box display="flex" alignItems="center" gap={1}>
									<PriorityCircle priority="Low" />
									<Typography>Low Priority</Typography>
								</Box>
							</MenuItem>
						</Select>
					</FormControl>
				</Stack>
			</DialogContent>

			<DialogActions sx={{ mb: 1.75, mr: 1.75, gap: 1 }}>
				<Button
					onClick={closeDialog}
					variant="outlined"
					color="inherit"
					sx={{
						borderColor: 'divider',
					}}
				>
					Cancel
				</Button>
				<SubmitButton handleSubmit={handleSubmit} canSubmit={canSubmit} isEditing={isEditing} />
			</DialogActions>
		</Dialog>
	)
}

type SubmitButtonProps = {
	handleSubmit: () => Promise<void>
	canSubmit: boolean
	isEditing: boolean
}

function SubmitButton({ handleSubmit, canSubmit, isEditing }: SubmitButtonProps) {
	return (
		<LoadingButton
			onClickAsync={handleSubmit}
			sx={{ width: '150px' }}
			variant="contained"
			disabled={!canSubmit}
			startIcon={<AddIcon />}
		>
			{isEditing ? 'Update Task' : 'Create Task'}
		</LoadingButton>
	)
}
