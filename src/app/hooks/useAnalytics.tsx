'use client'

import { useEffect } from 'react'

export function useAnalytics(articleId: string) {
  useEffect(() => {
    const key = `views_${articleId}`
    const views = Number(localStorage.getItem(key) || 0) + 1
    localStorage.setItem(key, views.toString())
    
    // Можно добавить отправку аналитики на сервер
    console.log(`Article ${articleId} viewed ${views} times`)
  }, [articleId])
} 