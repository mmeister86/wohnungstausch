import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const wohnung = await prisma.wohnung.findUnique({
      where: {
        id: parseInt(params.id)
      },
      include: {
        user: {
          select: {
            id: true
          }
        },
        location: true
      }
    })

    if (!wohnung) {
      return NextResponse.json(
        { error: 'Wohnung nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json(wohnung)
  } catch (error) {
    console.error('Error fetching wohnung:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
