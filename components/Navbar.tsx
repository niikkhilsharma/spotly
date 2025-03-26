'use client'
import { AlignJustify } from 'lucide-react'
import MaxWidthWrapper from './homepage/wrapper'
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

export default function Navbar() {
	const { scrollYProgress } = useScroll()
	const [isScrolled, setIsScrolled] = React.useState(false)

	useMotionValueEvent(scrollYProgress, 'change', scrollYProgress => {
		console.log(scrollYProgress > 0.03, scrollYProgress)
		setIsScrolled(scrollYProgress > 0.03)
	})

	return (
		<div
			className={cn(
				'w-full border-b h-20 sticky top-0 z-20 bg-white transition-all duration-150',
				isScrolled && 'shadow-md backdrop-blur-md'
			)}>
			<MaxWidthWrapper className="flex gap-4 items-center justify-between">
				<Link href={'/'}>
					<h1 className="text-4xl font-bold italic">Spotly</h1>
				</Link>
				<div>
					<h3 className="font-semibold">Homes</h3>
				</div>
				<div className="flex gap-2 items-center justify-start">
					<Link
						href={'/host/homes'}
						className={cn(buttonVariants({ variant: 'ghost' }), 'font-semibold text-sm rounded-full hover:cursor-pointer')}>
						Spotly your home
					</Link>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={'outline'} className={cn('flex h-12 gap-3 hover:cursor-pointer items-center rounded-full')}>
								<AlignJustify size={20} />
								<Avatar>
									<AvatarImage src="/assets/placeholder/profile.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="bottom" align="end" className="w-60">
							<DropdownMenuItem>Login</DropdownMenuItem>
							<DropdownMenuItem>Signup</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Spotly your house</DropdownMenuItem>
							<DropdownMenuItem>Help Center</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</MaxWidthWrapper>
		</div>
	)
}
