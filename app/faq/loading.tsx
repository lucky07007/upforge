import { AccordionSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function FAQLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <PageHeaderSkeleton />
      <AccordionSkeleton count={8} />
    </div>
  )
}
