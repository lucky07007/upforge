import { CreatorGridSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function PartnerProgramLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <PageHeaderSkeleton />
      <CreatorGridSkeleton count={6} />
    </div>
  )
}
