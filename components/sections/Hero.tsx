"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/home";
import { LOADING_COMPLETE_EVENT } from "@/components/loading/loadingSequence";
import styles from "./Hero.module.css";

type Phase = "waiting" | "video" | "text";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<Phase>("waiting");

  // Tras el Loading: arrancar video una vez (o saltar a texto si reduced-motion).
  useEffect(() => {
    const startAfterLoading = () => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setPhase("text");
        return;
      }
      setPhase("video");
    };

    window.addEventListener(LOADING_COMPLETE_EVENT, startAfterLoading);
    return () => {
      window.removeEventListener(LOADING_COMPLETE_EVENT, startAfterLoading);
    };
  }, []);

  // Play once when entering video phase; on ended → text screen.
  useEffect(() => {
    if (phase !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = false;
    video.currentTime = 0;

    const onEnded = () => setPhase("text");
    const onError = () => setPhase("text");
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    const play = () => {
      void video.play().catch(() => {
        /* autoplay blocked or decode failure → static text */
        setPhase("text");
      });
    };
    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      video.pause();
    };
  }, [phase]);

  return (
    <section
      className={`${styles.hero} ${phase === "text" ? styles.heroText : ""}`}
      aria-label="Hero"
    >
      {phase !== "text" && (
        <div className={styles.media} aria-hidden={phase === "waiting"}>
          <video
            ref={videoRef}
            className={styles.video}
            src={hero.media}
            muted
            playsInline
            preload="auto"
            controls={false}
            aria-hidden="true"
          />
        </div>
      )}

      {phase === "text" && (
        <div className={styles.textScreen}>
          <h1 className={`text-editorial ${styles.headline}`}>
            <span className={styles.line}>{hero.textLine1}</span>
            <span className={styles.line}>
              {hero.textLine2}
              <span className={styles.accent} aria-hidden="true">
                .
              </span>
            </span>
          </h1>
        </div>
      )}

      {phase === "video" && (
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
      )}
    </section>
  );
}

export default Hero;
