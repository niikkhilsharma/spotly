// import Accordion from './accordtion'
import { clsx } from 'clsx'
import Image from 'next/image'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqData = [
	{
		title: 'How do I list my property on Spotly?',
		content:
			'Join a growing community of satisfied users who rely on Spotly for a seamless booking and property management experience.',
	},
	{
		title: "What's the process for booking a venue through Spotly?",
		content:
			'The process is simple! Sign up, browse listings, select your preferred venue, and confirm your booking with ease.',
	},
	{
		title: 'How does Spotly verify listings?',
		content: 'Spotly verifies listings through a combination of AI and manual review to ensure accuracy and authenticity.',
	},
	{
		title: 'Are there fees for booking a venue?',
		content: 'Spotly offers competitive rates. Venue owners are charged a small percentage upon a successful booking.',
	},
	{
		title: 'How can I schedule a visit to a venue?',
		content: 'Use the scheduling feature on each venue listing page to book a visit at your convenience.',
	},
]

const FAQ = () => {
	return (
		<div className="flex gap-8 justify-between my-10">
			<div className="w-1/2 py-12">
				<h2 className="text-4xl mt-0 mb-16">
					Frequently Asked <br />
					Questions
				</h2>
				<Accordion type="single" collapsible className="space-y-4">
					{faqData.map((item, index) => (
						<div key={index} className="border rounded-xl px-4">
							<AccordionItem value={`item-${index + 1}`}>
								<AccordionTrigger className="text-xl">{item.title}</AccordionTrigger>
								<AccordionContent>{item.content}</AccordionContent>
							</AccordionItem>
						</div>
					))}
				</Accordion>
			</div>
			<div className="w-1/2 py-12">
				<h2 className="text-sm mb-16 font-medium  text-gray-600">
					At <span className="text-orange-500 font-medium">Spotly</span>, we go beyond just bookings. We’re here to provide a
					seamless, transparent, and trusted experience for finding and managing spaces. With advanced technology, industry
					expertise, and a customer-first approach, we make booking or selling flats, marriage gardens, and restaurants for
					parties simple and successful.
				</h2>
				<Image width={3000} src={'/assets/house.png'} height={2000} alt="hlo" className="rounded-xl w-full" />
			</div>
		</div>
	)
}

export default FAQ
