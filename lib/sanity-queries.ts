import { client } from "@/sanity/client"
import type { SanityImageAssetDocument } from "next-sanity"

export interface PhotoMetadata {
  camera?: string
  lens?: string
  aperture?: string
  focalLength?: string
  iso?: string
  shutterSpeed?: string
  location?: string
}

export interface Photo {
  _id: string
  title: string
  headline?: string
  description?: string
  tags: string[]
  orientation: "landscape" | "portrait"
  featured: boolean
  showInGalleries: boolean
  order: number
  image: {
    asset: SanityImageAssetDocument & {
      metadata?: {
        exif?: {
          Make?: string
          Model?: string
          LensModel?: string
          FNumber?: number
          FocalLength?: number
          ISO?: number
          ExposureTime?: number
        }
        location?: {
          lat: number
          lng: number
          alt: number
        }
      }
    }
    alt: string
  }
  // Manual overrides
  location?: string
  camera?: string
  lens?: string
  aperture?: string
}

// Get all photos
export async function getAllPhotos(): Promise<Photo[]> {
  return client.fetch(
    `*[_type == "photo"] | order(order asc, _createdAt desc) {
      _id,
      title,
      headline,
      description,
      tags,
      orientation,
      featured,
      showInGalleries,
      order,
      image {
        asset-> {
          _id,
          url,
          metadata
        },
        alt
      },
      location,
      camera,
      lens,
      aperture
    }`,
  )
}

// Get featured photos for hero carousel
export async function getFeaturedPhotos(): Promise<Photo[]> {
  return client.fetch(
    `*[_type == "photo" && featured == true] | order(order asc) [0...3] {
      _id,
      title,
      headline,
      description,
      tags,
      orientation,
      featured,
      showInGalleries,
      order,
      image {
        asset-> {
          _id,
          url,
          metadata
        },
        alt
      },
      location,
      camera,
      lens,
      aperture
    }`,
  )
}

// Get photos by special tag (for Recent, AboutMe, Hero - no gallery filter)
async function getPhotosBySpecialTag(tag: string): Promise<Photo[]> {
  return client.fetch(
    `*[_type == "photo" && $tag in tags] | order(order asc, _createdAt desc) {
      _id,
      title,
      headline,
      description,
      tags,
      orientation,
      featured,
      showInGalleries,
      order,
      image {
        asset-> {
          _id,
          url,
          metadata
        },
        alt
      },
      location,
      camera,
      lens,
      aperture
    }`,
    { tag },
  )
}

// Get photos by tag (for galleries - only photos with showInGalleries = true or undefined)
export async function getPhotosByTag(tag: string): Promise<Photo[]> {
  return client.fetch(
    `*[_type == "photo" && $tag in tags && (showInGalleries == true || !defined(showInGalleries))] | order(order asc, _createdAt desc) {
      _id,
      title,
      headline,
      description,
      tags,
      orientation,
      featured,
      showInGalleries,
      order,
      image {
        asset-> {
          _id,
          url,
          metadata
        },
        alt
      },
      location,
      camera,
      lens,
      aperture
    }`,
    { tag },
  )
}

// Get recent photos (tagged with "Recent")
export async function getRecentPhotos(): Promise<Photo[]> {
  return getPhotosBySpecialTag("Recent")
}

// Get About Me photo (tagged with "selfie")
export async function getAboutMePhoto(): Promise<Photo | null> {
  const photos = await getPhotosBySpecialTag("selfie")
  return photos[0] || null
}

// Get all unique tags for galleries (excluding special tags and only from gallery photos)
export async function getAllTags(): Promise<string[]> {
  const tags = await client.fetch<string[]>(
    `array::unique(*[_type == "photo" && (showInGalleries == true || !defined(showInGalleries))].tags[])`
  )
  // Filter out sentence case special tags (Recent, Hero, AboutMe, etc.)
  return tags.filter((tag) => {
    // Keep only lowercase tags (gallery categories)
    return tag === tag.toLowerCase()
  }).sort()
}

// Extract metadata from photo, preferring manual overrides over EXIF
export function getPhotoMetadata(photo: Photo): PhotoMetadata {
  const exif = photo.image.asset.metadata?.exif
  const metadata: PhotoMetadata = {}

  // Camera
  if (photo.camera) {
    metadata.camera = photo.camera
  } else if (exif?.Make && exif?.Model) {
    metadata.camera = `${exif.Make} ${exif.Model}`
  }

  // Lens
  if (photo.lens) {
    metadata.lens = photo.lens
  } else if (exif?.LensModel) {
    metadata.lens = exif.LensModel
  }

  // Aperture
  if (photo.aperture) {
    metadata.aperture = photo.aperture
  } else if (exif?.FNumber) {
    metadata.aperture = `f/${exif.FNumber}`
  }

  // Focal Length (from EXIF only)
  if (exif?.FocalLength) {
    metadata.focalLength = `${Math.round(exif.FocalLength)}mm`
  }

  // ISO (from EXIF only)
  if (exif?.ISO) {
    metadata.iso = `ISO ${exif.ISO}`
  }

  // Shutter Speed (from EXIF only)
  if (exif?.ExposureTime) {
    if (exif.ExposureTime < 1) {
      metadata.shutterSpeed = `1/${Math.round(1 / exif.ExposureTime)}s`
    } else {
      metadata.shutterSpeed = `${exif.ExposureTime}s`
    }
  }

  // Location
  if (photo.location) {
    metadata.location = photo.location
  }

  return metadata
}
