// src/lib/weather.ts
import 'server-only'
import { WeatherBundle } from './type'
import { themeFromIcon } from './theme'
import { calendarNudge, energyInsight, moodStory } from './story'

const BASE = 'https://api.openweathermap.org/data/2.5'

/**
 * Default bundle using env city/coords
 */
export async function getWeatherBundle(): Promise<WeatherBundle> {
  const key = process.env.OPENWEATHER_API_KEY!
  const city = process.env.DEFAULT_CITY ?? 'Kathmandu'
  const lat = Number(process.env.DEFAULT_LAT ?? 27.7172)
  const lon = Number(process.env.DEFAULT_LON ?? 85.3240)

  return await getWeatherBundleFromCoords(city, lat, lon, key)
}

/**
 * Bundle for a searched city name
 */
export async function getWeatherBundleForCity(city: string): Promise<WeatherBundle> {
  const key = process.env.OPENWEATHER_API_KEY!

  // Resolve city → lat/lon
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${key}`
  )
  const geo = await geoRes.json()
  if (!geo || geo.length === 0) {
    throw new Error('City not found')
  }

  const lat = geo[0].lat
  const lon = geo[0].lon

  return await getWeatherBundleFromCoords(city, lat, lon, key)
}

/**
 * Core builder from lat/lon
 */
async function getWeatherBundleFromCoords(city: string, lat: number, lon: number, key: string): Promise<WeatherBundle> {
  const [currentRes, onecallRes, aqiRes] = await Promise.all([
    fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`, { next: { revalidate: 300 } }),
    fetch(`${BASE}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${key}`, { next: { revalidate: 300 } }),
    fetch(`${BASE}/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`, { next: { revalidate: 600 } })
  ])

  const current = await currentRes.json()
  const onecall = await onecallRes.json()
  const aqi = await aqiRes.json()

  const currentWeatherIcon = current.weather?.[0]?.icon ?? '01d'
  const theme = themeFromIcon(currentWeatherIcon)
  const description = current.weather?.[0]?.description ?? 'clear sky'

  // Hourly forecast (next 12 hours)
  const hourly = Array.isArray(onecall.hourly)
    ? onecall.hourly.slice(0, 12).map((p: any) => ({
        dt: p.dt,
        temp: p.temp,
        pop: p.pop ?? 0,
        icon: p.weather?.[0]?.icon ?? '01d'
      }))
    : []

  // Daily forecast (next 5 days)
  const daily = Array.isArray(onecall.daily)
    ? onecall.daily.slice(0, 5).map((d: any) => ({
        dt: d.dt,
        temp_min: d.temp.min,
        temp_max: d.temp.max,
        description: d.weather?.[0]?.description ?? '—',
        icon: d.weather?.[0]?.icon ?? '01d'
      }))
    : []

  const aqiIndex = aqi?.list?.[0]?.main?.aqi ?? undefined

  const bundle: WeatherBundle = {
    city,
    current: {
      temp: current.main.temp,
      feels_like: current.main.feels_like,
      description,
      icon: currentWeatherIcon,
      humidity: current.main.humidity,
      wind_speed: current.wind.speed,
      sunrise: current.sys.sunrise,
      sunset: current.sys.sunset,
      aqi: aqiIndex
    },
    hourly,
    daily,
    theme,
    insights: {
      mood: moodStory({ description, temp: current.main.temp }),
      energy: energyInsight({ temp: current.main.temp, icon: currentWeatherIcon }),
      calendar: calendarNudge({ description }),
      healthTip:
        aqiIndex && aqiIndex >= 3
          ? 'Moderate to high AQI — consider limiting strenuous outdoor activity.'
          : undefined
    }
  }

  return bundle
}