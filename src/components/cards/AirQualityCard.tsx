// src/components/cards/AirQualityCard.tsx
'use client'
import { motion } from 'framer-motion'

const labels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']

export default function AirQualityCard({ aqi }: { aqi?: number }) {
  const label = aqi ? labels[aqi - 1] ?? 'Unknown' : 'Unknown'
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="mb-3 text-lg font-semibold">Air quality</h3>
      <p className="text-3xl font-bold">{aqi ?? '—'}</p>
      <p className="text-sm text-white/70">{label}</p>
      <p className="mt-2 text-xs text-white/60">
        AQI reflects combined pollutants. Moderate or above — limit intense outdoor activity.
      </p>
    </motion.div>
  )
}