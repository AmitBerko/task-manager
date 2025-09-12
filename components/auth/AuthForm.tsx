'use client'

import React from 'react'
import { Box, TextField, Button, CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import { loginSchema, registerSchema } from '@/lib/validations'
import { register } from '@/lib/actions/auth'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Wrapper } from '../ui/Wrapper'
import Header from './Header'
import Footer from './Footer'
import { labels } from '@/config/labels'

type Props = {
	mode: 'login' | 'register'
}

export default function AuthForm({ mode }: Props) {
	const router = useRouter()
	const isLogin = mode === 'login'

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		onSubmit: async (values, { setErrors }) => {
			if (isLogin) {
				const { email, password } = values
				const response = await signIn('credentials', {
					redirect: false,
					email,
					password,
				})
				if (response?.error) {
					setErrors({ password: response.error })
					return
				}
				router.push('/tasks')
			} else {
				const response = await register(values)
				if (!response.success) {
					setErrors({ email: response.error })
					return
				}
				const { email, confirmPassword, password } = values

				const loginResponse = await signIn('credentials', {
					redirect: false,
					email,
					password,
					confirmPassword,
				})
				if (loginResponse?.error) {
					setErrors({ password: loginResponse.error })
					return
				}
				router.push('/tasks')
			}
		},
		validationSchema: isLogin ? loginSchema : registerSchema,
	})

	return (
		<Wrapper
			sx={{
				flexDirection: 'column',
				maxWidth: '435px',
				p: { xs: 3, sm: 4 },
				boxShadow: (theme) =>
					`0 20px 40px rgba(0, 0, 0, ${theme.palette.mode === 'dark' ? '0.4' : '0.1'})`,
			}}
		>
			<Header isLogin={isLogin} />

			<Box
				component="form"
				onSubmit={formik.handleSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2.5,
				}}
			>
				<TextField
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
					variant="outlined"
					name="email"
					label="Email"
					type="email"
					fullWidth
				/>

				<TextField
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
					variant="outlined"
					name="password"
					label="Password"
					type="password"
					fullWidth
				/>

				{!isLogin && (
					<TextField
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
						helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
						variant="outlined"
						name="confirmPassword"
						label="Confirm password"
						type="password"
						fullWidth
					/>
				)}

				<Button
					loading={formik.isSubmitting}
					loadingIndicator={<CircularProgress size={25} thickness={4.5} color="inherit" />}
					type="submit"
					variant="contained"
					disabled={!formik.isValid || formik.isSubmitting}
					fullWidth
					color="primary"
					sx={{
						py: 1.5,
						fontSize: '1rem',
						fontWeight: 'bold',
						textTransform: 'none',
						mt: 1,
					}}
				>
					{isLogin ? labels.authForm.signIn : labels.authForm.register}
				</Button>
			</Box>

			<Footer isLogin={isLogin} />
		</Wrapper>
	)
}
