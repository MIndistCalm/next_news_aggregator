'use client'

import React, { useEffect, useRef } from 'react'
import type { NewsArticle } from '../utils/api'
import ArticleCard from './ArticleCard'

interface NewsListProps {
  articles: NewsArticle[]
  fetchNextPage?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}

export default function NewsList({ articles, fetchNextPage, hasNextPage, isFetchingNextPage }: NewsListProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage || !fetchNextPage) return
    const node = loaderRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { threshold: 1 }
    )
    if (node) {
      observer.observe(node)
    }
    return () => {
      if (node) {
        observer.unobserve(node)
      }
    }
  }, [hasNextPage, fetchNextPage])

  if (!articles.length) {
    return (
      <section aria-label="Список новостей">
        <div className="text-center text-neutral-500">Нет новостей</div>
      </section>
    )
  }
  return (
    <section aria-label="Список новостей">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
        {articles.map(article => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
      {hasNextPage && (
        <div ref={loaderRef} className="flex justify-center py-4" aria-live="polite">
          {isFetchingNextPage ? <span>Загрузка...</span> : <span>Прокрутите вниз для загрузки ещё</span>}
        </div>
      )}
    </section>
  )
} 