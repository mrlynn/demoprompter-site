import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <BrandMark className={styles.mark} />
          <div>
            <p className={styles.name}>{site.name}</p>
            <p className={styles.tag}>{site.tagline}</p>
          </div>
        </div>
        <nav className={styles.links} aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
          <a href={site.githubReleases} rel="noreferrer">
            GitHub releases
          </a>
        </nav>
      </div>
      <p className={styles.fine}>
        {site.brand} · {site.author} · macOS
      </p>
    </footer>
  );
}
