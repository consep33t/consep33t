# Changelog

All notable changes to this project will be documented in this file.

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

