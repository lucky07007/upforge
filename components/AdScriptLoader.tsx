"use client"

import { usePathname } from "next/navigation"
import Script from "next/script"

const NON_MONETIZED_PATHS = [
  "/privacy",
  "/terms",
  "/cookies",
  "/accessibility",
  "/submit",
  "/contact",
]

export function AdScriptLoader() {
  const pathname = usePathname()

  const isNonMonetized = NON_MONETIZED_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(path + "/")
  )

  if (isNonMonetized) {
    return null
  }

  return (
    <>
      {/* Ezoic: Privacy Scripts */}
      <Script
        data-cfasync="false"
        src="https://cmp.gatekeeperconsent.com/min.js"
        strategy="lazyOnload"
      />
      <Script
        data-cfasync="false"
        src="https://the.gatekeeperconsent.com/cmp.min.js"
        strategy="lazyOnload"
      />

      {/* Ezoic: Header Script */}
      <Script
        src="//www.ezojs.com/ezoic/sa.min.js"
        strategy="lazyOnload"
      />
      <Script id="ezstandalone-init" strategy="lazyOnload">
        {`
          window.ezstandalone = window.ezstandalone || {};
          ezstandalone.cmd = ezstandalone.cmd || [];
        `}
      </Script>
      <Script
        src="//ezoicanalytics.com/analytics.js"
        strategy="lazyOnload"
      />

      {/* Google AdSense Auto Ads */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5377045438787332"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </>
  )
}
