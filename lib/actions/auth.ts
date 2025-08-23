'use server'

import { prisma } from '../prisma'
import { User } from '@prisma/client'
import { ActionResponse } from '../types'
import bcrypt from 'bcrypt'

const saltRounds = 10

export const register = async (formData: FormData): ActionResponse<User> => {
  // Use formik and yup for validations later
	const email = formData.get('email') as string
	const password = formData.get('password') as string
	const confirmPassword = formData.get('confirm-password')

	console.log({ email, password, confirmPassword })
	if (!email || !password || !confirmPassword) {
		return { success: false, error: 'All fields are required' }
	} else if (password !== confirmPassword) {
		return { success: false, error: 'Passwords do not match' }
	}

	const existingUser = await prisma.user.findUnique({ where: { email } })
	if (existingUser) {
		return { success: false, error: 'Email already exists' }
	}

	const hashedPassword = await bcrypt.hash(password, saltRounds)
	const user = await prisma.user.create({ data: { email, password: hashedPassword } })
	console.log(user)
	return { success: true, data: user }
}

export const login = async (formData: FormData) => {
	return 'login!!'
}
