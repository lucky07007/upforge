// app/[locale]/layout.tsx
import { notFound } from 'next/navigation'
import { locales } from '@/lib/i18n-config'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: LocaleLayoutProps) {
  const { locale } = await params
  const isValid = locales.includes(locale as any)
  if (!isValid) notFound()

  const baseUrl = 'https://upforge.org'

  return {
    alternates: {
      canonical: locale === 'en' ? baseUrl : `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'hi': `${baseUrl}/hi`,
        'x-default': baseUrl,
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const isValid = locales.includes(locale as any)
  if (!isValid) notFound()

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
