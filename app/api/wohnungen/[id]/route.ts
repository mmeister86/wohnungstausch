import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma/edge';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json(
      { error: 'ID ist erforderlich' },
      { status: 400 }
    );
  }

  try {
    const wohnung = await prisma.wohnung.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        location: true,
        user: true,
      },
    });

    if (!wohnung) {
      return NextResponse.json(
        { error: 'Wohnung nicht gefunden' },
        { status: 404 }
      );
    }

    // Transform dates to ISO strings
    const response = {
      ...wohnung,
      createdAt: wohnung.createdAt.toISOString(),
      updatedAt: wohnung.updatedAt.toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching wohnung:', error);
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: 'Datenbankfehler', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Interner Server Fehler' },
      { status: 500 }
    );
  }
}
