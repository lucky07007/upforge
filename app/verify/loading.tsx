import { SearchResultsSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function VerifyLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <PageHeaderSkeleton />
      <SearchResultsSkeleton count={8} />
    </div>
  )
}
