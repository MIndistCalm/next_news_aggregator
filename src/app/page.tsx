'use client'

import React, { useState } from 'react'
import NewsList from './components/NewsList'
import { usePaginatedNews, useSearchNews } from './hooks/useNews'
import CategoryPanel from './components/CategoryPanel'
import SearchBar from './components/SearchBar'
import AuthButton from './components/AuthButton'
import type { Category } from './utils/categories'

export default function Home() {
  const [category, setCategory] = useState<Category | null>(null)
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedNews(category || undefined)

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchNews(searchQuery)

  const articles = data ? data.pages.flatMap(page => page.articles) : []
  const searchArticles = searchData?.articles || []

  const handleSearch = (query: string) => {
    setSearch(query)
    setSearchQuery(query)
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">News Feed</h1>
        <AuthButton />
      </div>
      <SearchBar onSearch={handleSearch} initialValue={search} />
      <CategoryPanel selected={category} onSelect={cat => { setCategory(cat); setSearch(''); setSearchQuery('') }} />
      {searchQuery ? (
        <>
          {isSearchLoading && <div>Загрузка...</div>}
          {searchError && <div className="text-red-500">Ошибка поиска</div>}
          <NewsList articles={searchArticles} />
        </>
      ) : (
        <>
          {isLoading && <div>Загрузка...</div>}
          {error && <div className="text-red-500">Ошибка загрузки новостей</div>}
          <NewsList
            articles={articles}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
    </main>
  )
} 