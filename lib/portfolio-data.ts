// Image type definition
export interface PortfolioImage {
  src: string
  alt: string
  title: string
  headline: string
  description: string
  metadata: {
    camera?: string
    lens?: string
    settings?: string
    location?: string
    date?: string
  }
  tags: string[] // Tags for categorization (e.g., ["Mountains", "Recent", "Winter"])
  orientation: "landscape" | "portrait" | "square"
}

// All portfolio images - Add your images here
export const portfolioImages: PortfolioImage[] = [
  {
    src: "/images/landscape-1.jpg",
    alt: "Mountain peak at golden hour",
    title: "Alpine Majesty",
    headline: "Golden Light on the Peaks",
    description:
      "Captured during a perfect autumn evening, the last rays of sunlight illuminate the snow-capped peaks of the Rocky Mountains.",
    metadata: {
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8",
      settings: "f/8, 1/250s, ISO 100",
      location: "Rocky Mountains, Colorado",
      date: "October 2024",
    },
    tags: ["Mountains", "Recent", "Autumn"],
    orientation: "landscape",
  },
  {
    src: "/images/landscape-2.jpg",
    alt: "Desert landscape at sunset",
    title: "Desert Dreams",
    headline: "Painted Desert Sunset",
    description: "The vast expanse of the desert comes alive with warm hues as the sun sets behind distant mesas.",
    metadata: {
      camera: "Canon EOS R5",
      lens: "RF 15-35mm f/2.8",
      settings: "f/11, 1/125s, ISO 200",
      location: "Arizona Desert",
      date: "September 2024",
    },
    tags: ["Deserts", "Recent", "Sunset"],
    orientation: "landscape",
  },
  {
    src: "/images/landscape-3.jpg",
    alt: "Forest stream with long exposure",
    title: "Flowing Serenity",
    headline: "Woodland Waters",
    description: "A peaceful forest stream captured with long exposure to create a silky smooth water effect.",
    metadata: {
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8",
      settings: "f/16, 2s, ISO 50",
      location: "Pacific Northwest",
      date: "August 2024",
    },
    tags: ["Forests", "Recent", "Water"],
    orientation: "portrait",
  },
  {
    src: "/images/landscape-4.jpg",
    alt: "Ocean waves crashing on rocks",
    title: "Ocean Symphony",
    headline: "Coastal Power",
    description: "The raw power of the Pacific Ocean as waves crash against ancient coastal rocks.",
    metadata: {
      camera: "Canon EOS R5",
      lens: "RF 70-200mm f/2.8",
      settings: "f/8, 1/500s, ISO 400",
      location: "Big Sur, California",
      date: "July 2024",
    },
    tags: ["Seascapes", "Recent", "Dramatic"],
    orientation: "landscape",
  },
  {
    src: "/images/landscape-5.jpg",
    alt: "Canyon vista with dramatic lighting",
    title: "Canyon Light",
    headline: "Layers of Time",
    description: "Millions of years of geological history revealed in the layered walls of this magnificent canyon.",
    metadata: {
      camera: "Canon EOS R5",
      lens: "RF 15-35mm f/2.8",
      settings: "f/11, 1/200s, ISO 100",
      location: "Grand Canyon, Arizona",
      date: "June 2024",
    },
    tags: ["Deserts", "Canyons", "Dramatic"],
    orientation: "landscape",
  },
  {
    src: "/images/landscape-6.jpg",
    alt: "Lake with mountain reflection",
    title: "Mirror Lake",
    headline: "Perfect Reflection",
    description: "A perfectly still morning creates a mirror-like reflection of the surrounding peaks.",
    metadata: {
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8",
      settings: "f/11, 1/60s, ISO 100",
      location: "Banff, Canada",
      date: "May 2024",
    },
    tags: ["Mountains", "Water", "Reflections"],
    orientation: "landscape",
  },
  {
    src: "/images/landscape-7.jpg",
    alt: "Autumn forest with colorful foliage",
    title: "Fall Colors",
    headline: "Autumn's Palette",
    description: "Nature's most vibrant display as autumn transforms the forest into a canvas of gold and crimson.",
    metadata: {
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8",
      settings: "f/8, 1/125s, ISO 200",
      location: "Vermont",
      date: "October 2024",
    },
    tags: ["Forests", "Autumn", "Colorful"],
    orientation: "portrait",
  },
  {
    src: "/images/landscape-8.jpg",
    alt: "Snow-covered mountain peaks",
    title: "Winter Peaks",
    headline: "Alpine Winter",
    description: "Fresh snow blankets the high peaks, creating a pristine winter wonderland.",
    metadata: {
      camera: "Canon EOS R5",
      lens: "RF 70-200mm f/2.8",
      settings: "f/8, 1/500s, ISO 200",
      location: "Swiss Alps",
      date: "January 2024",
    },
    tags: ["Mountains", "Winter", "Snow"],
    orientation: "portrait",
  },
]

// Hero carousel images (can be a subset of portfolio images or separate)
export const heroImages = [
  {
    src: "/images/hero-1.jpg",
    alt: "Mountain landscape at sunset",
    title: "Golden Hour",
    location: "Rocky Mountains, Colorado",
  },
  {
    src: "/images/hero-2.jpg",
    alt: "Misty forest valley",
    title: "Morning Mist",
    location: "Pacific Northwest",
  },
  {
    src: "/images/hero-3.jpg",
    alt: "Coastal cliffs at dawn",
    title: "Coastal Dawn",
    location: "Big Sur, California",
  },
]

// Utility functions for tag-based galleries

// Get all unique tags except "Recent"
export function getAllTags(): string[] {
  const tags = new Set<string>()
  portfolioImages.forEach((image) => {
    image.tags.forEach((tag) => {
      if (tag !== "Recent") {
        tags.add(tag)
      }
    })
  })
  return Array.from(tags).sort()
}

// Get images by tag
export function getImagesByTag(tag: string): PortfolioImage[] {
  return portfolioImages.filter((image) => image.tags.includes(tag))
}

// Get recent work (images tagged with "Recent")
export function getRecentImages(): PortfolioImage[] {
  return portfolioImages.filter((image) => image.tags.includes("Recent"))
}

// Get gallery info for all tags
export function getGalleries() {
  const tags = getAllTags()
  return tags.map((tag) => {
    const images = getImagesByTag(tag)
    return {
      title: tag,
      slug: tag.toLowerCase().replace(/\s+/g, "-"),
      count: images.length,
      coverImage: images[0], // Use first image as cover
    }
  })
}
