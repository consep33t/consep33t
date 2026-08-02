import type { Metadata } from "next";
import { Orbitron, Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import CustomCursor from "@/components/CustomCursor";
import WelcomeLoader from "@/components/WelcomeLoader";
import Navigation from "@/components/Navigation";
import SplashCursor from "@/components/SplashCursor";
import ClickSpark from "@/components/ClickSpark";
import Footer from "@/components/Footer";
import { PageTransitionProvider } from "@/components/PageTransition";
import { SmoothScrollProvider } from "@/components/scroll-system";

// Nama variable di sini SENGAJA beda dari token semantik di
// globals.css (--font-display dkk) -- next/font generate stack font
// yang sudah self-hosted, lalu @theme di globals.css tinggal
// mereferensikannya lewat var(). Kalau nama variable-nya disamakan
// langsung, next/font dan @theme akan rebutan definisi yang sama.
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-orbitron",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-jp",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agengprayoga.com"),
  title: "Ageng Prayoga | Elite Frontend Architect & System Engineer",
  description: "Bosan dengan website lambat? Rasakan performa 60FPS absolut dengan estetika Cyberpunk. Rekrut System Architect yang membangun antarmuka tanpa kompromi hari ini.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ageng Prayoga | Elite Frontend Architect",
    description: "Performa 60FPS absolut dengan estetika Cyberpunk. Rekrut System Architect yang membangun antarmuka tanpa kompromi hari ini.",
    url: "https://agengprayoga.com",
    siteName: "Ageng Prayoga",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ageng Prayoga - System Architect",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansJP.variable}`}
    >
      <body>
        <SplashCursor />
        <ClickSpark sparkColor="#FF2E9F" sparkSize={10} sparkRadius={25} sparkCount={12} duration={600}>
          <CustomCursor />
          <WelcomeLoader />
          <PageTransitionProvider>
            {/* Navigation SENGAJA di luar SmoothScrollProvider: ScrollSmoother
                memberi transform ke #smooth-content, dan ancestor yang
                ke-transform jadi containing block baru untuk descendant
                position:fixed -- kalau Navigation ada di dalam, dia bakal
                ikut geser waktu scroll alih-alih diam di viewport. */}
            <Navigation />
            <SmoothScrollProvider>
              {children}
              <Footer />
            </SmoothScrollProvider>
          </PageTransitionProvider>
        </ClickSpark>
      </body>
    </html>
  );
}
