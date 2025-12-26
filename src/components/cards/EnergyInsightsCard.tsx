// src/components/cards/EnergyInsightsCard.tsx
'use client'
import { motion } from 'framer-motion'

export default function EnergyInsightsCard({ text }: { text: string }) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="mb-3 text-lg font-semibold">Energy insights</h3>
      <p className="text-white/90">{text}</p>
    </motion.div>
  )
}