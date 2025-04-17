import prisma from '@/lib/prisma/prisma'
import MarriageGardenDetailsPage from './gardenpage'

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
	const param = await params
	const id = param.id

	const gardenDetails = await prisma.marriageGarden.findUnique({ where: { id: id } })

	return <MarriageGardenDetailsPage gardenData={gardenDetails!} />
}
