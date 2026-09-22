import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"  
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: "Home", url: "https://upforge.org" },
    ...items,
  ]

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <nav aria-label="Breadcrumb" className="my-4 flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1
          return (
            <span key={item.url} className="flex items-center gap-1.5">
              {index === 0 ? (
                <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                  <Home className="w-3 h-3" />
                  <span>Home</span>
                </Link>
              ) : isLast ? (
                <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-[350px]">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url.replace("https://upforge.org", "")} className="hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              )}
              {!isLast && <ChevronRight className="w-3 h-3 text-muted-foreground/60" />}
            </span>
          )
        })}
      </nav>
    </>
  )
}
