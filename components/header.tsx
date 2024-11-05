"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-black sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 shadow-slate-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold tracking-tight text-black dark:text-white">TG-Wohnungstausch</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/wohnungen" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
              Angebote
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
              Über uns
            </Link>
            <Button variant="outline" className="h-8 px-4 text-sm font-medium">
              Login
            </Button>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!setIsMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            {isMenuOpen && (
              <div className="absolute top-16 right-0 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 shadow-slate-200 shadow-sm p-4 space-y-2">
                <Link href="/wohnungen" className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                  Angebote
                </Link>
                <Link href="#about" className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                  Über uns
                </Link>
                <Button variant="outline" className="w-full h-8 px-4 text-sm font-medium">
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
