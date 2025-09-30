export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Brijesh Chawla</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Capturing the beauty of nature through the lens of an amateur photographer
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/galleries" className="text-muted-foreground hover:text-foreground transition-colors">
                  Galleries
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Brijesh Chawla. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
