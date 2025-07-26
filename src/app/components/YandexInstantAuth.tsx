'use client'

import { useEffect, useRef } from 'react'

export default function YandexInstantAuth() {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).YaAuthSuggest) {
      (window as any).YaAuthSuggest.init(
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
        .then(({ handler }: any) => handler())
        .then((data: any) => {
          // Здесь data содержит токен и профиль пользователя
          console.log('Яндекс токен:', data)
        })
        .catch((error: any) => {
          console.error('Ошибка Яндекс авторизации', error)
        })
    }
  }, [])

  return <div id="yandex-auth-widget" ref={widgetRef}></div>
} 