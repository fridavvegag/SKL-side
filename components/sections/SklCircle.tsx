"use client";

import { useEffect, useState } from "react";
import { sklCircle, type CircleRow, type CircleTile } from "@/content/home";
import styles from "./SklCircle.module.css";

function Tile({ tile }: { tile: CircleTile }) {
  return (
    <div
      className={styles.tile}
      style={{ width: tile.w, height: tile.h }}
    >
      {tile.kind === "video" ? (
        <video
          src={tile.media}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          aria-hidden="true"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tile.media} alt="" />
      )}
    </div>
  );
}

function Title() {
  return (
    <h2 className={styles.title}>
      <span className={styles.titlePrefix}>{sklCircle.titlePrefix}</span>
      <span className={styles.titleSuffix}>{sklCircle.titleSuffix}</span>
    </h2>
  );
}

function rowClass(variant: CircleRow["variant"]) {
  if (variant === "inset") return `${styles.row} ${styles.rowInset}`;
  if (variant === "title") return `${styles.row} ${styles.rowTitle}`;
  return `${styles.row} ${styles.rowWide}`;
}

function Collage({
  rows,
  mode,
  hidden,
}: {
  rows: readonly CircleRow[];
  mode: "desktop" | "mobile";
  hidden: boolean;
}) {
  return (
    <div
      className={`${styles.collage} ${
        mode === "desktop" ? styles.desktop : styles.mobile
      }`}
      aria-hidden={hidden}
    >
      {rows.map((row) => (
        <div key={row.id} className={rowClass(row.variant)}>
          {row.variant === "title" ? (
            mode === "desktop" ? (
              <>
                <Tile tile={row.tiles[0]} />
                <Title />
                <Tile tile={row.tiles[1]} />
              </>
            ) : (
              <Title />
            )
          ) : (
            row.tiles.map((tile) => <Tile key={tile.id} tile={tile} />)
          )}
        </div>
      ))}
    </div>
  );
}

export function SklCircle() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section className={styles.section} aria-label="SKL Circle">
      <Collage
        rows={sklCircle.desktop.rows}
        mode="desktop"
        hidden={!isDesktop}
      />
      <Collage
        rows={sklCircle.mobile.rows}
        mode="mobile"
        hidden={isDesktop}
      />
    </section>
  );
}

export default SklCircle;
