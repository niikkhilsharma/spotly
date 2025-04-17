import prisma from '@/lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { id, status } = await request.json()
		const approvedProperty = await prisma.marriageGarden.update({ where: { id: id }, data: { status: status } })
		return NextResponse.json({ success: true, message: 'Property approved successfully', approvedProperty })
	} catch (error) {
		console.log(error)
		return NextResponse.json({ success: false, message: 'Failed to approve property' })
	}
}
