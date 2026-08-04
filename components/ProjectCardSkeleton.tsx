"use client";

export default function ProjectCardSkeleton() {
  return (
    <div className="hud-card relative flex flex-col h-full bg-[rgba(8,8,12,0.4)] border border-[rgba(0,243,255,0.1)] overflow-hidden rounded-sm cursor-default min-h-[380px]">
      {/* Corner HUD accents */}
      <div className="corner-tl opacity-40" />
      <div className="corner-tr opacity-40" />
      <div className="corner-bl opacity-20" />
      <div className="corner-br opacity-20" />

      {/* Shimmer line bar */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Image Area placeholder */}
      <div className="relative h-44 sm:h-52 w-full bg-white/5 border-b border-white/10 flex items-center justify-center">
        <span className="font-mono text-[9px] text-gray-700 tracking-widest">[LOADING_VISUAL...]</span>
      </div>

      {/* Content Area placeholder */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow bg-gradient-to-t from-[#020204]/90 to-transparent">
        {/* Telemetry metadata row */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-2 w-16 bg-white/10 rounded-xs" />
          <div className="h-2.5 w-8 bg-signal-yellow/20 rounded-xs" />
        </div>

        {/* Title placeholder */}
        <div className="h-5 w-3/4 bg-white/15 mb-3 rounded-xs" />

        {/* Description line placeholders */}
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-3 w-full bg-white/5 rounded-xs" />
          <div className="h-3 w-5/6 bg-white/5 rounded-xs" />
          <div className="h-3 w-4/5 bg-white/5 rounded-xs" />
        </div>

        {/* Tags placeholder */}
        <div className="flex gap-2 mb-5">
          <div className="h-4 w-12 bg-white/10 rounded-xs" />
          <div className="h-4 w-16 bg-white/10 rounded-xs" />
          <div className="h-4 w-10 bg-white/10 rounded-xs" />
        </div>

        {/* CTA Buttons line placeholder */}
        <div className="flex gap-3 mt-auto pt-4 border-t border-[rgba(0,243,255,0.1)]">
          <div className="flex-1 h-8 bg-white/10 rounded-xs" />
          <div className="flex-1 h-8 bg-white/10 rounded-xs" />
        </div>
      </div>
    </div>
  );
}
