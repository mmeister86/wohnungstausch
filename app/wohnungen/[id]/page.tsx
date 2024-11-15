'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import WohnungsDetail from '@/components/wohnungen/wohnungs-detail'
import { Button } from '@/components/ui/button'
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
  };
}

interface WohnungDetailsPageProps {
  params: {
    id: string
  }
}

export default function WohnungDetailsPage({ params }: WohnungDetailsPageProps) {
  const [wohnung, setWohnung] = useState<Wohnung | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchWohnung = async () => {
      try {
        const response = await fetch(`/api/wohnungen/${params.id}`)
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/not-found')
            return
          }
          throw new Error('Fehler beim Laden der Wohnung')
        }
        const data = await response.json()
        setWohnung(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten')
      } finally {
        setIsLoading(false)
      }
    }

    fetchWohnung()
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-red-500">{error}</div>
        <Button
          onClick={() => router.push('/wohnungen')}
          className="mt-4"
        >
          Zurück zur Übersicht
        </Button>
      </div>
    )
  }

  if (!wohnung) {
    router.push('/not-found')
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link
          href="/wohnungen"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zur Übersicht
        </Link>
      </div>
      <WohnungsDetail wohnung={wohnung} />
    </div>
  )
}
