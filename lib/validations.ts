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

export type RegisterParams = Yup.InferType<typeof registerSchema>
