import { NextResponse, NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    console.log('Geocoding request for query:', query)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&limit=1`
    console.log('Requesting URL:', url)

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Wohnungstausch/1.0'
      }
    })

    console.log('Nominatim response status:', response.status)
    
    if (!response.ok) {
      console.error('Nominatim error response:', await response.text())
      throw new Error(`Geocoding service error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Nominatim response data:', data)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Detailed geocoding error:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch coordinates' },
      { status: 500 }
    )
  }
}
