'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getMapNGOs, MapNGO } from '@/actions/get-map-ngos'

/* 🌍 NGO Location Type (single source of truth) */
export type NGOLocation = MapNGO

/* 🎥 Globe view modes */
export type ViewMode = 'globe' | 'focus' | 'map'

type GlobeContextType = {
  selectedLocation: NGOLocation | null
  setSelectedLocation: (loc: NGOLocation | null) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  resetView: () => void
  allNgos: NGOLocation[]
  loading: boolean
}

const GlobeContext = createContext<GlobeContextType | undefined>(undefined)

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const [selectedLocation, setSelectedLocation] =
    useState<NGOLocation | null>(null)

  const [viewMode, setViewMode] = useState<ViewMode>('globe')
  
  const [allNgos, setNgos] = useState<NGOLocation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNgos() {
      try {
        const dbNgos = await getMapNGOs()
        setNgos(dbNgos);
      } catch (err) {
        console.error("Failed to load dynamic NGOs", err)
      } finally {
        setLoading(false)
      }
    }
    loadNgos()
  }, [])

  /* 🔁 Reset globe to default state */
  const resetView = () => {
    setSelectedLocation(null)
    setViewMode('globe')
  }

  return (
    <GlobeContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        viewMode,
        setViewMode,
        resetView,
        allNgos,
        loading
      }}
    >
      {children}
    </GlobeContext.Provider>
  )
}

export function useGlobe() {
  const ctx = useContext(GlobeContext)
  if (!ctx) {
    throw new Error('useGlobe must be used inside GlobeProvider')
  }
  return ctx
}
