import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 Sekunde

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function fetchWohnungenWithRetry(retries = MAX_RETRIES): Promise<any> {
  try {
    const wohnungen = await prisma.wohnung.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            telefon: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return { success: true, data: wohnungen }
  } catch (error) {
    console.error(`Error fetching wohnungen (${MAX_RETRIES - retries + 1}/${MAX_RETRIES}):`, error)
    
    if (retries <= 1) {
      return { 
        success: false, 
        error: 'Datenbankverbindung fehlgeschlagen. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.' 
      }
    }
    
    await delay(RETRY_DELAY)
    return fetchWohnungenWithRetry(retries - 1)
  }
}

export async function GET() {
  const result = await fetchWohnungenWithRetry()
  
  if (!result.success) {
    return NextResponse.json(
      { error: result.error },
      { status: 500 }
    )
  }
  
  return NextResponse.json(result.data)
}
