"use client"

import { createContext, useContext, useState } from 'react'
import { Wohnung } from '@/types/wohnung'

type WohnungenContextType = {
  wohnungen: Wohnung[] | null
  setWohnungen: (wohnungen: Wohnung[]) => void
  lastFetch: number | null
  setLastFetch: (time: number) => void
}

const WohnungenContext = createContext<WohnungenContextType>({
  wohnungen: null,
  setWohnungen: () => {},
  lastFetch: null,
  setLastFetch: () => {},
})

export function WohnungenProvider({ children }: { children: React.ReactNode }) {
  const [wohnungen, setWohnungen] = useState<Wohnung[] | null>(null)
  const [lastFetch, setLastFetch] = useState<number | null>(null)

  return (
    <WohnungenContext.Provider value={{ wohnungen, setWohnungen, lastFetch, setLastFetch }}>
      {children}
    </WohnungenContext.Provider>
  )
}

export function useWohnungen() {
  return useContext(WohnungenContext)
}
