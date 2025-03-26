import { cn } from '@/lib/utils'
import React from 'react'

interface MaxWidthWrapperProps {
	children: React.ReactNode
	className?: string
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({ children, className }) => {
	return <div className={cn('p-4 max-w-screen-xl mx-auto', className)}>{children}</div>
}

export default MaxWidthWrapper
