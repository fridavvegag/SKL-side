import { hero } from "@/content/home";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.media} alt="" />
      </div>
      <a className={styles.session} href={hero.sessionHref}>
        <span>{hero.sessionLabel}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/icons/icon-session.svg"
          alt=""
          width={14}
          height={14}
          aria-hidden="true"
        />
      </a>
    </section>
  );
}

export default Hero;
