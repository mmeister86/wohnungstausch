import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma/edge';
import { Prisma, Wohnung } from '@prisma/client';

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 Sekunde

interface WohnungLocation {
  coordinates: [number, number]; // Latitude and longitude as a tuple
  wohnungId: number;
}

interface WohnungUser {
  name: string;
  email: string;
  telefon: string;
}

interface TransformedWohnung {
  id: number;
  createdAt: string;
  updatedAt: string;
  titel: string;
  beschreibung?: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  stadt: string;
  flaeche: number;
  zimmer: number;
  miete: number;
  stellplatz: boolean;
  userId: string;
  bilder: string[];
  location?: WohnungLocation;
  user: WohnungUser;
}

interface ApiResponse {
  success: boolean;
  data?: TransformedWohnung;
  error?: string;
  details?: string;
  status?: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchWohnungByIdWithRetry(id: number, retries = MAX_RETRIES): Promise<ApiResponse> {
  try {
    console.log(`[API] Attempting to fetch wohnung with ID ${id} (attempt ${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)

    const wohnung = await prisma.wohnung.findUnique({
      where: {
        id: id
      },
      include: {
        user: true,
        location: true
      }
    })

    console.log('[API] Raw database response:', wohnung)

    if (!wohnung) {
      console.log(`[API] No wohnung found with ID ${id}`)
      return { 
        success: false, 
        error: 'Wohnung nicht gefunden',
        status: 404 
      }
    }

    // Transform the data to match the expected interface
    const transformedData: TransformedWohnung = {
      id: wohnung.id,
      createdAt: wohnung.createdAt.toISOString(),
      updatedAt: wohnung.updatedAt.toISOString(),
      titel: wohnung.titel,
      ...(wohnung.beschreibung && { beschreibung: wohnung.beschreibung }),
      strasse: wohnung.strasse,
      hausnummer: wohnung.hausnummer,
      plz: wohnung.plz,
      stadt: wohnung.stadt,
      flaeche: wohnung.flaeche,
      zimmer: wohnung.zimmer,
      miete: wohnung.miete,
      stellplatz: wohnung.stellplatz,
      userId: String(wohnung.userId),
      bilder: wohnung.bilder || [],
      location: wohnung.location && Array.isArray(wohnung.location.coordinates) && 
        wohnung.location.coordinates.length === 2 && 
        typeof wohnung.location.coordinates[0] === 'number' && 
        typeof wohnung.location.coordinates[1] === 'number' 
        ? {
            coordinates: wohnung.location.coordinates as [number, number],
            wohnungId: wohnung.location.wohnungId
          } 
        : undefined,
      user: {
        name: wohnung.user?.name || '',
        email: wohnung.user?.email || '',
        telefon: wohnung.user?.telefon || ''
      }
    }

    console.log('[API] Transformed data:', transformedData)
    return { success: true, data: transformedData }
  } catch (error) {
    console.error('[API] Error details:', {
      name: error instanceof Error ? error.name : 'Unknown error type',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      isPrismaError: error instanceof Prisma.PrismaClientKnownRequestError,
      errorCode: error instanceof Prisma.PrismaClientKnownRequestError ? error.code : undefined
    })
    
    if (retries <= 1) {
      let errorMessage = 'Ein Fehler ist aufgetreten beim Laden der Wohnung'
      let errorDetails = ''
      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2021':
            errorMessage = 'Die Datenbanktabelle existiert nicht'
            break
          case 'P2002':
            errorMessage = 'Ein Eindeutigkeitsfehler ist aufgetreten'
            break
          case 'P2025':
            errorMessage = 'Die Wohnung wurde nicht gefunden'
            break
          default:
            errorMessage = `Datenbankfehler (${error.code})`
        }
        errorDetails = error.message
      } else if (error instanceof Error) {
        errorDetails = error.message
      }
      
      return { 
        success: false, 
        error: errorMessage,
        details: errorDetails,
        status: 500
      }
    }
    
    await delay(RETRY_DELAY)
    return fetchWohnungByIdWithRetry(id, retries - 1)
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('[API] Received request for wohnung ID:', params.id)
  
  // Validate id parameter
  const id = parseInt(params.id)
  if (isNaN(id)) {
    console.error('[API] Invalid ID format:', params.id)
    return NextResponse.json(
      { error: 'Ungültige ID: ID muss eine Zahl sein' },
      { status: 400 }
    )
  }

  const result = await fetchWohnungByIdWithRetry(id)
  
  if (!result.success) {
    console.error('[API] Error response:', result)
    return NextResponse.json(
      { 
        error: result.error,
        details: result.details
      },
      { status: result.status }
    )
  }
  
  console.log('[API] Success response sent')
  return NextResponse.json(result.data)
}
