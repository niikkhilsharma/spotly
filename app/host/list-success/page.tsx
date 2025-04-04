import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ListingSuccessPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4">
			<div className="w-full max-w-md space-y-6 text-center">
				<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
					<CheckCircle className="h-10 w-10 text-green-600" />
				</div>
				<h1 className="text-2xl font-bold">Listing Submitted Successfully!</h1>
				<p className="text-muted-foreground">
					Your property listing has been submitted and is pending review. You will be notified once it is approved.
				</p>
				<div className="pt-4">
					<Link href="/">
						<Button className="w-full">Return to Home</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
