import React, { useEffect, useState } from 'react'
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
import { PriorityCircle } from './TaskItem'

type Props = {
	open: boolean
	onClose: () => void
	onAdd: (task: Omit<Task, 'createdAt' | 'id'>) => void
	onEdit: (task: Task) => void
	taskToEdit?: Task
}

export default function TaskDialog({ open, onClose, onAdd, onEdit, taskToEdit }: Props) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [priority, setPriority] = useState<Priority>('Medium')

	useEffect(() => {
		if (taskToEdit) {
			setTitle(taskToEdit.title)
			setDescription(taskToEdit.description)
			setPriority(taskToEdit.priority)
		} else {
			setTitle('')
			setDescription('')
			setPriority('Medium')
		}
	}, [taskToEdit])

	const handleAdd = () => {
		if (title.trim()) {
			onAdd({
				title: title.trim(),
				description: description.trim(),
				priority,
			})
			// Reset form
			setTitle('')
			setDescription('')
			setPriority('Medium')
			onClose()
		}
	}

	const handleEdit = () => {
		if (title.trim() && taskToEdit && taskToEdit.id && taskToEdit.createdAt) {
			onEdit({
				id: taskToEdit.id,
				createdAt: taskToEdit.createdAt,
				title: title.trim(),
				description: description.trim(),
				priority,
			})

			// Reset form
			setTitle('')
			setDescription('')
			setPriority('Medium')
			onClose()
		}
	}

	const handleClose = () => {
		// Reset form on close
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
					{taskToEdit ? 'Edit Task' : 'Create New Task'}
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
					onClick={taskToEdit ? handleEdit : handleAdd}
					variant="contained"
					disabled={!title.trim()}
					startIcon={<AddIcon />}
				>
					{taskToEdit ? 'Edit' : 'Create'} Task
				</Button>
			</DialogActions>
		</Dialog>
	)
}
