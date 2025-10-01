"use client"

import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import type { Photo } from "@/lib/sanity-queries"
import { getPhotoMetadata } from "@/lib/sanity-queries"
import { urlFor } from "@/sanity/client"
import { cn } from "@/lib/utils"

interface LightboxProps {
  photo: Photo
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
}

export function Lightbox({ photo, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }: LightboxProps) {
  const [isMetadataOpen, setIsMetadataOpen] = useState(true)

  const metadata = getPhotoMetadata(photo)

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
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

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

      <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={urlFor(photo.image).width(2400).url() || "/placeholder.svg"}
            alt={photo.image.alt}
            className={cn(
              "max-w-full max-h-full object-contain rounded-lg",
              photo.orientation === "portrait" && "max-h-[90vh]",
              photo.orientation === "landscape" && "max-w-[95vw]",
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
                <h2 className="font-serif text-xl lg:text-2xl font-light text-white">{photo.title}</h2>
                {isMetadataOpen ? (
                  <ChevronDown className="w-5 h-5 text-white/70 lg:rotate-90" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-white/70 lg:rotate-90" />
                )}
              </button>

              {isMetadataOpen && (
                <div className="px-4 pb-4 overflow-y-auto max-h-[calc(60vh-4rem)]">
                  {photo.headline && <p className="text-lg text-white/80 mb-3">{photo.headline}</p>}
                  {photo.description && (
                    <p className="text-white/70 mb-6 leading-relaxed text-sm">{photo.description}</p>
                  )}

                  <div className="space-y-2 text-sm">
                    {metadata.location && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Location</span>
                        <span className="text-white/90">{metadata.location}</span>
                      </div>
                    )}
                    {metadata.camera && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Camera</span>
                        <span className="text-white/90">{metadata.camera}</span>
                      </div>
                    )}
                    {metadata.lens && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Lens</span>
                        <span className="text-white/90">{metadata.lens}</span>
                      </div>
                    )}
                    {metadata.aperture && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Aperture</span>
                        <span className="text-white/90">{metadata.aperture}</span>
                      </div>
                    )}
                    {metadata.shutterSpeed && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Shutter Speed</span>
                        <span className="text-white/90">{metadata.shutterSpeed}</span>
                      </div>
                    )}
                    {metadata.iso && (
                      <div className="flex justify-between">
                        <span className="text-white/50">ISO</span>
                        <span className="text-white/90">{metadata.iso}</span>
                      </div>
                    )}
                    {metadata.focalLength && (
                      <div className="flex justify-between">
                        <span className="text-white/50">Focal Length</span>
                        <span className="text-white/90">{metadata.focalLength}</span>
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
