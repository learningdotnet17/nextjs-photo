import { Navigation } from "@/components/navigation"
import { HeroCarousel } from "@/components/hero-carousel"
import { MasonryGallery } from "@/components/masonry-gallery"
import { Footer } from "@/components/footer"
import { getFeaturedPhotos, getRecentPhotos } from "@/lib/sanity-queries"

export default async function HomePage() {
  const [featuredPhotos, recentPhotos] = await Promise.all([getFeaturedPhotos(), getRecentPhotos()])

  return (
    <main>
      <Navigation />
      <HeroCarousel photos={featuredPhotos} />
      <MasonryGallery
        photos={recentPhotos}
        title="Recent Work"
        description="A collection of landscapes captured across diverse terrains and seasons"
      />
      <Footer />
    </main>
  )
}
