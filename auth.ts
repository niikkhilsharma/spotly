import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import prisma from '@/lib/prisma/prisma'
import authConfig from '@/auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma) as any,
	...authConfig,
	session: {
		strategy: 'jwt',
	},
})
