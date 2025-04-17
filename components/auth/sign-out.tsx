'use client'
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

export default function SignOut({ isLink }: { isLink?: boolean }) {
	return (
		<div>
			{isLink ? (
				<Button
					className="hover:no-underline hover:cursor-pointer hover:bg-secondary w-full h-8 font-normal flex justify-start items-center pl-2 text-sm"
					variant={'link'}
					onClick={() => signOut({ redirectTo: '/' })}>
					Log Out
				</Button>
			) : (
				<Button className="my-2" onClick={() => signOut({ redirectTo: '/' })}>
					Log Out
				</Button>
			)}
		</div>
	)
}
