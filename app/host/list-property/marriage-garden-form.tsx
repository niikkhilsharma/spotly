'use client'
import { useRouter } from 'next/navigation'
import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'lucide-react'

interface GardenData {
	propertyType: string
	state: string
	district: string
	landmark: string
	pincode: string
	propertyDocuments: File | null
	hostingFacilities: string[]
	contact: string
	noc: File | null
	fireCert: File | null
	fssaiCert: File | null
	marriageNoc: File | null
	venueImages: File[]
}

export default function MarriageGardenForm() {
	const router = useRouter()
	const allFacilities = ['Music system', 'DJ', 'Sound box', 'LED TV']
	const [uploading, setUploading] = useState(false)
	const [previewImages, setPreviewImages] = useState<string[]>([])

	const [gardenData, setGardenData] = useState<GardenData>({
		propertyType: '',
		state: '',
		district: '',
		landmark: '',
		pincode: '',
		propertyDocuments: null,
		hostingFacilities: [],
		contact: '',
		noc: null,
		fireCert: null,
		fssaiCert: null,
		marriageNoc: null,
		venueImages: [],
	})

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: keyof GardenData) => {
		const file = e.target.files?.[0]
		if (!file) return
		setGardenData(prev => ({ ...prev, [key]: file }))
	}

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files) return

		// Limit to 5 images total
		const remainingSlots = 5 - gardenData.venueImages.length
		const filesToAdd = Array.from(files).slice(0, remainingSlots)

		if (filesToAdd.length === 0) return

		// Create preview URLs for the new images
		const newPreviews = filesToAdd.map(file => URL.createObjectURL(file))
		setPreviewImages(prev => [...prev, ...newPreviews])

		// Add the new files to the state
		setGardenData(prev => ({
			...prev,
			venueImages: [...prev.venueImages, ...filesToAdd],
		}))
	}

	const removeImage = (index: number) => {
		// Remove the image from the state
		const updatedImages = [...gardenData.venueImages]
		updatedImages.splice(index, 1)

		// Revoke the URL to prevent memory leaks
		URL.revokeObjectURL(previewImages[index])

		// Remove the preview
		const updatedPreviews = [...previewImages]
		updatedPreviews.splice(index, 1)

		setGardenData(prev => ({
			...prev,
			venueImages: updatedImages,
		}))
		setPreviewImages(updatedPreviews)
	}

	const handleFacilityToggle = (facility: string) => {
		setGardenData(prev => {
			const isSelected = prev.hostingFacilities.includes(facility)
			return {
				...prev,
				hostingFacilities: isSelected
					? prev.hostingFacilities.filter(f => f !== facility)
					: [...prev.hostingFacilities, facility],
			}
		})
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!gardenData.propertyDocuments) {
			alert('Please upload property documents.')
			return
		}

		if (gardenData.hostingFacilities.length === 0) {
			alert('Please select at least one hosting facility.')
			return
		}

		if (gardenData.venueImages.length === 0) {
			alert('Please upload at least one venue image.')
			return
		}

		const formData = new FormData()
		formData.append('propertyType', gardenData.propertyType)
		formData.append('state', gardenData.state)
		formData.append('district', gardenData.district)
		formData.append('landmark', gardenData.landmark)
		formData.append('pincode', gardenData.pincode)
		formData.append('contact', gardenData.contact)

		formData.append('propertyDocuments', gardenData.propertyDocuments)
		gardenData.noc && formData.append('noc', gardenData.noc)
		gardenData.fireCert && formData.append('fireCert', gardenData.fireCert)
		gardenData.fssaiCert && formData.append('fssaiCert', gardenData.fssaiCert)
		gardenData.marriageNoc && formData.append('marriageNoc', gardenData.marriageNoc)
		gardenData.hostingFacilities.forEach(facility => formData.append('hostingFacilities', facility))

		// Append venue images
		gardenData.venueImages.forEach(image => {
			formData.append('venueImages', image)
		})

		try {
			setUploading(true)
			const response = await axios.post('/api/host/list-property/marriage-garden', formData)
			console.log(response.data)
			alert('Form submitted successfully!')
			router.push('/host/list-success')
		} catch (error) {
			console.error('Error submitting form:', error)
			alert('Failed to submit form. Please try again.')
		}
		setUploading(false)
	}

	return (
		<div className="max-w-screen-xl mx-auto bg-white shadow-sm rounded-2xl p-8 mt-10">
			<h2 className="text-2xl font-semibold mb-4">Marriage Garden Form</h2>
			<form className="space-y-4" onSubmit={handleSubmit}>
				{/* Property Type */}
				<div>
					<Label className="mb-2">Garden Property Type</Label>
					<Select onValueChange={value => setGardenData(prev => ({ ...prev, propertyType: value }))}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select Type" />
						</SelectTrigger>
						<SelectContent>
							{['Type A', 'Type B', 'Type C', 'Type D'].map(type => (
								<SelectItem key={type} value={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Address */}
				<div className="mb-6 space-y-4">
					<Label className="text-xl block font-semibold text-gray-700">Address</Label>
					<Input
						placeholder="State"
						value={gardenData.state}
						onChange={e => setGardenData({ ...gardenData, state: e.target.value })}
					/>
					<Input
						placeholder="District"
						value={gardenData.district}
						onChange={e => setGardenData({ ...gardenData, district: e.target.value })}
					/>
					<Input
						placeholder="Landmark"
						value={gardenData.landmark}
						onChange={e => setGardenData({ ...gardenData, landmark: e.target.value })}
					/>
					<Input
						placeholder="Pincode"
						type="number"
						value={gardenData.pincode}
						onChange={e => setGardenData({ ...gardenData, pincode: e.target.value })}
					/>
				</div>

				{/* Property Documents */}
				<div>
					<Label className="mb-2">Property Documents</Label>
					<Input type="file" accept=".pdf" onChange={e => handleFileChange(e, 'propertyDocuments')} />
				</div>

				{/* Venue Images */}
				<div className="space-y-2">
					<Label className="block font-medium">Venue Images (Upload up to 5)</Label>
					<Input
						type="file"
						accept="image/*"
						multiple
						onChange={handleImageUpload}
						disabled={gardenData.venueImages.length >= 5}
					/>
					<div className="text-sm text-gray-500 mt-1">{gardenData.venueImages.length} of 5 images uploaded</div>

					{/* Image Previews */}
					{previewImages.length > 0 && (
						<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
							{previewImages.map((preview, index) => (
								<div key={index} className="relative group">
									<div className="relative h-32 w-full overflow-hidden rounded-md bg-gray-200">
										<Image src={preview} alt={`Venue image ${index + 1}`} fill className="object-cover" />
									</div>
									<button
										type="button"
										className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white opacity-90 hover:opacity-100"
										onClick={() => removeImage(index)}>
										<X size={16} />
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Hosting Facilities - Using Checkboxes instead of Popover */}
				<div>
					<Label className="block mb-2 font-medium">Hosting Facilities</Label>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1 border rounded-md p-3">
						{allFacilities.map(facility => (
							<div key={facility} className="flex items-center space-x-2">
								<Checkbox
									id={`facility-${facility}`}
									checked={gardenData.hostingFacilities.includes(facility)}
									onCheckedChange={() => handleFacilityToggle(facility)}
								/>
								<Label htmlFor={`facility-${facility}`} className="cursor-pointer">
									{facility}
								</Label>
							</div>
						))}
					</div>
					{gardenData.hostingFacilities.length > 0 && (
						<div className="mt-2 text-sm text-gray-500">Selected: {gardenData.hostingFacilities.join(', ')}</div>
					)}
				</div>

				{/* Contact */}
				<div>
					<Label className="mb-2">Management Contact</Label>
					<Input
						type="text"
						value={gardenData.contact}
						onChange={e => setGardenData({ ...gardenData, contact: e.target.value })}
					/>
				</div>

				{/* File Uploads */}
				<div className="flex flex-wrap gap-4">
					<div className="flex-1 min-w-[200px]">
						<Label className="mb-2">NOC Certificate</Label>
						<Input type="file" accept=".pdf" onChange={e => handleFileChange(e, 'noc')} />
					</div>
					<div className="flex-1 min-w-[200px]">
						<Label className="mb-2">Fire Safety Certificate</Label>
						<Input type="file" accept=".pdf" onChange={e => handleFileChange(e, 'fireCert')} />
					</div>
					<div className="flex-1 min-w-[200px]">
						<Label className="mb-2">FSSAI Certificate</Label>
						<Input type="file" accept=".pdf" onChange={e => handleFileChange(e, 'fssaiCert')} />
					</div>
					<div className="flex-1 min-w-[200px]">
						<Label className="mb-2">Marriage NOC</Label>
						<Input type="file" accept=".pdf" onChange={e => handleFileChange(e, 'marriageNoc')} />
					</div>
				</div>

				<Button type="submit" className="w-full" disabled={uploading}>
					{uploading ? 'Uploading...' : 'Submit'}
				</Button>
			</form>
		</div>
	)
}
