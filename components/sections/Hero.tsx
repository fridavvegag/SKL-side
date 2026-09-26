"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/home";
import { LOADING_COMPLETE_EVENT } from "@/components/loading/loadingSequence";
import styles from "./Hero.module.css";

type Phase = "waiting" | "video" | "text";

/** If playback never starts (autoplay/codec), fall through to text. */
const PLAYBACK_STALL_MS = 1500;

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

    let cancelled = false;
    let stallTimer = 0;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = false;
    video.playsInline = true;

    const goText = () => {
      if (!cancelled) setPhase("text");
    };

    const clearStall = () => {
      if (stallTimer) {
        window.clearTimeout(stallTimer);
        stallTimer = 0;
      }
    };

    const armStall = () => {
      clearStall();
      stallTimer = window.setTimeout(() => {
        if (cancelled) return;
        // Still no progress → skip to static hero.
        if (video.paused || video.currentTime < 0.05) goText();
      }, PLAYBACK_STALL_MS);
    };

    const onEnded = () => goText();
    const onError = () => goText();
    const onPlaying = () => clearStall();

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    video.addEventListener("playing", onPlaying);

    const play = () => {
      if (cancelled) return;
      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek errors before metadata */
      }
      armStall();
      void video.play().catch((err: unknown) => {
        if (cancelled) return;
        const name =
          err && typeof err === "object" && "name" in err
            ? String((err as { name: string }).name)
            : "";
        // Strict Mode cleanup aborts the first play(); ignore that.
        if (name === "AbortError") return;
        goText();
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => {
      cancelled = true;
      clearStall();
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("loadeddata", play);
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
            {/*
              Desktop (Figma 328:4884): two lines.
              Mobile (Figma 328:4887): five lines via mobile-only breaks.
              Double space after "An" matches Figma copy.
            */}
            <span className={styles.line}>
              An{"\u00A0\u00A0"}
              <br className={styles.mobileBr} />
              independent{" "}
              <br className={styles.mobileBr} />
              creative
            </span>
            <span className={styles.line}>
              studio in{" "}
              <br className={styles.mobileBr} />
              Mexico City
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
