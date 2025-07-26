export const categories = [
  'general',
  'business',
  'technology',
  'entertainment',
  'health',
  'science',
  'sports',
] as const

export type Category = (typeof categories)[number]

export const categoryLabels: Record<Category, string> = {
  general: 'General',
  business: 'Business',
  technology: 'Technology',
  entertainment: 'Entertainment',
  health: 'Health',
  science: 'Science',
  sports: 'Sports',
}

export function isValidCategory(category: string): category is Category {
  return categories.includes(category as Category)
}
