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
      }
    }

    fetchWohnung()
  }, [params.id, router])

  return (
    <div className="container mx-auto py-8">
      <Link href="/wohnungen" className="inline-flex items-center mb-4 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Zurück zur Übersicht
      </Link>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <WohnungsDetail wohnung={wohnung} />
      )}
    </div>
  )
}
