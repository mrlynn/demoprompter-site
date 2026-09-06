export const site = {
  name: "Demo Prompter",
  tagline: "Speak the demo. Own the room.",
  description:
    "A calm macOS teleprompter for live demos and interviews. Local-first. Built for the room, not the feed.",
  brand: "Clear Cue",
  author: "Michael Lynn",
  email: "hello@demoprompter.app",
  emailNote: "placeholder",
  githubAppRepo: "https://github.com/mrlynn/cursor-demo-teleprompter",
  githubReleases: "https://github.com/mrlynn/cursor-demo-teleprompter/releases",
  githubApiLatest:
    "https://api.github.com/repos/mrlynn/cursor-demo-teleprompter/releases/latest",
  githubApiReleases:
    "https://api.github.com/repos/mrlynn/cursor-demo-teleprompter/releases?per_page=8",
  effectiveDate: "September 6, 2026",
} as const;

const DEFAULT_SITE_URL = "https://demoprompter.app";

function normalize(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

export function siteUrl(): string {
  return (
    normalize(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalize(process.env.VERCEL_URL) ??
    DEFAULT_SITE_URL
  );
}
