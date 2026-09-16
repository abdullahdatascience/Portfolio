# Portfolio Blueprint — Muhammad Abdullah

## 1. Overview

This is a full-stack portfolio application for Muhammad Abdullah, a Data Scientist & AI enthusiast. The project consists of two separate applications sharing a single Firebase backend:

- **Frontend Portfolio** — a Next.js 14 App Router application served via Vercel
- **Admin Portal** — a React (CRA) single-page application for managing portfolio content

Both apps communicate with **Firebase Firestore** (database), **Firebase Auth** (admin authentication), **Firebase Storage** (file uploads), and **Firebase Analytics** (visitor tracking).

---

## 2. Tech Stack

### Frontend Portfolio
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Rendering | Server Components + Client Components (`"use client"`) |
| Styling | Tailwind CSS 3.4 + custom CSS variables |
| Animation | Framer Motion (page transitions, hover effects, counters) |
| Icons | Lucide React |
| Fonts | Google Fonts — Inter (sans), Outfit (UI), DM Serif Display (serif) |
| Theme | next-themes (dark/light mode, default dark) |
| Toast | react-hot-toast |
| Scroll | react-intersection-observer (scroll-triggered animations) |
| Deployment | Vercel |

### Admin Portal
| Layer | Technology |
|---|---|
| Framework | React 18 (create-react-app), TypeScript |
| Build | react-scripts (Webpack) |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Routing | React Router DOM (v6) |
| Lazy Loading | React.lazy + Suspense for dashboard tabs |
| Deployment | Separate SPA (could be hosted on any static server) |

### Shared Backend
| Service | Purpose |
|---|---|
| Firebase Auth | Admin email/password login |
| Firestore | All content data (skills, projects, certifications, settings, messages) |
| Firebase Storage | Future image uploads |
| Firebase Analytics | Visitor analytics |

---

## 3. Project Structure

```
F:\My Portfolio\
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (theme, fonts, SEO, error boundary)
│   └── page.tsx                  # Home page (all sections)
├── components/                   # Shared React components (portfolio UI)
│   ├── Hero.tsx                  # Hero section with typewriter data from Firestore
│   ├── BentoGrid.tsx             # About/stats/skills radar + tech stack mosaic
│   ├── Skills.tsx                # Technical skills with progress bars (Firestore-synced)
│   ├── Projects.tsx              # Projects grid with search, filter, expand (CRUD via Firestore)
│   ├── Certifications.tsx        # Certifications with Credly badge embeds
│   ├── Contact.tsx               # Contact form with honeypot spam protection
│   ├── SideNav.tsx               # Fixed sidebar nav (desktop, scroll-spy, theme toggle)
│   ├── MobileBottomNav.tsx       # Bottom tab nav (mobile, scroll-spy)
│   ├── ScrollToTop.tsx           # Floating scroll-to-top button
│   ├── ErrorBoundary.tsx         # React error boundary with fallback UI
│   ├── JsonLd.tsx                # Structured data (Schema.org Person) for SEO
│   └── theme-provider.tsx        # next-themes wrapper
├── lib/
│   └── firebase.ts               # Firebase client SDK init (Next.js)
├── styles/
│   └── globals.css               # Tailwind directives + CSS variables + custom animations
├── public/
│   ├── profile.jpeg              # Profile image
│   ├── robots.txt
│   └── sitemap.xml
├── .env                          # Vite-style env vars (VITE_ prefix) — frontend Firebase config
├── .env.example                  # Template for env vars
├── .env.local                    # Local overrides with NEXT_PUBLIC_ prefix
├── next.config.mjs               # Next.js config (CSP headers, remote image patterns, webpack)
├── tailwind.config.js            # Tailwind theme (custom colors, animations, fonts)
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS (tailwindcss + autoprefixer)
├── firestore.rules               # Firestore security rules
├── BLUEPRINT.md                  # This file
│
├── admin-portal/                 # React CRA admin app (separate project)
│   ├── public/
│   │   ├── index.html            # HTML template with fonts
│   │   ├── favicon.ico, logo192.png, logo512.png, manifest.json, robots.txt
│   ├── src/
│   │   ├── index.tsx             # Entry point (ReactDOM.createRoot)
│   │   ├── index.css             # Tailwind directives + admin-specific styles
│   │   ├── App.tsx               # Root: conditional render (login vs dashboard)
│   │   ├── firebase.ts           # Firebase init (CRA-style REACT_APP_ env vars)
│   │   ├── components/
│   │   │   ├── AdminLogin.tsx    # Email/password login + forgot password
│   │   │   ├── AdminDashboard.tsx# Main dashboard (tab navigation + lazy-loaded sections)
│   │   │   ├── Skills.tsx        # CRUD for skills collection
│   │   │   ├── Projects.tsx      # CRUD for projects collection
│   │   │   ├── Certifications.tsx# CRUD for certifications collection
│   │   │   ├── Messages.tsx      # Inbox for contact form messages
│   │   │   ├── ProfileSettings.tsx# Edit hero/about text + stats counters
│   │   │   ├── types.ts          # TypeScript interfaces (Skill, Project, Certification, ProfileData, Toast)
│   │   │   └── Common.tsx        # Shared UI primitives (Field, inputCls, SaveBtn, EditBtn, DeleteBtn, etc.)
│   │   └── setupTests.ts        # Jest setup
│   ├── tsconfig.json
│   ├── package.json              # CRA + react-router-dom + framer-motion + firebase
│   ├── tailwind.config.js        # Admin-specific Tailwind config
│   ├── postcss.config.js
│   ├── .env                      # PORT=3001
│   └── .env.example              # Template with REACT_APP_ prefix
│
└── .kilo/                        # Kilo agent manager config (gitignored)
    └── worktrees/                # Previous iterations (detailed-box, orange-word)
```

---

## 4. Data Model (Firestore Collections)

### 4.1 `settings` (document: `profile`)
Stores global profile/hero settings used by the frontend portfolio.

| Field | Type | Description |
|---|---|---|
| `heroTitle` | string | Displayed as the first name + last name in Hero section |
| `heroTagline` | string | Tagline text (e.g., "Data Scientist & AI Enthusiast") |
| `aboutTitle` | string | About section title (e.g., "Turning Data Into Decisions") |
| `aboutBio` | string | Bio paragraphs separated by `\n\n` |
| `projectsCount` | number | Stat counter for projects |
| `toolsCount` | number | Stat counter for tools/technologies |
| `experienceCount` | number | Stat counter for years of experience |
| `typewriter` | string[] | Subtitle lines for hero typewriter effect |

### 4.2 `skills` (collection)
Each document is a single skill entry.

| Field | Type | Description |
|---|---|---|
| `name` | string | Skill name (e.g., "Python", "Power BI", "TensorFlow") |
| `category` | string | One of: "Programming", "Data Analysis", "Visualization", "AI & Machine Learning" |
| `level` | number | Proficiency 0–100 |
| `createdAt` | Timestamp | Server timestamp |

The `Skills.tsx` component groups skills by category, preserves admin dropdown order, and renders progress bars with SVG tech-icons or devicon CDN images.

### 4.3 `projects` (collection)
Each document is a project card.

| Field | Type | Description |
|---|---|---|
| `title` | string | Project name |
| `summary` | string | Short description shown on card (line-clamp-2) |
| `description` | string | Full description shown on expand |
| `tools` | string[] | Technology badges (e.g., ["Python", "Pandas"]) |
| `themeColor` | string | Color theme key: "rose", "blue", "emerald", "teal", "violet", "amber" |
| `image` | string | (optional) Project image URL |
| `link` | string | (optional) Link to project |
| `createdAt` | Timestamp | Server timestamp |

The `Projects.tsx` component fetches all docs, supports client-side search (title + summary), tool filtering, and expand/collapse for descriptions.

### 4.4 `certifications` (collection)
Each document is a certification/badge.

| Field | Type | Description |
|---|---|---|
| `title` | string | Certification name (e.g., "AWS Solutions Architect") |
| `issuer` | string | Issuing organization |
| `badgeId` | string | (optional) Credly badge ID for embed verification |
| `certificateUrl` | string | (optional) Link to certificate or badge page |
| `issueDate` | string | (optional) Date issued |
| `createdAt` | Timestamp | Server timestamp |

The frontend `Certifications.tsx` renders Credly iframe embeds when `badgeId` is present, or a fallback Award icon + "View Certificate" link when `certificateUrl` is present. Certifications are sorted: Credly first, then by date descending.

### 4.5 `messages` (collection)
Each document is a contact form submission.

| Field | Type | Description |
|---|---|---|
| `name` | string | Sender name (required, max 120 chars) |
| `email` | string | Sender email (required, max 200 chars) |
| `message` | string | Message body (required, max 5000 chars) |
| `createdAt` | Timestamp | Server timestamp |

Firestore rules enforce: anyone can create (with validation), only authenticated admins can read/update/delete.

---

## 5. Frontend Portfolio — Section-by-Section Architecture

### 5.1 Root Layout (`app/layout.tsx`)
- Wraps everything in `<ErrorBoundary>`, `<ThemeProvider>` (dark default), and `<Toaster>`
- Sets viewport meta, theme-color, and full Open Graph / Twitter card metadata
- Uses `inter.variable` and `outfit.variable` CSS custom properties for font families
- `<JsonLd />` is rendered once at the top of `<body>` for SEO structured data
- `suppressHydrationWarning` on `<html>` for theme compatibility

### 5.2 Home Page (`app/page.tsx`)
- Renders sections in order: SideNav → Hero → BentoGrid → Skills → Projects → Certifications → Contact → ScrollToTop → MobileBottomNav
- The `Home` page is an async Server Component that fetches all Firestore data once and passes it as props to child components.
- Sections remain `"use client"` where interactivity is needed (e.g. Framer Motion, scroll-spy) but receive data via props.

### 5.3 Hero Section (`components/Hero.tsx`)
- Fetches `settings/profile` from Firestore on mount
- Splits `heroTitle` into first/last name for styled rendering (first name: regular, last name: gradient text)
- Typewriter subtitle from `lines[0]` of `typewriter` array
- Responsive layout: flex-col on mobile, flex-row on lg+ with profile photo
- Photo uses `next/image` with priority loading, gradient overlay, and "Open to opportunities" badge
- Shows skeleton loading animation while fetching
- Three CTA buttons: View Projects (#projects), Contact (#contact), Resume (external PDF)

### 5.4 BentoGrid (`components/BentoGrid.tsx`) — About Section
A 2D mosaic layout with 4 tiles:

1. **Bio Tile** (sm:col-span-2, md:row-span-2): Profile photo, about title (gradient last word), bio paragraphs, "OPEN TO WORK" indicator
2. **Metrics Tile** (sm:col-span-1): Odometer counters for Projects (+), Tools (+), Years (+) — animated counting on scroll
3. **Radar Tile** (sm:col-span-1): SVG radar chart of skill levels by category — animated on scroll
4. **Current Focus** (sm:col-span-2, md:col-span-1): "AI & Data Science" with Brain icon

All data is received via props from `app/page.tsx`.

### 5.5 Skills Section (`components/Skills.tsx`)
- Fetches `skills` collection from Firestore
- Groups skills by category, maintains admin dropdown order
- Each category renders as a card with category icon, skill count, and progress bars
- Progress bars animate on scroll-view (framer-motion + react-intersection-observer)
- Each skill name maps to a specific icon: devicon CDN images for standard tools, inline SVG for Excel/Power BI, FallbackIcon (first 2 letters) for unknown
- Soft skills section below: 9 cards with colored icon backgrounds and descriptions
- Categories: Programming, Data Analysis, Visualization, AI & Machine Learning (hardcoded order)

### 5.6 Projects Section (`components/Projects.tsx`)
- Gradient heading "Featured Projects" with animated gradient-x
- Search input (filters by title + summary)
- Horizontal tool filter pills ("All Tools" + dynamic list from project data)
- 3-column responsive grid of project cards
- Each card shows: icon, title, summary (line-clamp-2), tool badges, expandable description
- Theme colors determine icon background, title hover, border hover, and top accent bar
- AnimatePresence for expand/collapse animation
- Skeleton loading and empty-state fallback

### 5.7 Certifications Section (`components/Certifications.tsx`)
- Gradient heading "Certifications" (teal→blue)
- Fetches `certifications` collection, sorted: Credly first, then by date descending
- Each cert card shows: Credly iframe embed (with skeleton) OR fallback Award icon, issuer badge, title, issue date, and CTA button
- Credly script loaded as singleton (prevents duplicate loads)
- Skeleton loading states, error alert, empty state

### 5.8 Contact Section (`components/Contact.tsx`)
- Left panel: "Get In Touch" heading, description, contact links (email, LinkedIn, GitHub) with icons
- Right panel: Contact form with honeypot spam protection (hidden field)
- Fields: Name (required), Email (required + regex validation), Message (required)
- Submits to Firestore `messages` collection with `serverTimestamp()`
- Status states: idle → sending → sent / error
- Success: green checkmark + "Message sent" + reset button
- Error: red alert banner
- Footer copyright text

### 5.9 Navigation Components
- **SideNav.tsx**: Fixed left sidebar (hidden on mobile, visible md+), 5 links (Home, About, Projects, Certs, Contact), scroll-spy via IntersectionObserver (30% threshold), active indicator animation, theme toggle (sun/moon), vertical scroll progress bar
- **MobileBottomNav.tsx**: Fixed bottom bar (mobile only), 5 links (About, Skills, Projects, Certs, Contact), scroll-spy via IntersectionObserver (40% threshold), active pill indicator

### 5.10 Utility Components
- **ScrollToTop.tsx**: Floating button appears after 400px scroll, smooth-scroll to top
- **ErrorBoundary.tsx**: Class component catching render errors with "Try Again" reset
- **JsonLd.tsx**: Schema.org Person structured data for SEO
- **theme-provider.tsx**: Thin wrapper around next-themes

---

## 6. Admin Portal — Architecture

### 6.1 App Entry (`admin-portal/src/App.tsx`)
- Simple state-based routing: `isLoggedIn` boolean determines whether to render `AdminLogin` or `AdminDashboard`
- No React Router — just conditional rendering (simpler pattern)

### 6.2 AdminLogin (`admin-portal/src/components/AdminLogin.tsx`)
- Full-screen dark themed login page matching portfolio aesthetic
- Two modes: "signin" and "forgot" (password reset)
- Email + password fields with show/hide toggle
- Error handling for common Firebase Auth error codes (user-not-found, wrong-password, too-many-requests, user-disabled, network errors)
- Animated background orbs matching Hero section style
- Login calls `signInWithEmailAndPassword(auth, email, password)`
- On success, sets `isLoggedIn=true` in parent state (admin dashboard)
- Password reset: `sendPasswordResetEmail(auth, email)`

### 6.3 AdminDashboard (`admin-portal/src/components/AdminDashboard.tsx`)
- Sticky header: "M.A." avatar + name + "Admin Portal" label + Logout button
- Tab navigation: Skills, Projects, Certifications, Messages, Profile
- Lazy-loaded tab content via `React.lazy()` + `<Suspense>` with spinner fallback
- Toast notifications (success/error) with AnimatePresence
- Confirm dialog for destructive actions (delete) with Cancel/Confirm buttons
- All tab components receive `notify` and `setConfirmDialog` props

### 6.4 CRUD Components Pattern
Each admin CRUD component (Skills, Projects, Certifications) follows an identical pattern:
1. **Add Form**: Input fields + validation + `addDoc()` to Firestore
2. **List View**: Fetch all docs + display as cards
3. **Edit Inline**: Click Edit → replace card with form → `updateDoc()` on save
4. **Delete**: Click Delete → confirm dialog → `deleteDoc()` on confirm
5. All use `serverTimestamp()` for timestamps, memoized fetch functions, loading states

**Skills** — category dropdown (Programming, Data Analysis, Visualization, AI & Machine Learning), level slider (0–100)
**Projects** — title, summary, description, tools (tag input with Enter), theme color dropdown, link
**Certifications** — title, issuer, badgeId, certificateUrl, issueDate; always requires at least certificateUrl

### 6.5 Messages (`admin-portal/src/components/Messages.tsx`)
- Inbox-style layout: searchable list (sidebar) + detail view (main)
- Filters messages by name/email/message content
- Shows sender initial avatar, name, email, message preview, date
- Detail view: full message + Reply via Email (mailto) + Delete button
- Responsive: sidebar hidden on detail view on mobile, shown when no message selected

### 6.6 ProfileSettings (`admin-portal/src/components/ProfileSettings.tsx`)
- Fetches `settings/profile` from Firestore
- Editable fields: heroTitle, heroTagline, aboutTitle, aboutBio, projectsCount, toolsCount, experienceCount
- Saves back with `setDoc()` (merge) + `serverTimestamp()`

### 6.7 Shared UI (`admin-portal/src/components/Common.tsx`)
- `Field` component: label + children in flex-col
- `inputCls` / `selectCls`: shared input/select styling
- `SaveBtn`, `CancelBtn`, `EditBtn`, `DeleteBtn`: action button primitives

---

## 7. Firebase Configuration

### 7.1 Frontend Portfolio (`lib/firebase.ts`)
- Reads from `NEXT_PUBLIC_*` environment variables (Next.js server-compatible)
- Initializes: app, firestore, auth, GoogleAuthProvider, storage, analytics (client-only)
- Singleton pattern: `getApps().length === 0 ? initializeApp() : getApp()`

### 7.2 Admin Portal (`admin-portal/src/firebase.ts`)
- Reads from `REACT_APP_*` environment variables (CRA convention)
- Same services initialized, analytics is always called (no `isSupported` guard)
- Same singleton pattern

### 7.3 Environment Variables
| File | Variable Prefix | Purpose |
|---|---|---|
| `.env` | `VITE_*` | Vite-style (frontend, not actually used by Next.js — legacy) |
| `.env.local` | `NEXT_PUBLIC_*` | Next.js-compatible (actually used by frontend) |
| `admin-portal/.env` | `REACT_APP_*` | CRA-compatible |

The actual Firebase config values are identical across both apps (same project: `my-portfolio-admin-8deea`).

### 7.4 Firestore Security Rules (`firestore.rules`)
- **Public read** on all collections: `skills`, `projects`, `certifications`, `settings`
- **Admin-only write**: `isAdmin()` = `request.auth != null`
- **Messages**: public can create (with strict field validation — name 1-120 chars, email 5-200 chars, message 1-5000 chars), admin-only read/update/delete

---

## 8. Styling System

### 8.1 Color Palette (CSS Custom Properties)
| Variable | Dark Value | Light Value | Usage |
|---|---|---|---|
| `--primary` | teal-500 (hsl 172.5 91.1% 40.4%) | teal-600 (hsl 172.5 91.1% 29.4%) | Brand accent, buttons, active states |
| `--accent1` | #8b5cf6 (violet-500) | — | Gradient accent |
| `--accent2` | #f43f5e (rose-500) | — | Gradient accent |
| `--background` | #0f172a (slate-950) | #ffffff | Page background |
| `--foreground` | #f8fafc (slate-50) | #0f172a (slate-950) | Body text |
| `--card` | #0f172a | #ffffff | Card backgrounds |
| `--muted` | #334155 (slate-800) | #f1f5f9 (slate-100) | Muted backgrounds |
| `--border` | #334155 | #e2e8f0 | Border color |

### 8.2 Custom Animations (Tailwind + CSS)
- `gradient-x`: Animated gradient background shift (15s)
- `pulse-slow`: 3s cubic-bezier pulse
- `marquee`: Horizontal scroll for ticker content
- `float`: Vertical float animation (6s)
- `flicker`: Step-end opacity toggle (1s)
- `scan`: Vertical scan line effect

### 8.3 Tailwind Configuration
- Dark mode via `class` strategy
- Container centered with 2rem padding, 1400px max for 2xl screen
- Custom font families: sans (Inter + Outfit), serif (DM Serif Display)
- `tailwindcss-animate` plugin for animation utilities

### 8.4 Global CSS (`styles/globals.css`)
- Noise texture overlay on body (opacity 0.028)
- Custom scrollbar styling (5px, teal accent)
- `.glass-card`, `.text-ghost`, `.text-gradient` utility classes
- Scan line effect for hero elements
- Reduced-motion media query support

---

## 9. Deployment & Build

### 9.1 Frontend Portfolio
- **Build**: `next build` (App Router, TypeScript)
- **Dev**: `next dev` (port 3000 by default)
- **Start**: `next start`
- **Lint**: `next lint` (ESLint with eslint-config-next)
- **Target**: Deployment on Vercel
- **Output**: `.next/` directory with server-rendered pages, static assets, webpack bundles

### 9.2 Admin Portal
- **Build**: `npm run build` (CRA, react-scripts)
- **Dev**: `npm start` (port configurable via `.env` PORT=3001)
- **Test**: `npm test` (Jest + react-testing-library)
- **Target**: Static SPA deployable to any host

---

## 10. Key Design Decisions

1. **Two separate apps, one Firebase** — The frontend portfolio uses Next.js (SSR/SSG ready) while the admin portal uses CRA for simplicity. Both connect to the same Firestore project.

2. **Firestore as CMS** — All content is managed through Firestore, making the admin portal the sole CMS. No need for a separate backend or CMS platform.

3. **Server-side data fetching (SSR)** — Data is fetched once in the root `page.tsx` (Server Component) and passed down via props. ISR (Incremental Static Regeneration) is set to 1 hour, meaning updates take up to an hour to reflect unless a manual rebuild is triggered.

4. **Email/password auth only** — Admin login uses Firebase Auth email/password. No OAuth or multi-factor authentication currently implemented.

5. **Full SSR for SEO** — Content is fetched on the server and pre-rendered in HTML so search engines (like Googlebot) can see the full page text, eliminating duplicate client reads and fixing SEO issues.

6. **Honeypot + Rate Limiting** — Contact form includes a hidden honeypot field and client-side rate limiting (via localStorage) to prevent basic spam.

7. **Credly badge integration** — Certifications can embed Credly verification badges via their embed script, with a fallback icon + link when no badgeId is provided.

8. **Lazy-loaded admin tabs** — Dashboard sections use `React.lazy()` and `Suspense` for code-splitting, improving initial load time of the admin portal.

9. **Shared Firebase config** — Both apps use the same Firebase project (`my-portfolio-admin-8deea`) connecting to `firebasestorage.googleapis.com`, `firestore.googleapis.com`, and `identitytoolkit.googleapis.com`.

10. **Dark theme default** — The portfolio defaults to dark mode with CSS custom properties for light mode override. Theme persisted via next-themes.

---

## 11. Content Collections Summary

| Collection | Read Access | Write Access | Purpose |
|---|---|---|---|
| `settings` (doc: `profile`) | Public | Admin only | Hero text, about bio, stat counters |
| `skills` | Public | Admin only | Technical skills with categories & levels |
| `projects` | Public | Admin only | Project showcase cards |
| `certifications` | Public | Admin only | Certifications and badges |
| `messages` | Public (create only with validation) | Admin only (read/delete) | Contact form submissions |

---

*Blueprint generated from codebase analysis — F:\My Portfolio*
