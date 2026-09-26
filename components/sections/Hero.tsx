"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/content/home";
import styles from "./Hero.module.css";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const play = () => {
      void video.play().catch(() => {
        /* autoplay may be blocked until interaction */
      });
    };
    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });
  }, []);

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.media}>
        <video
          ref={videoRef}
          className={styles.video}
          src={hero.media}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          controls={false}
          aria-hidden="true"
        />
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
