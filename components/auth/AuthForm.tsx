'use client'

import { login, register } from '@/lib/actions/auth'
import { signIn } from 'next-auth/react'
import {
	Box,
	Paper,
	Typography,
	TextField,
	Button,
	Stack,
	Alert,
	CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'

type Props = {
	mode: 'login' | 'register'
}

export default function AuthForm({ mode }: Props) {
	const [error, setError] = useState('')
	const isRegister = mode === 'register'
  const router = useRouter()

	const handleSubmit = async (formData: FormData) => {
		if (isRegister) {
			const response = await register(formData)
			console.log('register response', response)
		} else {
			const response = await signIn('credentials', {
				redirect: false,
				email: formData.get('email') as string,
				password: formData.get('password') as string,
			})
      if (!response?.ok) {
        setError(response?.error ?? 'Login failed')
      } else {
        router.push('/tasks')
      }

			console.log('signin response', response)
		}
	}

	return (
		<Paper
			component="form"
			action={handleSubmit}
			sx={{
				borderRadius: 2,
				backgroundImage: 'none',
				p: 4,
				maxWidth: 400,
				width: '100%',
				mx: 'auto',
			}}
		>
			<Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
				{isRegister ? 'Create Account' : 'Sign In'}
			</Typography>

			{error && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			<Stack spacing={3}>
				<TextField
					label="Email Address"
					// type="email"
					name="email"
					fullWidth
					variant="outlined"
				/>

				<TextField label="Password" type="password" name="password" fullWidth variant="outlined" />

				{isRegister && (
					<TextField
						label="Confirm Password"
						type="password"
						name="confirm-password"
						fullWidth
						variant="outlined"
					/>
				)}
			</Stack>

			<SubmitButton isRegister={isRegister} />

			<Box textAlign="center" mt={3}>
				<Typography variant="body2" color="text.secondary">
					{isRegister ? 'Already have an account?' : "Don't have an account?"}
				</Typography>
				<Button href={isRegister ? '/login' : '/register'} variant="text" sx={{ mt: 0.5 }}>
					{isRegister ? 'Sign In' : 'Create Account'}
				</Button>
			</Box>
		</Paper>
	)
}

function SubmitButton({ isRegister }: { isRegister: boolean }) {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, mt: 2, fontWeight: 'bold' }}>
			{pending ? (
				<CircularProgress size={24} thickness={5} color="inherit" />
			) : isRegister ? (
				'Create Account'
			) : (
				'Sign In'
			)}
		</Button>
	)
}
