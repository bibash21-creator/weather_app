'use client'
import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
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