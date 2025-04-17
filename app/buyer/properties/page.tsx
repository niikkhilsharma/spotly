import MaxWidthWrapper from '@/components/homepage/MaxWidthWrapper'
import prisma from '@/lib/prisma/prisma'
import { FlatCard } from '@/components/buyer/flatCard'
import MarriageGardenCard from '@/components/buyer/marriageGardenCard'

export default async function Properties() {
	const allFlats = await prisma.flat.findMany({ where: { isActive: true, isApproved: true } })
	const marriageGarden = await prisma.marriageGarden.findMany({ where: { status: 'approved' } })

	return (
		<MaxWidthWrapper>
			<div>
				<h1 className="text-3xl font-semibold text-center">All Properties</h1>
				<h2 className="text-2xl font-semibold my-4">Flats</h2>
				<div className="flex gap-4 flex-wrap">
					{allFlats.map(flat => (
						<FlatCard key={flat.id} flatData={flat} />
					))}
				</div>

				<h2 className="text-2xl font-semibold my-4">Marriage Garden</h2>
				<div className="flex gap-4 flex-wrap">
					{marriageGarden.map(garden => (
						<MarriageGardenCard key={garden.id} gardenData={garden} />
					))}
				</div>
			</div>
		</MaxWidthWrapper>
	)
}
