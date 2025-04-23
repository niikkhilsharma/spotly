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
	console.log(user)

	const formdata = await request.formData()
	const bhk = formdata.get('bhk')
	const price = formdata.get('price')
	const state = formdata.get('state')
	const city = formdata.get('city')
	const landmark = formdata.get('landmark')
	const title = formdata.get('title')
	const securityAmount = formdata.get('securityAmount')
	const pincode = formdata.get('pincode')
	const mapLocation = formdata.get('mapLocation')
	const amenities = formdata.getAll('amenities')

	const video = formdata.get('video') as File
	console.log(video, typeof video)
	const nocDoc = formdata.get('nocDoc') as File
	const termsOfConditionsDoc = formdata.get('termsOfConditionsDoc') as File
	const pictures = formdata.getAll('pictures') as File[]

	const videoUrl = await uploadFileToCloudinary({ file: video, resourceType: 'video' })
	const noDocUrl = await uploadFileToCloudinary({ file: nocDoc })
	const termsOfConditionsDocUrl = await uploadFileToCloudinary({ file: termsOfConditionsDoc })
	const allpictureUrl = await Promise.all(pictures.map(picture => uploadFileToCloudinary({ file: picture })))

	if (!user?.id) {
		return NextResponse.json({ error: 'User ID not found in session' }, { status: 400 })
	}

	try {
		// console.log(data)
		const newFlat = await prisma.flat.create({
			data: {
				bhk: bhk as string,
				price: price as string,
				state: state as string,
				city: city as string,
				landmark: landmark as string,
				title: title as string,
				pincode: pincode as string,
				securityAmount: securityAmount as string,
				mapLocation: mapLocation as string,
				amenities: amenities as string[],
				nocDoc: noDocUrl,
				video: videoUrl,
				termsOfConditionsDoc: termsOfConditionsDocUrl,
				pictures: allpictureUrl as string[],
				userId: user.id!,
			},
		})
		return NextResponse.json(newFlat)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
