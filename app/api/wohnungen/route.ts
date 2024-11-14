import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const wohnungen = await prisma.wohnung.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(wohnungen)
  } catch (error) {
    console.error('Error fetching wohnungen:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
