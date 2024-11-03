"use client"
import WohnungsCard from "./wohnungs-karte" 

export default function WohnungsGrid() {
  // Erstellen eines Arrays mit 20 Elementen (4 Spalten x 5 Reihen)
  const wohnungen = Array(20).fill(null)

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {wohnungen.map((_, index) => (
          <WohnungsCard key={index} />
        ))}
      </div>
    </div>
  )
}