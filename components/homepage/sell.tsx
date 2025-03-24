import React from 'react'
import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'

const Sell = () => {
	return (
		<div className="my-10">
			<div></div>
			<Carousel>
				<div className="flex justify-between gap-8">
					<h1 className="text-5xl max-w-[29ch]">Looking to Sell? Maximize Your Property's Potential</h1>

					<div>
						<div className="flex flex-col justify-between h-full min-w-[30ch] max-w-[30ch] top-0 right-0">
							<p className="font-medium text-xs opacity-70 w-full">
								Sell faster with our tools, reach more buyers, and get expert guidance every step of the way.
							</p>
							<div>
								{/* <CarouselPrevious /> */}
								<CarouselNext />
							</div>
						</div>
					</div>
				</div>
				<CarouselContent>
					<CarouselItem>
						<Image src={'/assets/client.png'} width={100} height={100} alt="image" />
					</CarouselItem>
					<CarouselItem>
						<Image src={'/assets/client.png'} width={100} height={100} alt="image" />
					</CarouselItem>
					<CarouselItem>
						<Image src={'/assets/client.png'} width={100} height={100} alt="image" />
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</div>
	)
}

export default Sell
