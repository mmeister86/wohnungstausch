"use client"
import * as React from "react"
import WohnungsCardHorizontal from "@/components/wohnungen/wohnungs-karte-horizontal"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { WohnungResponse } from "@/types"

function WohnungsCardHorizontalSkeleton() {
  return (
    <div className="flex flex-row hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-800 rounded-lg">
      {/* Bild Skeleton */}
      <Skeleton className="relative w-1/3 min-h-[200px] rounded-l-lg" />

      <div className="w-2/3 flex flex-col p-3">
        <div className="py-2 px-0">
          {/* Titel Skeleton */}
          <Skeleton className="h-6 w-3/4 mb-2" />
          {/* Adresse Skeleton */}
          <Skeleton className="h-4 w-2/3 mb-2" />
          {/* Beschreibung Skeleton */}
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Details Skeleton */}
        <div className="py-2 px-0">
          <div className="flex gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-1">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-auto py-2 px-0">
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </div>
  )
}

export default function CurrentOffers() {
  const [wohnungen, setWohnungen] = React.useState<WohnungResponse[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchWohnungen = async () => {
      try {
        const response = await fetch('/api/wohnungen?limit=6')
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Wohnungen')
        }
        const { data } = await response.json()
        setWohnungen(data)
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
                <div className="w-full max-w-3xl">
                  <WohnungsCardHorizontalSkeleton />
                </div>
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
