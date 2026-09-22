import Link from "next/link"    
import { ArrowRight, Layers } from "lucide-react"
import { getClusterForPost } from "@/lib/blog/topic-clusters"

interface RelatedClusterPostsProps {
  currentSlug: string
}

export function RelatedClusterPosts({ currentSlug }: RelatedClusterPostsProps) {
  const cluster = getClusterForPost(currentSlug)

  if (!cluster) return null

  // Filter out current post
  const relatedSlugs = cluster.postSlugs.filter((slug) => slug !== currentSlug).slice(0, 3)

  if (relatedSlugs.length === 0) return null

  return (
    <section className="my-10 p-6 border-2 border-foreground/15 rounded-xl bg-muted/20">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-4 h-4 text-[#C59A2E]" />
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
          Related Articles in {cluster.name}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedSlugs.map((slug) => {
          const title = slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
          return (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="p-4 bg-background border border-border rounded-lg hover:border-foreground transition-all group flex flex-col justify-between"
            >
              <h4 className="font-serif text-sm font-bold text-foreground group-hover:text-[#C59A2E] transition-colors line-clamp-2">
                {title}
              </h4>
              <div className="mt-3 flex items-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                Read Guide <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
