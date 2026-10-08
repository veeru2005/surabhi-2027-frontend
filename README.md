# Surabhi 2027 – International Cultural Fest (Frontend)

Multi-page React + TypeScript + Vite site for **Surabhi 2027**, KL University's International Cultural Fest (12–13 March 2027).
Theme: emerald, antique gold and ivory from the official logo. Font: **Quicksand**.

## Pages (react-router-dom)
| Route | Page |
|---|---|
| `/` | Home – full-bleed hero, countdown, marquee, stats, event scroller, CTA |
| `/about` | About Surabhi, stats, why attend |
| `/events` | All competition arenas (3D tilt cards) |
| `/schedule` | Two-day timeline |
| `/contact` | Venue, contact info, inquiry form |
| `*` | 404 |

## Animations
- Intro **loader**: spinning logo ring, letter-by-letter SURABHI, 000→100% counter, circular curtain exit
- **Page transitions** on every route change (fade + rise + blur)
- **Scroll motion**: parallax hero/page headers, slide-in from left/right, staggered cards, count-up stats, top scroll-progress bar, infinite marquee
- Canvas of drifting gold paisleys + dust with mouse parallax
- **Animated footer**: moving gold wave, reverse marquee, staggered columns, hover-slide links, bobbing back-to-top
- Respects `prefers-reduced-motion`

## Run locally (Node 18+)
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview
```

## Edit content
Everything lives in `src/data/content.ts` (events, schedule, stats, links, contact, fest date).
Before launch: replace the placeholder `SCHEDULE`, `CONTACT.email` / `CONTACT.phones`, and confirm `REGISTER_URL`.
The contact form in `src/pages/Contact.tsx` has a TODO to hook up a form service.

## Deploy
SPA routing fallbacks are included: `public/_redirects` (Netlify) and `vercel.json` (Vercel).

## v3 changes
- Display font **Heavitas** (`public/fonts/Heavitas.ttf`) for headings, nav, buttons, numbers; Quicksand kept for paragraphs/forms for readability. To use Heavitas everywhere, set `--font-body: var(--font-display)` in `src/index.css`.
  Note: Heavitas is free for personal use only; a commercial licence is a $15 donation to the designer (Deepak Dogra).
- Background particles and the hero logo no longer react to the cursor.
- Reduced the gap under the navbar on all pages.
- New Samyak-style preloader (rotating rings, HUD %, split exit) and pinned scroll-driven home intro (zoom through the logo → "The Cultural Odyssey").
- Home: word-reveal tagline, featured stats, interactive event card deck (click / arrows / swipe / auto-play), sponsors block, marquees.
- Footer: moving wave, marquee, shimmering SURABHI 2027 wordmark.
- Checked at 375 px, 768 px and 1440 px — no horizontal overflow.
