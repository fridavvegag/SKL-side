"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/home";
import { LOADING_COMPLETE_EVENT } from "@/components/loading/loadingSequence";
import styles from "./Hero.module.css";

type Phase = "waiting" | "video" | "text";

/** If playback never starts (autoplay/codec), fall through to text. */
const PLAYBACK_STALL_MS = 1500;

/** Crossfade video → text (ms), aligned with Büro-like dissolve. */
const TEXT_CROSSFADE_MS = 850;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<Phase>("waiting");
  const [videoEntered, setVideoEntered] = useState(false);
  const [textEntered, setTextEntered] = useState(false);
  const [videoExiting, setVideoExiting] = useState(false);

  // Tras el Loading: arrancar video una vez (o saltar a texto si reduced-motion).
  useEffect(() => {
    const startAfterLoading = () => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setPhase("text");
        requestAnimationFrame(() => setTextEntered(true));
        return;
      }
      setPhase("video");
      requestAnimationFrame(() => setVideoEntered(true));
    };

    window.addEventListener(LOADING_COMPLETE_EVENT, startAfterLoading);
    return () => {
      window.removeEventListener(LOADING_COMPLETE_EVENT, startAfterLoading);
    };
  }, []);

  // Play once when entering video phase; on ended → editorial text reveal.
  useEffect(() => {
    if (phase !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let exiting = false;
    let stallTimer = 0;
    let exitTimer = 0;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = false;
    video.playsInline = true;

    const goText = () => {
      if (cancelled || exiting) return;
      exiting = true;
      setVideoExiting(true);
      setPhase("text");
      requestAnimationFrame(() => setTextEntered(true));
      exitTimer = window.setTimeout(() => {
        if (!cancelled) setVideoExiting(false);
      }, TEXT_CROSSFADE_MS);
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
        if (name === "AbortError") return;
        goText();
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => {
      cancelled = true;
      clearStall();
      if (exitTimer) window.clearTimeout(exitTimer);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("loadeddata", play);
      video.pause();
    };
  }, [phase]);

  const showVideo = phase === "video" || videoExiting;

  return (
    <section
      className={`${styles.hero} ${
        phase === "text" || videoExiting ? styles.heroText : ""
      }`}
      aria-label="Hero"
    >
      {showVideo && (
        <div
          className={`${styles.media} ${
            videoEntered && !videoExiting ? styles.mediaEntered : ""
          } ${videoExiting ? styles.mediaExit : ""}`}
          aria-hidden={phase !== "video"}
        >
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

      {(phase === "text" || videoExiting) && (
        <div
          className={`${styles.textScreen} ${
            textEntered ? styles.textEntered : ""
          }`}
        >
          <h1 className={`text-editorial ${styles.headline}`}>
            {/*
              Desktop (Figma 328:4884): two lines.
              Mobile (Figma 328:4887): five lines via mobile-only breaks.
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

      {phase === "video" && !videoExiting && (
        <a
          className={`${styles.session} ${
            videoEntered ? styles.sessionEntered : ""
          }`}
          href={hero.sessionHref}
        >
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
