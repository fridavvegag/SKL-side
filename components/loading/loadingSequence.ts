/**
 * Configuración determinista de la experiencia de Loading.
 *
 * Fuente de verdad: Figma 476:5319 ([tile 109×109] + "WE ARE SKLIO", gap 6px).
 *
 * Secuencia (NO loopea):
 *   Appearance editorial del lockup → tile estable con loop de imagen
 * Solo el contenido del tile loopea (~300ms) mientras se precarga Home.
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
  /** Momento en que el lockup empieza a aparecer. */
  appearAt: 40,
  /** Duración de la aparición editorial (blur + fade + settle). */
  appear: 560,
  /** Hold mínimo con lockup estable antes de permitir reveal (si assets listos). */
  phase2Hold: 400,
  /** Intervalo de swap del tile de proyecto (solo la imagen loopea). */
  flash: 300,
  /** Reveal/fade de salida hacia Home. */
  reveal: 480,
  /** Duración mínima de la identidad estática en reduced-motion. */
  reducedHold: 700,
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
