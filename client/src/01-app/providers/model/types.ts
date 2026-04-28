export const THEMES = [
  'system',
  'light',
  'dark',
  'mono-light',
  'purple-light',
  'green-light',
  'orange-light',
  'amber-light',
  'mono-dark',
  'purple-dark',
  'green-dark',
  'orange-dark',
  'blue-light',
  'blue-dark',
  'amber-dark',
] as const

export type Theme = (typeof THEMES)[number]
