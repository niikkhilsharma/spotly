'use client'

import MaxWidthWrapper from '@/components/homepage/MaxWidthWrapper'
import { useState } from 'react'
import FlatForm from './flat-form'
import MarriageGardenForm from './marriage-garden-form'
import RestaurantForm from './restaurant-form'

export default function ListPropertyPage() {
	const [selectedProperty, setSelectedProperty] = useState<'Flat' | 'Marriage Garden' | 'Restaurant'>()

	return (
		<MaxWidthWrapper>
			<h1 className="text-3xl font-bold text-center">List Property</h1>
			<h1 className="text-2xl font-semibold mt-10">What kind of property do you want to list?</h1>
			<div className="flex gap-4 mt-4">
				<div
					className="border p-4 rounded-md w-44 h-20 flex justify-center items-center text-center hover:bg-foreground/10 hover:cursor-pointer"
					onClick={() => setSelectedProperty('Flat')}>
					Flat
				</div>
				<div
					className="border p-4 rounded-md w-44 h-20 flex justify-center items-center text-center hover:bg-foreground/10 hover:cursor-pointer"
					onClick={() => setSelectedProperty('Marriage Garden')}>
					Marriage Garden
				</div>
				<div
					className="border p-4 rounded-md w-44 h-20 flex justify-center items-center text-center hover:bg-foreground/10 hover:cursor-pointer"
					onClick={() => setSelectedProperty('Restaurant')}>
					Restaurant
				</div>
			</div>

			{selectedProperty && (
				<div className="border py-4 mt-10">
					{selectedProperty === 'Flat' && <FlatForm />}
					{selectedProperty === 'Marriage Garden' && <MarriageGardenForm />}
					{selectedProperty === 'Restaurant' && <RestaurantForm />}
				</div>
			)}
		</MaxWidthWrapper>
	)
}
