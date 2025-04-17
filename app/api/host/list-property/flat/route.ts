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
	const bhk = formdata.get('bhk')
	const price = formdata.get('price')
	const state = formdata.get('state')
	const district = formdata.get('district')
	const landmark = formdata.get('landmark')
	const title = formdata.get('title')
	const securityAmount = formdata.get('securityAmount')
	const amenities = formdata.getAll('amenities')

	const video = formdata.get('video') as File
	const nocDoc = formdata.get('nocDoc') as File
	const termsOfConditionsDoc = formdata.get('termsOfConditionsDoc') as File
	const pictures = formdata.getAll('pictures') as File[]

	const videoUrl = await uploadFileToCloudinary({ file: video, resourceType: 'video' })
	const noDocUrl = await uploadFileToCloudinary({ file: nocDoc })
	const termsOfConditionsDocUrl = await uploadFileToCloudinary({ file: termsOfConditionsDoc })
	const allpictureUrl = await Promise.all(pictures.map(picture => uploadFileToCloudinary({ file: picture })))

	try {
		// console.log(data)
		const newFlat = await prisma.flat.create({
			data: {
				bhk: bhk as string,
				price: price as string,
				state: state as string,
				district: district as string,
				landmark: landmark as string,
				title: title as string,
				pincode: landmark as string,
				securityAmount: securityAmount as string,
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
