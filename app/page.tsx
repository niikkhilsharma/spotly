import React from 'react'
import Footer from '@/components/homepage/footer'
import FAQ from '@/components/homepage/faq'
import Features from '@/components/homepage/features'
import Hero from '@/components/homepage/hero'
import MaxWidthWrapper from '@/components/homepage/wrapper'
import Sell from '@/components/homepage/sell'
import Listings from '@/components/homepage/listings'

export default function Home() {
	return (
		<MaxWidthWrapper>
			<Hero />
			<Features />
			<Sell />
			<Listings />
			<FAQ />
		</MaxWidthWrapper>
	)
}
