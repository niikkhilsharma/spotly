import prisma from '@/lib/prisma/prisma'
import FlatDetailsPage from './flatPage'

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
	const param = await params
	const id = param.id

	const flatDetails = await prisma.flat.findUnique({ where: { id: Number(id) } })

	return <FlatDetailsPage property={flatDetails!} />
}
