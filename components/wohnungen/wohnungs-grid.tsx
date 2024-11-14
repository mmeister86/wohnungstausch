"use client"
import { useEffect, useState } from "react"
import WohnungsCard from "./wohnungs-karte"
import WohnungsCardHorizontal from "./wohnungs-karte-horizontal"
import { useWindowSize } from "@/hooks/useWindowSize"

interface Wohnung {
  id: number
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
          throw new Error('Fehler beim Laden der Wohnungen')
        }
        const data = await response.json()
        setWohnungen(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten')
      } finally {
        setIsLoading(false)
      }
    }

    fetchWohnungen()
  }, [])

  if (isLoading) {
    return <div className="container mx-auto py-8">Laden...</div>
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">{error}</div>
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
