import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'

export async function POST(request: Request) {
	try {
		const data = await request.json()
		console.log(data)
		return NextResponse.json({ message: 'hello' })
		// In a real application, you would handle file uploads to a storage service
		// and get back URLs to store in the database
		// For this example, we'll assume the photo URLs are already available

		// Create the property with nested relations
		const property = await prisma.property.create({
			data: {
				title: data.title,
				description: data.description.text,
				propertyType: data.propertyType,
				placeType: data.placeType,
				price: data.price,
				// For demo purposes, we're using a hardcoded user ID
				// In a real app, this would come from the authenticated user
				userId: 'user123',

				// Create address
				address: {
					create: {
						line1: data.location.address.line1,
						line2: data.location.address.line2 || '',
						district: data.location.address.district,
						city: data.location.address.city,
						state: data.location.address.state,
						pincode: data.location.address.pincode,
						lat: data.location.coordinates.lat,
						lng: data.location.coordinates.lng,
					},
				},

				// Create basics
				basics: {
					create: {
						guests: data.basics.guests,
						bedrooms: data.basics.bedrooms,
						beds: data.basics.beds,
						bathrooms: data.basics.bathrooms,
					},
				},

				// Create photos
				photos: {
					create: data.photos.map((url: string, index: number) => ({
						url,
						order: index,
					})),
				},

				// Create security
				security: {
					create: {
						hasCamera: data.security.hasCamera,
						hasNoiseMonitor: data.security.hasNoiseMonitor,
						hasWeapons: data.security.hasWeapons,
					},
				},
			},
		})

		// Connect amenities (first create if they don't exist)
		if (data.amenities.length > 0) {
			// For each amenity, connect or create
			for (const amenityName of data.amenities) {
				// Find or create the amenity
				const amenity = await prisma.amenity.upsert({
					where: { name: amenityName },
					update: {},
					create: { name: amenityName },
				})

				// Connect the amenity to the property
				await prisma.property.update({
					where: { id: property.id },
					data: {
						amenities: {
							connect: { id: amenity.id },
						},
					},
				})
			}
		}

		// Handle verification separately (in a real app, this would involve file uploads)
		if (data.verification.photo && data.verification.document) {
			// In a real app, these would be URLs from your file storage service
			const photoUrl = 'https://example.com/photos/user-photo.jpg'
			const documentUrl = 'https://example.com/documents/user-document.jpg'

			await prisma.verification.create({
				data: {
					photoUrl,
					documentUrl,
					documentType: data.verification.documentType,
					propertyId: property.id,
				},
			})
		}

		return NextResponse.json({
			success: true,
			message: 'Property listing created successfully',
			propertyId: property.id,
		})
	} catch (error) {
		console.error('Error creating property listing:', error)
		return NextResponse.json(
			{ success: false, message: 'Failed to create property listing', error: String(error) },
			{ status: 500 }
		)
	}
}
