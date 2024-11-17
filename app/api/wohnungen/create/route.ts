import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received data:', data)
    
    // Erstelle den User mit den Kontaktdaten
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        telefon: data.telefon
      }
    })

    console.log('Created user:', user)

    const wohnung = await prisma.wohnung.create({
      data: {
        titel: data.titel,
        beschreibung: data.beschreibung,
        strasse: data.strasse,
        hausnummer: data.hausnummer,
        plz: data.plz,
        stadt: data.stadt,
        flaeche: parseFloat(data.flaeche),
        zimmer: parseInt(data.zimmer),
        miete: parseFloat(data.kaltmiete),
        userId: user.id,
        bilder: data.bilder || [],
        stellplatz: data.stellplatz || false,
        updatedAt: new Date()
      }
    })

    console.log('Created wohnung:', wohnung)
    return NextResponse.json({ success: true, user, wohnung })
  } catch (error) {
    console.error('Error creating wohnung:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      })
    }
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
