@AGENTS.md

# Web — Hair Extensions Bali

This is the web sub-project of the **unified Hair Extensions Bali workspace**
(see `../CLAUDE.md` at the project root for the full picture, including
sister folders for design and social media).

## What's Here

A single **Luxe Minimal** landing page deployed to
[thehairextensionsbali.com](https://thehairextensionsbali.com) via Vercel.
Auto-deploy is wired: every push to `main` on
[github.com/adityasomaa/hair-extensions-bali](https://github.com/adityasomaa/hair-extensions-bali)
triggers a fresh build in ~30 seconds.

## File Layout

```
web/
├── app/
│   ├── page.tsx                ← the only landing page
│   ├── layout.tsx              ← root layout, fonts, metadata
│   ├── globals.css             ← Tailwind v4 + theme tokens
│   └── favicon.ico
├── components/
│   ├── animations.tsx          ← FadeIn, Stagger, ClipReveal, Parallax, etc.
│   ├── icons.tsx               ← InstagramIcon (lucide v1 dropped Instagram)
│   ├── SmoothScroll.tsx        ← Lenis wrapper
│   ├── VideoLoop.tsx           ← lazy autoplay video, reduced-motion fallback
│   └── loaders/
│       └── LoaderLuxe.tsx      ← first-load animated logo overlay
├── lib/
│   └── content.ts              ← single source of truth for ALL brand data
├── public/
│   ├── photos/                 ← optimised JPGs (used by gallery + visit)
│   └── videos/                 ← optimised MP4 hero loop + poster
├── scripts/
│   ├── process-photos.mjs      ← regenerate photos from raws in ../photos/
│   └── process-videos.mjs      ← regenerate hero video from raws in ../photos/
└── next.config.ts              ← redirects /design-1|2|3 → /
```

## Where Brand Data Lives

**Almost everything content-related is in `lib/content.ts`.** Edit there,
not in the page. It exports:

- `brand` — name, contact, address, hours, links
- `aboutCopy` — story paragraphs
- `services[]` — six services with full pricing
- `valueProps[]`, `testimonials[]`, `faqs[]`, `processSteps[]`
- `galleryPhotos[]` — paths into `public/photos/`
- `visitPhoto`, `heroVideoLuxe` — single-purpose asset references
- `formatIDR()`, `formatIDRShort()` — currency helpers

If a copy change is requested, this file is almost always the right edit.

## Common Tasks

### Update copy / pricing / hours
Edit `lib/content.ts` → commit → push → Vercel auto-deploys.

### Add / remove a gallery photo
1. Confirm the source raw exists in `../photos/`.
2. Add an entry to `scripts/process-photos.mjs`.
3. `node scripts/process-photos.mjs` to generate `public/photos/<name>.jpg` and `<name>-md.jpg`.
4. Add `/photos/<name>-md.jpg` to `galleryPhotos[]` in `lib/content.ts`.

### Swap the hero video
1. Add a new entry to `scripts/process-videos.mjs` if needed.
2. Run the script to produce `public/videos/<name>.mp4` and poster.
3. Update `heroVideoLuxe` in `lib/content.ts`.

### Run locally
```bash
npm run dev      # http://localhost:3000 (or 3001 if 3000 is taken)
npm run build    # verify production build before pushing big changes
```

### Deploy
Push to `main` — that's it. Vercel handles the rest.

```bash
git add -A
git commit -m "..."
git push
```

## Cross-References

| For | Read |
|---|---|
| Why these colors / fonts / vibe | `../design/VISUAL-IDENTITY.md` |
| Brand voice + audience | `../design/BRAND.md` |
| Service pricing & details | `../design/BUSINESS.md` (mirrors lib/content.ts) |
| Asset paths + how to regenerate deleted ones | `../design/ASSETS.md` |
| What's been posted on social | `../social/POSTED.md` |

## Important Notes

- **Next.js 16** — see `AGENTS.md` (referenced at top of this file).
  Many APIs differ from older versions; consult `node_modules/next/dist/docs/`
  before writing new patterns.
- **Tailwind v4** uses `@theme` blocks in `globals.css`, not `tailwind.config.js`.
- **lucide-react v1** removed the Instagram icon — use the local
  `components/icons.tsx → InstagramIcon` instead.
- **Photos in `lib/content.ts`** mostly reference the `-md` variants
  (medium size). The full-size versions of most curated photos were
  deleted to save storage; only `salon-2.jpg` (full) remains because
  the Visit section displays it large. See `../design/ASSETS.md` for
  the regeneration recipe if you need to bring any back.
