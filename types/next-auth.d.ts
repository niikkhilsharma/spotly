import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			name: string
			email: string
			role: 'ADMIN' | 'SELLER' | 'GUEST'
			image?: string | null
		} & DefaultSession['user']
	}
	interface User {
		name: string
		email: string
		role: 'ADMIN' | 'SELLER' | 'GUEST'
		image?: string | null
	}
}
