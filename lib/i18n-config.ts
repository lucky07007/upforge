// lib/i18n-config.ts
// Internationalization configuration for UpForge

export type Locale = 'en' | 'hi'

export const locales: Locale[] = ['en', 'hi']
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी (Hindi)',
}

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  hi: '🇮🇳',
}

export const dictionaries = {
  en: () => import('@/locales/en.json').then(m => m.default),
  hi: () => import('@/locales/hi.json').then(m => m.default),
}
