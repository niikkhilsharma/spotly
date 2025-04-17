import prisma from '@/lib/prisma/prisma'
import { uploadFileToCloudinary } from '@/utils/utils-functions'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST(request: Request) {
	const session = await auth()
	if (!session) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	const user = session.user

	const formdata = await request.formData()

	// Extract form fields
	const propertyType = formdata.get('propertyType')
	const state = formdata.get('state')
	const district = formdata.get('district')
	const landmark = formdata.get('landmark')
	const pincode = formdata.get('pincode')
	const contact = formdata.get('contact')
	const hostingFacilities = formdata.getAll('hostingFacilities')

	// Extract files
	const propertyDocuments = formdata.get('propertyDocuments') as File
	const noc = formdata.get('noc') as File | null
	const fireCert = formdata.get('fireCert') as File | null
	const fssaiCert = formdata.get('fssaiCert') as File | null
	const marriageNoc = formdata.get('marriageNoc') as File | null

	// Extract venue images
	const venueImages = formdata.getAll('venueImages') as File[]

	// Validate required fields
	if (!propertyType || !state || !district || !landmark || !pincode || !contact || !propertyDocuments) {
		return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
	}

	if (!hostingFacilities || hostingFacilities.length === 0) {
		return NextResponse.json({ error: 'At least one hosting facility must be selected' }, { status: 400 })
	}

	if (!venueImages || venueImages.length === 0) {
		return NextResponse.json({ error: 'At least one venue image must be uploaded' }, { status: 400 })
	}

	try {
		// Upload files to Cloudinary
		const propertyDocumentsUrl = await uploadFileToCloudinary({ file: propertyDocuments })

		// Upload optional files if they exist
		const nocUrl = noc ? await uploadFileToCloudinary({ file: noc }) : null
		const fireCertUrl = fireCert ? await uploadFileToCloudinary({ file: fireCert }) : null
		const fssaiCertUrl = fssaiCert ? await uploadFileToCloudinary({ file: fssaiCert }) : null
		const marriageNocUrl = marriageNoc ? await uploadFileToCloudinary({ file: marriageNoc }) : null

		// Upload venue images
		const venueImageUrls = await Promise.all(venueImages.map(image => uploadFileToCloudinary({ file: image })))

		// Create marriage garden record in database
		const newMarriageGarden = await prisma.marriageGarden.create({
			data: {
				propertyType: propertyType as string,
				state: state as string,
				district: district as string,
				landmark: landmark as string,
				pincode: pincode as string,
				contact: contact as string,
				hostingFacilities: hostingFacilities as string[],
				propertyDocuments: propertyDocumentsUrl,
				noc: nocUrl,
				fireCert: fireCertUrl,
				fssaiCert: fssaiCertUrl,
				marriageNoc: marriageNocUrl,
				venueImages: venueImageUrls,
				userId: user.id!,
				status: 'pending',
			},
		})

		return NextResponse.json({
			success: true,
			message: 'Marriage garden listed successfully',
			data: newMarriageGarden,
		})
	} catch (error) {
		console.error('Error creating marriage garden listing:', error)
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
