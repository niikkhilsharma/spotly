import React from 'react'
import PropertyCard from './property-card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const listings = [
	{
		id: 1,
		imageUrl: '/assets/house1.png',
		title: 'Maple Drive Estate',
		location: 'New York',
		status: 'Sale',
		price: '$40',
		bedrooms: '2',
	},

	{
		id: 2,
		imageUrl: '/assets/house2.png',
		title: 'Maple Drive Estate',
		location: 'New York',
		status: 'Sale',
		price: '$40',
		bedrooms: '2',
	},
	{
		id: 3,
		imageUrl: '/assets/house6.png',
		title: 'Maple Drive Estate',
		location: 'New York',
		status: 'Sale',
		price: '$40',
		bedrooms: '2',
	},
	{
		id: 4,
		imageUrl: '/assets/house4.png',
		title: 'Maple Drive Estate',
		location: 'New York',
		status: 'Sale',
		bedrooms: '2',
		price: '$40',
	},
	{
		id: 5,
		imageUrl: '/assets/house5.png',
		title: 'Maple Drive Estate',
		location: 'New York',
		status: 'Sale',
		price: '$40',
		bedrooms: '2',
	},
	{
		id: 6,
		imageUrl: '/assets/house6.png',
		title: 'Maple Drive Estate',
		location: 'New York',
		status: 'Sale',
		price: '$40',
		bedrooms: '2',
	},
]

export default function Listings() {
	return (
		<div className=" my-28 space-y-8">
			{/* Header Section */}
			<div className="flex flex-col space-y-4  justify-center text-center items-center mb-8">
				<h1 className="text-3xl text-gray-800 font-bold">Our Exclusive Listings</h1>
				<p className="text-lg text-gray-500 max-w-[35ch]">
					Highlight premium listings to draw attention to the best properties available.
				</p>
			</div>
			<div className="flex justify-center items-center">
				<Tabs defaultValue="jaipur" className="">
					<TabsList className="p-6 rounded-2xl">
						<TabsTrigger
							className="rounded-2xl pl-0 p-4 data-[state=active]:bg-orange-600 data-[state=active]:text-white hover:cursor-pointer duration-[0]"
							value="jaipur">
							Jaipur
						</TabsTrigger>
						<TabsTrigger
							className="rounded-2xl pl-0 p-4 data-[state=active]:bg-orange-600 data-[state=active]:text-white hover:cursor-pointer duration-[0]"
							value="kota">
							Kota
						</TabsTrigger>
						<TabsTrigger
							className="rounded-2xl pl-0 p-4 data-[state=active]:bg-orange-600 data-[state=active]:text-white hover:cursor-pointer duration-[0]"
							value="gurugram">
							Gurugram
						</TabsTrigger>
						<TabsTrigger
							className="rounded-2xl pl-0 p-4 data-[state=active]:bg-orange-600 data-[state=active]:text-white hover:cursor-pointer duration-[0]"
							value="ajmer">
							Ajmer
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			{/* Cards Section */}
			<div className="grid mt-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{listings.map(listing => (
					<PropertyCard
						key={listing.id}
						status={listing.status}
						imageUrl={listing.imageUrl}
						title={listing.title}
						price={listing.price}
						location={listing.location}
						bedrooms={listing.bedrooms}
					/>
				))}
			</div>
		</div>
	)
}
