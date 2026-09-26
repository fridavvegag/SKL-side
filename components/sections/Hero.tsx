"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/home";
import styles from "./Hero.module.css";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return;
    video.muted = true;
    const play = () => {
      void video.play().catch(() => {
        /* autoplay may be blocked; poster remains */
      });
    };
    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });
  }, [videoFailed]);

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.media}>
        {videoFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.poster} alt="" />
        ) : (
          <video
            ref={videoRef}
            className={styles.video}
            src={hero.media}
            poster={hero.poster}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            controls={false}
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
          />
        )}
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
