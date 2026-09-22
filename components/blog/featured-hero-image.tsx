import Image from "next/image"

interface FeaturedHeroImageProps {
  src: string
  alt: string
  caption?: string
  priority?: boolean
  className?: string
}

export function FeaturedHeroImage({
  src,
  alt,
  caption,
  priority = true,
  className = "",
}: FeaturedHeroImageProps) {
  return (
    <figure className={`my-6 w-full ${className}`}>
      {/* 16:9 Aspect Ratio Container for Google Discover Eligibility */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-900 shadow-md">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          quality={90}
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground font-sans">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
