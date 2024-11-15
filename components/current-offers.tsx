"use client"
import * as React from "react"
import WohnungsCardHorizontal from "@/components/wohnungen/wohnungs-karte-horizontal"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Wohnung {
  id: string;
  titel: string;
  beschreibung: string | null;
  strasse: string;
  hausnummer: string;
  plz: string;
  stadt: string;
  flaeche: number;
  zimmer: number;
  miete: number;
  bilder: string[];
  stellplatz: boolean;
}

export default function CurrentOffers() {
  const [wohnungen, setWohnungen] = React.useState<Wohnung[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchWohnungen = async () => {
      try {
        const response = await fetch('/api/wohnungen')
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Wohnungen')
        }
        const data = await response.json()
        setWohnungen(data.slice(0, 6)) // Get only the 6 most recent apartments
      } catch (err) {
        console.error('Error fetching apartments:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWohnungen()
  }, [])

  return (
    <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl text-center mb-16">
          Aktuelle Wohnungsangebote
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            // Show loading placeholders
            [...Array(6)].map((_, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-3xl animate-pulse bg-gray-200 dark:bg-gray-800 h-40 rounded-xl"></div>
              </div>
            ))
          ) : wohnungen.length > 0 ? (
            // Show actual apartments
            wohnungen.map((wohnung) => (
              <div key={wohnung.id} className="flex justify-center">
                <div className="w-full max-w-3xl">
                  <WohnungsCardHorizontal wohnung={wohnung} />
                </div>
              </div>
            ))
          ) : (
            // Show message when no apartments are available
            <div className="col-span-2 text-center py-8 text-gray-500">
              Aktuell sind keine Wohnungsangebote verfügbar.
            </div>
          )}
        </div>
        <div className="text-center mt-12">
          <Link href="/wohnungen">
            <Button variant="outline" className="h-11 px-6 text-sm font-medium">
              Alle Angebote anzeigen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
