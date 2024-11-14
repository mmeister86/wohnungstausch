import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Zuerst den User erstellen
    const user = await prisma.user.create({
      data: {}
    })

    console.log('Created user:', user)
    
    // Berechne die Gesamtmiete
    const gesamtmiete = 
      (data.kaltmiete || 0) + 
      (data.nebenkosten || 0) + 
      (data.stromkosten || 0) + 
      (data.heizkosten || 0)

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
        miete: gesamtmiete,
        userId: user.id, // Verwende die ID des gerade erstellten Users
        bilder: data.bilder || []
      }
    })

    console.log('Created wohnung:', wohnung)
    return NextResponse.json({ user, wohnung })
  } catch (error) {
    console.error('Error creating wohnung:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      })
    }
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
