import type { Release } from "@/lib/release";
import { getLatestDmg } from "@/lib/release";
import styles from "./DownloadCta.module.css";

type DownloadCtaProps = {
  variant?: "solid" | "ghost" | "bone";
  size?: "sm" | "md";
  showMeta?: boolean;
  release?: Release;
};

function labelFor(release: Release): string {
  switch (release.status) {
    case "ready":
      return "Download for Mac";
    case "soon":
      return "Coming soon";
    default: {
      const _never: never = release;
      return _never;
    }
  }
}

function metaFor(release: Release): string {
  switch (release.status) {
    case "ready":
      return release.version
        ? `${release.version} · macOS DMG`
        : "macOS DMG";
    case "soon":
      return "The DMG is still in the wings";
    default: {
      const _never: never = release;
      return _never;
    }
  }
}

export async function DownloadCta({
  variant = "solid",
  size = "md",
  showMeta = false,
  release: provided,
}: DownloadCtaProps) {
  const release = provided ?? (await getLatestDmg());
  const className = [
    styles.cta,
    styles[variant],
    styles[size],
    release.status === "soon" ? styles.soon : "",
  ]
    .filter(Boolean)
    .join(" ");

  const label = labelFor(release);
  const meta = metaFor(release);

  if (release.status === "ready") {
    return (
      <span className={styles.wrap}>
        <a className={className} href={release.url} download>
          {label}
        </a>
        {showMeta ? <span className={styles.meta}>{meta}</span> : null}
      </span>
    );
  }

  return (
    <span className={styles.wrap}>
      <span className={className} aria-disabled="true">
        {label}
      </span>
      {showMeta ? <span className={styles.meta}>{meta}</span> : null}
    </span>
  );
}
