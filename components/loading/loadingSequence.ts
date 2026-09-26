/**
 * Configuración determinista de la experiencia de Loading.
 *
 * Fuente de verdad: Figma 476:5319 ([tile 109×109] + "WE ARE SKLIO", gap 6px).
 * Motion reference: burocratik.com intro (soft appear + hard icon cuts +
 * vertical slide-away reveal).
 *
 * Secuencia (NO loopea):
 *   Appearance del lockup → tile con loop de imagen → slide-away al Home
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

/** Tiempos (ms) — ritmo cercano a burocratik.com. */
export const TIMINGS = {
  /** Momento en que el lockup empieza a aparecer. */
  appearAt: 60,
  /** Aparición suave (blur → sharp + fade). */
  appear: 720,
  /** Hold con iconos ciclando antes de poder salir. */
  phase2Hold: 700,
  /** Swap duro del tile (estilo Büro: cut, no slide). */
  flash: 240,
  /** Slide-away del overlay hacia el Home. */
  reveal: 920,
  /** Hold mínimo en reduced-motion. */
  reducedHold: 600,
} as const;

/**
 * Evento disparado cuando el Loading empieza a salir (slide-away).
 * El Hero arranca debajo mientras el overlay aún se mueve.
 */
export const LOADING_COMPLETE_EVENT = "skl:loading-complete";

/** Assets esenciales del Home a precargar durante el Loading. */
export const HOME_ESSENTIAL_ASSETS: readonly string[] = homeEssentialAssets;

export const PRELOAD_ASSETS: readonly string[] = [
  ...LOOP_IMAGES.map((f) => f.image),
  ...HOME_ESSENTIAL_ASSETS,
];
