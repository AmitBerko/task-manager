import React, { useState, useEffect } from 'react'
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
import { Priority, Task } from '@/lib/types'
import { useTasks } from '@/contexts/TasksProvider'
import { PriorityCircle } from '../common/PriorityCircle'

type Props = {
	open: boolean
	onClose: () => void
	taskToEdit: Task | null
}

export default function TaskDialog({ open, onClose, taskToEdit }: Props) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [priority, setPriority] = useState<Priority>('Medium')

	const { addTask, updateTask } = useTasks()

	const isEditing = !!taskToEdit
	const canSubmit = !!title.trim()

	useEffect(() => {
		if (!open) return

		if (isEditing) {
			// Edit
			setTitle(taskToEdit.title)
			setDescription(taskToEdit.description)
			setPriority(taskToEdit.priority)
		} else {
			// Add
			setTitle('')
			setDescription('')
			setPriority('Medium')
		}
	}, [open, isEditing])

	const handleSubmit = () => {
		if (isEditing) {
			// Edit existing task
			updateTask(taskToEdit.id, {
				title,
				description,
				priority,
			})
		} else {
			// Add new task
			addTask({
				title,
				description,
				priority,
			})
		}

		handleClose()
	}

	const handleClose = () => {
		// Reset form
		setTitle('')
		setDescription('')
		setPriority('Medium')
		onClose()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
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
				<IconButton onClick={handleClose} size="small">
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
					onClick={handleClose}
					variant="outlined"
					color="inherit"
					sx={{
						borderColor: 'divider',
					}}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit}
					variant="contained"
					disabled={!canSubmit}
					startIcon={<AddIcon />}
				>
					{isEditing ? 'Update' : 'Create'} Task
				</Button>
			</DialogActions>
		</Dialog>
	)
}
