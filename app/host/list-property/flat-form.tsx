import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChangeEvent, FormEvent, useState } from 'react'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface FlatData {
	bhk: string
	price: string
	state: string
	district: string
	landmark: string
	pincode: string
	title: string
	pictures: File[]
	nocDoc: File | null
	termsOfConditionsDoc: File | null
	video: File | null
	securityAmount: string
	amenities: string[]
}

export default function FlatForm() {
	const router = useRouter()
	const amenities = ['AC', 'Cooler', 'Refrigerator', 'Washing Machine']
	const [loading, setLoading] = useState(false)

	const [flatData, setFlatData] = useState<FlatData>({
		bhk: '',
		price: '',
		state: '',
		district: '',
		landmark: '',
		pincode: '',
		title: '',
		pictures: [],
		nocDoc: null,
		termsOfConditionsDoc: null,
		video: null,
		securityAmount: '',
		amenities: [],
	})

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
		key: keyof Pick<FlatData, 'pictures' | 'nocDoc' | 'termsOfConditionsDoc' | 'video'>
	) => {
		const files = e.target.files
		if (!files) return

		if (key === 'pictures') {
			const fileArray = Array.from(files)
			if (fileArray.length !== 5) {
				alert('Please upload exactly 5 images.')
				return
			}
			const allImages = fileArray.every(file => file.type.startsWith('image/'))
			if (!allImages) {
				alert('Only image files are allowed.')
				return
			}
			setFlatData(prev => ({ ...prev, pictures: fileArray }))
		} else {
			console.log(files[0])
			setFlatData(prev => ({ ...prev, [key]: files[0] }))
		}
	}

	const handleAmenityToggle = (item: string) => {
		setFlatData(prev => {
			const isSelected = prev.amenities.includes(item)
			return {
				...prev,
				amenities: isSelected ? prev.amenities.filter(i => i !== item) : [...prev.amenities, item],
			}
		})
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		if (flatData.pictures.length !== 5) {
			alert('Please upload exactly 5 images before submitting.')
			return
		}

		if (flatData.amenities.length === 0) {
			alert('Please select at least one amenity.')
			return
		}

		const formData = new FormData()
		formData.append('bhk', flatData.bhk)
		formData.append('price', flatData.price)
		formData.append('state', flatData.state)
		formData.append('district', flatData.district)
		formData.append('landmark', flatData.landmark)
		formData.append('pincode', flatData.pincode)
		formData.append('title', flatData.title)
		formData.append('securityAmount', flatData.securityAmount)

		flatData.pictures.forEach(picture => formData.append('pictures', picture))
		flatData.nocDoc && formData.append('nocDoc', flatData.nocDoc)
		flatData.termsOfConditionsDoc && formData.append('termsOfConditionsDoc', flatData.termsOfConditionsDoc)
		flatData.amenities.forEach(amenity => formData.append('amenities', amenity))
		flatData.video && formData.append('video', flatData.video)

		console.log('Flat Data:', flatData)

		const response = await axios.post('/api/host/list-property/flat', formData)
		const data = response.data
		console.log(data)
		setLoading(false)
		alert('submission success')
		router.push('/host/list-success')
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="max-w-screen-xl mx-auto bg-white shadow-sm rounded-2xl p-8 mt-10">
				<h1 className="text-center text-2xl font-bold text-gray-600 mb-6">Flat Listing Form</h1>

				{/* Property Type */}
				<div className="mb-6">
					<Label className="text-lg mb-2 block">What type of property do you want to list?</Label>
					<div className="flex gap-4 mt-2">
						{['1 BHK', '2 BHK', '3 BHK'].map(type => (
							<Button
								type="button"
								key={type}
								variant="outline"
								className={cn('hover:bg-gray-100 hover:cursor-pointer', flatData.bhk === type && 'bg-gray-100')}
								onClick={() => setFlatData({ ...flatData, bhk: type })}>
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
						<Input
							id="state"
							type="text"
							placeholder="Enter your state"
							value={flatData.state}
							onChange={e => setFlatData({ ...flatData, state: e.target.value })}
						/>
					</div>
					<div>
						<Label htmlFor="district">District</Label>
						<Input
							id="district"
							type="text"
							placeholder="Enter district"
							value={flatData.district}
							onChange={e => setFlatData({ ...flatData, district: e.target.value })}
						/>
					</div>
					<div>
						<Label htmlFor="landmark">Landmark</Label>
						<Input
							id="landmark"
							type="text"
							placeholder="Landmark"
							value={flatData.landmark}
							onChange={e => setFlatData({ ...flatData, landmark: e.target.value })}
						/>
					</div>
					<div>
						<Label htmlFor="pincode">Pincode</Label>
						<Input
							id="pincode"
							type="number"
							placeholder="Pincode"
							value={flatData.pincode}
							onChange={e => setFlatData({ ...flatData, pincode: e.target.value })}
						/>
					</div>
				</div>

				{/* Title */}
				<div className="mb-6">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						type="text"
						placeholder="Title of your listing"
						value={flatData.title}
						onChange={e => setFlatData({ ...flatData, title: e.target.value })}
					/>
				</div>

				{/* Upload Pictures */}
				<div className="mb-6">
					<Label htmlFor="pictures">Upload Exactly 5 Pictures</Label>
					<Input
						id="pictures"
						type="file"
						accept="image/*"
						multiple
						className="mt-2"
						onChange={e => handleFileChange(e, 'pictures')}
					/>
					<p className="text-sm text-gray-500 mt-1">Only image files allowed. Exactly 5 required.</p>
				</div>

				{/* NOC */}
				<div className="mb-6">
					<Label htmlFor="noc">Upload NOC</Label>
					<Input
						id="noc"
						type="file"
						className="mt-2"
						accept="application/pdf,image/*"
						onChange={e => handleFileChange(e, 'nocDoc')}
					/>
				</div>

				{/* Terms & Conditions */}
				<div className="mb-6">
					<Label htmlFor="terms">Terms and Conditions</Label>
					<Input
						id="terms"
						type="file"
						className="mt-2"
						accept="application/pdf,image/*"
						onChange={e => handleFileChange(e, 'termsOfConditionsDoc')}
					/>
				</div>

				{/* Security Amount */}
				<div className="mb-6">
					<Label htmlFor="security">Security Amount</Label>
					<Input
						id="security"
						type="number"
						placeholder="Enter security amount"
						value={flatData.securityAmount}
						onChange={e => setFlatData({ ...flatData, securityAmount: e.target.value })}
					/>
				</div>

				{/* Video Upload */}
				<div className="mb-6">
					<Label htmlFor="video">Optional Video Upload</Label>
					<Input id="video" type="file" className="mt-2" accept="video/*" onChange={e => handleFileChange(e, 'video')} />
				</div>

				{/* Amenities */}
				<div className="mb-8">
					<Label className="text-lg block mb-2">Select Amenities</Label>
					<div className="flex flex-wrap gap-3">
						{amenities.map((item, i) => (
							<Button
								key={i}
								type="button"
								variant="outline"
								className={cn('transition', flatData.amenities.includes(item) && 'bg-gray-200')}
								onClick={() => handleAmenityToggle(item)}>
								{item}
							</Button>
						))}
					</div>
				</div>

				{/* Submit */}
				<div className="text-center">
					<Button type="submit" className="px-8 py-3 text-lg" disabled={loading}>
						Submit
					</Button>
				</div>
			</div>
		</form>
	)
}
