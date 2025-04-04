import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import prisma from '@/lib/prisma/prisma'

export default {
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async credentials => {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Email and password are required')
				}

				console.log(credentials.email, credentials.password)

				// logic to verify if the user exists
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email as string,
					},
				})

				if (!user) {
					throw new Error('No user found with this email')
				}

				const isPasswordValid = await compare(credentials.password as string, user.password)

				if (!isPasswordValid) {
					throw new Error('Invalid password')
				}

				return {
					id: user.id,
					email: user.email,
					firstName: user.name,
					role: user.role,
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.image = user.image
				token.role = user.role
			}
			return token
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string
				session.user.image = token.image as string
				session.user.role = token.role as 'ADMIN' | 'SELLER' | 'GUEST'
			}
			return session
		},
	},
} satisfies NextAuthConfig
