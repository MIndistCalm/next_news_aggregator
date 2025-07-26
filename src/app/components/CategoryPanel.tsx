'use client'

import React from 'react'
import { categories, categoryLabels, type Category } from '../utils/categories'

interface CategoryPanelProps {
  selected: Category | null
  onSelect: (category: Category | null) => void
}

export default function CategoryPanel({ selected, onSelect }: CategoryPanelProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Категории новостей">
      <button
        className={`px-3 py-1 rounded border text-sm ${selected === null ? 'bg-blue-600 text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}
        onClick={() => onSelect(null)}
        aria-label="Показать все категории"
        role="tab"
        aria-selected={selected === null}
      >
        Все
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-3 py-1 rounded border text-sm ${selected === cat ? 'bg-blue-600 text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}
          onClick={() => onSelect(cat)}
          aria-label={`Показать новости категории ${categoryLabels[cat]}`}
          role="tab"
          aria-selected={selected === cat}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  )
} 