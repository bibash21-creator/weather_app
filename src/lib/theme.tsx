// src/lib/theme.ts
export function themeFromIcon(icon: string) {
  // Map OpenWeather icon codes to gradients
  const map: Record<string, { background: string; accent: string }> = {
    '01d': { background: 'linear-gradient(180deg,#1a2744,#0b1020)', accent: '#ffd166' },
    '01n': { background: 'linear-gradient(180deg,#0b0f17,#090d14)', accent: '#fca311' },
    '02d': { background: 'linear-gradient(180deg,#263045,#101522)', accent: '#a8dadc' },
    '03d': { background: 'linear-gradient(180deg,#2a2f3a,#11161f)', accent: '#8ecae6' },
    '09d': { background: 'linear-gradient(180deg,#0e1a2b,#091220)', accent: '#4cc9f0' },
    '10d': { background: 'linear-gradient(180deg,#13243a,#0a1422)', accent: '#00b4d8' },
    '11d': { background: 'linear-gradient(180deg,#1b2033,#0a0f1e)', accent: '#ffd166' },
    '13d': { background: 'linear-gradient(180deg,#243243,#0f1623)', accent: '#e0fbfc' },
    '50d': { background: 'linear-gradient(180deg,#1f2835,#0e1420)', accent: '#cdd6f4' }
  }
  return map[icon] ?? { background: 'linear-gradient(180deg,#1a1f2b,#0b0f17)', accent: '#89b4fa' }
}