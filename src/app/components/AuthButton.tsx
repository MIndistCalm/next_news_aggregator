'use client'

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <button className="px-4 py-2 rounded bg-neutral-200 dark:bg-neutral-700 text-sm">
        Загрузка...
      </button>
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          {session.user?.name || session.user?.email}
        </span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
        >
          Выйти
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn('yandex')}
      className="px-4 py-2 rounded bg-yellow-500 text-white text-sm hover:bg-yellow-600"
    >
      Войти через Яндекс
    </button>
  )
} 