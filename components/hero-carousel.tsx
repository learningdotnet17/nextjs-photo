"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { urlFor } from "@/sanity/client"
import type { Photo } from "@/lib/sanity-queries"

interface HeroCarouselProps {
  photos: Photo[]
}

export function HeroCarousel({ photos }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }, [photos.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  if (photos.length === 0) return null

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {photos.map((photo, index) => (
        <div
          key={photo._id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0",
          )}
        >
          <img
            src={urlFor(photo.image).width(1920).height(1080).url() || "/placeholder.svg"}
            alt={photo.image.alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

          <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
            <div className="container mx-auto">
              <h2 className="font-serif text-5xl md:text-7xl font-light mb-4 text-balance">{photo.title}</h2>
              {photo.headline && <p className="text-lg md:text-xl text-white/90 tracking-wide">{photo.headline}</p>}
            </div>
          </div>
        </div>
      ))}

      {photos.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
