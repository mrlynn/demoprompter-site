import { CueDirector } from "@/components/CueDirector";
import { DownloadCta } from "@/components/DownloadCta";
import { PrompterWell } from "@/components/PrompterWell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getLatestDmg } from "@/lib/release";
import { site } from "@/lib/site";
import styles from "./page.module.css";

const scriptBeats = [
  { idx: "01", text: "Load the talk. The stack waits in the dark." },
  { idx: "02", text: "The live line is the only one that matters." },
  { idx: "03", text: "You advance. The room never sees the wings." },
  { idx: "04", text: "Listen if you want the next question written down." },
  { idx: "05", text: "Record when the night is worth keeping." },
] as const;

const rooms = [
  {
    roman: "I",
    name: "The floor",
    copy: "The laptop is the stage. The ask is in thirty seconds. The line is already there.",
  },
  {
    roman: "II",
    name: "The chair",
    copy: "An interview turns. You listen, then answer. A quiet prompt, not a second brain on the table.",
  },
  {
    roman: "III",
    name: "The handoff",
    copy: "The same talk, a new room. Notes stay with you. Enablement without a rehearsal circus.",
  },
] as const;

export default async function HomePage() {
  const release = await getLatestDmg();

  return (
    <>
      <SiteHeader release={release} />
      <CueDirector>
        <main id="main">
          <section className={styles.stage} aria-labelledby="hero-title">
            <div className={styles.hero}>
              <div className={styles.lockup}>
                <p className={styles.kicker}>{site.brand}</p>
                <h1 id="hero-title" className={styles.title}>
                  {site.name}
                </h1>
                <p
                  className={styles.tag}
                  data-cue={site.tagline}
                >
                  {site.tagline}
                </p>
                <p className={styles.dek}>
                  A calm teleprompter for live demos and interviews. Optional
                  listen and transcript. Interview assist. Recording when you
                  want it. Local-first. A professional stage companion.
                </p>
                <div className={styles.actions} id="download">
                  <DownloadCta release={release} showMeta />
                  <p className={styles.spaceHint}>
                    <kbd className={styles.kbd}>Space</kbd>
                    advances the cue
                  </p>
                </div>
              </div>
              <PrompterWell />
            </div>
          </section>

          <section
            id="cue"
            className={`${styles.section} ${styles.ink}`}
            aria-labelledby="how-title"
          >
            <div className={styles.narrow}>
              <div className={styles.howHead}>
                <p className={styles.kicker}>How the cue works</p>
                <h2 id="how-title" className={styles.howTitle}>
                  One line is live.
                </h2>
                <p className={styles.howDek}>
                  The rest waits. You keep the room. The cue keeps the next
                  sentence from arriving too early.
                </p>
              </div>
              <ol className={styles.script}>
                {scriptBeats.map((beat) => (
                  <li
                    key={beat.idx}
                    className={styles.scriptLine}
                    data-cue={beat.text}
                  >
                    <span className={styles.idx}>{beat.idx}</span>
                    <span className={styles.lineText}>{beat.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            id="rooms"
            className={`${styles.section} ${styles.bone}`}
            aria-labelledby="rooms-title"
          >
            <div className={styles.wide}>
              <div className={styles.programHead}>
                <p className={styles.programEyebrow}>Tonight&apos;s rooms</p>
                <p className={styles.programMeta}>{site.brand} · 2026</p>
              </div>
              <h2 id="rooms-title" className={styles.programTitle}>
                Moments it exists for
              </h2>
              {rooms.map((room) => (
                <article
                  key={room.roman}
                  className={styles.act}
                  data-cue={room.name}
                >
                  <span className={styles.roman}>{room.roman}</span>
                  <h3 className={styles.actName}>{room.name}</h3>
                  <p className={styles.actCopy}>{room.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className={`${styles.section} ${styles.ink}`}
            aria-label="Trust notes"
          >
            <p className={styles.trust}>
              <span>Keys stay in the Keychain</span>
              <span>macOS native</span>
              <span>Notarized when we can</span>
              <span>No account for the prompter</span>
            </p>
          </section>

          <section
            className={`${styles.section} ${styles.ink} ${styles.close}`}
            data-cue="Take the Mac build."
            aria-labelledby="close-title"
          >
            <p className={styles.kicker}>The invite</p>
            <h2 id="close-title" className={styles.closeLine}>
              Take the Mac build.
            </h2>
            <p className={styles.closeDek}>
              No trial. No account. A DMG for friends, when the release is
              public.
            </p>
            <DownloadCta release={release} showMeta />
          </section>
        </main>
      </CueDirector>
      <SiteFooter />
    </>
  );
}
