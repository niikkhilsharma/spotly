'use client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChangeEvent, FormEvent, useState } from 'react'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { X, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog'

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
	title: string
}

export default function MarriageGardenForm() {
	const router = useRouter()
	const allFacilities = ['Music system', 'DJ', 'Sound box', 'LED TV']
	const [loading, setLoading] = useState(false)
	const [previewImages, setPreviewImages] = useState<string[]>([])
	const [currentStep, setCurrentStep] = useState(1)
	const totalSteps = 4
	const [showConfirmDialog, setShowConfirmDialog] = useState(false)

	// List of Indian states
	const indianStates = [
		'Andhra Pradesh',
		'Arunachal Pradesh',
		'Assam',
		'Bihar',
		'Chhattisgarh',
		'Goa',
		'Gujarat',
		'Haryana',
		'Himachal Pradesh',
		'Jharkhand',
		'Karnataka',
		'Kerala',
		'Madhya Pradesh',
		'Maharashtra',
		'Manipur',
		'Meghalaya',
		'Mizoram',
		'Nagaland',
		'Odisha',
		'Punjab',
		'Rajasthan',
		'Sikkim',
		'Tamil Nadu',
		'Telangana',
		'Tripura',
		'Uttar Pradesh',
		'Uttarakhand',
		'West Bengal',
		'Andaman and Nicobar Islands',
		'Chandigarh',
		'Dadra and Nagar Haveli and Daman and Diu',
		'Delhi',
		'Jammu and Kashmir',
		'Ladakh',
		'Lakshadweep',
		'Puducherry',
	]

	// Key to reset file inputs
	const [fileInputKey, setFileInputKey] = useState({
		venueImages: Date.now(),
		propertyDocuments: Date.now(),
		noc: Date.now(),
		fireCert: Date.now(),
		fssaiCert: Date.now(),
		marriageNoc: Date.now(),
	})

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
		title: '',
	})

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
		key: keyof Pick<GardenData, 'venueImages' | 'propertyDocuments' | 'noc' | 'fireCert' | 'fssaiCert' | 'marriageNoc'>
	) => {
		const files = e.target.files
		if (!files || files.length === 0) return

		if (key === 'venueImages') {
			const fileArray = Array.from(files)
			const currentTotal = gardenData.venueImages.length + fileArray.length

			if (currentTotal > 5) {
				alert('You can upload a maximum of 5 images.')
				return
			}

			const allImages = fileArray.every(file => file.type.startsWith('image/'))
			if (!allImages) {
				alert('Only image files are allowed.')
				return
			}

			// Generate previews for new images
			fileArray.forEach(file => {
				const reader = new FileReader()
				reader.onload = () => {
					setPreviewImages(prev => [...prev, reader.result as string])
				}
				reader.readAsDataURL(file)
			})

			setGardenData(prev => ({ ...prev, venueImages: [...prev.venueImages, ...fileArray] }))
			// Reset the file input
			setFileInputKey(prev => ({ ...prev, [key]: Date.now() }))
		} else {
			setGardenData(prev => ({ ...prev, [key]: files[0] }))
			// Reset the file input
			setFileInputKey(prev => ({ ...prev, [key]: Date.now() }))
		}
	}

	const removeImage = (index: number) => {
		// Remove from both the files array and the previews array
		setGardenData(prev => ({
			...prev,
			venueImages: prev.venueImages.filter((_, i) => i !== index),
		}))
		setPreviewImages(prev => prev.filter((_, i) => i !== index))
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

	// Open confirmation dialog instead of direct submission
	const openConfirmDialog = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validate required fields before showing the dialog
		if (gardenData.venueImages.length === 0) {
			alert('Please upload at least one venue image.')
			return
		}

		if (!gardenData.propertyDocuments) {
			alert('Please upload property documents.')
			return
		}

		if (gardenData.hostingFacilities.length === 0) {
			alert('Please select at least one hosting facility.')
			return
		}

		setShowConfirmDialog(true)
	}

	// Actual submission happens only after confirmation
	const handleSubmit = async () => {
		setLoading(true)
		setShowConfirmDialog(false)

		const formData = new FormData()
		formData.append('propertyType', gardenData.propertyType)
		formData.append('state', gardenData.state)
		formData.append('district', gardenData.district)
		formData.append('landmark', gardenData.landmark)
		formData.append('pincode', gardenData.pincode)
		formData.append('contact', gardenData.contact)
		formData.append('title', gardenData.title)

		formData.append('propertyDocuments', gardenData.propertyDocuments!)
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
			const response = await axios.post('/api/host/list-property/marriage-garden', formData)
			console.log(response.data)
			alert('Submission successful!')
			router.push('/host/list-success')
		} catch (error) {
			console.error('Error submitting form:', error)
			alert('Failed to submit form. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const nextStep = () => {
		setCurrentStep(prev => Math.min(prev + 1, totalSteps))
	}

	const prevStep = () => {
		setCurrentStep(prev => Math.max(prev - 1, 1))
	}

	// Step validation
	const canAdvanceFromStep1 = gardenData.propertyType && gardenData.hostingFacilities.length > 0
	const canAdvanceFromStep2 = gardenData.state && gardenData.district && gardenData.pincode
	const canAdvanceFromStep3 = gardenData.venueImages.length > 0 && gardenData.title

	// Step content
	const getStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>

						{/* Property Type */}
						<div>
							<Label htmlFor="propertyType" className="text-sm font-medium">
								Garden Property Type
							</Label>
							<Select
								value={gardenData.propertyType}
								onValueChange={value => setGardenData({ ...gardenData, propertyType: value })}>
								<SelectTrigger id="propertyType" className="w-full mt-1">
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

						{/* Contact */}
						<div>
							<Label htmlFor="contact" className="text-sm font-medium">
								Management Contact
							</Label>
							<Input
								id="contact"
								type="text"
								placeholder="Enter contact number"
								value={gardenData.contact}
								onChange={e => setGardenData({ ...gardenData, contact: e.target.value })}
								className="mt-1"
							/>
						</div>

						{/* Hosting Facilities */}
						<div>
							<Label className="text-sm font-medium block mb-2">Hosting Facilities</Label>
							<div className="flex flex-wrap gap-2">
								{allFacilities.map((facility, i) => (
									<Button
										key={i}
										type="button"
										size="sm"
										variant="outline"
										className={cn(
											'transition border-gray-300',
											gardenData.hostingFacilities.includes(facility) ? 'bg-blue-50 text-blue-700 border-blue-300' : 'hover:bg-gray-50'
										)}
										onClick={() => handleFacilityToggle(facility)}>
										{facility}
									</Button>
								))}
							</div>
							{gardenData.hostingFacilities.length > 0 && (
								<div className="mt-2 text-sm text-gray-500">Selected: {gardenData.hostingFacilities.join(', ')}</div>
							)}
						</div>
					</div>
				)
			case 2:
				return (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-800">Location Details</h2>

						{/* State */}
						<div>
							<Label htmlFor="state" className="text-sm font-medium">
								State
							</Label>
							<Select value={gardenData.state} onValueChange={value => setGardenData({ ...gardenData, state: value })}>
								<SelectTrigger id="state" className="w-full mt-1">
									<SelectValue placeholder="Select a state" />
								</SelectTrigger>
								<SelectContent>
									{indianStates.map(state => (
										<SelectItem key={state} value={state}>
											{state}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* District */}
						<div>
							<Label htmlFor="district" className="text-sm font-medium">
								District
							</Label>
							<Input
								id="district"
								type="text"
								placeholder="Enter district"
								value={gardenData.district}
								onChange={e => setGardenData({ ...gardenData, district: e.target.value })}
								className="mt-1"
							/>
						</div>

						{/* Landmark */}
						<div>
							<Label htmlFor="landmark" className="text-sm font-medium">
								Landmark
							</Label>
							<Input
								id="landmark"
								type="text"
								placeholder="Nearby landmark (optional)"
								value={gardenData.landmark}
								onChange={e => setGardenData({ ...gardenData, landmark: e.target.value })}
								className="mt-1"
							/>
						</div>

						{/* Pincode */}
						<div>
							<Label htmlFor="pincode" className="text-sm font-medium">
								Pincode
							</Label>
							<Input
								id="pincode"
								type="number"
								placeholder="Enter pincode"
								value={gardenData.pincode}
								onChange={e => setGardenData({ ...gardenData, pincode: e.target.value })}
								className="mt-1"
							/>
						</div>
					</div>
				)
			case 3:
				return (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-800">Venue Details & Photos</h2>

						{/* Title */}
						<div>
							<Label htmlFor="title" className="text-sm font-medium">
								Listing Title
							</Label>
							<Input
								id="title"
								type="text"
								placeholder="Create an attractive title for your marriage garden"
								value={gardenData.title}
								onChange={e => setGardenData({ ...gardenData, title: e.target.value })}
								className="mt-1"
							/>
						</div>

						{/* Upload Pictures */}
						<div>
							<Label htmlFor="venueImages" className="text-sm font-medium flex items-center gap-2">
								<Upload size={16} className="text-gray-500" />
								Venue Photos (Maximum 5)
							</Label>
							<div className="mt-2 p-4 border border-dashed rounded-md bg-gray-50">
								<Input
									id="venueImages"
									key={fileInputKey.venueImages}
									type="file"
									accept="image/*"
									multiple
									className="mb-2"
									onChange={e => handleFileChange(e, 'venueImages')}
									disabled={gardenData.venueImages.length >= 5}
								/>
								<p className="text-xs text-gray-500">
									Upload high-quality images of your venue. {gardenData.venueImages.length}/5 uploaded.
								</p>
							</div>

							{/* Image Previews */}
							{previewImages.length > 0 && (
								<div className="mt-4">
									<p className="text-xs text-gray-500 mb-2">Click on an image to remove it:</p>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
										{previewImages.map((preview, index) => (
											<div
												key={index}
												className="relative aspect-square border rounded-lg overflow-hidden hover:opacity-90 cursor-pointer group"
												onClick={() => removeImage(index)}>
												<img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
												<div className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-70 hover:opacity-100">
													<X size={16} className="text-red-500" />
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Property Documents */}
						<div>
							<Label htmlFor="propertyDocuments" className="text-sm font-medium">
								Property Documents
							</Label>
							<div className="mt-2 p-4 border border-dashed rounded-md bg-gray-50">
								<Input
									id="propertyDocuments"
									key={fileInputKey.propertyDocuments}
									type="file"
									accept="application/pdf,image/*"
									onChange={e => handleFileChange(e, 'propertyDocuments')}
								/>
								<p className="text-xs text-gray-500 mt-1">Upload your property ownership documents (PDF or Image)</p>
								{gardenData.propertyDocuments && (
									<div className="flex items-center gap-2 mt-2 text-xs text-green-600">
										<CheckCircle size={14} />
										<span>File uploaded: {gardenData.propertyDocuments.name}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				)
			case 4:
				return (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-800">Certification Documents</h2>

						{/* NOC */}
						<div>
							<Label htmlFor="noc" className="text-sm font-medium">
								No Objection Certificate (NOC)
							</Label>
							<div className="mt-2 p-4 border border-dashed rounded-md bg-gray-50">
								<Input
									id="noc"
									key={fileInputKey.noc}
									type="file"
									accept="application/pdf,image/*"
									onChange={e => handleFileChange(e, 'noc')}
								/>
								<p className="text-xs text-gray-500 mt-1">Upload your NOC (PDF or Image)</p>
								{gardenData.noc && (
									<div className="flex items-center gap-2 mt-2 text-xs text-green-600">
										<CheckCircle size={14} />
										<span>File uploaded: {gardenData.noc.name}</span>
									</div>
								)}
							</div>
						</div>

						{/* Fire Safety Certificate */}
						<div>
							<Label htmlFor="fireCert" className="text-sm font-medium">
								Fire Safety Certificate
							</Label>
							<div className="mt-2 p-4 border border-dashed rounded-md bg-gray-50">
								<Input
									id="fireCert"
									key={fileInputKey.fireCert}
									type="file"
									accept="application/pdf,image/*"
									onChange={e => handleFileChange(e, 'fireCert')}
								/>
								<p className="text-xs text-gray-500 mt-1">Upload your Fire Safety Certificate (PDF or Image)</p>
								{gardenData.fireCert && (
									<div className="flex items-center gap-2 mt-2 text-xs text-green-600">
										<CheckCircle size={14} />
										<span>File uploaded: {gardenData.fireCert.name}</span>
									</div>
								)}
							</div>
						</div>

						{/* FSSAI Certificate */}
						<div>
							<Label htmlFor="fssaiCert" className="text-sm font-medium">
								FSSAI Certificate
							</Label>
							<div className="mt-2 p-4 border border-dashed rounded-md bg-gray-50">
								<Input
									id="fssaiCert"
									key={fileInputKey.fssaiCert}
									type="file"
									accept="application/pdf,image/*"
									onChange={e => handleFileChange(e, 'fssaiCert')}
								/>
								<p className="text-xs text-gray-500 mt-1">Upload your FSSAI Certificate (PDF or Image)</p>
								{gardenData.fssaiCert && (
									<div className="flex items-center gap-2 mt-2 text-xs text-green-600">
										<CheckCircle size={14} />
										<span>File uploaded: {gardenData.fssaiCert.name}</span>
									</div>
								)}
							</div>
						</div>

						{/* Marriage NOC */}
						<div>
							<Label htmlFor="marriageNoc" className="text-sm font-medium">
								Marriage NOC
							</Label>
							<div className="mt-2 p-4 border border-dashed rounded-md bg-gray-50">
								<Input
									id="marriageNoc"
									key={fileInputKey.marriageNoc}
									type="file"
									accept="application/pdf,image/*"
									onChange={e => handleFileChange(e, 'marriageNoc')}
								/>
								<p className="text-xs text-gray-500 mt-1">Upload your Marriage NOC (PDF or Image)</p>
								{gardenData.marriageNoc && (
									<div className="flex items-center gap-2 mt-2 text-xs text-green-600">
										<CheckCircle size={14} />
										<span>File uploaded: {gardenData.marriageNoc.name}</span>
									</div>
								)}
							</div>
						</div>

						{/* Review Summary */}
						<div className="mt-6">
							<h3 className="text-lg font-medium text-gray-800 mb-3">Review Your Listing</h3>
							<Card>
								<CardContent className="p-4 space-y-4">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
										<div>
											<span className="font-medium text-gray-500">Property Type:</span> {gardenData.propertyType}
										</div>
										<div>
											<span className="font-medium text-gray-500">Location:</span> {gardenData.district}, {gardenData.state}
										</div>
										<div>
											<span className="font-medium text-gray-500">Contact:</span> {gardenData.contact}
										</div>
										<div className="sm:col-span-2">
											<span className="font-medium text-gray-500">Title:</span> {gardenData.title}
										</div>
										<div className="sm:col-span-2">
											<span className="font-medium text-gray-500">Facilities:</span> {gardenData.hostingFacilities.join(', ')}
										</div>
										<div className="sm:col-span-2">
											<span className="font-medium text-gray-500">Photos:</span> {gardenData.venueImages.length} uploaded
										</div>
									</div>

									<div className="flex items-center gap-2 text-sm text-amber-600 pt-2 border-t">
										<AlertCircle size={16} />
										<p>Please review all details before submitting your listing</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				)
			default:
				return null
		}
	}

	return (
		<form onSubmit={openConfirmDialog} className="pb-16">
			<div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8 mt-6">
				<h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">List Your Marriage Garden</h1>

				{/* Progress Steps */}
				<div className="mb-8">
					<div className="flex justify-between items-center">
						{[1, 2, 3, 4].map(step => (
							<div key={step} className="flex flex-col items-center">
								<div
									className={cn(
										'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
										currentStep === step
											? 'bg-blue-600 text-white'
											: currentStep > step
											? 'bg-green-500 text-white'
											: 'bg-gray-200 text-gray-600'
									)}>
									{currentStep > step ? '✓' : step}
								</div>
								<span className="text-xs mt-1 hidden sm:block">
									{step === 1 && 'Details'}
									{step === 2 && 'Location'}
									{step === 3 && 'Photos'}
									{step === 4 && 'Certificates'}
								</span>
							</div>
						))}
					</div>
					<div className="relative mt-2">
						<div className="absolute top-0 h-1 bg-gray-200 w-full rounded">
							<div
								className="absolute h-1 bg-blue-600 rounded"
								style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
							/>
						</div>
					</div>
				</div>

				{/* Form Content */}
				<div className="mt-6">{getStepContent()}</div>

				{/* Navigation Buttons */}
				<div className="mt-8 flex justify-between">
					<Button
						type="button"
						variant="outline"
						onClick={prevStep}
						disabled={currentStep === 1}
						className={currentStep === 1 ? 'opacity-0' : ''}>
						Previous
					</Button>

					{currentStep < totalSteps ? (
						<Button
							type="button"
							onClick={nextStep}
							disabled={
								(currentStep === 1 && !canAdvanceFromStep1) ||
								(currentStep === 2 && !canAdvanceFromStep2) ||
								(currentStep === 3 && !canAdvanceFromStep3)
							}>
							Next
						</Button>
					) : (
						<Button type="submit" className="bg-green-600 hover:bg-green-700">
							Review & Submit
						</Button>
					)}
				</div>
			</div>

			{/* Confirmation Dialog */}
			<Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Confirm Submission</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<p className="text-sm text-gray-700">
							You're about to submit your marriage garden listing. This will make your property available for review by our team.
							Are you sure all the information provided is accurate?
						</p>
						<div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
							<div className="flex items-start gap-2">
								<AlertCircle size={18} className="text-amber-500 mt-0.5" />
								<div className="text-sm text-amber-800">
									<p className="font-medium">Please verify:</p>
									<ul className="mt-1 space-y-1 list-disc list-inside">
										<li>All required documents are uploaded</li>
										<li>Contact details are correct</li>
										<li>Location information is accurate</li>
										<li>All venue photos are clear and representative</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<DialogFooter className="flex sm:justify-between">
						<Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
							Go Back & Edit
						</Button>
						<Button onClick={handleSubmit} disabled={loading} className="bg-green-600 hover:bg-green-700">
							{loading ? 'Submitting...' : 'Confirm & Submit'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</form>
	)
}
