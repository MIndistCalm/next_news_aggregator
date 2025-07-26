'use client'

import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (url: string) => {
    setFavorites((favs) => (favs.includes(url) ? favs.filter((f) => f !== url) : [...favs, url]))
  }

  return { favorites, toggleFavorite }
}
