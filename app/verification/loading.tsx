import { CertificateSkeleton, PageHeaderSkeleton } from "@/components/LoadingSkeletons"

export default function VerificationLoading() {
  return (
    <div className="space-y-8">
      <PageHeaderSkeleton />
      <CertificateSkeleton />
    </div>
  )
}
