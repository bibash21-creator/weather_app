// src/components/cards/WeatherCard.tsx
'use client'
import { CurrentWeather } from '@/lib/type'
import { motion } from 'framer-motion'

export default function WeatherCard({
  current,
  city,
  accent
}: {
  current: CurrentWeather
  city: string
  accent: string
}) {
  return (
    <motion.div className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{city}</h2>
          <p className="text-sm text-white/70 capitalize">{current.description}</p>
        </div>
        <img
          alt="weather icon"
          className="h-12 w-12"
          src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
        />
      </div>
      <div className="mt-4 flex items-end gap-4">
        <span className="text-5xl font-bold" style={{ color: accent }}>
          {Math.round(current.temp)}°
        </span>
        <div className="text-sm text-white/70">
          <p>Feels like {Math.round(current.feels_like)}°</p>
          <p>Humidity {current.humidity}% • Wind {Math.round(current.wind_speed)} m/s</p>
        </div>
      </div>
      <div className="mt-4 h-px bg-white/10" />
      <div className="mt-4 text-xs text-white/60">
        <p>Sunrise {new Date(current.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset {new Date(current.sunset * 1000).toLocaleTimeString()}</p>
      </div>
    </motion.div>
  )
}