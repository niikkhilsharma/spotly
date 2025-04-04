'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PropertyTypeStep } from '@/components/listing-steps/property-type-step'
import { PlaceTypeStep } from '@/components/listing-steps/place-type-step'
import { LocationStep } from '@/components/listing-steps/location-step'
import { BasicsStep } from '@/components/listing-steps/basics-step'
import { AmenitiesStep } from '@/components/listing-steps/amenities-step'
import { PhotosStep } from '@/components/listing-steps/photos-step'
import { TitleStep } from '@/components/listing-steps/title-step'
import { DescriptionStep } from '@/components/listing-steps/description-step'
import { PricingStep } from '@/components/listing-steps/pricing-step'
import { SecurityStep } from '@/components/listing-steps/security-step'
import { VerificationStep } from '@/components/listing-steps/verification-step'
import { ProgressBar } from '@/components/progress-bar'
import { toast } from 'sonner'

export default function ListPropertyPage() {
	const router = useRouter()
	const [currentStep, setCurrentStep] = useState(1)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formData, setFormData] = useState({
		propertyType: '',
		placeType: '',
		location: {
			address: {
				line1: '',
				line2: '',
				district: '',
				city: '',
				state: '',
				pincode: '',
			},
			coordinates: { lat: 0, lng: 0 },
		},
		basics: {
			guests: 1,
			bedrooms: 1,
			beds: 1,
			bathrooms: 1,
		},
		amenities: [],
		photos: [],
		title: '',
		description: {
			attributes: [],
			text: '',
		},
		price: 0,
		security: {
			hasCamera: false,
			hasNoiseMonitor: false,
			hasWeapons: false,
		},
		verification: {
			photo: null,
			document: null,
			documentType: '',
			photoUrl: '',
			documentUrl: '',
		},
	})

	const totalSteps = 11
	const progress = (currentStep / totalSteps) * 100

	const updateFormData = (field, value) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}))
	}

	const handleNext = () => {
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1)
			window.scrollTo(0, 0)
		} else {
			handleSubmit()
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
			window.scrollTo(0, 0)
		}
	}

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true)

			// Prepare the data for submission
			const submissionData = {
				...formData,
			}

			const response = await fetch('/api/properties', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(submissionData),
			})

			const data = await response.json()

			if (response.ok) {
				toast('Success!', {
					description: 'Your property listing has been submitted successfully.',
				})
				router.push('/host/listing-success')
			} else {
				throw new Error(data.message || 'Failed to submit listing')
			}
		} catch (error) {
			console.error('Error submitting listing:', error)
			toast('Submission failed', {
				description: error.message || 'There was an error submitting your listing. Please try again.',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<PropertyTypeStep
						value={formData.propertyType}
						onChange={value => updateFormData('propertyType', value)}
						onNext={handleNext}
					/>
				)
			case 2:
				return (
					<PlaceTypeStep
						value={formData.placeType}
						onChange={value => updateFormData('placeType', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			case 3:
				return (
					<LocationStep
						value={formData.location}
						onChange={value => updateFormData('location', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			case 4:
				return (
					<BasicsStep
						value={formData.basics}
						onChange={value => updateFormData('basics', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			case 5:
				return (
					<AmenitiesStep
						value={formData.amenities}
						onChange={value => updateFormData('amenities', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			case 6:
				return (
					<PhotosStep
						value={formData.photos}
						onChange={value => updateFormData('photos', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			case 7:
				return (
					<TitleStep
						value={formData.title}
						onChange={value => updateFormData('title', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			case 8:
				return (
					<DescriptionStep
						value={formData.description}
						onChange={value => updateFormData('description', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			case 9:
				return (
					<PricingStep
						value={formData.price}
						onChange={value => updateFormData('price', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			case 10:
				return (
					<SecurityStep
						value={formData.security}
						onChange={value => updateFormData('security', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			case 11:
				return (
					<VerificationStep
						value={formData.verification}
						onChange={value => updateFormData('verification', value)}
						onNext={handleNext}
						onBack={handleBack}
					/>
				)
			default:
				return null
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 pb-20">
			<div className="sticky top-0 z-10 bg-white shadow-sm">
				<div className="container mx-auto max-w-4xl px-4 py-4">
					<ProgressBar progress={progress} />
				</div>
			</div>
			<div className="container mx-auto max-w-4xl px-4 py-8">
				{isSubmitting ? (
					<div className="flex flex-col items-center justify-center py-12">
						<div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
						<h2 className="text-xl font-semibold">Submitting your listing...</h2>
						<p className="text-muted-foreground">Please wait while we process your information.</p>
					</div>
				) : (
					renderStep()
				)}
			</div>
		</div>
	)
}
