/**
 * Sistema de diseño base — fuente de verdad en TypeScript.
 *
 * Contiene ÚNICAMENTE los valores exactos entregados; refleja las variables
 * CSS de `app/globals.css`. No se inventan valores. Lo no especificado se
 * marca abajo en `undefinedValues` y NO se rellena.
 *
 * Unidades en px salvo el letter-spacing del display, entregado como -6%
 * (expresado como "-0.06em" en CSS).
 */

export const colors = {
  background: "#ffffff",
  textPrimary: "#000000",
  textSecondary: "#1e1e1e",
  gray: "#929496",
  disabled: "#b7b7b7",
  error: "#dc3328",
  accent: "#e9e778",
  success: "#61dc28",
  warning: "#dcb828",
} as const;

export const fontFamilies = {
  /** Montserrat (pesos 400 y 500), cargada vía next/font como var(--font-montserrat). */
  sans: "var(--font-montserrat)",
  /** Hiragino Mincho Pro (400), uso solo editorial. Fallback NO DEFINIDO. */
  editorial: '"Hiragino Mincho Pro"',
} as const;

/** Pesos de Montserrat disponibles (asignación por rol NO DEFINIDA). */
export const fontWeights = {
  regular: 400,
  medium: 500,
} as const;

/**
 * Escala tipográfica (px). El display es responsivo por breakpoint.
 * Para el display, el line-height 104 solo está definido para 128 (desktop).
 */
export const typography = {
  display: {
    fontSize: { mobile: 48, tablet: 96, desktop: 128 },
    lineHeight: { desktop: 104 }, // tablet/mobile NO DEFINIDO
    letterSpacing: "-6%", // -0.06em
  },
  title: { fontSize: 24, lineHeight: 32 },
  bodyLarge: { fontSize: 20, lineHeight: 28 },
  body: { fontSize: 16, lineHeight: 20 },
  nav: { fontSize: 12 }, // lineHeight NO DEFINIDO
} as const;

/** Tamaños de texto para links/botones (coinciden con nav, body, title). */
export const actionSizes = {
  sm: 12,
  md: 16,
  lg: 24,
} as const;

/**
 * Espaciado. Regla: múltiplos de 8; excepción de 4 entre texto e ícono.
 * La enumeración completa de la escala NO fue definida; se listan la unidad,
 * la excepción y los valores concretos en uso.
 */
export const spacing = {
  unit: 8,
  iconGap: 4, // excepción texto-ícono
  s8: 8,
  s16: 16,
  s40: 40,
} as const;

/** Cero radius en todo. */
export const radius = 0;

export const grid = {
  desktop: { columns: 3, gutter: 14, margin: 16 },
  mobile: { columns: 1, gutter: 8, margin: 16 },
  // tablet (768-1199): NO DEFINIDO
} as const;

/** Breakpoints en px: mobile 0-767, tablet 768-1199, desktop 1200+. */
export const breakpoints = {
  tablet: 768,
  desktop: 1200,
} as const;

export const header = {
  height: 40,
  paddingX: 16,
} as const;

export const form = {
  /** Padding vertical por pregunta. */
  questionPaddingY: 40,
  /** Grosor del divisor entre preguntas. Color NO DEFINIDO. */
  dividerWidth: 1,
} as const;

/**
 * Registro explícito de valores NO DEFINIDOS en la especificación entregada.
 * No se rellenan: se reportan para que el autor los provea.
 */
export const undefinedValues = [
  "Fallback de fuente para Montserrat y Hiragino Mincho Pro",
  "Peso (400 vs 500) por rol tipográfico",
  "line-height del display en tablet (96) y mobile (48)",
  "line-height de navegación (12)",
  "Tamaño e interlineado del texto editorial",
  "Grid para tablet (768-1199): columnas, gutter y margen",
  "Enumeración completa de la escala de espaciado (solo regla base 8 + excepción 4)",
  "Color del divisor de 1px entre preguntas",
  "Color de reposo definitivo de links/botones (interpretado como gris #929496)",
  "Estilos de 'selecciones' (indicado como 'como en diseño', sin valores)",
] as const;

export const tokens = {
  colors,
  fontFamilies,
  fontWeights,
  typography,
  actionSizes,
  spacing,
  radius,
  grid,
  breakpoints,
  header,
  form,
} as const;

export type Tokens = typeof tokens;
export type ColorToken = keyof typeof colors;
export type ActionSize = keyof typeof actionSizes;
export type Breakpoint = keyof typeof breakpoints;

export default tokens;
