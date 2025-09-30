"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { PortfolioImage } from "@/lib/portfolio-data"
import { Lightbox } from "./lightbox"

interface MasonryGalleryProps {
  images: PortfolioImage[]
  title?: string
  description?: string
}

export function MasonryGallery({ images, title = "Recent Work", description }: MasonryGalleryProps) {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleImages((prev) => new Set(prev).add(index))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [images])

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const handlePrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  return (
    <>
      <section className="py-24 px-6">
        <div className="container mx-auto">
          {(title || description) && (
            <div className="mb-16 text-center">
              {title && <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 text-balance">{title}</h2>}
              {description && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{description}</p>}
            </div>
          )}

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el
                }}
                data-index={index}
                className={cn(
                  "break-inside-avoid opacity-0 translate-y-8 transition-all duration-700 ease-out",
                  visibleImages.has(index) && "opacity-100 translate-y-0",
                )}
                style={{
                  transitionDelay: `${(index % 3) * 100}ms`,
                }}
              >
                <div
                  className="group relative overflow-hidden rounded-lg bg-muted cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-sm font-medium">{image.title}</p>
                      <p className="text-white/70 text-xs mt-1">{image.headline}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImageIndex !== null && (
        <Lightbox
          image={images[selectedImageIndex]}
          isOpen={selectedImageIndex !== null}
          onClose={() => setSelectedImageIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedImageIndex < images.length - 1}
          hasPrev={selectedImageIndex > 0}
        />
      )}
    </>
  )
}
