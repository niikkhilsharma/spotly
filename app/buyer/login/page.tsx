import { LoginForm } from './login-form'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { auth } from '@/auth'
import SignOut from '@/components/auth/sign-out'

export default async function LoginPage() {
	const session = await auth()
	const user = session?.user

	if (user) {
		return (
			<div className="min-h-screen flex justify-center items-center font-semibold flex-col">
				You are already Logged In
				<SignOut />
			</div>
		)
	}

	return (
		<div className="container flex min-h-screen flex-col items-center justify-center mx-auto">
			<div className="mx-auto w-full max-w-md space-y-6">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">Buyer Login</h1>
					<p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
				</div>

				<LoginForm />
				<Link href={'/forgot-password'} className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>
					Forgot Password
				</Link>
			</div>
		</div>
	)
}
