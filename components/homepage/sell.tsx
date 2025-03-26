'use client'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import MaxWidthWrapper from './MaxWidthWrapper'
import { PrevButton, NextButton, usePrevNextButtons } from '../ui/embla-carouse-arrow-buttons'
import { Button } from '../ui/button'

const Sell = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

	const standOuts = [
		{
			heading: 'Wide Range of Options',
			content: 'We offer a variety of venues and properties — from party halls to rental homes — all at competitive prices.',
			image: '/homepage/connect0.avif',
		},
		{
			heading: 'Expert Recommendations',
			content: 'Our team understands the local market well and helps you find the perfect venue based on your preferences.',
			image: '/homepage/connect.avif',
		},
		{
			heading: '24/7 Support',
			content: 'Our dedicated support team is available around the clock to assist you with your booking or rental needs.',
			image: '/homepage/connect2.avif',
		},
		{
			heading: 'Seamless Booking Process',
			content:
				'Our intuitive booking system ensures a hassle-free experience, allowing you to secure your venue in just a few clicks.',
			image: '/homepage/connect3.avif',
		},
		{
			heading: 'Seamless Booking Process',
			content:
				'Our intuitive booking system ensures a hassle-free experience, allowing you to secure your venue in just a few clicks.',
			image: '/homepage/connect4.avif',
		},
		{
			heading: 'Seamless Booking Process',
			content:
				'Our intuitive booking system ensures a hassle-free experience, allowing you to secure your venue in just a few clicks.',
			image: '/homepage/connect5.avif',
		},
	]

	return (
		<MaxWidthWrapper className="my-10 overflow-hidden">
			<div className="flex justify-between gap-8">
				<h1 className="text-5xl">
					Looking to Sell? Maximize Your <br /> Property's Potential
				</h1>

				<div>
					<div className="flex flex-col justify-between h-full min-w-[30ch] max-w-[30ch] top-0 right-0">
						<div>
							<p className="font-medium text-xs opacity-70 w-full">
								Sell faster with our tools, reach more buyers, and get expert guidance every step of the way.
							</p>
							<div className="flex justify-start items-start gap-4 mt-4">
								<Button asChild variant={'outline'} size={'icon'} className="rounded-full">
									<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
								</Button>
								<Button asChild variant={'outline'} size={'icon'} className="rounded-full">
									<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
								</Button>
							</div>
						</div>
						<div className="mt-24">
							<div className="embla max-w-screen-xl" ref={emblaRef}>
								<div className="embla__container max-w-screen-xl flex justify-start gap-4">
									{standOuts.map((item, index) => (
										<div className="embla__slide" key={index}>
											<div className="w-80 min-w-80 h-72 aspect-square relative rounded-2xl overflow-hidden" key={index}>
												<Image
													src={item.image}
													width={1080}
													height={1080}
													alt="image"
													className="aspect-square bg-cover w-full h-full"
													unoptimized
												/>
												<div className="absolute bottom-0 w-full h-56 bg-gradient-to-t from-black to-transparent blur-sm"></div>
												<div className="absolute bottom-0 p-8">
													<h2 className="text-xl text-white font-medium">{item.heading}</h2>
													<p className="text-xs mt-2 text-white/70">{item.content}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	)
}

export default Sell
