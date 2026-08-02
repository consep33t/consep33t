/**
 * Efek glitch "mosaic" untuk thumbnail proyek -- dua layer duplikat
 * dengan pergeseran warna (cyan/pink, meniru chromatic aberration)
 * di-clip jadi potongan acak yang lompat-lompat lewat steps(),
 * dipicu :hover. Murni CSS, jadi TIDAK butuh "use client" -- boleh
 * langsung dipakai di dalam Server Component (misal ProjectCard yang
 * merender data GitHub), nol JavaScript tambahan ke browser.
 *
 * Catatan mobile: :hover di layar sentuh baru aktif setelah tap dan
 * nyangkut sampai tap di tempat lain. Kalau nanti terasa ganjil di
 * HP, ganti trigger-nya ke IntersectionObserver atau :active.
 */
export default function GlitchMosaic({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glitch-mosaic ${className}`}>
      <div className="glitch-mosaic__base">{children}</div>
      <div
        className="glitch-mosaic__slice glitch-mosaic__slice--cyan"
        aria-hidden="true"
      >
        {children}
      </div>
      <div
        className="glitch-mosaic__slice glitch-mosaic__slice--pink"
        aria-hidden="true"
      >
        {children}
      </div>

      <style>{`
        .glitch-mosaic {
          position: relative;
          overflow: hidden;
        }
        .glitch-mosaic__base {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .glitch-mosaic__slice {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0;
          mix-blend-mode: screen;
          transition: opacity 0.15s ease;
        }
        .glitch-mosaic__slice--cyan {
          filter: brightness(1.2) sepia(1) hue-rotate(150deg) saturate(6);
        }
        .glitch-mosaic__slice--pink {
          filter: brightness(1.1) sepia(1) hue-rotate(280deg) saturate(6);
        }
        .glitch-mosaic:hover .glitch-mosaic__slice {
          opacity: 0.85;
          animation: glitch-shift 0.35s steps(2, jump-end) infinite;
        }
        .glitch-mosaic:hover .glitch-mosaic__slice--pink {
          animation-direction: reverse;
          animation-duration: 0.28s;
        }
        @keyframes glitch-shift {
          0%   { clip-path: inset(10% 0 70% 0); transform: translate(-4px, 0); }
          20%  { clip-path: inset(60% 0 5% 0);  transform: translate(3px, 0); }
          40%  { clip-path: inset(30% 0 45% 0); transform: translate(-2px, 0); }
          60%  { clip-path: inset(80% 0 2% 0);  transform: translate(4px, 0); }
          80%  { clip-path: inset(5% 0 85% 0);  transform: translate(-3px, 0); }
          100% { clip-path: inset(45% 0 30% 0); transform: translate(2px, 0); }
        }
      `}</style>
    </div>
  );
}
