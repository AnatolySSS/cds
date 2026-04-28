import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDate(value: any) {
  return value instanceof Date && !isNaN(value.getTime())
}

export function isString(value: any) {
  return typeof value === 'string'
}

export const formatName = (fullName?: string) => {
  if (!fullName) return ''

  const parts = fullName.split(' ')
  const lastName = parts[0]
  const initials = parts
    .slice(1)
    .map((n) => n[0].toUpperCase() + '.')
    .join('')

  return `${lastName} ${initials}`
}

export const getFirstLettersFromName = (fullName?: string) => {
  if (!fullName) return ''

  const parts = fullName.split(' ')
  const initials = parts
    .slice(1)
    .map((n) => n[0].toUpperCase())
    .join('')

  return `${initials}`
}
