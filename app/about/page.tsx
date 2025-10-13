import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Camera, Mountain, Heart } from "lucide-react"
import { getAboutMePhoto } from "@/lib/sanity-queries"
import { urlFor } from "@/sanity/client"

export default async function AboutPage() {
  const aboutPhoto = await getAboutMePhoto()
  return (
    <main>
      <Navigation />
      <div className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-light mb-6 text-balance">About</h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              An amateur photographer with a passion for capturing the raw beauty of natural landscapes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
              {aboutPhoto ? (
                <img
                  src={urlFor(aboutPhoto.image)
                    .width(600)
                    .height(800)
                    .fit("crop")
                    .crop('focalpoint')
                    .url() || "/placeholder.svg"}
                  alt={aboutPhoto.image.alt || "Photographer in nature"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="Photographer in nature"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-light mb-4">My Journey</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  What started as weekend hikes with a camera has evolved into a deep passion for landscape photography.
                  I find endless inspiration in the ever-changing moods of nature.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Each photograph represents not just a moment in time, but hours of patience, planning, and a deep
                  connection with the natural world.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <Camera className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Equipment</h3>
                    <p className="text-sm text-muted-foreground">
                      Canon EOS R5, various lenses from 16mm to 200mm, and a sturdy tripod
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mountain className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Favorite Locations</h3>
                    <p className="text-sm text-muted-foreground">
                      Pacific Northwest, Rocky Mountains, Iceland, and the American Southwest
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Philosophy</h3>
                    <p className="text-sm text-muted-foreground">
                      Minimal editing, maximum patience. I believe in capturing nature as authentically as possible
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-12">
            <h2 className="font-serif text-3xl font-light mb-6">Get in Touch</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm always happy to connect with fellow photography enthusiasts, discuss locations, or answer questions
              about my work.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:hello@example.com"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Send Email
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
