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

function DesktopCollage() {
  return (
    <div className={`${styles.collage} ${styles.desktop}`}>
      {sklCircle.desktop.rows.map((row) => (
        <div key={row.id} className={rowClass(row.variant)}>
          {row.variant === "title" ? (
            <>
              <Tile tile={row.tiles[0]} />
              <Title />
              <Tile tile={row.tiles[1]} />
            </>
          ) : (
            row.tiles.map((tile) => <Tile key={tile.id} tile={tile} />)
          )}
        </div>
      ))}
    </div>
  );
}

function MobileCollage() {
  return (
    <div className={`${styles.collage} ${styles.mobile}`}>
      {sklCircle.mobile.rows.map((row) => (
        <div key={row.id} className={rowClass(row.variant)}>
          {row.variant === "title" ? (
            <Title />
          ) : (
            row.tiles.map((tile) => <Tile key={tile.id} tile={tile} />)
          )}
        </div>
      ))}
    </div>
  );
}

export function SklCircle() {
  return (
    <section className={styles.section} aria-label="SKL Circle">
      <DesktopCollage />
      <MobileCollage />
    </section>
  );
}

export default SklCircle;
