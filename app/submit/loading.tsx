import { FormSkeleton } from "@/components/LoadingSkeletons"

export default function SubmitLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <FormSkeleton />
    </div>
  )
}
