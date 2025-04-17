'use client'

import axios from 'axios'
import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { Calendar, Check, CircleX, ExternalLink, FileText, MapPin, Video } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Flat } from '@prisma/client'

export default function FlatDetailsPage({ property }: { property: Flat }) {
	const [isApproved, setIsApproved] = useState(property.isApproved)

	console.log(property)

	const handleRevertApproval = async () => {
		const response = await axios.post('/api/admin/flat/approve', {
			id: property.id,
			approve: false,
		})
		console.log(response.data)
		setIsApproved(false)
	}

	const handleApprove = async () => {
		// In a real implementation, this would make an API call

		const response = await axios.post('/api/admin/flat/approve', {
			id: property.id,
			approve: true,
		})
		console.log(response.data)
		setIsApproved(true)
		alert('Property has been approved!')
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-IN', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="flex flex-col md:flex-row justify-between items-start mb-6">
				<div>
					<h1 className="text-3xl font-bold">{property.title}</h1>
					<div className="flex items-center mt-2">
						<MapPin className="w-4 h-4 mr-1 text-gray-500" />
						<p className="text-gray-600">
							{property.landmark}, {property.district}, {property.state}
						</p>
					</div>
				</div>
				<div className="flex items-center mt-4 md:mt-0">
					<Badge className={`mr-2 ${property.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
						{property.isActive ? 'Active' : 'Inactive'}
					</Badge>
					<Badge className={`${isApproved ? 'bg-green-500' : 'bg-yellow-500'}`}>
						{isApproved ? 'Approved' : 'Pending Approval'}
					</Badge>
				</div>
			</div>

			{!isApproved && (
				<Alert className="mb-6 bg-yellow-50 border-yellow-200">
					<AlertTitle className="flex items-center">
						<CircleX className="h-4 w-4 mr-2 text-yellow-600" />
						Admin Approval Required
					</AlertTitle>
					<AlertDescription>This property listing is awaiting your approval before it becomes visible to users.</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Section - Images */}
				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Property Images</CardTitle>
						</CardHeader>
						<CardContent>
							<Carousel className="w-full">
								<CarouselContent>
									{property.pictures.map((pic, index) => (
										<CarouselItem key={index}>
											<div className="p-1">
												<Card>
													<CardContent className="flex items-center justify-center p-2">
														<img src={pic} alt={`Property image ${index + 1}`} className="rounded-md object-cover h-64 w-full" />
													</CardContent>
												</Card>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious />
								<CarouselNext />
							</Carousel>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle className="flex items-center">
								<Video className="w-5 h-5 mr-2" />
								Property Video
							</CardTitle>
						</CardHeader>
						<CardContent>
							<video controls className="w-full rounded-md max-h-96" src={property.video} autoPlay muted>
								Your browser does not support the video tag.
							</video>
						</CardContent>
					</Card>

					<Card className="mt-6">
						<CardHeader>
							<CardTitle>Documents</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between p-4 border rounded-md">
								<div className="flex items-center">
									<FileText className="w-5 h-5 mr-3 text-blue-600" />
									<div>
										<p className="font-medium">NOC Document</p>
										<p className="text-sm text-gray-500">No Objection Certificate</p>
									</div>
								</div>
								<a
									href={property.nocDoc}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center text-blue-600 hover:underline">
									<span className="mr-1">View</span>
									<ExternalLink className="w-4 h-4" />
								</a>
							</div>

							<div className="flex items-center justify-between p-4 border rounded-md">
								<div className="flex items-center">
									<FileText className="w-5 h-5 mr-3 text-blue-600" />
									<div>
										<p className="font-medium">Terms and Conditions</p>
										<p className="text-sm text-gray-500">Rental agreement terms</p>
									</div>
								</div>
								<a
									href={property.termsOfConditionsDoc}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center text-blue-600 hover:underline">
									<span className="mr-1">View</span>
									<ExternalLink className="w-4 h-4" />
								</a>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Section - Details */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Property Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<p className="text-sm text-gray-500">Configuration</p>
								<p className="font-medium">{property.bhk}</p>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-500">Monthly Rent</p>
								<p className="font-medium">₹{property.price}</p>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-500">Security Deposit</p>
								<p className="font-medium">₹{property.securityAmount}</p>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-500">Location</p>
								<p className="font-medium">
									{property.landmark}, {property.district}
								</p>
								<p className="text-sm">
									{property.state}, {property.pincode}
								</p>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-500">Amenities</p>
								<div className="flex flex-wrap gap-2 mt-1">
									{property.amenities.map((amenity, index) => (
										<Badge key={index} variant="outline" className="bg-gray-100">
											{amenity}
										</Badge>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Submission Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<p className="text-sm text-gray-500">Property ID</p>
								<p className="font-medium">#{property.id}</p>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-500">User ID</p>
								<p className="font-medium truncate">{property.userId}</p>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-500">Created At</p>
								<div className="flex items-center">
									<Calendar className="w-4 h-4 mr-1 text-gray-500" />
									<p>{formatDate(property.createdAt.toISOString())}</p>
								</div>
							</div>
							<Separator />
							<div>
								<p className="text-sm text-gray-500">Last Updated</p>
								<div className="flex items-center">
									<Calendar className="w-4 h-4 mr-1 text-gray-500" />
									<p>{formatDate(property.updatedAt.toISOString())}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className={`${isApproved ? 'bg-green-50' : 'bg-yellow-50'}`}>
						<CardHeader>
							<CardTitle>Admin Actions</CardTitle>
						</CardHeader>
						<CardContent>
							{isApproved ? (
								<div className="flex items-center text-green-600">
									<Check className="w-5 h-5 mr-2" />
									<p>This property has been approved</p>
								</div>
							) : (
								<p className="mb-4">Review the property details and take action:</p>
							)}
						</CardContent>
						<CardFooter className="flex justify-between">
							{!isApproved && (
								<>
									<Button variant="outline">Reject</Button>
									<Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
										Approve Property
									</Button>
								</>
							)}
							{isApproved && (
								<Button variant="outline" onClick={handleRevertApproval} className="ml-auto">
									Revert Approval
								</Button>
							)}
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	)
}
