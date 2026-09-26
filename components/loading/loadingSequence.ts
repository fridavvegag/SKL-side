/**
 * Configuración determinista de la experiencia de Loading.
 *
 * Figma 476:5319 ([tile 109×109] + "WE ARE SKLIO").
 * Entrada (estilo burocratik.com):
 *   negro → tile baja desde arriba + texto sube desde abajo → loop del tile
 * Salida: slide-away vertical del overlay.
 */

import { homeEssentialAssets } from "@/content/home";

export type LoopImage = {
  image: string;
  project: string;
};

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

/** @deprecated Usar LOOP_IMAGES. */
export const FLASHES = LOOP_IMAGES;

/** Tiempos (ms). */
export const TIMINGS = {
  /** Pantalla negra antes de la entrada del lockup. */
  blackHold: 1400,
  /** Duración: tile baja / texto sube. */
  appear: 820,
  /** Pequeño delay del texto respecto al tile (ms). */
  textStagger: 70,
  /** Hold con iconos ciclando antes de poder salir. */
  phase2Hold: 800,
  /** Swap duro del tile. */
  flash: 240,
  /** Slide-away del overlay hacia el Home. */
  reveal: 920,
  /** Hold mínimo en reduced-motion. */
  reducedHold: 600,
} as const;

export const LOADING_COMPLETE_EVENT = "skl:loading-complete";

export const HOME_ESSENTIAL_ASSETS: readonly string[] = homeEssentialAssets;

export const PRELOAD_ASSETS: readonly string[] = [
  ...LOOP_IMAGES.map((f) => f.image),
  ...HOME_ESSENTIAL_ASSETS,
];
