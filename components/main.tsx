"use client"
import WohnungsCard from "@/components/wohnungen/wohnungs-karte"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import * as React from "react"

export default function Main() {
  return (
    <main className="flex-grow">
      <section className="py-20 sm:py-32">
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
                <Button className="h-11 px-6 text-sm font-medium">
                  Jetzt Wohnung einstellen
                </Button>
                <Button variant="outline" className="h-11 px-6 text-sm font-medium">
                  Angebote durchsuchen
                </Button>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <Image
                src="/Arpartment.png"
                alt="Wohnungstausch Illustration"
                width={600}
                height={500}
                className="w-full max-w-[600px] h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl text-center">So funktioniert&apos;s</h2>
            <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
              {[
                "Erstellen Sie Ihr Wohnungsangebot",
                "Finden Sie passende Tauschangebote",
                "Organisieren Sie den Wohnungstausch",
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black dark:bg-white">
                    <span className="text-sm font-semibold text-white dark:text-black">{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-black dark:text-white">{step}</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl text-center mb-16">
              Aktuelle Wohnungsangebote
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex justify-center">
                  <div className="w-full" style={{ maxWidth: '350px' }}>
                    <WohnungsCard />
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" className="h-11 px-6 text-sm font-medium">
                Alle Angebote anzeigen
              </Button>
            </div>
          </div>
        </section>
    </main>
  )
}
