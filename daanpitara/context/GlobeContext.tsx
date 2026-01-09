'use client'

import { createContext, useContext, useState } from 'react'

/* 🌍 NGO Location Type (single source of truth) */
export type NGOLocation = {
  id?: number
  name: string
  lat: number
  lng: number
  city?: string
  pincode?: string
}

/* 🎥 Globe view modes */
export type ViewMode = 'globe' | 'focus'

type GlobeContextType = {
  selectedLocation: NGOLocation | null
  setSelectedLocation: (loc: NGOLocation | null) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  resetView: () => void
}

const GlobeContext = createContext<GlobeContextType | undefined>(undefined)

export function GlobeProvider({ children }: { children: React.ReactNode }) {
  const [selectedLocation, setSelectedLocation] =
    useState<NGOLocation | null>(null)

  const [viewMode, setViewMode] = useState<ViewMode>('globe')

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
