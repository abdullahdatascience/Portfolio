# Portfolio — Muhammad Abdullah

A fast, responsive portfolio built with Next.js 14, Tailwind CSS, and Firebase Firestore.

## Features

- Clean dark UI with native scrolling (no scroll hijacking)
- Firebase-backed projects, skills, certifications, and contact form
- SEO metadata, Open Graph image, and JSON-LD structured data
- Contact form honeypot and Firestore validation rules
- `prefers-reduced-motion` support

## Tech stack

- Next.js 14 · React 18 · TypeScript
- Tailwind CSS · Framer Motion (section animations)
- Firebase Firestore · Vercel

## Getting started

1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in Firebase keys
4. `npm run dev` → [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — ESLint

## Project structure

```
├── app/              # Routes & layout
├── components/       # UI sections
├── lib/              # Firebase client
├── public/           # Static assets (add resume.pdf here)
├── styles/           # Global CSS
└── admin-portal/     # Separate CRA admin app
```

## Resume PDF

Add your CV as `public/resume.pdf` so the hero **Resume** button works.

## Deploy (Vercel)

1. Push to GitHub
2. Import project on Vercel
3. Set environment variables from `.env.example`
4. Deploy `firestore.rules` via Firebase Console

## License

MIT
