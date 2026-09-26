'use client'

import { useState, useRef, useEffect } from 'react'
import OfferForm from '@/components/OfferForm'
import OfferPreview from '@/components/OfferPreview'
import DownloadButton from '@/components/DownloadButton'

const DEFAULT_FIELDS = {
  candidateName: 'S Sandeep Kumaar',
  domain: 'Data Analytics',
  date: '02-5-2026',
  startDate: '4-5-2026',
  duration: '1 month',
  hrName: 'Bhavithra A N',
  regId: '1252025936',
  email: 'altruistybusiness@gmail.com',
  phone: '8667839838',
}

const BASE_WIDTH = 794
const BASE_HEIGHT = 1123

export default function App() {
  const [fields, setFields] = useState(DEFAULT_FIELDS)
  const [scale, setScale] = useState(1)
  const previewRef = useRef(null)
  const containerRef = useRef(null)

  const handleChange = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  // Dynamically compute preview scale on window resize
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return
      // Account for padding (e.g. 32px or 48px depending on p-4 / p-6)
      const padding = 32
      const availableWidth = containerRef.current.clientWidth - padding
      const calculatedScale = availableWidth / BASE_WIDTH
      setScale(Math.min(calculatedScale, 1))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div className="min-h-screen bg-surface text-text-primary flex flex-col">
      {/* Header */}
      <header className="no-print sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/15 text-accent grid place-items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12h6M9 16h6M9 8h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                Offer Letter Generator
              </span>
              <span className="text-[11px] text-text-muted">
                Altruisty Innovation Pvt Ltd
              </span>
            </div>
          </div>
          <DownloadButton />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr] max-w-[1600px] w-full mx-auto">
        {/* Form Panel */}
        <aside className="no-print border-b lg:border-b-0 lg:border-r border-border p-4 sm:p-6 flex flex-col max-h-none lg:max-h-[calc(100vh-64px)] lg:sticky lg:top-[64px] overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight">Edit Fields</h2>
            <p className="text-xs text-text-muted mt-1">
              Live preview updates as you type →
            </p>
          </div>
          <OfferForm fields={fields} onChange={handleChange} />
        </aside>

        {/* Preview Panel */}
        <section
          ref={containerRef}
          className="p-4 sm:p-6 flex flex-col items-center w-full min-w-0 bg-surface/50 overflow-x-hidden"
        >
          <div className="no-print w-full max-w-[794px] flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Preview
            </span>
            <span className="text-xs text-text-muted">
              {Math.round(scale * 100)}% view
            </span>
          </div>

          {/* Scaled Preview Frame */}
          <div
            className="w-full flex justify-center items-start overflow-hidden"
            style={{
              height: `${BASE_HEIGHT * scale}px`,
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center', // <--- Change 'top left' to 'top center'
                width: `${BASE_WIDTH}px`,
                height: `${BASE_HEIGHT}px`,
                flexShrink: 0,
              }}
            >
              <OfferPreview ref={previewRef} fields={fields} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}