// components/registry-principles.tsx
export function RegistryPrinciples() {
  const principles = [
    {
      title: "Verified Identities",
      description: "Every founder undergoes structured verification. No unverified entries."
    },
    {
      title: "Structured Profiles",
      description: "Consistent, comprehensive founder and startup information architecture."
    },
    {
      title: "Public Transparency",
      description: "Clear verification status and public record of registry entries."
    },
    {
      title: "Long-Term Signal",
      description: "Historical track record maintained. No ephemeral or temporary listings."
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      {principles.map((principle, index) => (
        <div key={index} className="space-y-3">
          <span className="text-[#BFA14A] text-xs uppercase tracking-[0.2em] font-medium">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <h3 className="text-[#EAEAEA] text-lg font-medium">
            {principle.title}
          </h3>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            {principle.description}
          </p>
        </div>
      ))}
    </div>
  )
}
