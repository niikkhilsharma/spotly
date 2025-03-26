'use client'
import React from 'react'
import MaxWidthWrapper from '@/components/homepage/wrapper'
import { Dot, Search } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import List from '@/components/host/homes/list'
import FAQ from '@/components/host/homes/Faq'

export default function Host() {
	const [nights, setNights] = React.useState(17)
	const [nightChanging, setNightChanging] = React.useState(false)
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
	const pricePerNight = 500
	const totalPrice = nights * pricePerNight

	const handleValueChange = (value: number[]) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current) // Clear previous timeout
		}

		setNights(value[0]) // Update nights
		setNightChanging(true) // Show the changing state

		// Set a delay to reset nightChanging after user stops interacting
		timeoutRef.current = setTimeout(() => {
			setNightChanging(false)
		}, 500) // Adjust delay as needed
	}

	return (
		<MaxWidthWrapper className="">
			<div className="min-h-svh -mt-20 flex gap-4 items-center">
				<div className="w-1/2">
					<h1 className="text-6xl font-bold text-center">
						Your home could <br /> make ₹{totalPrice.toLocaleString()} <br /> on Spotly
					</h1>

					<div className="flex flex-col items-center justify-center mt-4">
						{nightChanging ? (
							<Badge variant="default" className="h-10 rounded-full px-4 text-lg mt-5 relative top-4">
								{nights} nights
							</Badge>
						) : (
							<>
								<div className="flex items-center justify-center mt-4 font-medium">
									<p className="underline">{nights} Nights</p>{' '}
									<span>
										<Dot size={16} />
									</span>{' '}
									₹2,224/night
								</div>
								<p className="text-sm text-primary/80 tracking-wide">
									Learn how we <span className="underline">estimate earnings</span>
								</p>
							</>
						)}
					</div>

					{/* Slider to change the number of nights */}
					<div className="max-w-96 mx-auto my-12">
						<Slider
							defaultValue={[17]}
							max={100}
							step={1}
							className="bg-destructive rounded-md"
							onValueChange={handleValueChange}
						/>
					</div>

					{/* Input to select the city */}

					<div className="w-full flex justify-center items-center">
						<Dialog>
							<DialogTrigger className="mx-auto rounded-full">
								<div className="h-16 rounded-full border w-96 flex items-center justify-start px-4 hover:shadow-sm hover:cursor-pointer">
									<Search />
									<p className="ml-4 font-semibold">Jaipur</p>
									<div className="text-foreground/80 text-sm tracking-wide flex gap-0 items-center">
										<Dot size={16} />
										<p>Entire Place</p>
										<Dot size={16} />
										<p>2 Bedrooms</p>
									</div>
								</div>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you absolutely sure?</DialogTitle>
									<DialogDescription>
										This action cannot be undone. This will permanently delete your account and remove your data from our servers.
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</div>
				</div>
				<div className="w-1/2">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28483.143940668873!2d75.8170132074063!3d26.827450005426307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db61c9f00bc3b%3A0x87ff828bc6df8eee!2sJagatpura%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1742964600443!5m2!1sen!2sin"
						width="600"
						height="450"
						style={{ border: 0, borderRadius: '0.5rem' }}
						// allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>

			<List />
			<FAQ />
		</MaxWidthWrapper>
	)
}
