import Image from 'next/image'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Separator } from '../ui/separator'

export default function Footer() {
	return (
		<div>
			<MaxWidthWrapper className="bg-white text-black ">
				{/* Hero Section */}
				<div className="relative w-full h-[600px] bg-black mx-auto rounded-3xl overflow-hidden text-white">
					<Image
						width={360}
						quality={100}
						height={278}
						src="/assets/footerbg.png"
						alt="Property Background"
						className="absolute inset-0 w-full h-full object-cover opacity-30"
					/>
					<div className="relative z-10 flex flex-col items-center space-y-4 justify-center h-full text-center px-4">
						<h1 className="text-3xl md:text-4xl font-medium">
							Find your perfect space, <br /> create unforgettable moments
						</h1>
						<div className="my-4 text-lg">
							<h4 className="max-w-[70ch] font-normal">
								It’s more than just a booking – it’s where memories are made. From grand weddings to lively parties and cozy
								gatherings, every event is a chance to celebrate life.
							</h4>
						</div>
						<button className="group mt-4 bg-orange-500 text-xl text-white px-6 py-3 rounded-full hover:bg-orange-600 hover:cursor-pointer transition duration-300">
							Book your venue
							<span className="transform inline-block ml-2 transition duration-300 group-hover:translate-x-2 group-hover:scale-125 group-hover:font-bold">
								→
							</span>
						</button>
					</div>
				</div>

				{/* Footer Links Section */}
				<div className=" mx-4 px-4 py-10 flex justify-between items-center gap-6">
					{/* Company Info */}
					<div className="max-w-[55ch]">
						<h2 className="text-2xl font-semibold">Spotly</h2>
						<div className="text-base mt-2 ">
							<span className="text-orange-500 font-medium">Spotly</span> is a leading platform for booking and managing properties,
							transforming the way people find and book spaces for living and celebrations through innovative design and technology.
							For buyers and sellers, we simplify the process by helping you find the right property, handling negotiations, and
							ensuring a smooth transaction. . From budget-friendly rentals to premium venues for events,{' '}
							<span className="text-orange-500 font-medium">Spotly</span> has something for everyone—your perfect space is just a
							step away. <br />
							<h2 className="mt-5">
								{' '}
								<span className="tetx-lg font-medium "> Popular Locations:</span> Jaipur | Delhi | Mumbai | Hyderabad | Pune | Noida
								| Gurugram | Bangalore | Indore | Thane
							</h2>
						</div>
						<p className="text-base mt-1">+1 646-598-7983</p>
						<div className="flex space-x-4 mt-4">
							<a href="#" aria-label="Facebook" className="hover:text-gray-500">
								🔵
							</a>
							<a href="#" aria-label="Twitter" className="hover:text-gray-500">
								🐦
							</a>
							<a href="#" aria-label="LinkedIn" className="hover:text-gray-500">
								🔗
							</a>
						</div>
					</div>

					{/* Page Links */}
					<div>
						<h3 className="text-2xl font-semibold">Pages</h3>
						<ul className="mt-2 space-y-2">
							<li>
								<a href="#" className="hover:text-gray-500">
									Bookings
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									Blog
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									Contact Us
								</a>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h3 className="text-2xl font-semibold">Resources</h3>
						<ul className="mt-2 space-y-2">
							<li>
								<a href="#" className="hover:text-gray-500">
									List Your Property
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									How It Works
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									Pricing
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									Secure Payments
								</a>
							</li>
						</ul>
					</div>

					{/* Popular Locations */}
					<div>
						<h3 className="text-2xl font-semibold">Popular Locations</h3>
						<ul className="mt-2 space-y-2">
							<li>
								<a href="#" className="hover:text-gray-500">
									Jaipur
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									Delhi
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									Mumbai
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									Hyderabad
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-gray-500">
									Pune
								</a>
							</li>
						</ul>
					</div>
				</div>
			</MaxWidthWrapper>

			{/* Bottom Footer */}
			<Separator />
			<MaxWidthWrapper>
				<div className="py-8 text-center text-sm">
					&copy; Copyright 2024 &nbsp; | &nbsp;
					<a href="#" className="hover:text-gray-500">
						Privacy Policy
					</a>{' '}
					&nbsp; | &nbsp;
					<a href="#" className="hover:text-gray-500">
						Terms & Conditions
					</a>{' '}
					&nbsp; | &nbsp;
					<a href="#" className="hover:text-gray-500">
						Partner Agreement
					</a>
				</div>
			</MaxWidthWrapper>
		</div>
	)
}
