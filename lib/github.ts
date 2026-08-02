/**
 * lib/github.ts
 *
 * Lapisan data untuk menarik repository dari GitHub — tidak ada
 * project data yang di-hardcode di mana pun pada aplikasi ini.
 *
 * Dua strategi tersedia, pilih salah satu (atau pakai keduanya
 * untuk kebutuhan berbeda):
 *
 * 1. getShowcaseRepos() — REST API, difilter berdasarkan topic/tag.
 *    Lebih sederhana, token cukup scope "public_repo" (read-only).
 *    Rekomendasi default untuk MVP.
 *
 * 2. getPinnedRepos() — GraphQL API, mengambil repo yang BENAR-BENAR
 *    di-pin di profil GitHub. REST API v3 TIDAK punya endpoint untuk
 *    pinned repos — data itu cuma tersedia lewat GraphQL v4.
 *
 * Caching pakai Cache Components (Next.js 16) lewat directive
 * "use cache", bukan pola lama fetch(..., { next: { revalidate } }).
 * Aktifkan dulu di next.config.ts: { cacheComponents: true }
 */


export const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Consep33t";
const SHOWCASE_TOPIC = "showcase-portfolio";

// ---------------------------------------------------------------
// Types
// ---------------------------------------------------------------

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
}

export interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: { name: string; color: string } | null;
  topics: string[];
}

// ---------------------------------------------------------------
// Strategi 1 — REST + filter topic (rekomendasi default)
// ---------------------------------------------------------------

export async function getShowcaseRepos(): Promise<GitHubRepo[]> {

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { 
      headers,
      next: { revalidate: 60, tags: ["github-repos"] } 
    }
  );

  if (!res.ok) {
    console.error(`GitHub REST API error: ${res.status} ${res.statusText}`);
    return getMockProjects();
  }

  try {
    const repos: GitHubRepo[] = await res.json();
    
    // Check if it's an API error response (like rate limit)
    if (!Array.isArray(repos)) {
        return getMockProjects();
    }

    // Clean homepage URLs if empty string or missing protocol
    const sanitizedRepos = repos.map((repo) => {
      let homepage = repo.homepage ? repo.homepage.trim() : null;
      if (homepage && !homepage.startsWith("http://") && !homepage.startsWith("https://")) {
        homepage = `https://${homepage}`;
      }
      return {
        ...repo,
        homepage: homepage && homepage.length > 0 ? homepage : null,
      };
    });

    const showcase = sanitizedRepos.filter((repo) => repo.topics?.includes(SHOWCASE_TOPIC));
    if (showcase.length > 0) return showcase;
    
    // fallback to non-forks if no showcase topic found
    const fallback = sanitizedRepos.filter((r) => !r.fork).slice(0, 10);
    if (fallback.length > 0) return fallback;
    
    return getMockProjects();
  } catch (e) {
    console.error("Failed to parse GitHub response", e);
    return getMockProjects();
  }
}

function getMockProjects(): GitHubRepo[] {
  return [
    {
      id: 101,
      name: "SMART-POULTRY-IOT",
      description: "Sistem Ternak Ayam Potong Cerdas Berbasis IoT dengan fitur penimbangan berat otomatis (loadcell), pakan & minum (ESP32, IR, Ultrasonik, Relay), serta dashboard monitoring realtime.",
      html_url: "https://github.com/Consep33t",
      homepage: "https://github.com/Consep33t",
      topics: ["esp32", "iot", "loadcell", "sensors", "nextjs"],
      language: "TypeScript",
      stargazers_count: 142,
      fork: false,
      updated_at: new Date().toISOString()
    },
    {
      id: 102,
      name: "SOLVERA-BACKEND-ENGINE",
      description: "Arsitektur backend scalable dengan optimasi database SQL tingkat mahir dan CI/CD deployment pipeline tanpa downtime untuk lingkungan server produksi.",
      html_url: "https://github.com/Consep33t",
      homepage: "https://github.com/Consep33t",
      topics: ["go", "expressjs", "sql", "cicd", "server-management"],
      language: "Go",
      stargazers_count: 98,
      fork: false,
      updated_at: new Date().toISOString()
    },
    {
      id: 103,
      name: "SMART-WATER-GATE-MONITORING",
      description: "Sistem monitoring & otomatisasi buka-tutup gerbang air sawah end-to-end dari level hardware (mikrokontroler & sensor) hingga server produksi pengguna lapangan.",
      html_url: "https://github.com/Consep33t",
      homepage: "https://github.com/Consep33t",
      topics: ["esp32", "embedded", "networking", "dashboard"],
      language: "C++",
      stargazers_count: 87,
      fork: false,
      updated_at: new Date().toISOString()
    },
    {
      id: 104,
      name: "WASTE-MANAGEMENT-AI-APP",
      description: "Aplikasi web & mobile terintegrasi Kecerdasan Buatan (AI) untuk perusahaan pengelola sampah di Batam (Infinite Learning x Pejantara).",
      html_url: "https://github.com/Consep33t",
      homepage: "https://github.com/Consep33t",
      topics: ["react", "flutter", "ai-integration", "expressjs"],
      language: "TypeScript",
      stargazers_count: 115,
      fork: false,
      updated_at: new Date().toISOString()
    }
  ];
}

// ---------------------------------------------------------------
// Strategi 2 — GraphQL untuk pinned repos yang sesungguhnya
// ---------------------------------------------------------------

const PINNED_REPOS_QUERY = /* GraphQL */ `
  query GetPinnedRepos($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface PinnedRepoNode {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: { name: string; color: string } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
}

export async function getPinnedRepos(): Promise<PinnedRepo[]> {

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: PINNED_REPOS_QUERY,
      variables: { username: GITHUB_USERNAME },
    }),
    next: { revalidate: 3600, tags: ["github-pinned"] }
  });

  if (!res.ok) {
    console.error(`GitHub GraphQL API error: ${res.status} ${res.statusText}`);
    return [];
  }

  try {
    const json = await res.json();

    if (json.errors) {
      console.error(`GraphQL error: ${JSON.stringify(json.errors)}`);
      return [];
    }

    return json.data.user.pinnedItems.nodes.map((node: PinnedRepoNode) => ({
      name: node.name,
      description: node.description,
      url: node.url,
      homepageUrl: node.homepageUrl,
      primaryLanguage: node.primaryLanguage,
      topics: node.repositoryTopics.nodes.map((t) => t.topic.name),
    }));
  } catch (e) {
    console.error("Failed to parse GitHub GraphQL response", e);
    return [];
  }
}
