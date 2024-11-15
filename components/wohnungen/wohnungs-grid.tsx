"use client"
import { useEffect, useState } from "react"
import WohnungsCard from "./wohnungs-karte"
import WohnungsCardHorizontal from "./wohnungs-karte-horizontal"
import { useWindowSize } from "@/hooks/useWindowSize"

interface Wohnung {
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
}

export default function WohnungsGrid() {
  const [wohnungen, setWohnungen] = useState<Wohnung[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { width } = useWindowSize()

  useEffect(() => {
    const fetchWohnungen = async () => {
      try {
        const response = await fetch('/api/wohnungen')
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Fehler beim Laden der Wohnungen')
        }
        const data = await response.json()
        setWohnungen(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
        console.error('Fehler beim Laden der Wohnungen:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWohnungen()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Wohnungen...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    )
  }

  // Warte auf die Client-seitige Hydration
  if (typeof width === 'undefined') {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {wohnungen.map((wohnung) => (
          <div key={wohnung.id}>
            {width < 768 ? (
              <WohnungsCardHorizontal wohnung={wohnung} />
            ) : (
              <WohnungsCard wohnung={wohnung} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
