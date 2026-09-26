"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingExperience.module.css";
import { FLASHES, PRELOAD_ASSETS, TIMINGS } from "./loadingSequence";

/**
 * Experiencia de Loading en dos fases (una sola experiencia, sin cambio de ruta):
 *   Fase 1: "Hello." (minimal, negro/blanco)
 *   Fase 2: "WE ARE SKLIO" como ancla estable + montaje editorial de imágenes
 *   Reveal: fade corto y limpio hacia el Home ya renderizado debajo.
 *
 * "Hello." y "WE ARE SKLIO" comparten EXACTAMENTE el mismo punto de anclaje
 * (mismo contenedor centrado, superpuestos). La transición es un crossfade corto
 * y simultáneo en el mismo lugar: en un mismo instante "Hello." se desvanece y
 * "WE ARE SKLIO" aparece, con la misma duración, así que ambos son visibles
 * durante toda la transición (solape real, sin hueco ni salto de posición).
 *
 * Respeta prefers-reduced-motion y precarga los assets esenciales, transicionando
 * solo cuando la secuencia mínima terminó Y los assets están listos.
 */
export function LoadingExperience() {
  const [helloVisible, setHelloVisible] = useState(false);
  const [sklioVisible, setSklioVisible] = useState(false);
  const [flashIndex, setFlashIndex] = useState(-1);
  const [reduced, setReduced] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [done, setDone] = useState(false);

  // Precarga de assets esenciales.
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
      const img = new Image();
      img.onload = finish;
      img.onerror = finish;
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
      setSklioVisible(true);
      setFlashIndex(-1);
      at(() => setSequenceComplete(true), TIMINGS.reducedHold);
    } else {
      // Fase 1 → crossfade simultáneo → Fase 2, sobre el mismo anclaje.
      at(() => setHelloVisible(true), TIMINGS.helloFadeInAt); // fade-in "Hello."
      at(() => {
        // En el mismo instante: "Hello." fade-out y "WE ARE SKLIO" fade-in.
        setHelloVisible(false);
        setSklioVisible(true);
      }, TIMINGS.crossfadeAt);

      // Montaje (sin cambios): arranca en phase1Total + phase2AnchorIn = 1150.
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
  // Separado en dos efectos para que el timeout de reveal no se limpie al setear `revealing`.
  useEffect(() => {
    if (!sequenceComplete || !assetsReady || revealing || done) return;
    setRevealing(true);
  }, [sequenceComplete, assetsReady, revealing, done]);

  useEffect(() => {
    if (!revealing || done) return;
    const id = window.setTimeout(() => setDone(true), TIMINGS.reveal);
    return () => clearTimeout(id);
  }, [revealing, done]);

  if (done) return null;

  const current = flashIndex >= 0 ? FLASHES[flashIndex] : null;

  return (
    <div
      className={`surface-inverted ${styles.overlay} ${
        reduced ? styles.reduced : ""
      } ${revealing ? styles.revealOut : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
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

        {/* Anclaje compartido: ambos textos ocupan EXACTAMENTE el mismo punto. */}
        <div className={styles.anchor}>
          {!reduced && (
            <p
              className={`text-body-large text-editorial ${styles.anchorText} ${styles.hello}`}
              style={{ opacity: helloVisible ? 1 : 0 }}
            >
              Hello.
            </p>
          )}
          <p
            className={`${styles.anchorText} ${styles.sklio}`}
            style={{ opacity: sklioVisible ? 1 : 0 }}
          >
            WE ARE SKLIO
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingExperience;
