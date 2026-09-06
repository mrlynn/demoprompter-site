import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/lib/site";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main id="main" className={styles.wrap}>
      <BrandMark className={styles.mark} />
      <p className={styles.kicker}>Line not found</p>
      <h1>This cue is off the page.</h1>
      <p className={styles.dek}>
        The script does not have that route. Back to {site.name}.
      </p>
      <Link className={styles.back} href="/">
        Return to the house
      </Link>
    </main>
  );
}
