'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Euro, Square, Building, ParkingSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { geocodeAddress } from '@/lib/geocoding'

const PermanentLocationsMap = dynamic(
  () => import('@/components/permanent-locations-map'),
  { ssr: false }
)

interface WohnungsDetailProps {
  wohnung?: {
    id: string
    titel: string
    beschreibung: string | null
    strasse: string
    hausnummer: string
    plz: string
    stadt: string
    flaeche: number
    zimmer: number
    miete: number
    bilder: string[]
    stellplatz: boolean
    user: {
      name: string
      email: string
    }
  }
}

function WohnungsDetailSkeleton() {
  return (
    <Card className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <CardHeader>
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="flex items-center mt-2">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded mr-2 animate-pulse" />
          <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Bildergalerie Skeleton */}
        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />

          {/* Thumbnail Carousel Skeleton */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Beschreibung Skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>

        {/* Karte Skeleton */}
        <div className="h-[400px] rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />

        {/* Kontakt Skeleton */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
          <div className="space-y-2">
            <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function WohnungsDetail({ wohnung }: WohnungsDetailProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null)
  const [geocodingError, setGeocodingError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMapLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!wohnung) return;

    const { strasse, hausnummer, plz, stadt } = wohnung;

    async function loadCoordinates() {
      try {
        setGeocodingError(null);
        const result = await geocodeAddress(strasse, hausnummer, plz, stadt);
        if (result) {
          setCoordinates([result.lat, result.lon]);
        } else {
          setGeocodingError('Konnte die Adresse nicht finden');
        }
      } catch (error) {
        console.error('Error loading coordinates:', error);
        setGeocodingError('Fehler beim Laden der Koordinaten');
        setCoordinates(null);
      }
    }

    loadCoordinates()
  }, [wohnung])

  if (!wohnung) {
    return <WohnungsDetailSkeleton />
  }

  const { titel, beschreibung, strasse, hausnummer, plz, stadt, flaeche, zimmer, miete, bilder, user, stellplatz } = wohnung;
  console.log('Wohnung object:', wohnung);
  console.log('User data:', user);
  const adresse = `${strasse} ${hausnummer}, ${plz} ${stadt}`;

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % bilder.length)
  }

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + bilder.length) % bilder.length)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">{titel}</CardTitle>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{adresse}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 relative z-10">
        {/* Bildergalerie */}
        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <div className="absolute inset-0 flex items-center justify-between z-10 px-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPhoto}
                className="bg-white/80 hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextPhoto}
                className="bg-white/80 hover:bg-white"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <Image
              src={bilder[currentPhoto]}
              alt={`Foto ${currentPhoto + 1} von ${titel}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>

          {/* Thumbnail Carousel */}
          <div className="relative">
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2">
                {bilder.map((bild, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhoto(index)}
                    className={`flex-shrink-0 relative w-24 h-24 rounded-lg overflow-hidden transition-all hover:opacity-100 ${
                      currentPhoto === index ? '' : 'opacity-70'
                    }`}
                  >
                    <Image
                      src={bild}
                      alt={`Vorschau ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-2">
            <Square className="w-5 h-5 text-emerald-600" />
            <span className="text-lg">{flaeche} m²</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-emerald-600" />
            <span className="text-lg">{zimmer} Zimmer</span>
          </div>
          <div className="flex items-center space-x-2">
            <Euro className="w-5 h-5 text-emerald-600" />
            <span className="text-lg">{miete} €/Monat</span>
          </div>
          <div className="flex items-center space-x-2">
            <ParkingSquare className={`w-5 h-5 ${stellplatz ? 'text-emerald-600' : 'text-gray-400'}`} />
            <span className="text-lg">{stellplatz ? 'Stellplatz vorhanden' : 'Kein Stellplatz'}</span>
          </div>
        </div>

        {/* Beschreibung */}
        {beschreibung && (
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-4">Beschreibung</h3>
            <p className="whitespace-pre-wrap">{beschreibung}</p>
          </div>
        )}

        {/* Karte */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Standort</h3>
          {mapLoaded && (
            <div className="h-[400px] rounded-lg overflow-hidden">
              {geocodingError ? (
                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                  {geocodingError}
                </div>
              ) : (
                <PermanentLocationsMap 
                  currentApartmentCoordinates={coordinates ?? undefined}
                />
              )}
            </div>
          )}
        </div>

        {/* Kontakt */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
          <div className="space-y-2">
            {user?.name && (
              <p className="flex items-center">
                <span className="font-medium mr-2">Anbieter:</span>
                {user.name}
              </p>
            )}
            {user?.email && (
              <p className="flex items-center">
                <span className="font-medium mr-2">E-Mail:</span>
                <a href={`mailto:${user.email}`} className="text-emerald-600 hover:text-emerald-700">
                  {user.email}
                </a>
              </p>
            )}
            {!user?.name && !user?.email && (
              <p className="text-gray-500 italic">Keine Kontaktinformationen verfügbar</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
