import { Navigation } from "@/components/navigation"
import { HeroCarousel } from "@/components/hero-carousel"
import { MasonryGallery } from "@/components/masonry-gallery"
import { Footer } from "@/components/footer"
import { getRecentImages } from "@/lib/portfolio-data"

export default function HomePage() {
  const recentImages = getRecentImages()

  return (
    <main>
      <Navigation />
      <HeroCarousel />
      <MasonryGallery
        images={recentImages}
        title="Recent Work"
        description="A collection of landscapes captured across diverse terrains and seasons"
      />
      <Footer />
    </main>
  )
}
