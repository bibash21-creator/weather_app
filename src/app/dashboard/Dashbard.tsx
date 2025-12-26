// src/components/dashboard/Dashboard.tsx
'use client'

import { useEffect, useState } from 'react'
import { WeatherBundle } from '@/lib/type'
import WeatherCard from '../../components/cards/WeatherCard'
import HourlyForecast from '../../components/cards/HourlyForecast'
import WeeklyForecast from '../../components/cards/WeeklyForecast'
import AirQualityCard from '../../components/cards/AirQualityCard'
import MoodStoryCard from '../../components/cards/MoodStoryCard'
import EnergyInsightsCard from '../../components/cards/EnergyInsightsCard'
import CalendarSyncCard from '../../components/cards/CalendarSyncCard'

// Simple search bar component
function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [query, setQuery] = useState('')

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city name..."
        className="flex-1 rounded-xl px-4 py-2 bg-white/10 text-white placeholder-white/50 focus:outline-none"
      />
      <button
        onClick={() => onSearch(query)}
        className="rounded-xl px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
      >
        Search
      </button>
    </div>
  )
}

export default function Dashboard({ data }: { data: WeatherBundle }) {
  const [weather, setWeather] = useState<WeatherBundle>(data)

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-gradient', weather.theme.background)
  }, [weather.theme.background])

  const handleSearch = async (city: string) => {
    if (!city) return
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      if (!res.ok) throw new Error('Failed to fetch weather')
      const newData: WeatherBundle = await res.json()
      setWeather(newData)
    } catch (err) {
      console.error(err)
      alert('Could not fetch weather for that city.')
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <WeatherCard current={weather.current} city={weather.city} accent={weather.theme.accent} />
        </div>
        <div className="md:col-span-8 grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <HourlyForecast points={weather.hourly} accent={weather.theme.accent} />
            <WeeklyForecast points={weather.daily} accent={weather.theme.accent} />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <AirQualityCard aqi={weather.current.aqi} />
            <MoodStoryCard text={weather.insights.mood} />
            <EnergyInsightsCard text={weather.insights.energy} />
          </div>
          <CalendarSyncCard text={weather.insights.calendar} />
        </div>
      </div>
    </div>
  )
}