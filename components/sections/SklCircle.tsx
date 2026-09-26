"use client";

import { sklCircle, type CircleTile } from "@/content/home";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import styles from "./SklCircle.module.css";

const STAGGER_MS = 60;

function Tile({ tile }: { tile: CircleTile }) {
  return (
    <div className={`${styles.tile} ${styles[tile.size]}`}>
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

export function SklCircle() {
  const [row1, row2, row3, row4, row5] = sklCircle.rows;

  const revealTiles = (tiles: readonly CircleTile[], startIndex = 0) =>
    tiles.map((tile, i) => (
      <ScrollReveal key={tile.id} delay={(startIndex + i) * STAGGER_MS}>
        <Tile tile={tile} />
      </ScrollReveal>
    ));

  return (
    <section className={styles.section} aria-label="SKL Circle">
      <div className={styles.collage}>
        <div className={`${styles.row} ${styles.rowWide}`}>
          {revealTiles(row1.tiles, 0)}
        </div>

        <div className={`${styles.row} ${styles.rowInset}`}>
          {revealTiles(row2.tiles, 0)}
        </div>

        <div className={`${styles.row} ${styles.rowTitle}`}>
          <ScrollReveal delay={0}>
            <Tile tile={row3.tiles[0]} />
          </ScrollReveal>
          <ScrollReveal delay={STAGGER_MS}>
            <h2 className={styles.title}>
              <span className={styles.titlePrefix}>{sklCircle.titlePrefix}</span>
              <span className={styles.titleSuffix}>{sklCircle.titleSuffix}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={STAGGER_MS * 2}>
            <Tile tile={row3.tiles[1]} />
          </ScrollReveal>
        </div>

        <div className={`${styles.row} ${styles.rowInset}`}>
          {revealTiles(row4.tiles, 0)}
        </div>

        <div className={`${styles.row} ${styles.rowWide}`}>
          {revealTiles(row5.tiles, 0)}
        </div>
      </div>

      <ScrollReveal>
        <div className={styles.footer}>
          <p className={styles.footerLeft}>{sklCircle.footerLeft}</p>
          <div className={styles.footerRight}>
            {sklCircle.footerRight.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

export default SklCircle;
