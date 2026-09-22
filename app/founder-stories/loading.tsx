import { FounderProfileSkeleton, BlogGridSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function FounderStoriesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10"> 
      <PageHeaderSkeleton />
      <FounderProfileSkeleton />
      <BlogGridSkeleton count={6} />
    </div>
  )
}
