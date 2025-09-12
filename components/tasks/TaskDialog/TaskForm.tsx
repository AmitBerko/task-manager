import React from 'react'
import {
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
	CircularProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { PriorityCircle } from '../../ui/PriorityCircle'
import { addTask, updateTask } from '@/lib/actions/tasks'
import { useDialog } from '@/contexts/DialogProvider'
import { FormikProps, useFormik } from 'formik'
import { TaskPayload } from '@/types/types'
import { taskSchema } from '@/lib/validations'
import { Priority } from '@prisma/client'
import { labels } from '@/config/labels'

export default function TaskForm() {
	const { dialogOptions, closeDialog } = useDialog()
	const isEditing = dialogOptions.mode === 'Edit'

	const formik = useFormik<TaskPayload>({
		initialValues: isEditing
			? {
					title: dialogOptions.task.title,
					description: dialogOptions.task.description ?? '',
					priority: dialogOptions.task.priority,
			  }
			: {
					title: '',
					description: '',
					priority: 'Medium',
			  },
		enableReinitialize: true,
		onSubmit: async ({ title, description, priority }) => {
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
		},
		validationSchema: taskSchema,
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<DialogContent sx={{ px: 3 }}>
				<Stack spacing={3}>
					<TaskFormTextfield name="title" label="Task Title" formik={formik} />
					<TaskFormTextfield name="description" label="Description (Optional)" formik={formik} />
					<SelectPriority formik={formik} />
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
					{isEditing ? labels.tasks.updateTask : labels.tasks.createTask}
				</Button>
			</DialogActions>
		</form>
	)
}

type TaskFormTextFieldProps = {
	name: keyof TaskPayload
	label: string
	formik: FormikProps<TaskPayload>
}

function TaskFormTextfield({ name, label, formik }: TaskFormTextFieldProps) {
	return (
		<TextField
			fullWidth
			variant="outlined"
			label={label}
			name={name}
			value={formik.values[name]}
			error={formik.touched[name] && Boolean(formik.errors[name])}
			helperText={formik.touched[name] && formik.errors[name]}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
		/>
	)
}

function SelectPriority({ formik }: { formik: FormikProps<TaskPayload> }) {
	return (
		<FormControl fullWidth>
			<InputLabel>Priority Level</InputLabel>
			<Select
				name="priority"
				value={formik.values.priority}
				label="Priority Level"
				onChange={formik.handleChange}
			>
				{Object.values(Priority).map((priority, index) => (
					<MenuItem value={priority} key={index}>
						<Box display="flex" alignItems="center" gap={1}>
							<PriorityCircle priority={priority} />
							<Typography>{priority} Priority</Typography>
						</Box>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
