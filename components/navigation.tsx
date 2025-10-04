"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/galleries", label: "Galleries" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-xs uppercase tracking-[0.3em] font-light text-foreground/90 group-hover:text-foreground transition-colors">
              Brijesh
            </span>
            <span className="text-xs uppercase tracking-[0.3em] font-light text-foreground/90 group-hover:text-foreground transition-colors -mt-0.5">
              Chawla
            </span>
          </Link>

          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm uppercase tracking-wider transition-all hover:text-foreground/80 text-foreground relative pb-1",
                    pathname === link.href &&
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground after:content-['']",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
