"use client"
import WohnungsCard from "./wohnungs-karte"
import WohnungsCardHorizontal from "./wohnungs-karte-horizontal"

export default function WohnungsGrid() {
  // Erstellen eines Arrays mit 23 Elementen (Platzhalter für die Wohnungen)
  const wohnungen = Array(23).fill(null)

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {wohnungen.map((_, index) => (
          <div key={index}>
            {window.innerWidth < 768 ? <WohnungsCardHorizontal /> : <WohnungsCard />}
          </div>
        ))}
      </div>
    </div>
  )
}

