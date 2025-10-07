"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity/config"

// Prevent server-side rendering issues
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}

