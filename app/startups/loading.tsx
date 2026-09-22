import { RegistryGridSkeleton } from "@/components/LoadingSkeletons"

export default function StartupsLoading() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 py-8">
      <div className="h-8 w-72 bg-muted rounded animate-pulse mb-8" />
      <RegistryGridSkeleton />
    </div>
  )
}
