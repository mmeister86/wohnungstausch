"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Main() {
  return (
    <main className="flex-grow" >
      <section className="py-20 sm:py-32 bg-white  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-[38rem]">
              <h1 className="text-7xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl">
                Trennungsgeld-Wohnungstausch leicht gemacht
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Tauschen Sie Ihre Wohnung bei Versetzung zwischen <br />Berlin und Schwielowsee mit Kameraden.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/create">
                  <Button className="h-11 px-6 text-sm font-medium">
                    Jetzt Wohnung einstellen
                  </Button>
                </Link>
                <Link href="/wohnungen">
                  <Button variant="outline" className="h-11 px-6 text-sm font-medium">
                    Angebote durchsuchen
                  </Button>
                </Link>
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
    </main>
  )
}
