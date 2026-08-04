import { NextResponse } from "next/server";

export interface GitHubActivityEvent {
  id: string;
  type: string;
  repoName: string;
  repoUrl: string;
  createdAt: string;
  detail: string;
}

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/users/Consep33t/events/public?per_page=10", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Consep33t-Portfolio",
      },
      next: { revalidate: 300 }, // Cache 5 minutes
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const events = await res.json();

    const formattedEvents: GitHubActivityEvent[] = events.slice(0, 6).map((e: any) => {
      let detail = "Activity in repository";
      if (e.type === "PushEvent") {
        const commitCount = e.payload?.commits?.length || 1;
        const msg = e.payload?.commits?.[0]?.message || "";
        detail = `Pushed ${commitCount} commit${commitCount > 1 ? "s" : ""}${msg ? `: "${msg.slice(0, 45)}..."` : ""}`;
      } else if (e.type === "CreateEvent") {
        detail = `Created ${e.payload?.ref_type || "resource"} ${e.payload?.ref ? `'${e.payload.ref}'` : ""}`;
      } else if (e.type === "WatchEvent") {
        detail = "Starred repository";
      } else if (e.type === "ForkEvent") {
        detail = "Forked repository";
      } else if (e.type === "IssuesEvent") {
        detail = `${e.payload?.action || "Updated"} issue #${e.payload?.issue?.number}`;
      } else if (e.type === "PullRequestEvent") {
        detail = `${e.payload?.action || "Updated"} PR #${e.payload?.number}`;
      }

      return {
        id: e.id,
        type: e.type,
        repoName: e.repo?.name || "Consep33t/repo",
        repoUrl: `https://github.com/${e.repo?.name || "Consep33t"}`,
        createdAt: e.created_at,
        detail,
      };
    });

    return NextResponse.json({ events: formattedEvents, success: true });
  } catch (error) {
    // Fallback static event feed if offline or rate limited
    return NextResponse.json({
      events: [
        {
          id: "fallback-1",
          type: "PushEvent",
          repoName: "Consep33t/consep33t",
          repoUrl: "https://github.com/Consep33t/consep33t",
          createdAt: new Date().toISOString(),
          detail: "Pushed: v2.0.0 Three.js 3D Hero Section & Advanced Cursor",
        },
        {
          id: "fallback-2",
          type: "PushEvent",
          repoName: "Consep33t/Solvera-Backend",
          repoUrl: "https://github.com/Consep33t",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          detail: "Pushed: Clean Architecture & Go REST API routes",
        },
      ],
      success: false,
    });
  }
}
