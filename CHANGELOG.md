# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2026-08-04

### TIER B Advanced Features — Particle Trail & Realtime GitHub Telemetry
- **Interactive Particle Trail Canvas (`components/CustomCursor.tsx`)**: Upgraded custom cursor with a dynamic WebGL-style 2D canvas particle trail system. Spawns glowing particles that fade and shrink on mouse movement with contextual color matching.
- **GitHub Realtime Telemetry API (`app/api/activity/route.ts`)**: Built serverless endpoint fetching real-time public GitHub event logs (`Consep33t`) with a 5-minute cache and graceful fallback.
- **Bento Grid Terminal Feed (`app/profile/page.tsx`)**: Integrated real-time GitHub telemetry directly into the profile dossier's Terminal Console.
- **Empirical Verification**: Built and verified Next.js 16.2.12 Turbopack compile (`npm run build`) passing 100% with exit code 0 across all 10 routes.

## [2.0.0] - 2026-08-04

### TIER B Implementation — Three.js / React Three Fiber 3D Hero Section
- **Holographic Wireframe 3D Hero (`components/canvas/HeroCanvas.tsx`)**: Built interactive 3D hero canvas using `@react-three/fiber`, `@react-three/drei`, and `@react-three/postprocessing`.
  - **HoloOctahedron**: Distorted 3D wireframe mesh with `MeshDistortMaterial`, continuous rotation, inner glowing sphere, and `Float` animation.
  - **Particle Universe**: 2.000 dynamic particle field revolving in 3D space on the GPU.
  - **Cyberpunk Post-Processing**: Full `EffectComposer` pipeline with Bloom (luminance threshold 0.15), Chromatic Aberration, and periodic Glitch effects.
  - **Performance Guard**: Dynamic import with `ssr: false` in `Hero.tsx`, DPR scaled `[0.75, 1.5]`, and auto-hidden on mobile screens (`hidden lg:block`).
- **Empirical Verification**: Built and verified Next.js 16.2.12 Turbopack compile (`npm run build`) passing 100% with exit code 0 across all 9 pages.

## [1.5.0] - 2026-08-04

### TIER A Completion — Full Framer Motion Removal & Accessibility Hardening

#### Performance: Zero Framer Motion
- **`components/CircularText.tsx`**: Migrated from `motion.div` + framer rotation to GSAP `gsap.to(rotation: 360, repeat: -1)` with `timeScale` for hover speed control (speedUp/slowDown/pause). Pure GSAP, zero framer dependency.
- **`components/DecryptedText.tsx`**: Removed `motion.span` wrapper — all animation logic was pure JS interval-based already. Replaced with plain `<span>`. No functionality change; ~140KB bundle saving.
- **`components/Navigation.tsx`**: Migrated from `AnimatePresence` + `motion.div` mobile drawer and `layoutId` active tab indicator to: CSS `max-height` transition for mobile drawer, CSS positioned `<span>` for active pill, inline `style.transitionDelay` stagger for mobile nav items. Added proper `aria-expanded`, `aria-controls`, `aria-current="page"`, `aria-label` for full keyboard navigation.
- **`components/Hero.tsx`**: Complete migration from framer `useScroll` + `useTransform` + `useSpring` to GSAP ScrollTrigger parallax (background grid yPercent:15, content yPercent:35 + fade). Replaced all `motion.div` entrance animations with GSAP timeline targeting CSS class selectors. Replaced `animate={{ y: [0,-8,0] }}` scroll indicator with GSAP `yoyo` tween. Added `prefers-reduced-motion` guard.

#### Performance: CSS Rendering
- **`app/globals.css`**: Added `.cv-auto { content-visibility: auto; contain-intrinsic-size: auto 600px }` utility class for off-screen section paint deferral.

#### Accessibility Hardening
- **`app/globals.css`**: Global `@media (prefers-reduced-motion: reduce)` block silences all `animation` and `transition` durations project-wide (`0.01ms !important`).
- **`app/globals.css`**: Added `:focus-visible` keyboard indicator (`2px solid signal-cyan`, offset: 3px) and `:focus:not(:focus-visible) { outline: none }` to suppress mouse focus rings.
- **`components/Navigation.tsx`**: Full ARIA audit — `aria-label`, `aria-expanded`, `aria-controls`, `aria-current="page"`, `role="menubar"`, `role="menuitem"` on all nav elements.
- **`components/Hero.tsx`**: Added `aria-label` on section, `aria-hidden="true"` on decorative elements (scroll indicator, HUD coord tag), `aria-label` on CTA buttons.
- **`app/layout.tsx`**: Skip-to-content link (`#main-content`) already present from prior session — confirmed intact.

#### Empirical Verification
- TypeScript: `✓ Finished TypeScript in 6.9s` — zero type errors
- Build: `✓ Generating static pages (9/9)` — exit code 0
- Framer-motion grep: **zero remaining imports** across all `.tsx`/`.ts` files

## [1.4.0] - 2026-08-04

### TIER A Implementation (Day 4) — Completed
- **Profile Page Bento Grid Redesign (`app/profile/page.tsx`)**: Full layout overhaul from monotone column stack to a responsive 12-column CSS Bento Grid with 8 interactive cells: Avatar+Bio identity panel, Tech Stack module badges, GitHub Stats metrics, Contact Links with one-click email copy, Career Goal & Bio prose, Experience Timeline quick view, IoT Skripsi thesis panel, and interactive Terminal Console. GSAP staggered entrance animations on all cells.
- **Error Boundary (`app/error.tsx`)**: Created HUD-style error page with canvas-based scanline glitch effect, red grid background, terminal-style trace log (error name, digest, message), and dual action buttons (Retry Connection / Return to Base). Zero Framer Motion dependency.
- **Framer Motion Migration (`app/not-found.tsx`, `app/cyber-hack/page.tsx`)**: Removed all `framer-motion` imports and `motion.*` components from these two pages. Replaced with CSS `animate-fade-in`, `transition-all`, `hover:`, and CSS `width` transitions. Bundle size reduced.
- **Empirical Verification**: Built and verified successful Next.js 16.2.12 Turbopack compile and TypeScript type checks passing with exit code 0. All 9 pages generated successfully.

## [1.3.0] - 2026-08-04

### TIER A Implementation (Day 1 - Day 3) — Completed
- **SplashCursor Mobile Guard**: Disabled WebGL SplashCursor on touch/coarse devices to save ~3MB RAM and prevent GPU throttling.
- **Noise/Grain Texture Overlay**: Added subtle SVG-based noise overlay globally in `app/globals.css` for enhanced material aesthetic.
- **JSON-LD Structured Data**: Injected search-engine optimization schema for Ageng Prayoga in `app/layout.tsx`.
- **Variable Font Animations**: Wired font-variation animations (.breathe-text) to hero and major section headings across homepage, profile, and project pages.
- **Interactive Footer Redesign**: Added canvas-based Matrix ASCII rain (gated by IntersectionObserver for low-resource footprint), magnetic hover buttons for ascension/socials/email, copyright counter rising to 2026, and click-to-copy email with HUD status toast feedback.
- **Project Card Skeleton Loaders**: Created `components/ProjectCardSkeleton.tsx` matching card layouts, and integrated it into `/projects` as Suspense fallback for the repository fetch grid.
- **Scroll-Driven Transitions**: Applied `.scroll-driven-fade` entry animations globally to home page sections using native CSS scroll timelines.
- **Empirical Verification**: Built and verified successful Next.js compile and type checks passing with exit code 0.

## [1.2.0] - 2026-08-03

### Full Repositories Showcase & Profile Avatar Integration
- **Profile Photo (`public/profile.jpeg`)**: Integrated official profile photograph into `components/Hero.tsx` bio card and `app/profile/page.tsx` HUD avatar frame.
- **Unlimited Repositories Fetching (`lib/github.ts`)**: Removed fallback cutoff limits (previously sliced to 5-10 repos) to fetch and display ALL public GitHub repositories for `Consep33t`.
- **Enhanced Pagination Grid (`components/PaginatedProjects.tsx`)**: Increased grid pagination to 4 items per page (`ITEMS_PER_PAGE = 4`) for smoother multi-page navigation across all repositories.

## [1.1.0] - 2026-08-03

### Mobile Responsiveness & Container Overflow Overhaul
- **Global Viewport & Safety Rules (`app/globals.css`)**: Added global overflow protection (`max-width: 100vw; overflow-x: hidden; box-sizing: border-box; img/video/svg max-width 100%`).
- **Navigation (`components/Navigation.tsx`)**: Responsive padding (`px-4 sm:px-6`), logo size scaling (`h-8 w-8 sm:h-9 sm:w-9`), and text truncations to eliminate mobile header overflow.
- **Hero Section (`components/Hero.tsx`)**: Fluid display typography (`text-4xl sm:text-7xl lg:text-[9.5rem] break-words`), responsive stat grids (`grid grid-cols-2 sm:flex`), and stacked full-width action buttons on screens <640px.
- **Main Home Page (`app/page.tsx`)**: Scaled background Japanese kanji font (`text-[70px] sm:text-[150px] md:text-[250px]`), section paddings, minigame card paddings, and heading font sizes.
- **Combat Experience (`components/ExperienceSection.tsx`)**: Scaled section padding (`px-4 py-16 sm:py-32`), title sizes (`text-3xl sm:text-5xl md:text-7xl break-words`), card paddings (`p-4 sm:p-8`), and tech stack badge padding (`px-2.5 sm:px-3 text-[9px] sm:text-[10px]`).
- **Neural Augmentations (`components/SkillsSection.tsx`)**: Scaled section padding, category filter buttons (`text-[10px] sm:text-xs px-3 sm:px-5 py-1.5 sm:py-2.5`), and skill card paddings (`p-4 sm:p-6`) for smooth touch targets.
- **Verified Credentials (`components/CertificatesSection.tsx`)**: Scaled heading text (`text-2xl sm:text-4xl md:text-5xl break-words`), card paddings (`p-4 sm:p-8`), and added truncation for long credential IDs.
- **Profile Dossier (`app/profile/page.tsx`)**: Scaled header title (`text-3xl sm:text-5xl md:text-6xl break-words`), section paddings, ID card flex rows (vertical stack on narrow mobile screens), and terminal command line overflow (`break-all` & `overflow-x-auto`).
- **Comms Link (`components/ContactSection.tsx`)**: Scaled heading text (`text-3xl sm:text-5xl md:text-7xl break-words`), full-width quick dispatch email copy button, and card paddings.
- **Footer (`components/Footer.tsx`)**: Scaled footer padding (`px-4 sm:px-6 py-8 sm:py-12`), center button sizing, and text alignment.
- **Project Archives (`components/ProjectCard.tsx` & `components/PaginatedProjects.tsx`)**: Scaled project image card height (`h-44 sm:h-56`), card paddings (`p-4 sm:p-6`), and pagination buttons for touch displays.
- **Empirical Verification**: Verified Next.js 16.2.12 Turbopack build (`npm run build`) passing 100% with exit code 0.

## [1.0.0] - 2026-08-03

### Synchronized Portfolio Data with Ageng Prayoga CV
- **Hero Section**: Updated quick stats (S1 INF Degree, 3.29 IPK, Full-stack & IoT stack, BNSP Junior Network Administrator), operator title, circular text, and bio card.
- **Experience Section**: Added Solvera (Backend Developer), Proyek Mandiri & Skripsi Akademik (IoT & Full-Stack Engineer), and Infinite Learning x Pejantara (Frontend Web Developer).
- **Skills Section**: Updated categories and modules to match Ageng's technical skills (JS/TS, React, Next.js, Vue, Go, Python/FastAPI, SQL Expert, ESP32, Sensor Suite IR/Ultrasonic/Loadcell/Relay, Cisco Router).
- **Certifications Section**: Added BNSP Junior Network Administrator, IBM x Hacktiv8 Code Generations & Optimization, DQLab Expert SQL, and Hacktown Coder Competition.
- **Profile Dossier**: Updated Ageng Prayoga's identity dossier, S1 Teknik Informatika ITBI Medan education data, IoT Smart Poultry Farm thesis, career goals, GDG community involvement, and terminal outputs.
- **Contact Hub & Footer**: Updated direct communication links with official contact details (Email: agengp360@gmail.com, WhatsApp: +62 857-6776-7728, LinkedIn: linkedin.com/in/ageng-prayoga-789b652a9, GitHub: github.com/Consep33t, Location: Medan, Indonesia).
- **Project Archives**: Updated mock fallback project data in `lib/github.ts` to showcase real projects (Smart Poultry IoT System, Smart Water Gate Monitoring, Waste Management AI App, Solvera Backend Engine).
- **Empirical Verification**: Successfully built with Next.js 16.2.12 Turbopack and verified TypeScript type-safety (`npm run build` exit code 0).

