import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MasonryGallery } from "@/components/masonry-gallery"
import { getImagesByTag, getAllTags } from "@/lib/portfolio-data"
import { notFound } from "next/navigation"

interface GalleryPageProps {
  params: {
    slug: string
  }
}

// Generate static paths for all galleries
export function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    slug: tag.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export default function GalleryPage({ params }: GalleryPageProps) {
  // Convert slug back to tag name
  const tagName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Get images for this tag
  const images = getImagesByTag(tagName)

  // If no images found, show 404
  if (images.length === 0) {
    notFound()
  }

  return (
    <main>
      <Navigation />
      <div className="pt-24">
        <MasonryGallery images={images} title={tagName} description={`${images.length} photographs`} />
      </div>
      <Footer />
    </main>
  )
}
