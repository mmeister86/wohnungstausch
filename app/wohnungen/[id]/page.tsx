'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import WohnungsDetail, { WohnungsDetailSkeleton } from '@/components/wohnungen/wohnungs-detail'
import WohnungsKontakt, { WohnungsKontaktSkeleton } from '@/components/wohnungen/wohnungs-kontakt'
import { ArrowLeft } from 'lucide-react'

interface GeoJSONPoint {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

interface Wohnung {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  titel: string;
  beschreibung: string | null;
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
  location?: {
    coordinates: GeoJSONPoint;
    wohnungId: number;
  };
  user: {
    name: string;
    email: string;
    telefon: string;
  };
}

interface WohnungDetailsPageProps {
  params: {
    id: string
  }
}

export default function WohnungDetailsPage({ params }: WohnungDetailsPageProps) {
  const [wohnung, setWohnung] = useState<Wohnung | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchWohnung = async () => {
      // Wenn wir bereits Daten haben, zeigen wir den Refresh-Indikator
      if (wohnung) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }
      setError(null)
      try {
        console.log('Fetching wohnung with ID:', params.id)
        const response = await fetch(`/api/wohnungen/${params.id}`)
        console.log('Response status:', response.status)
        const data = await response.json()
        console.log('Response data:', data)
        console.log('Location data:', data.location)
        console.log('Coordinates:', data.location?.coordinates)

        if (!response.ok) {
          if (response.status === 404) {
            console.log('Wohnung not found, redirecting to 404')
            router.push('/not-found')
            return
          }
          throw new Error(data.error || 'Fehler beim Laden der Wohnung')
        }

        if (!data || typeof data !== 'object') {
          console.error('Invalid response data:', data)
          throw new Error('Ungültige Daten vom Server erhalten')
        }

        setWohnung(data)
      } catch (error) {
        console.error('Error fetching wohnung:', error)
        if (error instanceof Error) {
          console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
          })
        }
        setError(
          error instanceof Error
            ? `${error.message}${error.cause ? ` (${error.cause})` : ''}`
            : 'Ein unbekannter Fehler ist aufgetreten'
        )
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    }

    if (params.id) {
      fetchWohnung()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Link href="/wohnungen" className="inline-flex items-center mb-4 text-green-600 hover:text-green-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Übersicht
        </Link>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <WohnungsDetailSkeleton />
          </div>
          <aside className="w-full md:w-1/4 sticky top-[84px] h-fit">
            <WohnungsKontaktSkeleton />
          </aside>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/wohnungen" className="inline-flex items-center mb-4 text-green-600 hover:text-green-800">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Zurück zur Übersicht
      </Link>
      {error ? (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <p className="font-bold">Fehler</p>
          <p>{error}</p>
        </div>
      ) : wohnung ? (
        <div className="flex flex-col md:flex-row gap-4">
          {isRefreshing && (
            <div className="absolute top-0 left-0 w-full h-1">
              <div className="h-full bg-green-600 animate-pulse"></div>
            </div>
          )}
          <div className="w-full md:w-3/4">
            <WohnungsDetail wohnung={wohnung} />
          </div>
          <aside className="w-full md:w-1/4 sticky top-[84px] h-fit">
            <WohnungsKontakt user={wohnung.user} />
          </aside>
        </div>
      ) : (
        <div className="p-4 text-gray-600">Lädt...</div>
      )}
    </div>
  )
}
