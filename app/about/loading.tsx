import { BlogPostSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function AboutLoading() {
  return (
    <div className="space-y-8">
      <PageHeaderSkeleton />
      <BlogPostSkeleton />
    </div>
  )
}
