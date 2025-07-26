import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { fetchNews, searchNews, type NewsResponse, type NewsArticle } from '../utils/api'
import type { Category } from '../utils/categories'

export const minutes = (minutes: number) => minutes * 60 * 1000
export const TWO_MINUTES = minutes(2)
export const FIVE_MINUTES = minutes(5)
export const TEN_MINUTES = minutes(10)
export const PAGE_SIZE = 12

export function useNews(category?: Category) {
  return useQuery<NewsResponse>({
    queryKey: ['news', category],
    queryFn: () => fetchNews(category ? { category } : {}),
    staleTime: FIVE_MINUTES,
    refetchInterval: TEN_MINUTES,
  })
}

export function usePaginatedNews(category?: Category) {
  return useInfiniteQuery<NewsResponse>({
    queryKey: ['news', 'infinite', category],
    queryFn: async ({ pageParam = 1 }) =>
      fetchNews({ category: category || '', page: String(pageParam), pageSize: String(PAGE_SIZE) }),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap(p => p.articles).length
      if (loaded < lastPage.totalResults) {
        return allPages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
    staleTime: FIVE_MINUTES,
    refetchInterval: TEN_MINUTES,
  })
}

export function useSearchNews(query: string) {
  return useQuery<NewsResponse>({
    queryKey: ['search', query],
    queryFn: () => searchNews(query),
    enabled: query.length > 0, // Запрос только если есть поисковый запрос
    staleTime: TWO_MINUTES, // 2 минуты для поиска
  })
}

export function useArticleById(articleId: string) {
  return useQuery<NewsArticle>({
    queryKey: ['article', articleId],
    queryFn: async () => {
      const decodedId = decodeURIComponent(articleId)
      
      const searchResult = await searchNews(decodedId)
      
      const article = searchResult.articles.find((a: NewsArticle) => {
        const titleMatch = a.title.toLowerCase() === decodedId.toLowerCase()
        const urlMatch = a.url.includes(decodedId) || decodedId.includes(a.url)
        return titleMatch || urlMatch
      })
      
      if (!article) {
        if (searchResult.articles.length > 0) {
          return searchResult.articles[0]
        }
        throw new Error('Статья не найдена')
      }
      
      return article
    },
    enabled: !!articleId,
    staleTime: TEN_MINUTES, // 10 минут для статей
  })
}

export function useNewsById(articleId: string, articles: NewsArticle[]) {
  return articles.find(article => 
    article.url === articleId || 
    article.title === articleId
  )
} 