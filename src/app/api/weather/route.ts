import { NextResponse } from 'next/server'
import { getWeatherBundleForCity } from '@/lib/weather'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 })
  }

  try {
    const bundle = await getWeatherBundleForCity(city)
    return NextResponse.json(bundle)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 })
  }
}