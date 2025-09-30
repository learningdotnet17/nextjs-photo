"use client"

import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import type { PortfolioImage } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"

interface LightboxProps {
  image: PortfolioImage
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
}

export function Lightbox({ image, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }: LightboxProps) {
  const [isMetadataOpen, setIsMetadataOpen] = useState(true)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight" && hasNext && onNext) onNext()
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation buttons */}
      {hasPrev && onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {hasNext && onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Main content */}
      <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
        {/* Image - now takes full space */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            className={cn(
              "max-w-full max-h-full object-contain rounded-lg",
              image.orientation === "portrait" && "max-h-[90vh]",
              image.orientation === "landscape" && "max-w-[95vw]",
            )}
          />

          <div className="absolute bottom-0 left-0 right-0 lg:left-auto lg:right-0 lg:top-0 lg:bottom-0 lg:w-96">
            <div
              className={cn(
                "bg-white/5 backdrop-blur-md rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none transition-all duration-300",
                isMetadataOpen ? "max-h-[60vh]" : "max-h-14",
              )}
            >
              <button
                onClick={() => setIsMetadataOpen(!isMetadataOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                aria-label={isMetadataOpen ? "Hide details" : "Show details"}
              >
                <h2 className="font-serif text-xl lg:text-2xl font-light text-white">{image.title}</h2>
                {isMetadataOpen ? (
                  <ChevronDown className="w-5 h-5 text-white/70 lg:rotate-90" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-white/70 lg:rotate-90" />
                )}
              </button>

              {isMetadataOpen && (
                <div className="px-4 pb-4 overflow-y-auto max-h-[calc(60vh-4rem)]">
                  <p className="text-lg text-white/80 mb-3">{image.headline}</p>
                  <p className="text-white/70 mb-6 leading-relaxed text-sm">{image.description}</p>

                  <div className="space-y-2 text-sm">
                    {image.metadata.location && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Location</span>
                        <span className="text-white/90">{image.metadata.location}</span>
                      </div>
                    )}
                    {image.metadata.date && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Date</span>
                        <span className="text-white/90">{image.metadata.date}</span>
                      </div>
                    )}
                    {image.metadata.camera && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Camera</span>
                        <span className="text-white/90">{image.metadata.camera}</span>
                      </div>
                    )}
                    {image.metadata.lens && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Lens</span>
                        <span className="text-white/90">{image.metadata.lens}</span>
                      </div>
                    )}
                    {image.metadata.settings && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Settings</span>
                        <span className="text-white/90">{image.metadata.settings}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
