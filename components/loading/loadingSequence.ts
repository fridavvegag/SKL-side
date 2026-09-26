/**
 * Configuración determinista de la experiencia de Loading.
 *
 * Fuente de verdad: Figma 328:4831 ("Hello.") y 476:5319
 * ([tile 109×109] + "WE ARE SKLIO", gap 6px). Design System para tipografía.
 *
 * Secuencia (NO loopea):
 *   Hello. → morph → lockup estable
 * Solo el contenido del tile de proyecto loopea (~300ms) mientras se precarga Home.
 */

import { homeEssentialAssets } from "@/content/home";

export type LoopImage = {
  /** Ruta pública del asset (desde /public). */
  image: string;
  /** Proyecto (un asset por proyecto único). */
  project: string;
};

/**
 * Imágenes del tile fijo junto a "WE ARE SKLIO".
 * Orden fijo; el contenedor no se mueve — solo cambia el src.
 */
export const LOOP_IMAGES: readonly LoopImage[] = [
  { image: "/assets/images/shasa-card-01.jpg", project: "shasa" },
  { image: "/assets/images/ahorraconlua-circle-01.jpg", project: "ahorraconlua" },
  { image: "/assets/images/rhino-card-06.jpg", project: "rhino" },
  { image: "/assets/images/yucatan-card-03.jpg", project: "yucatan" },
  { image: "/assets/images/scatola-card-07.jpg", project: "scatola" },
  { image: "/assets/images/petromayab-circle-03.jpg", project: "petromayab" },
  { image: "/assets/images/airco-card-05.jpg", project: "airco" },
  { image: "/assets/images/viva-circle-08.jpg", project: "viva" },
] as const;

/** @deprecated Usar LOOP_IMAGES. Conservado por si hay imports residuales. */
export const FLASHES = LOOP_IMAGES;

/** Tiempos aprobados (ms). */
export const TIMINGS = {
  /** Momento en que "Hello." empieza a aparecer (tras el primer paint). */
  helloFadeInAt: 20,
  /** Morph: "Hello." → "WE ARE SKLIO" (+ tile). Una sola vez. */
  crossfadeAt: 850,
  /** Duración del morph (opacidad + blur sutil). */
  textFade: 250,
  /** Hold mínimo con lockup estable antes de permitir reveal (si assets listos). */
  phase2Hold: 250,
  /** Intervalo de swap del tile de proyecto (solo la imagen loopea). */
  flash: 300,
  /** Reveal/fade de salida hacia Home. */
  reveal: 350,
  /** Duración mínima de la identidad estática en reduced-motion. */
  reducedHold: 900,
} as const;

/**
 * Evento disparado cuando el Loading termina su reveal y se desmonta.
 * El Hero escucha este evento para arrancar el video (una sola vez).
 */
export const LOADING_COMPLETE_EVENT = "skl:loading-complete";

/** Assets esenciales del Home a precargar durante el Loading. */
export const HOME_ESSENTIAL_ASSETS: readonly string[] = homeEssentialAssets;

export const PRELOAD_ASSETS: readonly string[] = [
  ...LOOP_IMAGES.map((f) => f.image),
  ...HOME_ESSENTIAL_ASSETS,
];
