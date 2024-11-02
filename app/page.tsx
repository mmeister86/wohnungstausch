"use client"
import WohnungsCard from "@/components/wohnungen/wohnungs-karte"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const totalSlides = 5

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <header className="bg-white dark:bg-black sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 shadow-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-bold tracking-tight text-black dark:text-white">TG-Wohnungstausch</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/angebote" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                Angebote
              </Link>
              <Link href="/ueber-uns" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                Über uns
              </Link>
              <Button variant="outline" className="h-8 px-4 text-sm font-medium">
                Login
              </Button>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl text-center mb-16">Aktuelle Wohnungsangebote</h2>
            <div className="relative mx-[-1rem]">
              <div className="overflow-hidden">
                <div
                  className="flex gap-8 transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * (100 / 5 + 1.6)}%)` }}
                >
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/5 flex-shrink-0">
                      <div className="px-4 py-12 my-20">
                        <WohnungsCard />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" className="h-11 px-6 text-sm font-medium">
                Alle Angebote anzeigen
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Kontakt</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">E-Mail: kontakt@bw-wohnungstausch.de</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Telefon: +49 123 456789</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link href="/datenschutz" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Datenschutz</Link></li>
                <li><Link href="/impressum" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Impressum</Link></li>
                <li><Link href="/nutzungsbedingungen" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Nutzungsbedingungen</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-black dark:text-white mb-4">Über uns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">BW-Wohnungstausch ist eine Plattform für Bundeswehr-Angehörige in Berlin und Schwielowsee zum einfachen Tausch von Dienstwohnungen.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 BW-Wohnungstausch. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  )
}
