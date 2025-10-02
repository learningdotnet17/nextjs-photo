# Complete Sanity Setup Guide

## The Problem You Had
- React 19 was installed, but Sanity requires React 18
- CORS wasn't configured in Sanity dashboard
- This caused both npm install failures and runtime errors

## Step-by-Step Setup

### 1. Get Your Sanity Project ID

If you don't have a Sanity project yet:

1. Go to https://www.sanity.io/manage
2. Click "Create project"
3. Name it (e.g., "Photography Portfolio")
4. Choose a dataset name (use "production")
5. Copy your **Project ID** (looks like: `abc123de`)

### 2. Configure CORS (Fix the Browser Error)

**This is why /studio gave you a CORS error!**

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to **API** → **CORS Origins**
4. Click **Add CORS origin**
5. Add these URLs:
   - `http://localhost:3000` (for local development)
   - `https://v0-nextjs-photo.vercel.app` (your deployed site)
   - Check "Allow credentials"
6. Click **Save**

### 3. Local Setup

\`\`\`bash
# 1. Download code from v0 (GitHub or ZIP)
cd your-project-folder

# 2. Delete old dependencies
rm -rf node_modules package-lock.json

# 3. Install with correct React version
npm install

# 4. Create .env.local file
touch .env.local
\`\`\`

Add to `.env.local`:
\`\`\`
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
\`\`\`

\`\`\`bash
# 5. Run the dev server
npm run dev
\`\`\`

### 4. Access Sanity Studio

**Local:** http://localhost:3000/studio
**Deployed:** https://v0-nextjs-photo.vercel.app/studio

1. Log in with your Sanity account
2. Click "Photo" → "Create new Photo"
3. Upload an image
4. Add title, description, tags
5. Publish

### 5. See Your Photos

After publishing photos in Studio:
- **Local:** Changes appear immediately (with ISR revalidation)
- **Deployed:** Wait ~1 hour or redeploy to see changes

## Your Data is Portable Forever

**Sanity gives you full data ownership:**

1. **Export all data:**
   \`\`\`bash
   npx sanity dataset export production backup.tar.gz
   \`\`\`

2. **Your data is stored as JSON** - easy to migrate anywhere

3. **Self-hosting option:** You can run your own Sanity instance

4. **No vendor lock-in:** Export and move to any CMS anytime

## Troubleshooting

### npm install still fails?
\`\`\`bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
\`\`\`

### CORS error persists?
- Double-check the URL in Sanity dashboard matches exactly
- Make sure "Allow credentials" is checked
- Wait 1-2 minutes for changes to propagate

### Studio page is blank?
- Check browser console for errors
- Verify environment variables are set
- Make sure you're logged into Sanity

### Photos don't appear?
- Check if they're published (not just saved as draft)
- Wait for ISR revalidation (~1 hour) or redeploy
- Check browser console for API errors

## Next Steps

1. Fix CORS in Sanity dashboard (most important!)
2. Redeploy from v0 (React 18 is now in package.json)
3. Access /studio and start adding photos
4. Your content is now portable and future-proof!
