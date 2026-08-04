import PaginatedProjects from "@/components/PaginatedProjects";
import { TransitionLink } from "@/components/PageTransition";
import { getShowcaseRepos } from "@/lib/github";
import { Suspense } from "react";
import TerminalHeader from "@/components/TerminalHeader";
import HUDLayout from "@/components/HUDLayout";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";

async function ProjectList() {
  const repos = await getShowcaseRepos();
  return <PaginatedProjects repos={repos} />;
}

function ProjectsPageFallback() {
  return (
    <div className="flex flex-col gap-10">
      <div className="hud-card relative p-4 sm:p-8 rounded-sm bg-[rgba(10,10,12,0.4)] border border-[rgba(0,243,255,0.1)]">
        <div className="corner-tl opacity-40" />
        <div className="corner-tr opacity-40" />
        <div className="corner-bl opacity-20" />
        <div className="corner-br opacity-20" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 relative z-10">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <HUDLayout>
      <div className="mb-10 flex items-end justify-between">
        <TerminalHeader title="All Projects" subtitle="// operator_archive" />
        <TransitionLink
          href="/"
          data-cursor="hover"
          className="font-mono text-xs tracking-widest text-text-secondary transition-colors hover:text-signal-pink pb-4"
        >
          ← KEMBALI
        </TransitionLink>
      </div>

      <Suspense fallback={<ProjectsPageFallback />}>
        <ProjectList />
      </Suspense>
    </HUDLayout>
  );
}
