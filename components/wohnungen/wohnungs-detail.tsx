'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Euro, Square, Building, CarFront, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface WohnungsDetailProps {
  onClose?: () => void; // Optional, falls wir den Close-Button anzeigen wollen
}

export default function WohnungsDetail({ onClose }: WohnungsDetailProps) {
  // Angenommen, dies sind die Fotos aus der Datenbank
  const photos = [
    '/placeholder.svg?height=400&width=600&text=Foto+1',
    '/placeholder.svg?height=400&width=600&text=Foto+2',
    '/placeholder.svg?height=400&width=600&text=Foto+3',
    '/placeholder.svg?height=400&width=600&text=Foto+4',
    '/placeholder.svg?height=400&width=600&text=Foto+5',
  ]

  const [currentPhoto, setCurrentPhoto] = useState(0)

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg relative">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Schließen"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
      )}
      
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">Gemütliche 2-Zimmer-Wohnung in Kreuzberg</CardTitle>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
          <MapPin className="w-5 h-5 mr-2" />
          <span>Beispielstraße 123, 10997 Berlin</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={photos[currentPhoto]}
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
            {photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt={`Wohnungsfoto ${index + 1}`}
                width={100}
                height={100}
                className={`w-24 h-24 object-cover rounded cursor-pointer ${
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
            <span className="text-gray-700 dark:text-gray-200">70 m²</span>
          </div>
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-gray-700 dark:text-gray-200">3. Etage</span>
          </div>
          <div className="flex items-center space-x-2">
            <CarFront className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-gray-700 dark:text-gray-200">Stellplatz vorhanden</span>
          </div>
          <div className="flex items-center space-x-2">
            <Euro className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-gray-700 dark:text-gray-200">780 € Gesamtmiete</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Beschreibung</h3>
          <p className="text-gray-700 dark:text-gray-200">
            Diese gemütliche 2-Zimmer-Wohnung befindet sich im beliebten Berliner Stadtteil Kreuzberg. 
            Die Wohnung bietet einen offenen Wohnbereich mit moderner Küche, ein separates Schlafzimmer 
            und ein stilvolles Badezimmer. Die zentrale Lage ermöglicht einen schnellen Zugang zu 
            öffentlichen Verkehrsmitteln, Einkaufsmöglichkeiten und der vielfältigen Gastronomie des Viertels.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Mietdetails</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">Kaltmiete</p>
              <p className="text-gray-700 dark:text-gray-200">500 €</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">Nebenkosten</p>
              <p className="text-gray-700 dark:text-gray-200">150 €</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">Stromkosten</p>
              <p className="text-gray-700 dark:text-gray-200">50 €</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">Heizkosten</p>
              <p className="text-gray-700 dark:text-gray-200">80 €</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Kontakt</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">Name</p>
              <p className="text-gray-700 dark:text-gray-200">Max Mustermann</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">Dienstgrad</p>
              <p className="text-gray-700 dark:text-gray-200">Hauptfeldwebel</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">Telefon</p>
              <p className="text-gray-700 dark:text-gray-200">0123 45678900</p>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">E-Mail</p>
              <p className="text-gray-700 dark:text-gray-200">max.mustermann@bundeswehr.org</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg">Kontakt aufnehmen</Button>
        </div>

        <div className="pt-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Lage</h3>
          <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Kartenansicht hier einfügen</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
