"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { WohnungsCard } from "./wohnungen/wohnungs-card"
import { Skeleton } from "@/components/ui/skeleton"
import { useWohnungen } from "@/lib/wohnungen-context"
import type { Wohnung } from "@/types/wohnung"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleAuth = async () => {
    if (user) {
      await supabase.auth.signOut()
      router.refresh()
    } else {
      router.push('/auth')
    }
  }

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
              Wohnungen
            </Link>
            <Link href="/create" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
              Wohnung einstellen
            </Link>
            {user && (
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Meine Wohnungen
                  </button>
                </DrawerTrigger>
                <DrawerContent className="h-screen w-[400px] ml-auto">
                  <DrawerHeader>
                    <DrawerTitle>Meine Wohnungen</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 space-y-4 overflow-auto">
                    <MeineWohnungen />
                  </div>
                </DrawerContent>
              </Drawer>
            )}
            <Button
              variant="outline"
              className="h-8 px-4 text-sm font-medium"
              onClick={handleAuth}
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </>
              ) : (
                'Login'
              )}
            </Button>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            {isMenuOpen && (
              <div className="absolute top-16 right-0 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 shadow-slate-200 shadow-sm p-4 space-y-2">
                <Link href="/wohnungen" className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                  Wohnungen
                </Link>
                <Link href="/create" className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                  Wohnung einstellen
                </Link>
                {user && (
                  <Drawer direction="right">
                    <DrawerTrigger asChild>
                      <button className="block w-full text-left text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        Meine Wohnungen
                      </button>
                    </DrawerTrigger>
                    <DrawerContent className="h-screen w-[400px] ml-auto">
                      <DrawerHeader>
                        <DrawerTitle>Meine Wohnungen</DrawerTitle>
                      </DrawerHeader>
                      <div className="p-4 space-y-4 overflow-auto">
                        <MeineWohnungen />
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}
                <Button
                  variant="outline"
                  className="w-full h-8 px-4 text-sm font-medium"
                  onClick={handleAuth}
                >
                  {user ? (
                    <>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function MeineWohnungenSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Bild */}
          <div className="w-full h-48">
            <Skeleton className="w-full h-full" />
          </div>
          
          <div className="p-4">
            {/* Titel */}
            <Skeleton className="h-7 w-3/4 mb-2" />
            
            {/* Adresse */}
            <div className="flex items-center mb-2">
              <Skeleton className="w-4 h-4 mr-1" />
              <Skeleton className="h-5 w-2/3" />
            </div>
            
            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="w-4 h-4 mr-1" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>

            {/* Kontakt */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Skeleton className="h-6 w-24 mb-2" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="w-16 h-4 mr-2" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MeineWohnungen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { wohnungen, setWohnungen, lastFetch, setLastFetch } = useWohnungen();

  useEffect(() => {
    async function fetchWohnungen() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) {
          setError('Bitte melden Sie sich an, um Ihre Wohnungen zu sehen.');
          return;
        }

        // Prüfen ob die Daten im Cache sind und nicht älter als 5 Minuten
        const now = Date.now();
        const cacheAge = lastFetch ? now - lastFetch : Infinity;
        const maxCacheAge = 5 * 60 * 1000; // 5 Minuten

        // Wenn wir gültige Cache-Daten haben, nichts tun
        if (wohnungen && cacheAge < maxCacheAge) {
          return;
        }

        // Nur loading setzen, wenn wir tatsächlich laden müssen
        setLoading(true);

        const { data: wohnungenData, error: wohnungError } = await supabase
          .from('Wohnung')
          .select(`
            id,
            titel,
            beschreibung,
            strasse,
            hausnummer,
            plz,
            stadt,
            flaeche,
            zimmer,
            miete,
            stellplatz,
            bilder,
            userId,
            user:User!inner (
              email,
              name,
              telefon
            )
          `)
          .eq('userId', session.user.id)
          .order('createdAt', { ascending: false })
          .returns<Wohnung[]>();

        if (wohnungError) {
          console.error('Error fetching wohnungen:', wohnungError);
          setError('Fehler beim Laden Ihrer Wohnungen.');
          return;
        }

        setWohnungen(wohnungenData || []);
        setLastFetch(now);
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('Ein unerwarteter Fehler ist aufgetreten.');
      } finally {
        setLoading(false);
      }
    }

    fetchWohnungen();
  }, [user, setWohnungen, setLastFetch, wohnungen, lastFetch]);

  if (loading) {
    return <MeineWohnungenSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  if (!wohnungen || wohnungen.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Sie haben noch keine Wohnungen eingestellt.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {wohnungen.map((wohnung) => (
        <div key={wohnung.id} className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <WohnungsCard wohnung={wohnung} />
        </div>
      ))}
    </div>
  );
}
