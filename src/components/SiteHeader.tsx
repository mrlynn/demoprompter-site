import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { DownloadCta } from "@/components/DownloadCta";
import type { Release } from "@/lib/release";
import { site } from "@/lib/site";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  release: Release;
  tone?: "ink" | "bone";
};

export function SiteHeader({ release, tone = "ink" }: SiteHeaderProps) {
  return (
    <header className={`${styles.header} ${styles[tone]}`}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label={`${site.name} home`}>
          <BrandMark className={styles.mark} />
          <span className={styles.word}>{site.name}</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/#cue">The cue</Link>
          <Link href="/#rooms">Rooms</Link>
          <DownloadCta variant={tone === "bone" ? "bone" : "ghost"} size="sm" release={release} />
        </nav>
      </div>
    </header>
  );
}
