import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Release } from "@/lib/release";
import { site } from "@/lib/site";
import styles from "./LegalDoc.module.css";

type LegalDocProps = {
  title: string;
  lede: string;
  release: Release;
  children: ReactNode;
};

export function LegalDoc({ title, lede, release, children }: LegalDocProps) {
  return (
    <div className={styles.page}>
      <SiteHeader release={release} tone="bone" />
      <main id="main" className={styles.main}>
        <header className={styles.head}>
          <p className={styles.kicker}>{site.name}</p>
          <h1>{title}</h1>
          <p className={styles.lede}>{lede}</p>
          <p className={styles.date}>Effective {site.effectiveDate}</p>
        </header>
        <div className={styles.body}>{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
