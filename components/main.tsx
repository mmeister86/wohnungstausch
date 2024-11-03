"use client"
import WohnungsCardHorizontal from "@/components/wohnungen/wohnungs-karte-horizontal"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import WohnungstauschFormular from "@/components/wohnungen/wohnungs-formular"
import * as React from "react"
import Link from "next/link"

export default function Main() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="flex-grow" >
      <section className="py-20 sm:py-32 bg-white  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-[38rem]">
              <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl">
                TG-Wohnungstausch leicht gemacht
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Tauschen Sie Ihre Wohnung zwischen Berlin und Schwielowsee mit Kameraden ohnen Vermittlungsgebühren.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button onClick={openModal} className="h-11 px-6 text-sm font-medium">
                  Jetzt Wohnung einstellen
                </Button>
                <Button variant="outline" className="h-11 px-6 text-sm font-medium">
                  Angebote durchsuchen
                </Button>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="relative w-full max-w-[600px] aspect-[6/5]">
                <Image
                  src="/Apartment.png"
                  alt="Wohnungstausch Illustration"
                  width={600}
                  height={500}
                  className="w-full max-w-[600px] h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* So funktioniert's Sektion - Neu strukturiert mit 2 Spalten */}
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
                  description: "Beschreiben Sie Ihre aktuelle Wohnung und Ihre Wunschwohnung detailliert."
                },
                {
                  title: "Finden Sie passende Tauschangebote",
                  description: "Durchsuchen Sie die verfügbaren Angebote nach Ihren Kriterien."
                },
                {
                  title: "Kontaktieren Sie potenzielle Tauschpartner",
                  description: "Treten Sie direkt mit interessanten Tauschpartnern in Kontakt."
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

      <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl text-center mb-16">
              Aktuelle Wohnungsangebote
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex justify-center">
                  <div className="w-full max-w-3xl">
                    <WohnungsCardHorizontal />
                  </div>
                </div>
              ))}
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <WohnungstauschFormular />
      </Modal>
    </main>
  )
}
