"use client"

import { createContext, useContext, useState } from 'react'
import { Wohnung } from '@/types/wohnung'
import { supabase } from '@/lib/supabase'

type WohnungenContextType = {
  wohnungen: Wohnung[] | null
  setWohnungen: (wohnungen: Wohnung[]) => void
  lastFetch: number | null
  setLastFetch: (time: number) => void
  loadWohnungen: (userId: string) => Promise<void>
  loading: boolean
}

const WohnungenContext = createContext<WohnungenContextType>({
  wohnungen: null,
  setWohnungen: () => {},
  lastFetch: null,
  setLastFetch: () => {},
  loadWohnungen: async () => {},
  loading: false
})

export function WohnungenProvider({ children }: { children: React.ReactNode }) {
  const [wohnungen, setWohnungen] = useState<Wohnung[] | null>(null)
  const [lastFetch, setLastFetch] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const loadWohnungen = async (userId: string) => {
    try {
      // Prüfen ob die Daten im Cache sind und nicht älter als 5 Minuten
      const now = Date.now();
      const cacheAge = lastFetch ? now - lastFetch : Infinity;
      const maxCacheAge = 5 * 60 * 1000; // 5 Minuten

      // Wenn wir gültige Cache-Daten haben, nichts tun
      if (wohnungen && cacheAge < maxCacheAge) {
        return;
      }

      // Nur loading setzen, wenn wir keine Daten haben
      if (!wohnungen) {
        setLoading(true);
      }

      const { data, error } = await supabase
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
        .eq('userId', userId)
        .order('createdAt', { ascending: false })
        .returns<Wohnung[]>()

      if (error) throw error
      
      if (data) {
        setWohnungen(data)
        setLastFetch(now)
      }
    } catch (error) {
      console.error('Error loading wohnungen:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <WohnungenContext.Provider value={{ wohnungen, setWohnungen, lastFetch, setLastFetch, loadWohnungen, loading }}>
      {children}
    </WohnungenContext.Provider>
  )
}

export function useWohnungen() {
  return useContext(WohnungenContext)
}
