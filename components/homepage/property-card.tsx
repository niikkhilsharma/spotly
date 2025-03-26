import Image from 'next/image'

export default function PropertyCard({
	imageUrl,
	status,
	title,
	price,
	location,
	bedrooms,
}: {
	imageUrl: string
	status: string
	title: string
	price: string
	location: string
	bedrooms: string
}) {
	return (
		<div className="rounded-2xl p-4 overflow-hidden shadow-md bg-white">
			{/* Image Section */}
			<div className="relative rounded-2xl w-full overflow-hidden">
				<Image
					src={imageUrl}
					alt={title}
					width={500}
					height={500}
					objectFit="cover"
					className="rounded-2xl object-cover aspect-square hover:scale-125 transition-all duration-125"
				/>
				<div className="absolute top-4 left-4 bg-white text-black text-sm px-3 py-1 rounded-full shadow">{status}</div>
			</div>

			{/* Info Section */}
			<div className="p-4 mt-3">
				{/* Property Info */}
				<div className="flex items-center justify-between text-gray-500 text-sm mb-2">
					<div className="flex items-center gap-1">🛏️ {bedrooms}</div>
					{/* <div className="flex items-center gap-1">📏 {size}</div> */}
				</div>

				{/* Title */}
				<h2 className="text-lg font-semibold mb-1">{title}</h2>

				{/* Price and Location */}
				<div className="flex items-center gap-2 text-gray-700">
					<span className="text-black font-bold">{price}</span>
					<span>•</span>
					<span>{location}</span>
				</div>
			</div>
		</div>
	)
}
