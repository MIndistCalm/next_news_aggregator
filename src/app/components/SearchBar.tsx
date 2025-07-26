'use client'

import React, { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  initialValue?: string
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value.trim())
    }, 500)
    return () => clearTimeout(handler)
  }, [value, onSearch])

  return (
    <input
      type="text"
      className="flex-1 px-3 py-2 rounded border w-full border-neutral-300 dark:bg-neutral-800 dark:text-white mb-6"
      placeholder="Поиск новостей..."
      value={value}
      onChange={e => setValue(e.target.value)}
      aria-label="Поиск новостей"
    />
  )
} 