"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import WohnungsCard from "@/components/wohnungen/wohnungs-karte"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const totalSlides = 6

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200">BW-Wohnungstausch</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/angebote" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors px-3 py-2">
                Angebote
              </Link>
              <Link href="/ueber-uns" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors px-3 py-2">
                Über uns
              </Link>
              <Button variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                Login
              </Button>
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gray-50 dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl mb-6">
                Bundeswehr-Wohnungstausch leicht gemacht
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
                Tauschen Sie Ihre Wohnung zwischen Berlin und Schwielowsee und finden Sie Ihr neues Zuhause.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-gray-700 text-white hover:bg-gray-600 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-colors">
                  Jetzt Wohnung einstellen
                </Button>
                <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
                  Angebote durchsuchen
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800 dark:text-gray-200">So funktioniert&apos;s</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Erstellen Sie Ihr Wohnungsangebot",
                "Finden Sie passende Tauschangebote",
                "Organisieren Sie den Wohnungstausch",
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-4 -top-4 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">{index + 1}</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-full">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 mt-4">{step}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800 dark:text-gray-200">Aktuelle Wohnungsangebote</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
                >
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                      <WohnungsCard />
                    </div>
                  ))}
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
                Alle Angebote anzeigen
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Kontakt</h3>
              <p className="text-gray-600 dark:text-gray-400">E-Mail: kontakt@bw-wohnungstausch.de</p>
              <p className="text-gray-600 dark:text-gray-400">Telefon: +49 123 456789</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link href="/datenschutz" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">Datenschutz</Link></li>
                <li><Link href="/impressum" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">Impressum</Link></li>
                <li><Link href="/nutzungsbedingungen" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">Nutzungsbedingungen</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Über uns</h3>
              <p className="text-gray-600 dark:text-gray-400">BW-Wohnungstausch ist eine Plattform für Bundeswehr-Angehörige in Berlin und Schwielowsee zum einfachen Tausch von Dienstwohnungen.</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            © 2024 BW-Wohnungstausch. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  )
}