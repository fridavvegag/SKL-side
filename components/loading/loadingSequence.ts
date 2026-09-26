/**
 * Configuración determinista de la experiencia de Loading.
 *
 * Fuente de verdad: Figma para composición/contenido (frames 328:4831 "Hello."
 * y 476:5319 "WE ARE SKLIO"), y el Design System para estilos. Los assets salen
 * exclusivamente de /public/assets/images (servidos en /assets/images).
 *
 * El orden y las posiciones (slots) son fijos: la secuencia se ve igual en cada
 * carga. NO se aleatoriza nada.
 */

import { homeEssentialAssets } from "@/content/home";

export type Slot = "s1" | "s2" | "s3" | "s4" | "s5" | "s6";

export type Flash = {
  /** Ruta pública del asset (desde /public). */
  image: string;
  /** Slot de posición controlada alrededor del ancla "WE ARE SKLIO". */
  slot: Slot;
  /** Proyecto (un asset por proyecto único, para contraste editorial). */
  project: string;
};

/**
 * 8 imágenes, 8 proyectos únicos, mezcla de *-card-* y *-circle-* para contraste.
 * Orden fijo y determinista.
 */
export const FLASHES: readonly Flash[] = [
  { image: "/assets/images/shasa-card-01.jpg", slot: "s1", project: "shasa" },
  { image: "/assets/images/ahorraconlua-circle-01.jpg", slot: "s3", project: "ahorraconlua" },
  { image: "/assets/images/rhino-card-06.jpg", slot: "s2", project: "rhino" },
  { image: "/assets/images/yucatan-card-03.jpg", slot: "s5", project: "yucatan" },
  { image: "/assets/images/scatola-card-07.jpg", slot: "s6", project: "scatola" },
  { image: "/assets/images/petromayab-circle-03.jpg", slot: "s4", project: "petromayab" },
  { image: "/assets/images/airco-card-05.jpg", slot: "s1", project: "airco" },
  { image: "/assets/images/viva-circle-08.jpg", slot: "s2", project: "viva" },
] as const;

/** Tiempos aprobados (ms). */
export const TIMINGS = {
  /** Fase 1 "Hello." total. El montaje sigue arrancando en phase1Total + phase2AnchorIn. */
  phase1Total: 1000,
  /** Ventana antes del montaje (se conserva: montaje arranca en 1150). */
  phase2AnchorIn: 150,
  /** Duración de cada flash de imagen (cut/swap rápido). */
  flash: 300,
  /** Hold final solo con "WE ARE SKLIO" tras el último flash. */
  phase2Hold: 250,
  /** Reveal/fade de salida hacia Home. */
  reveal: 350,
  /** Duración mínima de la identidad estática en reduced-motion. */
  reducedHold: 900,

  /* --- Crossfade en el MISMO anclaje entre "Hello." y "WE ARE SKLIO" --- */
  /** Momento en que "Hello." empieza a aparecer (tras el primer paint). */
  helloFadeInAt: 20,
  /** Momento del crossfade: "Hello." se desvanece y "WE ARE SKLIO" aparece A LA VEZ,
      con la misma duración, de modo que ambos son visibles durante toda la transición
      (solape real y corto en el mismo punto de anclaje, sin hueco). */
  crossfadeAt: 850,
  /** Duración de la transición de opacidad de cada texto (crossfade sutil). */
  textFade: 250,
} as const;

/**
 * Evento disparado cuando el Loading termina su reveal y se desmonta.
 * El Hero escucha este evento para arrancar el video (una sola vez).
 */
export const LOADING_COMPLETE_EVENT = "skl:loading-complete";

/** Assets esenciales del Home a precargar durante el Loading. */
export const HOME_ESSENTIAL_ASSETS: readonly string[] = homeEssentialAssets;

export const PRELOAD_ASSETS: readonly string[] = [
  ...FLASHES.map((f) => f.image),
  ...HOME_ESSENTIAL_ASSETS,
];
