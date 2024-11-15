'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Euro, Square, Building, CarFront, ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import type { Icon } from 'leaflet'

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

// Leaflet Marker Icon - only created on client side
// eslint-disable-next-line @typescript-eslint/no-require-imports
const markerIcon: Icon = typeof window === 'undefined' ? null : new (require('leaflet').Icon)({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface WohnungsDetailProps {
  wohnung: {
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
    user: {
      name: string
      email: string
    }
    stellplatz: boolean
  }
}

export default function WohnungsDetail({ wohnung }: WohnungsDetailProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    setMapLoaded(true)
  }, [])

  if (!wohnung) {
    return null;
  }

  const { titel, beschreibung, strasse, hausnummer, plz, stadt, flaeche, zimmer, miete, bilder, user, stellplatz } = wohnung;
  const adresse = `${strasse} ${hausnummer}, ${plz} ${stadt}`;

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % bilder.length)
  }

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + bilder.length) % bilder.length)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">{titel}</CardTitle>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{adresse}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Bildergalerie */}
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
            alt={`Wohnungsfoto ${currentPhoto + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentPhoto + 1} / {bilder.length}
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
            <CarFront className={`w-5 h-5 ${stellplatz ? 'text-emerald-600' : 'text-gray-400'}`} />
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
        {mapLoaded && (
          <div className="h-[400px] rounded-lg overflow-hidden">
            <MapContainer
              center={[51.1657, 10.4515]}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[51.1657, 10.4515]} icon={markerIcon} />
            </MapContainer>
          </div>
        )}

        {/* Kontakt */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
          <div className="space-y-2">
            <p className="flex items-center">
              <span className="font-medium mr-2">Anbieter:</span>
              {user.name}
            </p>
            <p className="flex items-center">
              <span className="font-medium mr-2">E-Mail:</span>
              <a href={`mailto:${user.email}`} className="text-emerald-600 hover:text-emerald-700">
                {user.email}
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
