# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for your photography portfolio.

## Prerequisites

- Node.js installed
- A Sanity account (sign up at https://sanity.io)

## Step 1: Install Sanity CLI

\`\`\`bash
npm install -g @sanity/cli
\`\`\`

## Step 2: Initialize Sanity Studio

In your project root, the Sanity configuration is already set up in:
- `sanity/schema.ts` - Photo schema definition
- `sanity/config.ts` - Sanity Studio configuration
- `sanity/client.ts` - Client for fetching data

## Step 3: Create a Sanity Project

1. Go to https://sanity.io/manage
2. Click "Create project"
3. Give it a name (e.g., "Brijesh Chawla Photography")
4. Choose a dataset name (use "production")
5. Copy your Project ID

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root:

\`\`\`env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
\`\`\`

Replace `your_project_id_here` with your actual Sanity Project ID.

## Step 5: Run Sanity Studio Locally

\`\`\`bash
npx sanity dev
\`\`\`

This will start Sanity Studio at http://localhost:3333

## Step 6: Add Photos

1. Open http://localhost:3333 in your browser
2. Sign in with your Sanity account
3. Click "Photo" to create a new photo
4. Fill in the fields:
   - **Title**: Photo title (required)
   - **Image**: Upload your photo (required)
     - Sanity will automatically extract EXIF data
     - Add alt text for accessibility
   - **Headline**: Short headline
   - **Description**: Detailed description
   - **Tags**: Add tags like "Mountains", "Sunset", "Recent"
     - Use "Recent" tag to show photos in the Recent Work section
   - **Orientation**: Landscape or Portrait
   - **Featured**: Check to show in hero carousel
   - **Manual Overrides** (optional):
     - Location: Override if EXIF location is missing
     - Camera: Override if EXIF camera is missing
     - Lens: Override if EXIF lens is missing
     - Aperture: Override if EXIF aperture is missing (e.g., for manual lenses)

## Step 7: Build and Deploy

Once you've added photos:

\`\`\`bash
npm run build
\`\`\`

Your Next.js site will fetch all photos from Sanity at build time.

## How It Works

### Automatic EXIF Extraction

When you upload a photo, Sanity automatically extracts:
- Camera make and model
- Lens model
- Aperture (f-stop)
- Shutter speed
- ISO
- Focal length
- GPS location (if available)

### Manual Overrides

For manual lenses or missing data, you can override:
- Location
- Camera
- Lens
- Aperture

The lightbox will show manual overrides first, then fall back to EXIF data.

### Tag-Based Galleries

- Each tag automatically creates a gallery
- Add "Recent" tag to show photos in the Recent Work section
- Tags like "Mountains", "Sunset", "Coastal" create separate galleries

### Featured Photos

- Check "Featured in Hero Carousel" to show photos on the homepage
- Up to 3 featured photos will rotate in the hero carousel

## Workflow

1. **Add photos** in Sanity Studio (http://localhost:3333)
2. **Tag photos** appropriately
3. **Mark favorites** as featured
4. **Build site** with `npm run build`
5. **Deploy** to Vercel or your hosting platform

## Tips

- Use descriptive tags for better organization
- Add alt text for all images (important for SEO and accessibility)
- Use the "Sort Order" field to control photo order within galleries
- Manual overrides are optional - only use them when EXIF data is missing or incorrect
