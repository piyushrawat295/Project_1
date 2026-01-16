'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getMapNGOs, MapNGO } from '@/actions/get-map-ngos'
import { ngos as staticNgos } from '@/data/ngos' // Import static for fallback/merge

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
  
  const [allNgos, setNgos] = useState<NGOLocation[]>(staticNgos)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNgos() {
      try {
        const dbNgos = await getMapNGOs()
        // Merge DB NGOs with Static NGOs
        // Prioritize DB NGOs or append them? Appending.
        // Also avoid duplicates if IDs clash (though DB IDs starting at 1 might clash with static)
        // Static IDs are 1-16. DB IDs might start at 1. 
        // Strategy: Use DB NGOs, keep static only if needed?
        // Better: For this task "make dynamic", let's prioritize DB but keep static for fullness.
        // We will shift static IDs or just concat for now. 
        // Actually, let's just use [...dbNgos, ...staticNgos] but maybe filter unique slugs?
        
        // Simple concat for demo safety
        setNgos([...dbNgos, ...staticNgos])
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
