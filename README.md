# Landscape Photography Portfolio

A modern, elegant photography portfolio built with Next.js, featuring a hero carousel, tag-based galleries, masonry layout with scroll animations, full-screen lightbox, and static site generation.

## Adding Your Own Images

### Step 1: Add Images to Your Project

Create a `public/images` folder and add your photos:

\`\`\`
public/
  images/
    hero-1.jpg
    hero-2.jpg
    hero-3.jpg
    landscape-1.jpg
    landscape-2.jpg
    ... (add more images)
\`\`\`

### Step 2: Update Portfolio Data

Edit `lib/portfolio-data.ts` and add your images to the `portfolioImages` array:

\`\`\`typescript
export const portfolioImages: PortfolioImage[] = [
  {
    src: '/images/your-photo.jpg',
    alt: 'Description for accessibility',
    title: 'Photo Title',
    headline: 'Compelling Headline',
    description: 'Full description of the photo, story behind it, etc.',
    metadata: {
      camera: 'Canon EOS R5',
      lens: 'RF 24-70mm f/2.8',
      settings: 'f/8, 1/250s, ISO 100',
      location: 'Rocky Mountains, Colorado',
      date: 'October 2024',
    },
    tags: ['Mountains', 'Recent', 'Autumn'], // Add relevant tags
    orientation: 'landscape', // or 'portrait' or 'square'
  },
  // ... add more images
]
\`\`\`

### Step 3: Understanding Tags

**How Tags Work:**
- Each image can have multiple tags (e.g., `['Mountains', 'Winter', 'Recent']`)
- Galleries are **automatically generated** from unique tags
- The special `'Recent'` tag shows images in the homepage "Recent Work" section
- `'Recent'` tag is excluded from the galleries list

**Example Tag Structure:**
- `'Recent'` - Shows on homepage (not in galleries list)
- `'Mountains'` - Creates a "Mountains" gallery
- `'Seascapes'` - Creates a "Seascapes" gallery
- `'Forests'` - Creates a "Forests" gallery
- Any tag you create will automatically generate a gallery!

### Step 4: Update Hero Carousel (Optional)

Edit the `heroImages` array in `lib/portfolio-data.ts` to customize the homepage carousel.

## Features

- ✅ **Tag-Based Galleries** - Automatically generated from image tags
- ✅ **Full-Screen Lightbox** - Click any image to view full-screen with metadata
- ✅ **Masonry Layout** - Preserves aspect ratios (no Instagram squares!)
- ✅ **Scroll Animations** - Images fly in as you scroll
- ✅ **Keyboard Navigation** - Arrow keys to navigate, Escape to close
- ✅ **Static Site Generation** - No server required
- ✅ **Hero Carousel** - Auto-play with manual controls
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Elegant Typography** - Playfair Display + Geist Sans

## Building a Static Site

This project is configured for static export. To build:

\`\`\`bash
npm run build
\`\`\`

This generates a fully static site in the `out/` folder that can be deployed anywhere:
- **Vercel** (recommended): Click "Publish" button in v0
- **Netlify**: Drag and drop the `out/` folder
- **GitHub Pages**: Push the `out/` folder to gh-pages branch
- **Any static host**: Upload the `out/` folder contents

## Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Project Structure

\`\`\`
app/
  page.tsx              # Home page with Recent Work
  galleries/
    page.tsx            # Auto-generated gallery list
    [slug]/page.tsx     # Dynamic gallery pages (auto-generated from tags)
  about/                # About page
components/
  hero-carousel.tsx     # Hero image carousel
  masonry-gallery.tsx   # Animated masonry grid with lightbox
  lightbox.tsx          # Full-screen image viewer
  navigation.tsx        # Site navigation
  footer.tsx            # Site footer
lib/
  portfolio-data.ts     # ⭐ Edit this file to add your images and tags
public/
  images/               # Add your photos here
\`\`\`

## How the Tag System Works

1. **Add images** to `portfolioImages` array with tags
2. **Galleries auto-generate** from unique tags (excluding "Recent")
3. **Recent Work** shows all images tagged with "Recent"
4. **Gallery pages** are created automatically at `/galleries/[tag-name]`
5. **Masonry layout** preserves original aspect ratios (landscape/portrait)

## Image Metadata in Lightbox

When users click an image, they see:
- Full-screen image (preserving aspect ratio)
- Title and headline
- Full description
- Camera, lens, settings, location, date
- Tags
- Navigation arrows to browse other images

## Customization Tips

1. **Colors**: Edit `app/globals.css` to change the color scheme
2. **Fonts**: Modify `app/layout.tsx` to use different Google Fonts
3. **Layout**: Adjust spacing and sizing in component files
4. **Add Pages**: Create new folders in `app/` directory
5. **Tags**: Simply add new tags to images - galleries auto-generate!

## Support

For issues or questions, visit [vercel.com/help](https://vercel.com/help)
