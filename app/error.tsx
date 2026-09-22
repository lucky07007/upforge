'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to console in development, send to monitoring in production
    console.error('Page error:', error.message, error.digest)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
          Something Went Wrong
        </h1>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          We encountered an unexpected error while loading this page. 
          This is usually temporary — please try again in a moment.
        </p>
        
        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded p-3 mb-6 text-left">
            <p className="text-xs font-mono text-red-700 break-words">
              {error.message || 'Unknown error'}
            </p>
            {error.digest && (
              <p className="text-[10px] font-mono text-red-500 mt-1">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-foreground text-background font-bold text-sm uppercase tracking-wider hover:bg-[#C59A2E] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 border-2 border-foreground font-bold text-sm uppercase tracking-wider hover:bg-muted transition-colors"
          >
            Go Home
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          If this persists, please{' '}
          <Link href="/contact" className="underline hover:text-foreground transition-colors">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
