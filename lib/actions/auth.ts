'use server'

import { prisma } from '../prisma'
import { User } from '@prisma/client'
import { ActionResponse } from '../../types/types'
import bcrypt from 'bcrypt'
import { RegisterParams, registerSchema } from '../validations'
import { ValidationError } from 'yup'

const saltRounds = 10

export const register = async ({
	email,
	password,
	confirmPassword,
}: RegisterParams): ActionResponse<User> => {
	try {
		await registerSchema.validate({ email, password, confirmPassword })

		const existingUser = await prisma.user.findUnique({ where: { email } })
		if (existingUser) {
			return { success: false, error: 'Email already exists' }
		}

		const hashedPassword = await bcrypt.hash(password, saltRounds)
		const user = await prisma.user.create({ data: { email, password: hashedPassword } })
		return { success: true, data: user }
	} catch (error) {
		if (error instanceof ValidationError) {
			return { success: false, error: error.message }
		} else {
			return { success: false, error: `Something went wrong: ${error}` }
		}
	}
}
