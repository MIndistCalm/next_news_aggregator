'use client'

import React from 'react'
import Link from 'next/link'

export default function AuthButton() {
  return (
    <Link
      href="/auth/signin"
      className="px-4 py-2 rounded bg-yellow-500 text-white text-sm hover:bg-yellow-600"
    >
      Войти через Яндекс
    </Link>
  )
} 