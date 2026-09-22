"use client"

import { useState } from "react" 

interface EditorialAvatarProps {
  photo: string
  initials: string
  alt: string
}

export function EditorialAvatar({ photo, initials, alt }: EditorialAvatarProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-foreground group-hover:border-[#C59A2E] transition-colors bg-[#C59A2E20] flex items-center justify-center font-bold text-xl text-[#C59A2E]"
      style={{ fontFamily: "Georgia, serif" }}
    >
      <span className="absolute inset-0 flex items-center justify-center z-0">
        {initials}
      </span>
      {!hasError && (
        <img
          src={photo}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover z-10 bg-background"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
