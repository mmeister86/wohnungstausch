
import Image from "next/image"

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl text-center mb-16">
          So funktioniert&apos;s
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Linke Spalte - Bild */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[5/4]">
              <Image
                src="/Howitworks.png"
                alt="So funktioniert der Wohnungstausch"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                style={{ objectFit: 'contain' }}
                className="rounded-lg"
                quality={90}
              />
            </div>
          </div>
          {/* Rechte Spalte - 4 Schritte */}
          <div className="space-y-8">
            {[
              {
                title: "Erstellen Sie Ihr Wohnungsangebot",
                description: "Beschreiben Sie Ihre aktuelle Wohnung und fügen Sie relevante Daten hinzu."
              },
              {
                title: "Finden Sie passende Tauschangebote",
                description: "Durchsuchen Sie  verfügbare Angebote gemäß ihrer Kriterien."
              },
              {
                title: "Kontaktieren Sie potenzielle Tauschpartner",
                description: "Treten Sie direkt mit relevanten Tauschpartnern in Kontakt."
              },
              {
                title: "Organisieren Sie den Wohnungstausch",
                description: "Klären Sie alle Details und wickeln Sie den Tausch sicher ab."
              }
            ].map((step, index) => (
              <div key={index} className="relative flex items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black dark:bg-white">
                  <span className="text-sm font-semibold text-white dark:text-black">{index + 1}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-black dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
