'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useArticleById } from '../../hooks/useNews'
import { useFavorites } from '../../hooks/useFavorites'
import { useAnalytics } from '../../hooks/useAnalytics'

export default function ArticlePage() {
  const params = useParams()
  const articleId = params.id as string
  const { favorites, toggleFavorite } = useFavorites()
  const [imageError, setImageError] = useState(false)

  const { data: article, isLoading, error } = useArticleById(articleId)

  useAnalytics(articleId)

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Загрузка статьи...</h1>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
          <p>К сожалению, запрашиваемая статья не найдена.</p>
          <p className="text-sm text-neutral-500 mt-2">ID: {articleId}</p>
        </div>
      </div>
    )
  }

  const isFavorite = favorites.includes(article.url)

  return (
    <main className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-2xl font-bold mb-4">Article Page</h1>
      <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden">
        {article.urlToImage && !imageError ? (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              unoptimized
            />
          </div>
        ) : (
          <div className="w-full h-64 md:h-96 bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
            <span className="text-neutral-500">Изображение недоступно</span>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-neutral-500">
              {new Date(article.publishedAt).toLocaleString()}
            </span>
            <button
              onClick={() => toggleFavorite(article.url)}
              className={`px-3 py-1 rounded text-sm border ${
                isFavorite
                  ? 'bg-yellow-300 dark:bg-yellow-500'
                  : 'bg-neutral-200 dark:bg-neutral-700'
              }`}
            >
              {isFavorite ? '★ В избранном' : '☆ В избранное'}
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

          {article.author && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Автор: {article.author}
            </p>
          )}

          {article.description && (
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
              {article.description}
            </p>
          )}

          {article.content && (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-neutral-700 dark:text-neutral-300">{article.content}</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Читать оригинал →
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
