'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { NewsArticle } from '../utils/api'
import { useFavorites } from '../hooks/useFavorites'

interface ArticleCardProps {
  article: NewsArticle
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(article.url)
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 flex flex-col gap-2">
      {article.urlToImage && !imageError ? (
        <div className="relative w-full h-48">
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover rounded"
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center">
          <span className="text-neutral-500 text-sm">Нет изображения</span>
        </div>
      )}
      <div className="flex-1">
        <Link href={`/article/${encodeURIComponent(article.title)}`}>
          <h2 className="text-lg font-semibold hover:underline mb-1">{article.title}</h2>
        </Link>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2">{article.description}</p>
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>{new Date(article.publishedAt).toLocaleString()}</span>
          <button
            className={`ml-2 px-2 py-1 rounded text-xs border ${isFavorite ? 'bg-yellow-300 dark:bg-yellow-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}
            onClick={() => toggleFavorite(article.url)}
          >
            {isFavorite ? '★ В избранном' : '☆ В избранное'}
          </button>
        </div>
      </div>
    </div>
  )
}
