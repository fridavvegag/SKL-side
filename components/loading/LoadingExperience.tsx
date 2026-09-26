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
 * Loading (secuencia única, no loopea):
 *   1. Aparición editorial del lockup [tile] + "WE ARE SKLIO" (Figma 476:5319)
 *   2. Texto y contenedor del tile quedan fijos; solo el src de la imagen
 *      loopea cada ~300ms mientras se precarga Home
 *   3. Reveal editorial hacia Home cuando la secuencia mínima terminó Y assets listos
 *
 * Respeta prefers-reduced-motion (identidad estática, sin loop de imágenes).
 */
export function LoadingExperience() {
  const [sklioVisible, setSklioVisible] = useState(false);
  const [lockupSettled, setLockupSettled] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);

  // Precarga de assets esenciales (imágenes del loop + hero video / cards).
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

  // Aparición del lockup (una sola vez) → settled → secuencia mínima lista.
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
      setSklioVisible(true);
      setLockupSettled(true);
      at(() => setSequenceComplete(true), TIMINGS.reducedHold);
    } else {
      at(() => setSklioVisible(true), TIMINGS.appearAt);
      at(() => {
        setLockupSettled(true);
        setSequenceComplete(true);
      }, TIMINGS.appearAt + TIMINGS.appear + TIMINGS.phase2Hold);
    }

    return () => {
      for (const id of timers) clearTimeout(id);
    };
  }, []);

  // Solo el contenido del tile loopea (contenedor fijo).
  useEffect(() => {
    if (!sklioVisible || reduced || revealing || done) return;
    if (LOOP_IMAGES.length <= 1) return;

    const id = window.setInterval(() => {
      setLoopIndex((i) => (i + 1) % LOOP_IMAGES.length);
    }, TIMINGS.flash);

    return () => clearInterval(id);
  }, [sklioVisible, reduced, revealing, done]);

  // Reveal al Home: secuencia mínima lista + assets precargados.
  useEffect(() => {
    if (!sequenceComplete || !assetsReady || revealing || done) return;
    setRevealing(true);
  }, [sequenceComplete, assetsReady, revealing, done]);

  useEffect(() => {
    if (!revealing || done) return;
    const id = window.setTimeout(() => {
      setDone(true);
      window.dispatchEvent(new CustomEvent(LOADING_COMPLETE_EVENT));
    }, TIMINGS.reveal);
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
          "--reveal-dur": `${TIMINGS.reveal}ms`,
        } as CSSProperties
      }
    >
      <div className={styles.stage}>
        <div
          className={`${styles.lockup} ${
            sklioVisible ? styles.lockupVisible : ""
          } ${lockupSettled ? styles.lockupSettled : ""}`}
        >
          {current && (
            <div className={styles.tile}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.image} alt="" aria-hidden="true" />
            </div>
          )}
          <p className={styles.sklio}>WE ARE SKLIO</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingExperience;
