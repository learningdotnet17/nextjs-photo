import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { getGalleries } from "@/lib/portfolio-data"

export default function GalleriesPage() {
  const galleries = getGalleries()

  return (
    <main>
      <Navigation />
      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-light mb-6 text-balance">Galleries</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore curated collections of landscapes organized by theme and location
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <Link
                key={gallery.slug}
                href={`/galleries/${gallery.slug}`}
                className="group relative overflow-hidden rounded-lg bg-muted aspect-[4/3] cursor-pointer"
              >
                <img
                  src={gallery.coverImage.src || "/placeholder.svg"}
                  alt={gallery.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-3xl font-light mb-2">{gallery.title}</h3>
                    <p className="text-white/60 text-xs uppercase tracking-wider">{gallery.count} Photos</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
