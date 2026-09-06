import { site } from "@/lib/site";

export type Release =
  | {
      status: "ready";
      url: string;
      version: string | null;
      filename: string | null;
    }
  | {
      status: "soon";
      reason: "unavailable" | "no-dmg";
    };

type GithubAsset = {
  name: string;
  browser_download_url: string;
};

type GithubRelease = {
  tag_name?: string;
  name?: string;
  assets?: GithubAsset[];
};

function envOverride(): Release | null {
  const url = process.env.NEXT_PUBLIC_DMG_URL?.trim();
  if (!url) {
    return null;
  }

  return {
    status: "ready",
    url,
    version: process.env.NEXT_PUBLIC_RELEASE_VERSION?.trim() || null,
    filename: url.split("/").pop() ?? null,
  };
}

function pickDmg(assets: GithubAsset[] | undefined): GithubAsset | null {
  if (!assets?.length) {
    return null;
  }

  const dmgs = assets.filter((asset) =>
    asset.name.toLowerCase().endsWith(".dmg"),
  );

  const named = dmgs.find((asset) =>
    asset.name.toLowerCase().includes("demoprompter"),
  );

  return named ?? dmgs[0] ?? null;
}

function fromRelease(release: GithubRelease): Release {
  const asset = pickDmg(release.assets);
  if (!asset) {
    return { status: "soon", reason: "no-dmg" };
  }

  return {
    status: "ready",
    url: asset.browser_download_url,
    version: release.tag_name ?? release.name ?? null,
    filename: asset.name,
  };
}

async function githubJson(url: string): Promise<Response> {
  return fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "demoprompter-site",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 300 },
  });
}

export async function getLatestDmg(): Promise<Release> {
  const override = envOverride();
  if (override) {
    return override;
  }

  try {
    const latest = await githubJson(site.githubApiLatest);
    if (latest.ok) {
      const body = (await latest.json()) as GithubRelease;
      return fromRelease(body);
    }

    if (latest.status === 404) {
      const list = await githubJson(site.githubApiReleases);
      if (list.ok) {
        const releases = (await list.json()) as GithubRelease[];
        for (const release of releases) {
          const found = fromRelease(release);
          if (found.status === "ready") {
            return found;
          }
        }
      }
    }

    return { status: "soon", reason: "unavailable" };
  } catch {
    return { status: "soon", reason: "unavailable" };
  }
}
