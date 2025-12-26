// src/lib/types.ts
export type CurrentWeather = {
  temp: number
  feels_like: number
  description: string
  icon: string
  humidity: number
  wind_speed: number
  sunrise: number
  sunset: number
  aqi?: number
}

export type HourlyPoint = {
  dt: number
  temp: number
  pop: number
  icon: string
}

export type DailyPoint = {
  dt: number
  temp_min: number
  temp_max: number
  description: string
  icon: string
}

export type WeatherBundle = {
  city: string
  current: CurrentWeather
  hourly: HourlyPoint[]
  daily: DailyPoint[]
  theme: {
    background: string
    accent: string
  }
  insights: {
    mood: string
    energy: string
    calendar: string
    healthTip?: string
  }
}