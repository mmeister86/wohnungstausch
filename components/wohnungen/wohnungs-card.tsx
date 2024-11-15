"use client"

import Link from "next/link"
import { MapPin, Euro, Home, Bed } from "lucide-react"

type WohnungProps = {
  wohnung: {
    id: string
    titel: string
    beschreibung: string
    strasse: string
    plz: string
    ort: string
    kaltmiete: number
    warmmiete: number
    wohnflaeche: number
    zimmer: number
    stellplatz: boolean
    user: {
      name: string
      email: string
      telefon: string
    }
  }
}

export function WohnungsCard({ wohnung }: WohnungProps) {
  return (
    <Link href={`/wohnungen/${wohnung.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">{wohnung.titel}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {wohnung.beschreibung}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
            {wohnung.plz} {wohnung.ort}
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Euro className="h-4 w-4 mr-2 text-emerald-500" />
            {wohnung.kaltmiete}€ kalt / {wohnung.warmmiete}€ warm
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Home className="h-4 w-4 mr-2 text-emerald-500" />
            {wohnung.wohnflaeche}m²
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Bed className="h-4 w-4 mr-2 text-emerald-500" />
            {wohnung.zimmer} {wohnung.zimmer === 1 ? 'Zimmer' : 'Zimmer'}
          </div>
        </div>
      </div>
    </Link>
  )
}
