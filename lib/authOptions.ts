import { prisma } from '@/lib/prisma'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Missing email or password')
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				})

				if (!user) {
					throw new Error('No user found with this email')
				}

				const isValid = await bcrypt.compare(credentials.password, user.password)
				if (!isValid) {
					throw new Error('Invalid password')
				}

				return { id: user.id, email: user.email }
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ user, token }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id
			}
			return session
		},
	},
}
