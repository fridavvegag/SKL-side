"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingExperience.module.css";
import { FLASHES, PRELOAD_ASSETS, TIMINGS } from "./loadingSequence";

type Phase = "phase1" | "phase2" | "reveal" | "done";

/**
 * Experiencia de Loading en dos fases (una sola experiencia, sin cambio de ruta):
 *   Fase 1: "Hello." (minimal, negro/blanco)
 *   Fase 2: "WE ARE SKLIO" como ancla estable + montaje editorial de imágenes
 *   Reveal: fade corto y limpio hacia el Home ya renderizado debajo.
 *
 * Respeta prefers-reduced-motion y precarga los assets esenciales, transicionando
 * solo cuando la secuencia mínima terminó Y los assets están listos.
 */
export function LoadingExperience() {
  const [phase, setPhase] = useState<Phase>("phase1");
  const [flashIndex, setFlashIndex] = useState(-1);
  const [reduced, setReduced] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);

  // Precarga de assets esenciales.
  useEffect(() => {
    if (PRELOAD_ASSETS.length === 0) {
      setAssetsReady(true);
      return;
    }
    let cancelled = false;
    let loaded = 0;
    const done = () => {
      loaded += 1;
      if (loaded >= PRELOAD_ASSETS.length && !cancelled) setAssetsReady(true);
    };
    for (const src of PRELOAD_ASSETS) {
      const img = new Image();
      img.onload = done;
      img.onerror = done;
      img.src = src;
    }
    return () => {
      cancelled = true;
    };
  }, []);

  // Máquina de tiempos de la secuencia.
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
      // Versión estática y breve de la identidad, sin montaje ni flashes.
      setPhase("phase2");
      setFlashIndex(-1);
      at(() => setSequenceComplete(true), TIMINGS.reducedHold);
    } else {
      // Fase 1 → Fase 2
      setPhase("phase1");
      at(() => setPhase("phase2"), TIMINGS.phase1Total);

      // Montaje: cada flash a cut duro.
      const montageStart = TIMINGS.phase1Total + TIMINGS.phase2AnchorIn;
      FLASHES.forEach((_, i) => {
        at(() => setFlashIndex(i), montageStart + i * TIMINGS.flash);
      });

      const montageEnd = montageStart + FLASHES.length * TIMINGS.flash;
      at(() => setFlashIndex(-1), montageEnd); // hold final solo con el ancla
      at(() => setSequenceComplete(true), montageEnd + TIMINGS.phase2Hold);
    }

    return () => {
      for (const id of timers) clearTimeout(id);
    };
  }, []);

  // Transición al Home: solo cuando la secuencia mínima terminó Y los assets están listos.
  useEffect(() => {
    if (!sequenceComplete || !assetsReady) return;
    if (phase === "reveal" || phase === "done") return;
    setPhase("reveal");
    const id = window.setTimeout(() => setPhase("done"), TIMINGS.reveal);
    return () => clearTimeout(id);
  }, [sequenceComplete, assetsReady, phase]);

  if (phase === "done") return null;

  const inPhase1 = phase === "phase1";
  const inPhase2 = phase === "phase2" || phase === "reveal";
  const current = flashIndex >= 0 ? FLASHES[flashIndex] : null;

  return (
    <div
      className={`surface-inverted ${styles.overlay} ${
        reduced ? styles.reduced : ""
      } ${phase === "reveal" ? styles.revealOut : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {inPhase1 && !reduced && (
        <p className={`text-body-large text-editorial ${styles.hello}`}>
          Hello.
        </p>
      )}

      {inPhase2 && (
        <div className={styles.stage}>
          {!reduced && current && (
            <div
              key={`${flashIndex}-${current.project}`}
              className={`${styles.tile} ${styles[current.slot]}`}
            >
              {/* Imagen decorativa del montaje editorial (object-fit: cover). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.image} alt="" aria-hidden="true" />
            </div>
          )}
          <p className={styles.anchor}>WE ARE SKLIO</p>
        </div>
      )}
    </div>
  );
}

export default LoadingExperience;
