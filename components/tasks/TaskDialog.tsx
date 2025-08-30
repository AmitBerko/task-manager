import React from 'react'
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
	CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { PriorityCircle } from '../common/PriorityCircle'
import { addTask, updateTask } from '@/lib/actions/tasks'
import { useDialog } from '@/contexts/DialogProvider'
import { useFormik } from 'formik'
import { TaskPayload } from '@/types/types'
import { taskSchema } from '@/lib/validations'

export default function TaskDialog() {
	const { isDialogOpen, dialogOptions, closeDialog } = useDialog()
	const isEditing = dialogOptions.mode === 'Edit'

	const formik = useFormik<TaskPayload>({
		initialValues: {
			title: '',
			description: '',
			priority: 'Medium',
		},
		onSubmit: async ({ title, description, priority }) => {
			if (isEditing) {
				const response = await updateTask({
					taskId: dialogOptions.task.id,
					title,
					description,
					priority,
				})

				if (response.success) {
					console.log('Added task: ', response.data)
				} else {
					console.log('Error is: ', response.error)
				}
			} else {
				const response = await addTask({
					title,
					description,
					priority,
				})
				if (response.success) {
					console.log('Updated task: ', response.data)
				} else {
					console.log('Error is: ', response.error)
				}
			}

			closeDialog()
		},
		validationSchema: taskSchema,
	})

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
			<form onSubmit={formik.handleSubmit}>
				<DialogContent sx={{ px: 3 }}>
					<Stack spacing={3}>
						<TextField
							fullWidth
							variant="outlined"
							label="Task Title"
							name="title"
							value={formik.values.title}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						<TextField
							fullWidth
							variant="outlined"
							label="Description (Optional)"
							name="description"
							value={formik.values.description}
							error={formik.touched.description && Boolean(formik.errors.description)}
							helperText={formik.touched.description && formik.errors.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						<FormControl fullWidth>
							<InputLabel>Priority Level</InputLabel>
							<Select
								name="priority"
								value={formik.values.priority}
								label="Priority Level"
								onChange={formik.handleChange}
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
					<Button
						startIcon={<AddIcon />}
						loading={formik.isSubmitting}
						loadingIndicator={<CircularProgress size={23} thickness={4.5} color="inherit" />}
						type="submit"
						variant="contained"
						disabled={!formik.isValid || formik.isSubmitting}
						fullWidth
						color="primary"
						sx={{
							width: '150px',
						}}
					>
						{isEditing ? 'Update Task' : 'Create Task'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}
