import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function FlatForm() {
	const amenities = ['AC', 'Cooler', 'Refrigerator', 'Washing Machine']

	const [flatData, setFlatData] = useState({
		bhk: '',
		price: '',
		state: '',
		district: '',
		landmark: '',
		title: '',
		pictures: [],
		nocDoc: '',
		termsOfConditionsDoc: '',
		securityAmount: '',
		amenities: [],
	})

	return (
		<div className="max-w-screen-xl mx-auto bg-white shadow-sm rounded-2xl p-8 mt-10">
			<h1 className="text-center text-2xl font-bold text-gray-600 mb-6">Flat Listing Form</h1>

			{/* Property Type */}
			<div className="mb-6">
				<Label className="text-lg mb-2 block">What type of property do you want to list?</Label>
				<div className="flex gap-4 mt-2">
					{['1 BHK', '2 BHK', '3 BHK'].map(type => (
						<Button
							key={type}
							variant="outline"
							className={cn('hover:bg-gray-100 hover:cursor-pointer', flatData.bhk === type && 'bg-gray-100')}
							onClick={() => {
								setFlatData({ ...flatData, bhk: type })
							}}>
							{type}
						</Button>
					))}
				</div>
			</div>

			{/* Price */}
			<div className="mb-6">
				<Label htmlFor="price" className="text-lg block mb-2">
					Price
				</Label>
				<Input
					id="price"
					type="number"
					placeholder="Enter price"
					value={flatData.price}
					onChange={e => setFlatData({ ...flatData, price: e.target.value })}
				/>
			</div>

			{/* Address Section */}
			<div className="mb-6 space-y-4">
				<Label className="text-xl block font-semibold text-gray-700">Address</Label>
				<div>
					<Label htmlFor="state">State</Label>
					<Input id="state" type="text" placeholder="Enter your state" />
				</div>
				<div>
					<Label htmlFor="district">District</Label>
					<Input id="district" type="text" placeholder="Enter district" />
				</div>
				<div>
					<Label htmlFor="landmark">Landmark</Label>
					<Input id="landmark" type="text" placeholder="Landmark" />
				</div>
				<div>
					<Label htmlFor="pincode">Pincode</Label>
					<Input id="pincode" type="number" placeholder="Pincode" />
				</div>
			</div>

			{/* Title */}
			<div className="mb-6">
				<Label htmlFor="title">Title</Label>
				<Input id="title" type="text" placeholder="Title of your listing" />
			</div>

			{/* File Uploads */}
			<div className="mb-6">
				<Label htmlFor="pictures">Upload Pictures</Label>
				<Input className="mt-2" id="pictures" type="file" multiple />
			</div>
			<div className="mb-6">
				<Label htmlFor="noc">Upload NOC</Label>
				<Input className="mt-2" id="noc" type="file" />
			</div>
			<div className="mb-6">
				<Label htmlFor="terms">Terms and Conditions</Label>
				<Input className="mt-2" id="terms" type="file" />
			</div>

			{/* Security Amount */}
			<div className="mb-6">
				<Label htmlFor="security" className="mb-3">
					Security Amount
				</Label>
				<Input id="security" type="number" placeholder="Enter security amount" />
			</div>

			{/* Amenities */}
			<div className="mb-8">
				<Label className="text-lg block mb-2">Select Amenities</Label>
				<div className="flex flex-wrap gap-3">
					{amenities.map((item, i) => (
						<Button key={i} variant="outline" className="hover:bg-gray-100 transition">
							{item}
						</Button>
					))}
				</div>
			</div>

			{/* Submit Button */}
			<div className="text-center">
				<Button className="px-8 py-3 text-lg">Submit</Button>
			</div>
		</div>
	)
}
