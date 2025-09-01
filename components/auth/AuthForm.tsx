'use client'

import React from 'react'
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import { loginSchema, registerSchema } from '@/lib/validations'
import { register } from '@/lib/actions/auth'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Wrapper } from '../ui/Wrapper'
import Link from 'next/link'

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
			console.log('testtttt', values)
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

				// Login right after registering
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
			{/* Header */}
			<Box sx={{ textAlign: 'center', mb: 4 }}>
				<Typography
					variant="h4"
					sx={{
						fontWeight: 'bold',
						mb: 1,
						fontSize: { xs: '1.65rem', sm: '1.9rem' },
					}}
				>
					Task Manager
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: 'text.secondary',
						fontSize: '0.9rem',
					}}
				>
					{isLogin ? 'Sign in' : 'Register'} to track your tasks
				</Typography>
			</Box>

			{/* Form */}
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
					{isLogin ? 'Sign in' : 'Create account'}
				</Button>
			</Box>

			<Box
				sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
			>
				<Typography
					variant="body2"
					sx={{
						color: 'text.secondary',
						fontSize: '0.85rem',
					}}
				>
					{isLogin ? "Don't have an account? " : 'Already have an account? '}
					<Link style={{ textDecoration: 'none' }} href={isLogin ? '/register' : '/login'}>
						<Typography
							component="span"
							sx={{
								color: 'primary.main',
								textDecoration: 'none',
								fontWeight: 'bold',
								'&:hover': { textDecoration: 'underline' },
							}}
						>
							{isLogin ? 'Sign up' : 'Sign in'}
						</Typography>
					</Link>
				</Typography>
			</Box>
		</Wrapper>
	)
}
