"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "./LoadingExperience.module.css";
import {
  LOADING_COMPLETE_EVENT,
  LOOP_IMAGES,
  PRELOAD_ASSETS,
  TIMINGS,
} from "./loadingSequence";

/**
 * Loading:
 *   1. Pantalla negra unos segundos
 *   2. Tile baja de arriba → abajo; "WE ARE SKLIO" sube de abajo → arriba
 *   3. Tile loopea (hard cuts); texto fijo
 *   4. Slide-away vertical; Hero arranca debajo
 */
export function LoadingExperience() {
  const [entered, setEntered] = useState(false);
  const [settled, setSettled] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (PRELOAD_ASSETS.length === 0) {
      setAssetsReady(true);
      return;
    }
    let cancelled = false;
    let loaded = 0;
    const finish = () => {
      loaded += 1;
      if (loaded >= PRELOAD_ASSETS.length && !cancelled) setAssetsReady(true);
    };
    for (const src of PRELOAD_ASSETS) {
      if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        const onDone = () => {
          video.removeEventListener("loadeddata", onDone);
          video.removeEventListener("error", onDone);
          finish();
        };
        video.addEventListener("loadeddata", onDone);
        video.addEventListener("error", onDone);
        video.src = src;
        video.load();
      } else {
        const img = new Image();
        img.onload = finish;
        img.onerror = finish;
        img.src = src;
      }
    }
    return () => {
      cancelled = true;
    };
  }, []);

  // Negro → entrada opuesta (tile↓ / texto↑) → settled.
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);

    const timers: number[] = [];
    const at = (fn: () => void, delay: number) => {
      timers.push(window.setTimeout(fn, delay));
    };

    if (isReduced) {
      setEntered(true);
      setSettled(true);
      at(() => setSequenceComplete(true), TIMINGS.reducedHold);
    } else {
      at(() => setEntered(true), TIMINGS.blackHold);
      at(() => {
        setSettled(true);
        setSequenceComplete(true);
      }, TIMINGS.blackHold + TIMINGS.appear + TIMINGS.textStagger + TIMINGS.phase2Hold);
    }

    return () => {
      for (const id of timers) clearTimeout(id);
    };
  }, []);

  // Loop de imagen solo cuando ya entró el lockup.
  useEffect(() => {
    if (!entered || reduced || revealing || done) return;
    if (LOOP_IMAGES.length <= 1) return;

    const id = window.setInterval(() => {
      setLoopIndex((i) => (i + 1) % LOOP_IMAGES.length);
    }, TIMINGS.flash);

    return () => clearInterval(id);
  }, [entered, reduced, revealing, done]);

  useEffect(() => {
    if (!sequenceComplete || !assetsReady || revealing || done) return;
    setRevealing(true);
    window.dispatchEvent(new CustomEvent(LOADING_COMPLETE_EVENT));
  }, [sequenceComplete, assetsReady, revealing, done]);

  useEffect(() => {
    if (!revealing || done) return;
    const id = window.setTimeout(() => setDone(true), TIMINGS.reveal);
    return () => clearTimeout(id);
  }, [revealing, done]);

  if (done) return null;

  const current = LOOP_IMAGES[loopIndex] ?? LOOP_IMAGES[0];

  return (
    <div
      className={`surface-inverted ${styles.overlay} ${
        reduced ? styles.reduced : ""
      } ${revealing ? styles.revealOut : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={
        {
          "--appear-dur": `${TIMINGS.appear}ms`,
          "--text-stagger": `${TIMINGS.textStagger}ms`,
          "--reveal-dur": `${TIMINGS.reveal}ms`,
        } as CSSProperties
      }
    >
      <div className={styles.stage}>
        <div className={styles.lockup}>
          {current && (
            <div
              className={`${styles.tile} ${entered ? styles.tileEnter : ""} ${
                settled ? styles.tileSettled : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.image} alt="" aria-hidden="true" />
            </div>
          )}
          <p
            className={`${styles.sklio} ${entered ? styles.sklioEnter : ""} ${
              settled ? styles.sklioSettled : ""
            }`}
          >
            WE ARE SKLIO
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingExperience;
