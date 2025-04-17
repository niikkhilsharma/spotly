import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const formDataToObject = (formData: FormData): Record<string, FormDataEntryValue | FormDataEntryValue[]> => {
	const obj: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {}

	for (const [key, value] of formData.entries()) {
		if (key in obj) {
			const existing = obj[key]
			if (Array.isArray(existing)) {
				existing.push(value)
			} else {
				obj[key] = [existing, value]
			}
		} else {
			obj[key] = value
		}
	}

	return obj
}

export async function uploadFileToCloudinary({
	file,
	resourceType = 'image',
}: {
	file: File
	resourceType?: 'image' | 'video' | 'raw'
}): Promise<string> {
	const arrayBuffer = await file.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream({ resource_type: resourceType }, (error, result) => {
				if (error) reject(error)
				else resolve(result!.secure_url) // Directly resolve with the URL
			})
			.end(buffer)
	})
}
