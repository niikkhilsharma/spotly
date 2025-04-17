import FAQ from '@/components/homepage/faq'
import Features from '@/components/homepage/features'
import Hero from '@/components/homepage/hero'
import MaxWidthWrapper from '@/components/homepage/MaxWidthWrapper'
import Sell from '@/components/homepage/sell'
import Listings from '@/components/homepage/listings'

export default async function Home() {
	return (
		<>
			<MaxWidthWrapper>
				<Hero />
				<Features />
				<Sell />
				<Listings />
				<FAQ />
			</MaxWidthWrapper>
		</>
	)
}
