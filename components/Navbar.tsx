'use client'

import { useSession } from 'next-auth/react'
import { AlignJustify } from 'lucide-react'
import MaxWidthWrapper from './homepage/MaxWidthWrapper'
import { Button, buttonVariants } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import SignOut from './auth/sign-out'

export default function Navbar() {
	const { data: session } = useSession()
	const pathname = usePathname()
	const { scrollYProgress } = useScroll()
	const [isScrolled, setIsScrolled] = React.useState(false)

	useMotionValueEvent(scrollYProgress, 'change', scrollYProgress => {
		setIsScrolled(scrollYProgress > 0.03)
	})

	const hostLinks = [
		{ name: 'Home', href: '/host/homes' },
		{ name: 'View Property', href: '/host/center' },
		{ name: 'Sell Property', href: '/host/list-property' },
	]
	const guestLinks = [{ name: 'All Properties', href: '/buyer/properties' }]
	const adminLink = [{ name: 'Admin Dashboard', href: '/admin/dashboard' }]

	return (
		<div
			className={cn(
				'w-full border-b h-20 sticky top-0 z-20 bg-blur-2xl bg-white/80 transition-all duration-150',
				isScrolled && 'shadow-md backdrop-blur-md'
			)}>
			<MaxWidthWrapper className="flex gap-4 items-center justify-between">
				<Link href={'/'}>
					<h1 className="text-4xl font-bold italic">Spotly</h1>
				</Link>
				<div>
					{!session?.user && (
						<Link href={'/host/homes'} className={buttonVariants({ variant: 'link' })}>
							Rent Propery
						</Link>
					)}

					{session?.user.role === 'SELLER' &&
						hostLinks.map(({ name, href }) => (
							<Link key={href} href={href} className={buttonVariants({ variant: 'link' })}>
								{name}
							</Link>
						))}

					{session?.user.role === 'GUEST' &&
						guestLinks.map(({ name, href }) => (
							<Link key={href} href={href} className={buttonVariants({ variant: 'link' })}>
								{name}
							</Link>
						))}

					{session?.user.role === 'ADMIN' &&
						adminLink.map(({ name, href }) => (
							<Link key={href} href={href} className={buttonVariants({ variant: 'link' })}>
								{name}
							</Link>
						))}
				</div>
				{pathname === '/host/homes' ? (
					<div>
						<Link href={'/host/login'} className={cn(buttonVariants({ variant: 'destructive' }), 'rounded-full')}>
							Home Setup
						</Link>
					</div>
				) : (
					<div className="flex gap-2 items-center justify-start">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant={'outline'}
									className={cn('flex gap-3 hover:cursor-pointer items-center', session?.user && 'rounded-full h-12')}>
									{session?.user ? (
										<>
											<AlignJustify size={20} />
											<Avatar>
												<AvatarImage src="/assets/placeholder/profile.png" />
												<AvatarFallback>CN</AvatarFallback>
											</Avatar>
										</>
									) : (
										<>Login</>
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="bottom" align="end" className="w-60">
								<DropdownMenuLabel className="px-2 font-semibold">Seller Auth</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link href={'/host/login'} className="w-full h-full">
										Login
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href={'/host/signup'} className="w-full h-full">
										Signup
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuLabel className="px-2 font-semibold">Buyer Auth</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link href={'/buyer/login'} className="w-full h-full">
										Login
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href={'/buyer/signup'} className="w-full h-full">
										Signup
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuLabel className="px-2 font-semibold">Admin Auth</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link href={'/admin/login'} className="w-full h-full">
										Login
									</Link>
								</DropdownMenuItem>
								{/* <DropdownMenuItem>
									<Link href={'/admin/signup'} className="w-full h-full">
										Signup
									</Link>
								</DropdownMenuItem> */}
								{session?.user && (
									<>
										<DropdownMenuSeparator />
										<DropdownMenuLabel className="px-2 font-semibold">Others</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<SignOut isLink={true} />
									</>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
			</MaxWidthWrapper>
		</div>
	)
}
