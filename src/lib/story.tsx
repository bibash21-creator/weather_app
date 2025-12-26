// src/lib/story.ts
export function moodStory({ description, temp }: { description: string; temp: number }) {
  if (description.includes('rain')) return 'A cozy, rain‑kissed evening — tea and a book will pair perfectly.'
  if (description.includes('cloud')) return 'Soft light and calm skies — great for thoughtful outdoor walks.'
  if (temp >= 30) return 'Sun‑soaked and bold — hydrate and embrace lighter plans.'
  if (temp <= 10) return 'Crisp air builds focus — layer up and lean into deep work.'
  return 'Balanced weather — a good day to move gently and stay curious.'
}

export function energyInsight({ temp, icon }: { temp: number; icon: string }) {
  const sunny = icon.startsWith('01')
  if (sunny) return 'Strong sunlight — potential for high solar gain and bright indoor lighting.'
  if (temp < 15) return 'Cool temps — HVAC load modest; consider natural ventilation.'
  return 'Mild conditions — energy use likely steady; schedule computational tasks comfortably.'
}

export function calendarNudge({ description }: { description: string }) {
  if (description.includes('thunder')) return 'Afternoon storms possible — buffer travel time and check outdoor events.'
  if (description.includes('rain')) return 'Light rain in the forecast — carry a compact umbrella for meetings.'
  return 'No major weather disruptions expected — keep your plan as is.'
}