"use client"

import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight, Info } from "lucide-react"
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
  const [isMetadataOpen, setIsMetadataOpen] = useState(false)

  const metadata = getPhotoMetadata(photo)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMetadataOpen) {
          setIsMetadataOpen(false)
        } else {
          onClose()
        }
      }
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
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev, isMetadataOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <button
        onClick={() => setIsMetadataOpen(true)}
        className="absolute top-4 right-16 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <Info className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {hasPrev && onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {hasNext && onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
        <img
          src={urlFor(photo.image).width(2400).url() || "/placeholder.svg"}
          alt={photo.image.alt}
          className={cn(
            "max-w-full max-h-full object-contain rounded-lg",
            photo.orientation === "portrait" && "max-h-[90vh]",
            photo.orientation === "landscape" && "max-w-[95vw]",
          )}
        />
      </div>

      {/* Metadata Modal */}
      {isMetadataOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-end p-4"
          onClick={() => setIsMetadataOpen(false)}
        >
          <div
            className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl w-80 max-h-[70vh] overflow-hidden mt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-serif text-xl font-light text-gray-900 dark:text-white">{photo.title}</h2>
              <button
                onClick={() => setIsMetadataOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-900 dark:text-white" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(70vh-4rem)]">
              {photo.headline && <p className="text-base text-gray-700 dark:text-gray-300 mb-3">{photo.headline}</p>}
              {photo.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{photo.description}</p>
              )}

              <div className="space-y-1 text-xs">
                {metadata.location && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Location</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">{metadata.location}</span>
                  </div>
                )}
                {metadata.camera && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Camera</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">{metadata.camera}</span>
                  </div>
                )}
                {metadata.lens && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Lens</span>
                    <span className="text-gray-900 dark:text-gray-100 text-right">{metadata.lens}</span>
                  </div>
                )}
                {metadata.aperture && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Aperture</span>
                    <span className="text-gray-900 dark:text-gray-100">{metadata.aperture}</span>
                  </div>
                )}
                {metadata.shutterSpeed && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Shutter Speed</span>
                    <span className="text-gray-900 dark:text-gray-100">{metadata.shutterSpeed}</span>
                  </div>
                )}
                {metadata.iso && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">ISO</span>
                    <span className="text-gray-900 dark:text-gray-100">{metadata.iso}</span>
                  </div>
                )}
                {metadata.focalLength && (
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Focal Length</span>
                    <span className="text-gray-900 dark:text-gray-100">{metadata.focalLength}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
