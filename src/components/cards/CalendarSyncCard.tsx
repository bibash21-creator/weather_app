// src/components/cards/CalendarSyncCard.tsx
'use client'
import { motion } from 'framer-motion'

export default function CalendarSyncCard({ text }: { text: string }) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="mb-3 text-lg font-semibold">Calendar nudges</h3>
      <p className="text-white/90">{text}</p>
      <div className="mt-3 rounded-xl bg-white/5 p-3 text-sm text-white/70">
        Connect your calendar to receive weather‑aware event warnings. (Coming soon)
      </div>
    </motion.div>
  )
}