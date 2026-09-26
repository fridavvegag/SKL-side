import { sklCircle, type CircleTile } from "@/content/home";
import styles from "./SklCircle.module.css";

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
          preload="metadata"
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

  return (
    <section className={styles.section} aria-label="SKL Circle">
      <div className={styles.collage}>
        <div className={`${styles.row} ${styles.rowWide}`}>
          {row1.tiles.map((tile) => (
            <Tile key={tile.id} tile={tile} />
          ))}
        </div>

        <div className={`${styles.row} ${styles.rowInset}`}>
          {row2.tiles.map((tile) => (
            <Tile key={tile.id} tile={tile} />
          ))}
        </div>

        <div className={`${styles.row} ${styles.rowTitle}`}>
          <Tile tile={row3.tiles[0]} />
          <h2 className={styles.title}>
            <span className={styles.titlePrefix}>{sklCircle.titlePrefix}</span>
            <span className={styles.titleSuffix}>{sklCircle.titleSuffix}</span>
          </h2>
          <Tile tile={row3.tiles[1]} />
        </div>

        <div className={`${styles.row} ${styles.rowInset}`}>
          {row4.tiles.map((tile) => (
            <Tile key={tile.id} tile={tile} />
          ))}
        </div>

        <div className={`${styles.row} ${styles.rowWide}`}>
          {row5.tiles.map((tile) => (
            <Tile key={tile.id} tile={tile} />
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerLeft}>{sklCircle.footerLeft}</p>
        <div className={styles.footerRight}>
          {sklCircle.footerRight.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SklCircle;
