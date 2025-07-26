const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

export interface NewsArticle {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface NewsResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

export async function fetchNews(params: Record<string, string> = {}): Promise<NewsResponse> {
  if (!API_KEY) {
    throw new Error(
      'NewsAPI key is not configured. Please add NEXT_PUBLIC_NEWS_API_KEY to your .env.local file',
    )
  }

  const url = new URL(`${BASE_URL}/top-headlines`)

  const defaultParams = {
    country: 'us',
    ...params,
  }

  Object.entries(defaultParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value)
    }
  })

  url.searchParams.append('apiKey', API_KEY)

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`NewsAPI request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.status === 'error') {
      throw new Error(`NewsAPI error: ${data.message}`)
    }

    return data
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}

export async function searchNews(
  query: string,
  params: Record<string, string> = {},
): Promise<NewsResponse> {
  if (!API_KEY) {
    throw new Error('NewsAPI key is not configured')
  }

  const url = new URL(`${BASE_URL}/everything`)

  const searchParams = {
    q: query,
    ...params,
  }

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value)
    }
  })

  url.searchParams.append('apiKey', API_KEY)

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`NewsAPI search request failed: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === 'error') {
      throw new Error(`NewsAPI error: ${data.message}`)
    }

    return data
  } catch (error) {
    console.error('Error searching news:', error)
    throw error
  }
}
