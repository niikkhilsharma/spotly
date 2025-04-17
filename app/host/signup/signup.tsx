'use client'

import React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

import { Button, buttonVariants } from '@/components/ui/button'
import { Calendar } from '@/components/custom-calendar'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CountryDropdown } from '@/components/ui/country-dropdown'
import Link from 'next/link'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'First name must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	password: z.string().min(8, {
		message: 'Password must be at least 8 characters.',
	}),
	countryCode: z.string({ required_error: 'Country code is required.' }),
	phoneNumber: z.string().min(5, {
		message: 'Phone number must be at least 5 characters.',
	}),
	dateOfBirth: z.date({
		required_error: 'Date of birth is required.',
	}),
	profilePicture: z.instanceof(File).optional(),
})

export function SignupForm() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [profilePicture, setProfilePicture] = useState<string | null>(null)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			countryCode: '',
			phoneNumber: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)

		try {
			const formData = new FormData()

			// Add all form fields to FormData
			Object.entries(values).forEach(([key, value]) => {
				if (key === 'dateOfBirth') {
					formData.append(key, value?.toString())
				} else if (key === 'profilePicture' && value instanceof File) {
					formData.append(key, value)
				} else if (value !== undefined && value !== null) {
					formData.append(key, String(value))
				}
			})

			formData.append('role', 'SELLER')

			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				const error = await response.json()
				throw new Error(error.message || 'Registration failed')
			}

			toast('Registration successful', {
				description: 'Your account has been created. You can now log in.',
			})

			router.push('/host/login')
		} catch (error) {
			console.error('Registration error:', error)
			toast.error('Registration failed', {
				description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			form.setValue('profilePicture', file)

			// Create a preview
			const reader = new FileReader()
			reader.onload = () => {
				setProfilePicture(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className="max-w-md mx-auto border rounded-xl p-4">
			<h1 className="text-center font-medium text-xs mb-4 bg-secondary py-1 w-fit mx-auto px-2 rounded-full">
				Please fill this form to register as a <span className="px-1 ml-0.5 bg-amber-600 text-white rounded-full">Seller</span>
			</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="flex justify-center mb-6">
						<div className="relative">
							<Avatar className="h-24 w-24">
								<AvatarImage src={profilePicture || ''} alt="Profile picture" />
								<AvatarFallback>{form.watch('name')?.[0]}</AvatarFallback>
							</Avatar>
							<Input type="file" id="profilePicture" accept="image/*" className="sr-only" onChange={handleFileChange} />
							<Button
								type="button"
								variant="outline"
								size="sm"
								className="absolute bottom-0 right-0 rounded-full"
								onClick={() => document.getElementById('profilePicture')?.click()}>
								Upload
							</Button>
						</div>
					</div>

					<div className="grid">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="john.doe@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="********" {...field} />
								</FormControl>
								<FormDescription>Password must be at least 8 characters long.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<FormField
							control={form.control}
							name="countryCode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<CountryDropdown
										placeholder="Country"
										defaultValue={field.value}
										onChange={country => {
											field.onChange(country.countryCallingCodes[0])
										}}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input placeholder="5551234567" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="dateOfBirth"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Date of Birth</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
												{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											captionLayout="dropdown-buttons"
											selected={field.value}
											onSelect={field.onChange}
											fromYear={1960}
											toYear={new Date().getFullYear()} // Fix applied here
											disabled={date => date > new Date() || date < new Date('1900-01-01')}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating account...
							</>
						) : (
							'Create account'
						)}
					</Button>
				</form>
			</Form>
			<Link href={'/host/login'} className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 w-full')}>
				Login
			</Link>
		</div>
	)
}
