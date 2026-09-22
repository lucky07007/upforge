import { FormSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function ApplyLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
      <PageHeaderSkeleton />
      <FormSkeleton />
    </div>
  )
}
