# CONSEP33T — IMPROVEMENT PLAN v2.0

**Author:** Ageng Prayoga | **Generated:** 2026-08-04 | **Stack:** Next.js 16 / TypeScript / GSAP 3 / Vercel

---

## DAFTAR ISI

1. [Audit Status Saat Ini](#1-audit-status-saat-ini)
2. [Tren Desain Web 2025-2026 yang Relevan](#2-tren-desain-web-2025-2026-yang-relevan)
3. [TIER A — Vercel Free / 1 Core / 2 GB RAM](#3-tier-a--vercel-free--1-core--2-gb-ram)
4. [TIER B — High-Spec / 4 Core / 8 GB+](#4-tier-b--high-spec--4-core--8-gb)
5. [Alur Penulisan Code dan Workflow](#5-alur-penulisan-code-dan-workflow)
6. [Library, Tools dan Asset Inventory](#6-library-tools-dan-asset-inventory)
7. [Keamanan dan Hardening](#7-keamanan-dan-hardening)
8. [Roadmap Implementasi (Timeline)](#8-roadmap-implementasi-timeline)
9. [Metrik Sukses dan KPI](#9-metrik-sukses-dan-kpi)

---

## 1. AUDIT STATUS SAAT INI

### Sudah Implementasi

| Komponen | Status | Catatan |
|---|---|---|
| WelcomeLoader (Canvas particle + CRT) | Done | GSAP-driven, canvas-based |
| Hero section (magnetic + parallax) | Done | pointer:fine guard |
| PageTransition (diagonal wipe) | Done | Multi-layer panels |
| CustomCursor | Done | Fixed listener leak |
| Navigation mobile | Done | Outside-click, stagger items |
| ProjectCard (tilt + glow tracking) | Done | Desktop-only tilt |
| PaginatedProjects scroll fix | Done | rAF + correct timing |
| ScrollSmoother mobile disable | Done | pointer:coarse guard |
| globals.css utilities | Done | Spin-slow, float, glitch-x |

### Masalah yang Masih Ada

| Area | Masalah | Prioritas |
|---|---|---|
| SplashCursor WebGL | Masih jalan di mobile, makan GPU | HIGH |
| Footer | Terlalu statis, tidak interaktif | MEDIUM |
| /profile page | Layout monoton, tidak ada 3D element | HIGH |
| /minigame page | UX minimal, tidak ada progression | MEDIUM |
| /cyber-hack page | Konten kosong / placeholder | HIGH |
| SEO | Missing structured data (JSON-LD) | MEDIUM |
| Image optimization | OG images tidak di-cache | LOW |
| Error boundary | Tidak ada fallback UI yang bagus | MEDIUM |
| Aksesibilitas | ARIA labels tidak konsisten | MEDIUM |

---

## 2. TREN DESAIN WEB 2025-2026 YANG RELEVAN

### Tren Paling Hype (Kontekstual ke Cyberpunk Theme)

#### 2.1 Spatial Web / 3D DOM Integration

Website yang terasa punya kedalaman fisik tanpa perlu WebGL berat.
- CSS 3D Transforms dengan `perspective` + `transform-style: preserve-3d`
- Three.js / React Three Fiber untuk hero 3D objects (hologram, wireframe globe)
- Spline Design — tool 3D berbasis web, export langsung ke React component
- CSS Scroll-driven Animations (native browser API 2024+, zero JS)

#### 2.2 Bento Grid Layout

Grid modular ala Apple/Vercel marketing — setiap cell punya microinteraction sendiri.
- Cells expand on hover dengan FLIP animation (GSAP Flip plugin)
- Stats, skills, contact dalam satu grid visual yang bisa di-explore
- Mobile: stack vertical dengan snap scrolling

#### 2.3 Noise Texture dan Grain Aesthetic

Film grain overlay pada background — menambah materialitas visual.
- SVG `feTurbulence` filter sebagai overlay
- CSS `backdrop-filter` kombinasi dengan grain untuk glassmorphism premium
- Performa: single SVG filter, zero JS

#### 2.4 Text Kinetics / Variable Font Animation

Huruf yang bergerak, stretch, atau morph seperti organism hidup.
- Variable fonts dengan CSS `font-variation-settings`
- GSAP SplitText untuk per-karakter animasi
- Efek: typing dengan blur, text yang breathe, scramble reveal

#### 2.5 Glassmorphism 2.0 (Dark Glass)

Evolusi dari glassmorphism generasi pertama — lebih dramatis, lebih gelap.
- `backdrop-filter: blur(40px) saturate(180%) brightness(0.7)`
- Border dengan gradient transparent
- Inner shadow + outer glow kombinasi

#### 2.6 Reactive Audio Visualization

Waveform / frequency bars yang bereaksi terhadap musik/ambient sound.
- Web Audio API + Canvas
- Sebagai decorative element bukan fitur utama

#### 2.7 Scroll-driven Narrative (Scrollytelling)

Cerita yang ter-reveal seiring scroll seperti Apple product pages.
- CSS `animation-timeline: scroll()` (native 2024)
- GSAP ScrollTrigger untuk sequences kompleks

#### 2.8 Cursor Customization Wars

Custom cursor sudah mainstream — yang membedakan adalah reaktivitas kontekstual.
- Cursor morph jadi crosshair, magnifier, drag indicator
- Cursor trail dengan particle physics
- Magnetic snap ke elemen interaktif

#### 2.9 Micro-interaction Density

Setiap state perubahan punya feedback visual yang terasa alive.
- Button: ripple + scale + color shift
- Loading: skeleton dengan shimmer yang indah

#### 2.10 AI-Generated Visual Identity

Menggunakan AI art sebagai bagian dari visual language.
- Hero image / avatar dihasilkan AI tapi konsisten secara style
- Background textures dari Stable Diffusion / Midjourney

---

## 3. TIER A — VERCEL FREE / 1 CORE / 2 GB RAM

**Filosofi:** Maximum visual impact dengan minimum compute
**Target:** LCP < 1.5s, FID < 100ms, CLS < 0.1, Bundle < 250KB JS

### 3.1 Peningkatan Visual (CSS-first, Zero Extra Runtime)

#### 3.1.1 Noise/Grain Texture Global

**File:** `app/globals.css`

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='1'/></svg>");
  background-size: 200px 200px;
  mix-blend-mode: overlay;
}
```

**Effort:** 30 menit | **Impact:** +20% premium feel

#### 3.1.2 CSS Scroll-driven Animations (Native, No JS)

**File:** `app/globals.css`

```css
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.scroll-reveal {
  animation: reveal-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

**Effort:** 2 jam | **Impact:** Hapus ScrollTrigger kecil, hemat ~40KB JS

#### 3.1.3 Bento Grid untuk /profile Page

**File:** `app/profile/page.tsx` (redesign total)
**Library:** Pure CSS Grid — tidak ada dependensi baru

```
+--------------------+----------+----------+
|                    |  SKILLS  |  GITHUB  |
|   AVATAR + BIO     |  RADAR   |  STATS   |
|                    +----------+----------+
+----------+---------+     EXPERIENCE      |
|  CONTACT |  TECH   |     TIMELINE        |
|  LINKS   |  STACK  +---------------------+
|          |         |   OPEN TO WORK CTA  |
+----------+---------+---------------------+
```

Setiap cell: hover expand dengan GSAP Flip.
**Effort:** 1 hari | **Impact:** Profile page dari 2/10 menjadi 9/10

#### 3.1.4 Variable Font Animation pada Heading

**File:** `app/globals.css`

```css
.breathe-text {
  animation: font-breathe 4s ease-in-out infinite;
}

@keyframes font-breathe {
  0%, 100% { font-variation-settings: 'wght' 700; }
  50%       { font-variation-settings: 'wght' 900; }
}
```

**Effort:** 1 jam | **Impact:** Hero heading terasa jauh lebih alive

#### 3.1.5 Skeleton Loading States

**File:** `components/ProjectCardSkeleton.tsx` (baru)

```tsx
export function ProjectCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-sm bg-white/5 border border-white/10 h-80">
      <div className="absolute inset-0 -translate-x-full animate-shimmer
                      bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
```

**Effort:** 2 jam | **Impact:** Eliminasi layout shift, UX polished

#### 3.1.6 Footer Interaktif

**File:** `components/Footer.tsx`

Fitur yang ditambahkan:
- Social links dengan magnetic effect
- Copyright counter animasi naik dari 0
- Status indicator "Available for Work" dengan pulse
- Matrix rain ASCII art di background (Canvas)
- Email copy-to-clipboard dengan toast notification

**Effort:** 3 jam | **Impact:** Footer dari tidak ada interaksi menjadi memorable

#### 3.1.7 Error Boundary + 404 Page yang Epic

**File:** `app/not-found.tsx`, `app/error.tsx`

```
404: SIGNAL_LOST
     // ACCESS_DENIED // NODE_OFFLINE

[xxxxxxxxxxxxxxxxoooooooooooooooooooo] 42% — Connection terminated

     [ RETRY_CONNECTION ] [ RETURN_TO_BASE ]
```

Canvas glitch effect + terminal-style error message.
**Effort:** 2 jam | **Impact:** Branding konsisten end-to-end

#### 3.1.8 Optimasi SplashCursor untuk Mobile

**File:** `components/SplashCursor.tsx`

```tsx
const [isFine, setIsFine] = useState(false);

useEffect(() => {
  setIsFine(window.matchMedia('(pointer: fine)').matches);
}, []);

if (!isFine) return null; // Zero render cost on mobile
```

**Effort:** 30 menit | **Impact:** Mobile: hemat 2-5MB memory, hilangkan WebGL context

#### 3.1.9 JSON-LD Structured Data (SEO)

**File:** `app/layout.tsx`

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ageng Prayoga",
    "jobTitle": "Frontend Architect and System Engineer",
    "url": "https://agengprayoga.com",
    "sameAs": [
      "https://github.com/AgenG",
      "https://linkedin.com/in/agengprayoga"
    ],
    "knowsAbout": ["Next.js", "TypeScript", "GSAP", "System Design"]
  }) }}
/>
```

**Effort:** 30 menit | **Impact:** Rich results di Google

#### 3.1.10 Consistent ARIA + Accessibility Audit

Checklist:
- [ ] Semua button punya `aria-label`
- [ ] Animated elements punya `aria-live` jika mengubah konten
- [ ] `prefers-reduced-motion` honored di semua GSAP tweens
- [ ] Focus ring visible di keyboard navigation
- [ ] Color contrast ratio >= 4.5:1 untuk semua text
- [ ] Skip-to-content link di layout

**Effort:** 1 hari | **Impact:** WCAG AA compliance, SEO signal

### 3.2 Performance Optimization TIER A

#### 3.2.1 Bundle Analysis dan Tree Shaking

```bash
npm install --save-dev @next/bundle-analyzer
# ANALYZE=true npm run build
```

Target penghematan:

| Package | Sebelum | Sesudah | Cara |
|---|---|---|---|
| GSAP | ~120KB | ~80KB | Import per-plugin |
| Framer Motion | ~140KB | 0KB | Replace dengan GSAP |
| Three.js | 0 (belum) | — | Jangan tambahkan di TIER A |

#### 3.2.2 Image Optimization

```tsx
<Image
  src={ogImage}
  alt="..."
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/..."
/>
```

#### 3.2.3 Font Subsetting

```tsx
const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});
```

#### 3.2.4 content-visibility: auto untuk Off-screen Sections

```css
section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

---

## 4. TIER B — HIGH-SPEC / 4 CORE / 8 GB+

**Filosofi:** Push the boundaries — website sebagai karya seni interaktif
**Target:** 60FPS tetap, visual setara Awwwards SOTD

### 4.1 THREE.JS / REACT THREE FIBER — 3D Hero Section

#### 4.1.1 Holographic Avatar / Floating 3D Object

**Library:** `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install --save-dev @types/three
```

```tsx
// components/canvas/HeroCanvas.tsx
"use client";
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Glitch } from '@react-three/postprocessing';

export default function HeroCanvas() {
  return (
    <Canvas
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <octahedronGeometry args={[1.5, 0]} />
          <MeshDistortMaterial
            color="#00F0FF"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
            wireframe
          />
        </mesh>
      </Float>
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur />
        <ChromaticAberration offset={[0.002, 0.002]} />
        <Glitch delay={[3, 8]} duration={[0.1, 0.3]} strength={[0.01, 0.05]} />
      </EffectComposer>
      <Environment preset="city" />
    </Canvas>
  );
}
```

**Asset yang diperlukan:**
- `.glb` avatar dari ReadyPlayerMe (free)
- HDRI environment map dari Poly Haven (free CC0)
- Normal maps dari ambientCG (free CC0)

**Effort:** 3 hari | **Impact:** Hero section dari bagus menjadi memorable

#### 4.1.2 Interactive Particle Universe Background

**Library:** `@react-three/fiber` + custom GLSL shader

```glsl
// shaders/particles.vert — 50.000 partikel di GPU
uniform float time;
uniform float mouseX;
uniform float mouseY;

void main() {
  vec3 pos = position;
  float dist = distance(pos.xy, vec2(mouseX, mouseY) * 5.0);
  float repel = smoothstep(2.0, 0.0, dist) * 0.8;
  pos.x += sin(time * 0.5 + pos.y * 2.0) * 0.1 + repel;
  pos.y += cos(time * 0.3 + pos.x * 2.0) * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 2.0;
}
```

**Performance tuning:**
- `dpr={[0.75, 1]}` pada Canvas
- Particles di GPU (vertex shader), bukan CPU
- `dispose()` semua geometries/materials pada unmount
- Freeze jika tab tidak aktif via `document.visibilitychange`

**Effort:** 2 hari | **Impact:** Background yang benar-benar alive

#### 4.1.3 Spline 3D Scene Integration

**Library:** `@splinetool/react-spline`

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

```tsx
import Spline from '@splinetool/react-spline';

<Spline
  scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
  onLoad={(spline) => {
    const obj = spline.findObjectByName('Hologram');
    if (obj) obj.position.x = 0;
  }}
/>
```

**Effort:** 1-2 hari | **Impact:** 3D interaktif tanpa coding Three.js dari nol

### 4.2 GSAP PREMIUM PLUGINS (Tier B)

#### 4.2.1 SplitText — Kinetic Typography

```tsx
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const split = new SplitText(headingRef.current, { type: 'chars,words' });
gsap.from(split.chars, {
  y: 120,
  opacity: 0,
  rotation: () => gsap.utils.random(-30, 30),
  stagger: { each: 0.03, from: 'random' },
  ease: 'back.out(2)',
  duration: 1.2,
  scrollTrigger: {
    trigger: headingRef.current,
    start: 'top 80%',
  }
});
```

#### 4.2.2 Flip Plugin — Bento Grid Animation

```tsx
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(Flip);

const handleExpand = (cellEl: HTMLElement) => {
  const state = Flip.getState(allCells);
  cellEl.classList.add('expanded');
  Flip.from(state, {
    duration: 0.6,
    ease: 'power2.inOut',
    absolute: true,
  });
};
```

#### 4.2.3 MorphSVG — Icon Transitions

```tsx
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.to('#menuIcon path', {
  morphSVG: '#closeIcon path',
  duration: 0.4,
  ease: 'power2.inOut',
});
```

### 4.3 WebGL Shader Effects

#### 4.3.1 Iridescent / Liquid Metal Hover

```glsl
// shaders/iridescent.frag
uniform float time;
varying vec2 vUv;

void main() {
  float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
  vec3 color = vec3(
    0.5 + 0.5 * sin(angle + time + 0.0),
    0.5 + 0.5 * sin(angle + time + 2.094),
    0.5 + 0.5 * sin(angle + time + 4.188)
  );
  gl_FragColor = vec4(color, 1.0);
}
```

#### 4.3.2 WebGL Page Transition Shader

```glsl
// shaders/glitch-transition.frag
uniform sampler2D tFrom;
uniform sampler2D tTo;
uniform float progress;
varying vec2 vUv;

void main() {
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
  float glitch = step(0.97, noise) * progress;
  vec2 distorted = vUv + vec2(glitch * 0.1, 0.0);
  vec4 from = texture2D(tFrom, distorted);
  vec4 to   = texture2D(tTo, distorted);
  gl_FragColor = mix(from, to, smoothstep(0.0, 1.0, progress));
}
```

### 4.4 Audio Reactive Visualizer

**Library:** Web Audio API (built-in browser)

```tsx
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;
const dataArray = new Uint8Array(analyser.frequencyBinCount);

// Di animation frame:
analyser.getByteFrequencyData(dataArray);
// Render frequency bars sebagai decorative background element
```

User toggle on/off (default: off untuk aksesibilitas)
**Effort:** 2 hari | **Impact:** Experience yang benar-benar immersive

### 4.5 Lottie Animation Integration

**Library:** `lottie-react`

```bash
npm install lottie-react
```

Use cases:
- Loading states yang indah
- Success/error state animations
- Skill icons yang animated
- Empty state illustrations

**Asset sources:** LottieFiles.com, IconScout
**Effort:** 1 hari | **Impact:** Semua micro-state terasa premium

### 4.6 Advanced Cursor System (8 Modes)

```tsx
type CursorMode =
  | 'default'   // dot + ring
  | 'hover'     // expand + color shift + label
  | 'drag'      // grip icon
  | 'text'      // I-beam dengan neon glow
  | 'magnetic'  // snap ke elemen terdekat
  | 'repel'     // element mendorong cursor pergi
  | 'portal'    // mode khusus di page transition
  | 'disabled'; // X merah

// Particle trail system
class CursorParticle {
  x: number; y: number; alpha: number;
  constructor(x: number, y: number) {
    this.x = x; this.y = y; this.alpha = 1;
  }
  update() { this.alpha -= 0.05; }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#00F0FF';
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}
```

### 4.7 PWA + Offline Support

```bash
npm install next-pwa
```

Fitur: installable ke homescreen, offline fallback page yang branded, background sync untuk GitHub data

### 4.8 Real-time GitHub Activity Feed

```tsx
// /api/activity — fetch dari GitHub Events API
// Terminal-style live feed display:
// > 2h ago: Pushed 3 commits to consep33t/main
// > 5h ago: Opened issue #42 "Fix mobile nav overflow"
// > 1d ago: Merged PR #38 "GSAP performance overhaul"
```

---

## 5. ALUR PENULISAN CODE DAN WORKFLOW

### 5.1 Project Structure Target

```
consep33t/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Design tokens + utilities
│   ├── page.tsx             # Homepage
│   ├── projects/page.tsx    # Projects gallery
│   ├── profile/page.tsx     # Profile (Bento redesign)
│   ├── minigame/page.tsx    # Minigame
│   ├── cyber-hack/page.tsx  # Cyber hack terminal
│   ├── not-found.tsx        # 404 epic
│   └── error.tsx            # Error boundary
│
├── components/
│   ├── ui/                  # Atomic components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Terminal.tsx
│   │   └── HoloCard.tsx
│   ├── canvas/              # WebGL/Three.js (TIER B only)
│   │   ├── HeroCanvas.tsx
│   │   ├── ParticleField.tsx
│   │   └── Portal.tsx
│   └── layout/
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       └── HUDLayout.tsx
│
├── lib/
│   ├── github.ts
│   ├── gsap.ts
│   ├── three.ts             # TIER B only
│   └── utils.ts
│
├── hooks/
│   ├── useMousePosition.ts
│   ├── useReducedMotion.ts
│   ├── useInView.ts
│   └── useAudio.ts          # TIER B only
│
└── public/
    ├── models/              # .glb files (TIER B)
    ├── textures/            # .hdr, normal maps (TIER B)
    ├── audio/               # ambient sfx (TIER B)
    └── lottie/              # .json animations
```

### 5.2 Coding Standards

```typescript
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ComponentProps {
  // Props selalu typed, tidak ada 'any'
}

export default function Component({ prop }: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion(); // SELALU check ini

  useGSAP(() => {
    if (prefersReduced) return; // Honor accessibility
    gsap.from(ref.current, { opacity: 0, y: 30 });
  }, { scope: ref, dependencies: [] });

  return <div ref={ref} />;
}
```

### 5.3 Performance Rules WAJIB

**DILARANG:**
- `import * from 'gsap'` — gunakan: `import { gsap } from 'gsap'`
- `framer-motion` untuk animasi moving — ganti dengan GSAP
- `addEventListener` tanpa cleanup di `useEffect`
- `window.*` tanpa `typeof window` check (SSR crash)
- `three.js` di TIER A
- `<img>` tanpa `next/image`
- Font tanpa `display: swap`

**WAJIB:**
- `pointer:fine` check untuk cursor/tilt effects
- `pointer:coarse` check untuk disable heavy effects
- `prefers-reduced-motion` di semua GSAP tweens
- `will-change: transform` pada elemen yang dianimasi
- `passive: true` pada semua scroll/mouse listeners
- Cleanup `return` di setiap `useEffect`
- `useGSAP` dengan `scope` selalu

### 5.4 Git Workflow

```bash
# Branch strategy
main         <- production (auto-deploy ke Vercel)
dev          <- development/staging
feature/xxx  <- fitur baru
fix/xxx      <- bugfix

# Commit convention (Conventional Commits)
feat: add bento grid profile layout
fix: pagination scroll timing race condition
perf: disable ScrollSmoother on touch devices
style: add grain texture overlay
docs: update IMPROVEMENT_PLAN.md
```

---

## 6. LIBRARY, TOOLS DAN ASSET INVENTORY

### 6.1 TIER A — Library yang Diperlukan

| Library | Versi | Size | Fungsi | Status |
|---|---|---|---|---|
| gsap | ^3.13 | ~120KB | Semua animasi | Installed |
| @gsap/react | ^2.1 | ~5KB | useGSAP hook | Installed |
| next | 16.x | — | Framework | Installed |
| framer-motion | current | ~140KB | TARGET: REMOVE | Remove |
| plaiceholder | ^3.0 | ~10KB | Blur placeholder gen | Tambahkan |
| sharp | ^0.33 | — | Image processing | Tambahkan |

```bash
npm install plaiceholder sharp
npm uninstall framer-motion
```

### 6.2 TIER B — Library Tambahan

| Library | Versi | Size | Fungsi |
|---|---|---|---|
| three | ^0.170 | ~580KB | 3D engine |
| @react-three/fiber | ^8.17 | ~60KB | Three.js React bindings |
| @react-three/drei | ^9.120 | ~200KB | Three.js helpers |
| @react-three/postprocessing | ^2.16 | ~80KB | WebGL post-fx |
| @splinetool/react-spline | ^4.0 | ~50KB | Spline 3D scenes |
| lottie-react | ^2.4 | ~60KB | Lottie animations |
| next-pwa | ^5.6 | ~20KB | PWA support |
| tone | ^15.0 | ~300KB | Generative audio |

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install @splinetool/react-spline lottie-react next-pwa
```

> **PENTING:** Three.js + R3F HANYA pakai via `dynamic()` dengan `ssr: false`

```tsx
const HeroCanvas = dynamic(
  () => import('@/components/canvas/HeroCanvas'),
  { ssr: false, loading: () => <div className="hero-canvas-placeholder" /> }
);
```

### 6.3 Development Tools

| Tool | Fungsi | Command |
|---|---|---|
| @next/bundle-analyzer | Visualisasi bundle size | `ANALYZE=true npm run build` |
| @lhci/cli | Automated Lighthouse CI | `npx lhci autorun` |
| axe-core | Accessibility audit | `npx axe http://localhost:3000` |
| eslint-plugin-jsx-a11y | A11y linting | Install via npm |

### 6.4 Asset Sources (Free / Legal)

#### 3D Models

| Source | License | URL |
|---|---|---|
| ReadyPlayerMe | Free | readyplayer.me |
| Sketchfab | Mixed | sketchfab.com |
| Poly.pizza | CC0 | poly.pizza |

#### HDRI / Textures

| Source | License | URL |
|---|---|---|
| Poly Haven | CC0 | polyhaven.com |
| ambientCG | CC0 | ambientcg.com |

#### Icons / SVG

| Source | License | URL |
|---|---|---|
| Lucide React | ISC | lucide.dev |
| Heroicons | MIT | heroicons.com |
| Phosphor Icons | MIT | phosphoricons.com |

#### Lottie Animations

| Source | License | URL |
|---|---|---|
| LottieFiles | Free tier | lottiefiles.com |
| IconScout | Free tier | iconscout.com |

#### Audio (Tier B)

| Source | License | URL |
|---|---|---|
| Freesound | CC0/CC-BY | freesound.org |
| Pixabay | Free | pixabay.com/music |

#### Spline Scenes (Tier B)

| Source | URL |
|---|---|
| Spline Community | spline.design/community |
| Create sendiri | app.spline.design (free plan) |

---

## 7. KEAMANAN DAN HARDENING

### 7.1 HTTP Security Headers

**File:** `next.config.ts`

```typescript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://opengraph.githubassets.com https://avatars.githubusercontent.com",
      "connect-src 'self' https://api.github.com",
      "object-src 'none'",
      "frame-ancestors 'none'",
    ].join('; ')
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
];

async headers() {
  return [{ source: '/(.*)', headers: securityHeaders }];
}
```

### 7.2 API Rate Limiting

```typescript
export async function POST(request: Request) {
  const token = request.headers.get('x-revalidate-token');
  if (token !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
```

Set di Vercel dashboard: `REVALIDATE_SECRET=random-64-char-string`

### 7.3 GitHub Token Security

```typescript
// SALAH — exposed ke browser!
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

// BENAR — server-only
const TOKEN = process.env.GITHUB_TOKEN;
// Hanya digunakan dalam Server Components atau Route Handlers
```

### 7.4 Dependency Security Audit

```bash
npm audit --audit-level=high
npm audit fix
npm outdated
```

---

## 8. ROADMAP IMPLEMENTASI (TIMELINE)

### TIER A — Target: 2 Minggu

```
MINGGU 1 — Foundation dan Quick Wins
======================================
Day 1  | Noise texture + CSS polish                    | 1 jam
Day 1  | SplashCursor mobile fix (skip render)         | 30 mnt
Day 1  | JSON-LD structured data                       | 30 mnt
Day 2  | Footer redesign (magnetic + counter + ASCII)  | 3 jam
Day 2  | Skeleton loading states                       | 2 jam
Day 3  | Variable font animation pada heading          | 1 jam
Day 3  | CSS scroll-driven animations                  | 3 jam
Day 4  | Error boundary + 404 page epic                | 3 jam
Day 5  | ARIA audit + focus ring + skip-to-content     | 1 hari

MINGGU 2 — Profile dan Performance
=====================================
Day 6-7| Profile/page.tsx bento grid redesign          | 1 hari
Day 8  | Bundle analysis + Framer Motion removal       | 3 jam
Day 8  | Image optimization (plaiceholder, blur hash)  | 2 jam
Day 9  | Security headers + API hardening              | 2 jam
Day 9  | content-visibility + font display swap        | 1 jam
Day 10 | Lighthouse audit + fine-tuning                | 1 hari
Day 10 | Deploy + smoke test semua halaman             | 2 jam
```

### TIER B — Target: 4-6 Minggu (setelah Tier A selesai)

```
MINGGU 1 — Three.js Foundation
================================
Day 1-2| Setup Three.js + R3F + dynamic import         | 2 hari
Day 3-4| Hero 3D object (wireframe crystal/hologram)   | 2 hari
Day 5  | Post-processing (Bloom, ChromaticAberration)  | 1 hari

MINGGU 2 — Shader dan Particles
=================================
Day 1-3| Particle universe background                  | 3 hari
Day 4-5| Iridescent hover shader untuk ProjectCard     | 2 hari

MINGGU 3 — Interactions dan Audio
===================================
Day 1-2| Advanced cursor system (particle trail)       | 2 hari
Day 3-4| Audio visualizer ambient                      | 2 hari
Day 5  | GSAP SplitText typography overhaul            | 1 hari

MINGGU 4 — Content dan Pages
==============================
Day 1-2| Bento grid dengan Flip animation              | 2 hari
Day 3  | /cyber-hack page terminal game                | 1 hari
Day 4  | Lottie integration (loading, states)          | 1 hari
Day 5  | Real-time GitHub activity feed                | 1 hari

MINGGU 5 — Polish dan PWA
===========================
Day 1-2| WebGL page transition shader                  | 2 hari
Day 3  | PWA manifest + service worker                 | 1 hari
Day 4-5| Performance audit + optimization              | 2 hari

MINGGU 6 — Final
=================
Day 1-2| Cross-device testing (iOS, Android, tablet)  | 2 hari
Day 3  | Final Lighthouse + Core Web Vitals verify     | 1 hari
Day 4-5| Deploy + monitoring setup                     | 2 hari
```

---

## 9. METRIK SUKSES DAN KPI

### 9.1 Core Web Vitals Target

| Metrik | TIER A Target | TIER B Target | Cara Ukur |
|---|---|---|---|
| LCP (Largest Contentful Paint) | < 1.5s | < 1.0s | Lighthouse |
| INP (Interaction to Next Paint) | < 100ms | < 50ms | Lighthouse |
| CLS (Cumulative Layout Shift) | < 0.05 | < 0.02 | Lighthouse |
| FCP (First Contentful Paint) | < 0.8s | < 0.5s | Lighthouse |
| TTFB (Time to First Byte) | < 200ms | < 100ms | WebPageTest |
| Total Blocking Time | < 200ms | < 100ms | Lighthouse |

### 9.2 Bundle Size Target

| Asset | TIER A Target | TIER B Target |
|---|---|---|
| JS First Load | < 150KB | < 300KB |
| JS per-page chunk | < 50KB | < 80KB |
| CSS | < 30KB | < 40KB |
| 3D Assets (.glb) | N/A | < 5MB total |
| LCP Image | < 100KB | < 50KB (WebP) |

### 9.3 Aksesibilitas dan SEO

| Metrik | Target |
|---|---|
| Lighthouse Accessibility Score | >= 95 |
| Lighthouse SEO Score | >= 100 |
| WCAG Level | AA |
| Structured Data Errors | 0 |
| Mobile-friendly Test | Pass |
| PageSpeed Insights | >= 90 mobile, >= 95 desktop |

### 9.4 Checklist Pre-Deploy

```
PRE-DEPLOY CHECKLIST
=====================
[ ] npm run build — zero errors, zero warnings
[ ] npm audit — no high/critical vulnerabilities
[ ] Lighthouse score >= 90 di semua kategori
[ ] Test di: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
[ ] Test screen sizes: 375px, 768px, 1024px, 1440px, 2560px
[ ] prefers-reduced-motion: animasi berhenti dengan benar
[ ] Keyboard navigation: bisa navigate tanpa mouse
[ ] Network throttle 3G: LCP masih < 3s
[ ] Semua env variables ada di Vercel dashboard
[ ] OG image visible saat share ke WhatsApp/Twitter
[ ] 404 page terlihat bagus
[ ] Error page terlihat bagus
[ ] Console: 0 errors, 0 warnings
```

---

> **Catatan Akhir:** Implementasikan TIER A terlebih dahulu dan deploy. Gunakan Lighthouse score sebagai
> baseline sebelum memulai TIER B. TIER B adalah enhancement, bukan requirement — jika Lighthouse TIER A
> sudah >= 95, baru pertimbangkan TIER B dengan hati-hati per-feature, dimulai dari yang paling impactful.

**Last Updated:** 2026-08-04 | **Status:** PLANNING PHASE | **Next Action:** Start Day 1 TIER A
