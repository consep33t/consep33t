import PaginatedProjects from "@/components/PaginatedProjects";
import { TransitionLink } from "@/components/PageTransition";
import { getShowcaseRepos } from "@/lib/github";
import { Suspense } from "react";
import TerminalHeader from "@/components/TerminalHeader";
import HUDLayout from "@/components/HUDLayout";

async function ProjectList() {
  const repos = await getShowcaseRepos();
  return <PaginatedProjects repos={repos} />;
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

      <Suspense fallback={<div className="font-mono text-signal-cyan animate-pulse">LOADING_DATA...</div>}>
        <ProjectList />
      </Suspense>
    </HUDLayout>
  );
}
