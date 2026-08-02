import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { TransitionLink } from "@/components/PageTransition";
import { getShowcaseRepos } from "@/lib/github";
import GlitchText from "@/components/GlitchText";
import DecryptedText from "@/components/DecryptedText";
import SplitText from "@/components/SplitText";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";

export default async function HomePage() {
  const repos = await getShowcaseRepos();
  const featured = repos.slice(0, 3);

  return (
    <main className="bg-[#08080C] overflow-hidden">
      <Hero />

      {/* SECTION 01: OPERATOR PROFILE (RIGHT ALIGNED) */}
      <section className="mx-auto max-w-7xl px-6 py-32 sm:px-12 relative flex justify-end">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 font-jp text-[150px] md:text-[250px] text-white/[0.02] -z-10 select-none font-black leading-none whitespace-nowrap">
          電脳空間
        </div>
        
        <div className="w-full max-w-3xl border-r-4 border-signal-cyan pr-8 md:pr-12 relative text-right">
          <div className="absolute -right-[6px] top-0 w-2 h-2 bg-signal-cyan rounded-full animate-pulse shadow-[0_0_10px_#00F0FF]" />
          
          <p className="font-mono text-xs uppercase tracking-widest text-signal-cyan mb-4">
            <DecryptedText text="// 01 — operator_profile" animateOn="view" speed={40} />
          </p>
          
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] mb-8">
            <GlitchText text="FULLSTACK_&_IOT_ENGINEER" />
          </h2>
          
          <div className="text-lg md:text-xl leading-relaxed text-text-secondary font-sans border border-white/5 bg-white/[0.01] p-8 shadow-inner backdrop-blur-sm rounded-l-2xl">
            <SplitText 
              text="Lulusan baru S1 Teknik Informatika (IPK 3.29) Institut Teknologi dan Bisnis Indonesia Medan. Berkomitmen mengembangkan web modern dan solusi Internet of Things (IoT) berbasis data untuk transformasi digital efisien."
              delay={15}
              animationFrom={{ opacity: 0, transform: 'translate3d(-20px,0,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              threshold={0.1}
            />
          </div>
        </div>
      </section>

      {/* MINIGAME SECTION (CENTERED, MASSIVE) */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-signal-pink/5 to-transparent blur-3xl -z-10" />
        <div className="border border-signal-pink/20 bg-[#131320]/80 backdrop-blur-md p-12 md:p-24 shadow-[0_0_40px_rgba(255,46,159,0.05)] relative overflow-hidden group text-center rounded-3xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-signal-pink/10 blur-[100px] group-hover:bg-signal-pink/20 transition-all duration-1000 -z-10" />
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-signal-pink/10 mb-8 animate-bounce">
            <span className="text-3xl">💀</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">
            <GlitchText text="[UNAUTHORIZED_ACCESS_DETECTED]" />
          </h2>
          
          <p className="font-mono text-base text-gray-400 mb-10 max-w-xl mx-auto">
            Mainframe mendeteksi anomali. Bypass sistem pertahanan untuk mengakses neural records yang tersembunyi.
          </p>
          
          <TransitionLink
            href="/cyber-hack"
            data-cursor="hover"
            className="inline-block px-12 py-5 bg-signal-pink text-black font-mono text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] shadow-[0_0_20px_rgba(255,46,159,0.4)]"
          >
            INITIATE_HACK_SEQUENCE
          </TransitionLink>
        </div>
      </section>

      {/* FEATURED REPOS (LEFT ALIGNED) */}
      <section className="mx-auto max-w-7xl px-6 py-32 sm:px-12 relative">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-signal-cyan/20 pb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal-cyan flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-signal-cyan inline-block animate-pulse shadow-[0_0_10px_#00F0FF]" />
              <DecryptedText text="// 02 — featured_repositories" animateOn="view" speed={40} />
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
              <GlitchText text="ARSENAL_DATA" />
            </h2>
          </div>
          <TransitionLink
            href="/projects"
            data-cursor="hover"
            className="group relative font-mono text-sm tracking-[0.2em] text-white transition-colors hover:text-signal-cyan mt-8 md:mt-0 inline-flex items-center gap-3 font-bold bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:border-signal-cyan/50"
          >
            LIHAT_SEMUA 
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-125 text-signal-cyan">→</span>
          </TransitionLink>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="p-12 border border-white/10 text-center rounded-2xl bg-white/[0.02]">
            <p className="font-mono text-sm text-text-secondary">
              <DecryptedText text="// ERROR: 404_REPOS_NOT_FOUND" speed={40} />
            </p>
          </div>
        )}
      </section>

      {/* OTHER SECTIONS */}
      <ExperienceSection />
      <SkillsSection />
      <CertificatesSection />
      <ContactSection />
    </main>
  );
}
