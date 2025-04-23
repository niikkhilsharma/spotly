'use client'

import { useSession } from 'next-auth/react'
import { AlignJustify, Menu, X } from 'lucide-react'
import MaxWidthWrapper from './homepage/MaxWidthWrapper'
import { Button, buttonVariants } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import React, { useState } from 'react'
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
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
	}

	// Function to get relevant navigation links based on user role
	const getNavLinks = () => {
		if (!session?.user) return []
		if (session.user.role === 'SELLER') return hostLinks
		if (session.user.role === 'GUEST') return guestLinks
		if (session.user.role === 'ADMIN') return adminLink
		return []
	}

	const navLinks = getNavLinks()

	return (
		<div
			className={cn(
				'w-full border-b h-20 sticky top-0 z-20 bg-blur-2xl bg-white/80 transition-all duration-150',
				isScrolled && 'shadow-md backdrop-blur-md'
			)}>
			<MaxWidthWrapper className="flex items-center justify-between h-full">
				{/* Logo */}
				<Link href={'/'}>
					<h1 className="text-3xl md:text-4xl font-bold italic">Spotly</h1>
				</Link>

				{/* Desktop Navigation Links */}
				<div className="hidden md:block">
					{!session?.user && (
						<Link href={'/host/homes'} className={buttonVariants({ variant: 'link' })}>
							House Owner
						</Link>
					)}

					{navLinks.map(({ name, href }) => (
						<Link key={href} href={href} className={buttonVariants({ variant: 'link' })}>
							{name}
						</Link>
					))}
				</div>

				{/* Right Side Actions */}
				<div className="flex items-center gap-2">
					{/* Show "Home Setup" button on specific page */}
					{pathname === '/host/homes' ? (
						<Link
							href={'/host/login'}
							className={cn(buttonVariants({ variant: 'destructive' }), 'rounded-full text-sm md:text-base')}>
							Home Setup
						</Link>
					) : (
						<>
							{/* Mobile Menu Button */}
							<Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
								{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
							</Button>

							{/* User Menu */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant={'outline'}
										className={cn('flex gap-2 hover:cursor-pointer items-center', session?.user && 'rounded-full h-10 md:h-12')}>
										{session?.user ? (
											<>
												<AlignJustify className="hidden sm:block" size={18} />
												<Avatar className="h-8 w-8 md:h-10 md:w-10">
													<AvatarImage src="/assets/placeholder/profile.png" />
													<AvatarFallback>CN</AvatarFallback>
												</Avatar>
											</>
										) : (
											<>Login</>
										)}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent side="bottom" align="end" className="w-56 md:w-60">
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
						</>
					)}
				</div>
			</MaxWidthWrapper>

			{/* Mobile Navigation Menu */}
			{mobileMenuOpen && (
				<div className="fixed inset-x-0 top-20 bg-white shadow-lg border-b z-30 md:hidden">
					<div className="py-4 px-6 space-y-2">
						{!session?.user && (
							<Link
								href={'/host/homes'}
								className="block py-2 px-3 text-base font-medium hover:bg-gray-100 rounded-md"
								onClick={toggleMobileMenu}>
								Rent Property
							</Link>
						)}

						{navLinks.map(({ name, href }) => (
							<Link
								key={href}
								href={href}
								className="block py-2 px-3 text-base font-medium hover:bg-gray-100 rounded-md"
								onClick={toggleMobileMenu}>
								{name}
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
