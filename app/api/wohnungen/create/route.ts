import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('No valid authorization header')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized', 
          details: 'No valid authorization header'
        },
        { status: 401 }
      )
    }

    // Extract the token
    const token = authHeader.split(' ')[1]
    
    // Verify the token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    // Debug: Log authentication attempt
    console.log('Auth attempt:', {
      token: token.slice(0, 10) + '...',
      user,
      error: authError
    })

    if (authError || !user) {
      console.error('Authentication failed:', authError)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized', 
          details: 'Authentication failed',
          debug: { 
            error: authError
          }
        },
        { status: 401 }
      )
    }

    const data = await request.json()
    console.log('Received data:', data)

    // Debug: Log user information
    console.log('Authenticated user:', {
      id: user.id,
      email: user.email,
      role: user.role
    })
    
    try {
      // Get or update existing user
      const dbUser = await prisma.user.upsert({
        where: {
          id: user.id
        },
        update: {
          name: data.name,
          email: data.email,
          telefon: data.telefon
        },
        create: {
          id: user.id,
          name: data.name,
          email: data.email,
          telefon: data.telefon
        }
      })

      console.log('User upserted:', dbUser)

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
          userId: dbUser.id,
          bilder: data.bilder || [],
          stellplatz: data.stellplatz || false,
          updatedAt: new Date()
        }
      })

      console.log('Created wohnung:', wohnung)
      return NextResponse.json({ success: true, user: dbUser, wohnung })
    } catch (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }
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
