import * as Yup from 'yup'

export const loginSchema = Yup.object({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string().required('Password is required'),
})

export const registerSchema = loginSchema.concat(
	Yup.object({
		confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
	})
)

export const taskSchema = Yup.object({
	title: Yup.string().trim('Title cannot be empty').required('Title is required'),
	description: Yup.string(),
	priority: Yup.string()
		.oneOf(['High', 'Medium', 'Low'], 'Priority must be High/Medium/low')
		.required('Priority is required'),
})

export type RegisterParams = Yup.InferType<typeof registerSchema>
