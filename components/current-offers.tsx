"use client"
import * as React from "react"
import WohnungsCardHorizontal from "@/components/wohnungen/wohnungs-karte-horizontal"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WohnungResponse } from "@/types"

function WohnungsCardHorizontalSkeleton() {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Bild Skeleton */}
        <div className="relative w-full md:w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        
        <div className="flex-1 space-y-4">
          {/* Titel Skeleton */}
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          
          {/* Details Grid Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
          
          {/* Beschreibung Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
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
        const response = await fetch('/api/wohnungen')
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Wohnungen')
        }
        const { data } = await response.json()
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
