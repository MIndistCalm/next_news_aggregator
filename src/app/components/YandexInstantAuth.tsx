'use client'

import { useEffect, useRef } from 'react'

export default function YandexInstantAuth() {
  const widgetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== 'undefined' && (window as any).YaAuthSuggest) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).YaAuthSuggest.init(
        {
          client_id: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID,
          response_type: 'token',
          redirect_uri: process.env.NEXT_PUBLIC_YANDEX_REDIRECT_URI,
        },
        window.location.origin,
        {
          view: 'button',
          parentId: widgetRef.current?.id || 'yandex-auth-widget',
        }
      )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(({ handler }: any) => handler())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((data: any) => {
          // Здесь data содержит токен и профиль пользователя
          console.log('Яндекс токен:', data)
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          console.error('Ошибка Яндекс авторизации', error)
        })
    }
  }, [])

  return <div id="yandex-auth-widget" ref={widgetRef}></div>
} 