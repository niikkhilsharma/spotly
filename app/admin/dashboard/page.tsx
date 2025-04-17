import { auth } from '@/auth'
import MaxWidthWrapper from '@/components/homepage/MaxWidthWrapper'
import prisma from '@/lib/prisma/prisma'
import { FlatCard } from './flatCard'
import MarriageGardenCard from './marriageGardenCard'

export default async function HostCenterPage() {
	const sesion = await auth()
	const user = sesion?.user
	console.log(user)

	if (!user) {
		return <MaxWidthWrapper>Please login to view this page</MaxWidthWrapper>
	}

	if (user.role === 'ADMIN') {
		const flat = await prisma.flat.findMany()
		const marriageGarden = await prisma.marriageGarden.findMany()
		console.log(flat)

		return (
			<MaxWidthWrapper className="p-8">
				<h1 className="text-3xl font-semibold text-center mb-4">Your Properties</h1>
				<div>
					<h2 className="text-xl font-bold mb-4">Flats</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{flat.map(flat => (
							<FlatCard key={flat.id} flatData={flat} />
						))}
					</div>
				</div>

				<div className="mt-10">
					<h2 className="text-xl font-bold mb-4">Marriage Gardens</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{marriageGarden.map(garden => (
							<MarriageGardenCard key={garden.id} gardenData={garden} />
						))}
					</div>
				</div>
			</MaxWidthWrapper>
		)
	}
}
