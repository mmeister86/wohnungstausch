'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Euro, Square, Building, CarFront, ChevronLeft, ChevronRight, X } from 'lucide-react'
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
  }
  onClose?: () => void
}

export default function WohnungsDetail({ wohnung, onClose }: WohnungsDetailProps) {
  if (!wohnung) {
    return null;
  }

  const { titel, beschreibung, strasse, hausnummer, plz, stadt, flaeche, zimmer, miete, bilder } = wohnung;
  const adresse = `${strasse} ${hausnummer}, ${plz} ${stadt}`;

  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    setMapLoaded(true)
  }, [])

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % bilder.length)
  }

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + bilder.length) % bilder.length)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg relative">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 mt-5 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Schließen"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
      )}
      
      <CardHeader>
        <CardTitle className="mt-5 text-3xl font-bold text-gray-800 dark:text-gray-100">{titel}</CardTitle>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{adresse}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={bilder[currentPhoto]}
              alt={`Wohnungsfoto ${currentPhoto + 1}`}
              width={600}
              height={400}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevPhoto}
              aria-label="Vorheriges Foto"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextPhoto}
              aria-label="Nächstes Foto"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {bilder.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt={`Wohnungsfoto ${index + 1}`}
                width={100}
                height={100}
                className={`w-24 h-24 object-cover rounded cursor-pointer ml-1 mt-1 ${
                  index === currentPhoto ? 'ring-2 ring-emerald-600' : ''
                }`}
                onClick={() => setCurrentPhoto(index)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex items-center space-x-2">
            <Square className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-gray-700 dark:text-gray-200">{flaeche} m²</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-gray-700 dark:text-gray-200">{zimmer} Zimmer</span>
          </div>
          <div className="flex items-center space-x-2">
            <Euro className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-gray-700 dark:text-gray-200">{miete} € Gesamtmiete</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Beschreibung</h3>
          <p className="text-gray-700 dark:text-gray-200">{beschreibung}</p>
        </div>

        <div className="pt-4">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg">Kontakt aufnehmen</Button>
        </div>

        <div className="pt-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Lage</h3>
          {mapLoaded && (
            <MapContainer center={[52.505, 13.361]} zoom={13} scrollWheelZoom={false} className="w-full h-[300px] rounded-lg">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[52.505, 13.361]} icon={markerIcon} />
            </MapContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
