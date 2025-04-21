import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChangeEvent, FormEvent, useState } from 'react'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { X, MapPin, Upload, CheckCircle, AlertCircle } from 'lucide-react'

interface FlatData {
	bhk: string
	price: string
	state: string
	city: string
	landmark: string
	pincode: string
	title: string
	pictures: File[]
	nocDoc: File | null
	termsOfConditionsDoc: File | null
	video: File | null
	securityAmount: string
	amenities: string[]
	mapLocation: string
}

export default function FlatForm() {
	const router = useRouter()
	const amenities = ['AC', 'Cooler', 'Refrigerator', 'Washing Machine', 'TV', 'WiFi', 'Geyser', 'Parking', 'Security']
	const [loading, setLoading] = useState(false)
	const [imagePreviews, setImagePreviews] = useState<string[]>([])
	const [currentStep, setCurrentStep] = useState(1)
	const totalSteps = 4
	const [showConfirmation, setShowConfirmation] = useState(false)

	// Key to reset file inputs
	const [fileInputKey, setFileInputKey] = useState({
		pictures: Date.now(),
		nocDoc: Date.now(),
		termsOfConditionsDoc: Date.now(),
		video: Date.now(),
	})

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

	// BHK options
	const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK', 'Studio']

	const [flatData, setFlatData] = useState<FlatData>({
		bhk: '',
		price: '',
		state: '',
		city: '',
		landmark: '',
		pincode: '',
		title: '',
		pictures: [],
		nocDoc: null,
		termsOfConditionsDoc: null,
		video: null,
		securityAmount: '',
		amenities: [],
		mapLocation: '',
	})

	const handleFileChange = (
		e: ChangeEvent<HTMLInputElement>,
		key: keyof Pick<FlatData, 'pictures' | 'nocDoc' | 'termsOfConditionsDoc' | 'video'>
	) => {
		const files = e.target.files
		if (!files || files.length === 0) return

		if (key === 'pictures') {
			const fileArray = Array.from(files)
			const currentTotal = flatData.pictures.length + fileArray.length

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
					setImagePreviews(prev => [...prev, reader.result as string])
				}
				reader.readAsDataURL(file)
			})

			setFlatData(prev => ({ ...prev, pictures: [...prev.pictures, ...fileArray] }))
			// Reset the file input to avoid the controlled/uncontrolled issue
			setFileInputKey(prev => ({ ...prev, [key]: Date.now() }))
		} else {
			setFlatData(prev => ({ ...prev, [key]: files[0] }))
			// Reset the file input to avoid the controlled/uncontrolled issue
			setFileInputKey(prev => ({ ...prev, [key]: Date.now() }))
		}
	}

	const removeImage = (index: number) => {
		// Remove from both the files array and the previews array
		setFlatData(prev => ({
			...prev,
			pictures: prev.pictures.filter((_, i) => i !== index),
		}))
		setImagePreviews(prev => prev.filter((_, i) => i !== index))
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

	// Modified to just prepare for submission rather than submitting directly
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Instead of auto-submitting, show confirmation dialog or move to a confirmation step
		setShowConfirmation(true)
	}

	// New function to actually submit the form data when confirmed
	const confirmSubmission = async () => {
		setLoading(true)

		if (flatData.pictures.length !== 5) {
			alert('Please upload exactly 5 images before submitting.')
			setLoading(false)
			return
		}

		if (flatData.amenities.length === 0) {
			alert('Please select at least one amenity.')
			setLoading(false)
			return
		}

		const formData = new FormData()
		formData.append('bhk', flatData.bhk)
		formData.append('price', flatData.price)
		formData.append('state', flatData.state)
		formData.append('city', flatData.city)
		formData.append('landmark', flatData.landmark)
		formData.append('pincode', flatData.pincode)
		formData.append('title', flatData.title)
		formData.append('securityAmount', flatData.securityAmount)
		formData.append('mapLocation', flatData.mapLocation)

		flatData.pictures.forEach(picture => formData.append('pictures', picture))
		flatData.nocDoc && formData.append('nocDoc', flatData.nocDoc)
		flatData.termsOfConditionsDoc && formData.append('termsOfConditionsDoc', flatData.termsOfConditionsDoc)
		flatData.amenities.forEach(amenity => formData.append('amenities', amenity))
		flatData.video && formData.append('video', flatData.video)

		console.log('Flat Data:', flatData)

		try {
			const response = await axios.post('/api/host/list-property/flat', formData)
			const data = response.data
			console.log(data)
			alert('Submission successful')
			router.push('/host/list-success')
		} catch (error) {
			console.error('Error submitting form:', error)
			alert('Error submitting form. Please try again.')
		} finally {
			setLoading(false)
			setShowConfirmation(false)
		}
	}

	const nextStep = () => {
		setCurrentStep(prev => Math.min(prev + 1, totalSteps))
	}

	const prevStep = () => {
		setCurrentStep(prev => Math.max(prev - 1, 1))
	}

	// Step validation
	const canAdvanceFromStep1 = flatData.bhk && flatData.price && flatData.securityAmount
	const canAdvanceFromStep2 = flatData.state && flatData.city && flatData.pincode
	const canAdvanceFromStep3 = flatData.pictures.length === 5 && flatData.title

	// Step content
	const getStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>

						{/* Property Type */}
						<div>
							<Label htmlFor="bhk" className="text-sm font-medium">
								Property Type
							</Label>
							<Select value={flatData.bhk} onValueChange={value => setFlatData({ ...flatData, bhk: value })}>
								<SelectTrigger id="bhk" className="w-full mt-1">
									<SelectValue placeholder="Select property type" />
								</SelectTrigger>
								<SelectContent>
									{bhkOptions.map(option => (
										<SelectItem key={option} value={option}>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Price */}
						<div>
							<Label htmlFor="price" className="text-sm font-medium">
								Monthly Rent (₹)
							</Label>
							<Input
								id="price"
								type="number"
								placeholder="Enter monthly rent amount"
								value={flatData.price}
								onChange={e => setFlatData({ ...flatData, price: e.target.value })}
								className="mt-1"
							/>
						</div>

						{/* Security Amount */}
						<div>
							<Label htmlFor="security" className="text-sm font-medium">
								Security Deposit (₹)
							</Label>
							<Input
								id="security"
								type="number"
								placeholder="Enter security deposit amount"
								value={flatData.securityAmount}
								onChange={e => setFlatData({ ...flatData, securityAmount: e.target.value })}
								className="mt-1"
							/>
						</div>

						{/* Amenities */}
						<div>
							<Label className="text-sm font-medium block mb-2">Available Amenities</Label>
							<div className="flex flex-wrap gap-2">
								{amenities.map((item, i) => (
									<Button
										key={i}
										type="button"
										size="sm"
										variant="outline"
										className={cn(
											'transition border-gray-300',
											flatData.amenities.includes(item) ? 'bg-blue-50 text-blue-700 border-blue-300' : 'hover:bg-gray-50'
										)}
										onClick={() => handleAmenityToggle(item)}>
										{item}
									</Button>
								))}
							</div>
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
							<Select value={flatData.state} onValueChange={value => setFlatData({ ...flatData, state: value })}>
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

						{/* City */}
						<div>
							<Label htmlFor="city" className="text-sm font-medium">
								City
							</Label>
							<Input
								id="city"
								type="text"
								placeholder="Enter city"
								value={flatData.city}
								onChange={e => setFlatData({ ...flatData, city: e.target.value })}
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
								value={flatData.landmark}
								onChange={e => setFlatData({ ...flatData, landmark: e.target.value })}
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
								value={flatData.pincode}
								onChange={e => setFlatData({ ...flatData, pincode: e.target.value })}
								className="mt-1"
							/>
						</div>

						{/* Google Maps Location */}
						<div>
							<Label htmlFor="mapLocation" className="text-sm font-medium flex items-center gap-1">
								<MapPin size={16} className="text-gray-500" />
								Google Maps Location
							</Label>
							<div className="mt-1 space-y-2">
								<Input
									id="mapLocation"
									placeholder="Paste Google Maps URL or share link"
									value={flatData.mapLocation}
									onChange={e => setFlatData({ ...flatData, mapLocation: e.target.value })}
								/>
								<p className="text-xs text-gray-500">Open Google Maps, find your property, click "Share" and copy the link</p>
							</div>
						</div>
					</div>
				)
			case 3:
				return (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-800">Property Details & Photos</h2>

						{/* Title */}
						<div>
							<Label htmlFor="title" className="text-sm font-medium">
								Listing Title
							</Label>
							<Input
								id="title"
								type="text"
								placeholder="Create an attractive title for your property"
								value={flatData.title}
								onChange={e => setFlatData({ ...flatData, title: e.target.value })}
								className="mt-1"
							/>
						</div>

						{/* Upload Pictures */}
						<div>
							<Label htmlFor="pictures" className="text-sm font-medium flex items-center gap-2">
								<Upload size={16} className="text-gray-500" />
								Property Photos (5 required)
							</Label>
							<div className="mt-2 p-4 border border-dashed rounded-md bg-gray-50">
								<Input
									id="pictures"
									key={fileInputKey.pictures}
									type="file"
									accept="image/*"
									multiple
									className="mb-2"
									onChange={e => handleFileChange(e, 'pictures')}
									disabled={flatData.pictures.length >= 5}
								/>
								<p className="text-xs text-gray-500">
									Upload exactly 5 high-quality images of your property. {flatData.pictures.length}/5 uploaded.
								</p>
							</div>

							{/* Image Previews */}
							{imagePreviews.length > 0 && (
								<div className="mt-4">
									<p className="text-xs text-gray-500 mb-2">Click on an image to remove it:</p>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
										{imagePreviews.map((preview, index) => (
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

						{/* Video Upload */}
						<div>
							<Label htmlFor="video" className="text-sm font-medium">
								Property Video Tour (Optional)
							</Label>
							<Input
								id="video"
								key={fileInputKey.video}
								type="file"
								className="mt-1"
								accept="video/*"
								onChange={e => handleFileChange(e, 'video')}
							/>
							{flatData.video && (
								<div className="flex items-center gap-2 mt-1 text-xs text-green-600">
									<CheckCircle size={14} />
									<span>Video uploaded: {flatData.video.name}</span>
								</div>
							)}
						</div>
					</div>
				)
			case 4:
				return (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-gray-800">Documentation</h2>

						{/* NOC */}
						<div>
							<Label htmlFor="noc" className="text-sm font-medium">
								No Objection Certificate (NOC)
							</Label>
							<div className="mt-2 p-4 border border-dashed rounded-md bg-gray-50">
								<Input
									id="noc"
									key={fileInputKey.nocDoc}
									type="file"
									accept="application/pdf,image/*"
									onChange={e => handleFileChange(e, 'nocDoc')}
								/>
								<p className="text-xs text-gray-500 mt-1">Upload your property's No Objection Certificate (PDF or Image)</p>
								{flatData.nocDoc && (
									<div className="flex items-center gap-2 mt-2 text-xs text-green-600">
										<CheckCircle size={14} />
										<span>File uploaded: {flatData.nocDoc.name}</span>
									</div>
								)}
							</div>
						</div>

						{/* Terms & Conditions */}
						<div>
							<Label htmlFor="terms" className="text-sm font-medium">
								Terms and Conditions Document
							</Label>
							<div className="mt-2 p-4 border border-dashed rounded-md bg-gray-50">
								<Input
									id="terms"
									key={fileInputKey.termsOfConditionsDoc}
									type="file"
									accept="application/pdf,image/*"
									onChange={e => handleFileChange(e, 'termsOfConditionsDoc')}
								/>
								<p className="text-xs text-gray-500 mt-1">Upload your rental terms and conditions (PDF or Image)</p>
								{flatData.termsOfConditionsDoc && (
									<div className="flex items-center gap-2 mt-2 text-xs text-green-600">
										<CheckCircle size={14} />
										<span>File uploaded: {flatData.termsOfConditionsDoc.name}</span>
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
											<span className="font-medium text-gray-500">Property Type:</span> {flatData.bhk}
										</div>
										<div>
											<span className="font-medium text-gray-500">Monthly Rent:</span> ₹{flatData.price}
										</div>
										<div>
											<span className="font-medium text-gray-500">Security Deposit:</span> ₹{flatData.securityAmount}
										</div>
										<div>
											<span className="font-medium text-gray-500">Location:</span> {flatData.city}, {flatData.state}
										</div>
										<div className="sm:col-span-2">
											<span className="font-medium text-gray-500">Title:</span> {flatData.title}
										</div>
										<div className="sm:col-span-2">
											<span className="font-medium text-gray-500">Amenities:</span> {flatData.amenities.join(', ')}
										</div>
										<div className="sm:col-span-2">
											<span className="font-medium text-gray-500">Photos:</span> {flatData.pictures.length} uploaded
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

	// Render confirmation dialog if needed
	const renderConfirmation = () => {
		if (!showConfirmation) return null

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
				<div className="bg-white rounded-lg p-6 max-w-md w-full">
					<h3 className="text-xl font-bold mb-4">Confirm Submission</h3>
					<p className="mb-6">Are you sure you want to submit your flat listing? This action cannot be undone.</p>
					<div className="flex justify-end gap-3">
						<Button variant="outline" onClick={() => setShowConfirmation(false)}>
							Cancel
						</Button>
						<Button onClick={confirmSubmission} disabled={loading} className="bg-green-600 hover:bg-green-700">
							{loading ? 'Submitting...' : 'Yes, Submit Listing'}
						</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="pb-16">
			<div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-8 mt-6">
				<h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">List Your Flat</h1>

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
									{step === 4 && 'Documents'}
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
							Review & Submit Listing
						</Button>
					)}
				</div>
			</div>
			{renderConfirmation()}
		</form>
	)
}
