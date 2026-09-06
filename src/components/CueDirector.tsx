"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./CueDirector.module.css";

type CueDirectorProps = {
  children: ReactNode;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CueDirector({ children }: CueDirectorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [liveText, setLiveText] = useState("Speak the demo. Own the room.");
  const liveId = useId();

  const lines = useCallback((): HTMLElement[] => {
    const root = rootRef.current;
    if (!root) {
      return [];
    }
    return Array.from(root.querySelectorAll<HTMLElement>("[data-cue]"));
  }, []);

  const setLive = useCallback((node: HTMLElement | null) => {
    const all = lines();
    for (const line of all) {
      const on = line === node;
      line.toggleAttribute("data-live", on);
      if (on) {
        line.setAttribute("aria-current", "true");
      } else {
        line.removeAttribute("aria-current");
      }
    }
    if (node) {
      const text = node.dataset.cue || node.textContent?.trim() || "";
      if (text) {
        setLiveText(text);
      }
    }
  }, [lines]);

  const nearestToRail = useCallback((): HTMLElement | null => {
    const all = lines();
    if (!all.length) {
      return null;
    }

    const rail = window.innerHeight * 0.42;
    let best: HTMLElement | null = null;
    let bestDist = Number.POSITIVE_INFINITY;

    for (const line of all) {
      const rect = line.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const dist = Math.abs(mid - rail);
      if (dist < bestDist) {
        bestDist = dist;
        best = line;
      }
    }

    return best;
  }, [lines]);

  useEffect(() => {
    const sync = () => {
      setLive(nearestToRail());
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [nearestToRail, setLive]);

  const advance = useCallback(
    (direction: 1 | -1) => {
      const all = lines();
      if (!all.length) {
        return;
      }

      const current = all.findIndex((line) => line.hasAttribute("data-live"));
      const nextIndex = Math.min(
        all.length - 1,
        Math.max(0, (current === -1 ? 0 : current) + direction),
      );
      const next = all[nextIndex];
      setLive(next);

      if (!prefersReducedMotion()) {
        next.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
    },
    [lines, setLive],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "A" ||
        tag === "BUTTON" ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.code === "Space" || event.key === "ArrowDown") {
        event.preventDefault();
        advance(1);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        advance(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [advance]);

  return (
    <div ref={rootRef} className={styles.director}>
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.railLabel}>Cue</span>
        <span className={styles.railLine} />
      </div>
      <p className="visually-hidden" aria-live="polite" id={liveId}>
        Current cue: {liveText}
      </p>
      {children}
    </div>
  );
}
