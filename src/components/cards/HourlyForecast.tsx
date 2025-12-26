// src/components/cards/HourlyForecast.tsx
'use client'
import { HourlyPoint } from '@/lib/type'
import { motion } from 'framer-motion'

export default function HourlyForecast({ points, accent }: { points: HourlyPoint[]; accent: string }) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="mb-3 text-lg font-semibold">Next 12 hours</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {points.map((p) => (
          <div key={p.dt} className="min-w-[90px] rounded-xl bg-white/5 p-3 text-center">
            <p className="text-xs text-white/70">{new Date(p.dt * 1000).getHours()}:00</p>
            <img className="mx-auto h-10 w-10" src={`https://openweathermap.org/img/wn/${p.icon}.png`} alt="" />
            <p className="font-semibold" style={{ color: accent }}>
              {Math.round(p.temp)}°
            </p>
            <p className="text-xs text-white/60">Rain {Math.round(p.pop * 100)}%</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}