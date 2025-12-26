'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full bg-black/30 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      {/* Logo / App Name */}
      <Link href="/" className="text-xl font-bold text-white">
        WeatherDash
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 text-white/80">
        <Link href="/" className="hover:text-white">Home</Link>
       
      </div>
    </nav>
  )
}