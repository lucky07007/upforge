import { BlogGridSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function NewsGalleryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <PageHeaderSkeleton />
      <BlogGridSkeleton count={9} />
    </div>
  )
}
