// src/components/cards/WeeklyForecast.tsx
'use client'
import { DailyPoint } from '@/lib/type'
import { motion } from 'framer-motion'

export default function WeeklyForecast({ points, accent }: { points: DailyPoint[]; accent: string }) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="mb-3 text-lg font-semibold">This week</h3>
      <div className="grid grid-cols-5 gap-3">
        {points.map((d) => (
          <div key={d.dt} className="rounded-xl bg-white/5 p-3 text-center">
            <p className="text-xs text-white/70">{new Date(d.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}</p>
            <img className="mx-auto h-10 w-10" src={`https://openweathermap.org/img/wn/${d.icon}.png`} alt="" />
            <p className="text-xs capitalize text-white/60">{d.description}</p>
            <p className="font-semibold" style={{ color: accent }}>
              {Math.round(d.temp_max)}° / {Math.round(d.temp_min)}°
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}