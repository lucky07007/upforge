import { ComparisonSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function SponsorLoading() {
  return (
    <div className="space-y-8"> 
      <PageHeaderSkeleton />
      <ComparisonSkeleton />
    </div>
  )
}
