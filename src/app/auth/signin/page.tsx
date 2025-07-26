'use client'

import React from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import YandexInstantAuth from '../../components/YandexInstantAuth'

export default function SignIn() {
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push('/')
      }
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Войти в аккаунт
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Войдите через свой Яндекс аккаунт
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <YandexInstantAuth />
          <button
            onClick={() => signIn('yandex', { callbackUrl: '/' })}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Войти через Яндекс (OAuth)
          </button>
          <div className="text-center">
            <button
              onClick={() => router.push('/')}
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}