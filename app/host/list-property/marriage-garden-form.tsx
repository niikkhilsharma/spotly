'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function MarriageGardenForm() {
	const allFacilities = ['Music system', 'DJ', 'Sound box', 'LED TV']

	const [formData, setFormData] = useState({
		propertyType: '',
		address: '',
		propertyDocuments: null as File | null,
		hostingFacilities: [] as string[],
		contact: '',
		noc: null as File | null,
		fireCert: null as File | null,
		fssaiCert: null as File | null,
		marriageNoc: null as File | null,
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target
		if (files && files.length > 0) {
			setFormData(prev => ({ ...prev, [name]: files[0] }))
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const data = new FormData()
		data.append('propertyType', formData.propertyType)
		data.append('address', formData.address)
		data.append('contact', formData.contact)
		data.append('propertyDocuments', formData.propertyDocuments || '')
		data.append('noc', formData.noc || '')
		data.append('fireCert', formData.fireCert || '')
		data.append('fssaiCert', formData.fssaiCert || '')
		data.append('marriageNoc', formData.marriageNoc || '')
		formData.hostingFacilities.forEach(facility => data.append('hostingFacilities[]', facility))

		console.log('Submitted Marriage Garden Form:', formData)
	}

	return (
		<div className="max-w-screen-xl mx-auto bg-white shadow-sm rounded-2xl p-8 mt-10">
			<h2 className="text-2xl font-semibold mb-4">Marriage Garden Form</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Property Type */}
				<div>
					<Label className="mb-2">Garden Property Type</Label>
					<Select onValueChange={value => setFormData(prev => ({ ...prev, propertyType: value }))}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Type A">Type A (2k people, 100 rooms with AC)</SelectItem>
							<SelectItem value="Type B">Type B</SelectItem>
							<SelectItem value="Type C">Type C</SelectItem>
							<SelectItem value="Type D">Type D</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Address */}
				<div>
					<Label className="mb-2">Location Address</Label>
					<Textarea name="address" onChange={handleInputChange} className="resize-none" />
				</div>

				{/* Property Documents */}
				<div>
					<Label className="mb-2">Property Documents</Label>
					<Input type="file" name="propertyDocuments" onChange={handleFileChange} />
				</div>

				{/* Hosting Facilities */}
				<div>
					<Label className="mb-2">Hosting Facilities</Label>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="w-full justify-between">
								{formData.hostingFacilities.length > 0 ? `${formData.hostingFacilities.length} selected` : 'Select Facilities'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="p-2 space-y-1 w-[var(--radix-popover-trigger-width)] max-w-full">
							{allFacilities.map(facility => (
								<div
									key={facility}
									className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
									onClick={() =>
										setFormData(prev => {
											const alreadySelected = prev.hostingFacilities.includes(facility)
											const updatedFacilities = alreadySelected
												? prev.hostingFacilities.filter(f => f !== facility)
												: [...prev.hostingFacilities, facility]

											return {
												...prev,
												hostingFacilities: updatedFacilities,
											}
										})
									}>
									<span>{facility}</span>
									{formData.hostingFacilities.includes(facility) && <Check className="w-4 h-4" />}
								</div>
							))}
						</PopoverContent>
					</Popover>
				</div>

				{/* Contact */}
				<div>
					<Label className="mb-2">Management Contact</Label>
					<Input type="text" name="contact" onChange={handleInputChange} />
				</div>

				{/* File Uploads */}
				<div className="flex flex-wrap gap-4">
					<div className="flex-1 min-w-[200px]">
						<Label className="mb-2">NOC Certificate</Label>
						<Input type="file" name="noc" onChange={handleFileChange} />
					</div>
					<div className="flex-1 min-w-[200px]">
						<Label className="mb-2">Fire Safety Certificate</Label>
						<Input type="file" name="fireCert" onChange={handleFileChange} />
					</div>
					<div className="flex-1 min-w-[200px]">
						<Label className="mb-2">FSSAI Certificate</Label>
						<Input type="file" name="fssaiCert" onChange={handleFileChange} />
					</div>
					<div className="flex-1 min-w-[200px]">
						<Label className="mb-2">Marriage NOC</Label>
						<Input type="file" name="marriageNoc" onChange={handleFileChange} />
					</div>
				</div>

				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</div>
	)
}
