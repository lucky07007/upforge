// components/registry-metrics.tsx
interface RegistryMetricsProps {
  verifiedCount: number
}

export function RegistryMetrics({ verifiedCount }: RegistryMetricsProps) {
  const metrics = [
    {
      label: "Verified Startups",
      value: verifiedCount > 0 ? `${verifiedCount.toLocaleString()}+` : "3,000+"
    },
    {
      label: "Monthly Observers",
      value: "10,000+"
    },
    {
      label: "Sponsored Profiles",
      value: "500+"
    },
    {
      label: "Established",
      value: "2025"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {metrics.map((metric, index) => (
        <div key={index} className="space-y-2">
          <div className="text-3xl md:text-4xl font-light text-[#EAEAEA]">
            {metric.value}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#9CA3AF]">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  )
}
