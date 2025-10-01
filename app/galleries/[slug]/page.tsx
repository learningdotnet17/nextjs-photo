import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MasonryGallery } from "@/components/masonry-gallery"
import { getPhotosByTag, getAllTags } from "@/lib/sanity-queries"
import { notFound } from "next/navigation"

interface GalleryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const tags = await getAllTags()
    return tags.map((tag) => ({
      slug: tag.toLowerCase().replace(/\s+/g, "-"),
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export const revalidate = 3600

export default async function GalleryPage({ params }: GalleryPageProps) {
  const tagName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const photos = await getPhotosByTag(tagName)

  if (photos.length === 0) {
    notFound()
  }

  return (
    <main>
      <Navigation />
      <div className="pt-24">
        <MasonryGallery photos={photos} title={tagName} description={`${photos.length} photographs`} />
      </div>
      <Footer />
    </main>
  )
}
