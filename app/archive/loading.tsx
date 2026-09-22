import { TableSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function ArchiveLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <PageHeaderSkeleton />
      <TableSkeleton rows={10} cols={5} />
    </div>
  )
}
