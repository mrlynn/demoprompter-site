import styles from "./PrompterWell.module.css";

const lines = [
  { text: "The room is already watching.", cue: false },
  { text: "You have one line.", cue: false },
  { text: "Speak the demo. Own the room.", cue: true },
  { text: "Listen. Advance. Stay.", cue: false },
  { text: "Keys stay on this Mac.", cue: false },
] as const;

export function PrompterWell() {
  return (
    <div className={styles.well} aria-hidden="true">
      <div className={styles.grain} />
      <ol className={styles.lines}>
        {lines.map((line) => (
          <li
            key={line.text}
            className={line.cue ? styles.live : styles.dim}
          >
            <span className={styles.tick} />
            {line.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
