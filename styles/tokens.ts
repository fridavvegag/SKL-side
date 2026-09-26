/**
 * Sistema de diseño base — fuente de verdad en TypeScript.
 *
 * Contiene ÚNICAMENTE los valores exactos confirmados; refleja las variables
 * CSS de `app/globals.css`. No se inventan valores.
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
  /** Montserrat (400/500) vía next/font como var(--font-montserrat), con fallback Arial, sans-serif. */
  sans: "var(--font-montserrat), Arial, sans-serif",
  /** Hiragino Mincho Pro (400), uso solo editorial, fallback serif. */
  editorial: '"Hiragino Mincho Pro", serif',
} as const;

export const fontWeights = {
  regular: 400, // body y texto general
  medium: 500, // títulos y headings
} as const;

/**
 * Escala tipográfica (px). El display es responsivo por breakpoint.
 * Editorial no tiene escala propia: reutiliza el tamaño/interlineado del rol.
 */
export const typography = {
  // display = título de página, title = título de sección.
  // Ambos se muestran en MAYÚSCULAS (text-transform), sin alterar el contenido.
  display: {
    fontSize: { mobile: 48, tablet: 96, desktop: 128 },
    lineHeight: { mobile: 44, tablet: 80, desktop: 104 },
    letterSpacing: "-6%", // -0.06em
    fontWeight: 500,
    textTransform: "uppercase",
  },
  title: { fontSize: 24, lineHeight: 32, fontWeight: 500, textTransform: "uppercase" },
  bodyLarge: { fontSize: 20, lineHeight: 28, fontWeight: 400 },
  body: { fontSize: 16, lineHeight: 20, fontWeight: 400 },
  nav: { fontSize: 12, lineHeight: 16, fontWeight: 400 },
} as const;

/** Tamaños de texto para links/botones (coinciden con nav, body, title). */
export const actionSizes = {
  sm: 12,
  md: 16,
  lg: 24,
} as const;

/**
 * Escala de espaciado. Usar SOLO estos valores, salvo lo explícito del diseño
 * (p. ej. el gutter de grid de 14px). Incluye 4px como separación texto-ícono.
 */
export const spacing = [
  4, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96, 104, 128,
] as const;

/** Separación texto-ícono. */
export const iconGap = 4;

/** Border radius = 0 en todo el sistema. */
export const radius = 0;

export const grid = {
  desktop: { columns: 3, gutter: 14, margin: 16 },
  tablet: { columns: 3, gutter: 14, margin: 16 },
  mobile: { columns: 1, gutter: 8, margin: 16 },
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

/** Interacción de links/botones (solo texto, sin contenedor). */
export const interaction = {
  linkDefault: "#000000",
  linkHover: "#e9e778",
  linkDisabled: "#b7b7b7",
} as const;

export const form = {
  /** Padding vertical por bloque de pregunta (Book a Session). */
  questionPaddingY: 40,
  dividerWidth: 1,
  dividerColor: "#b7b7b7",
  placeholderColor: "#929496",
  textColor: "#000000",
} as const;

/**
 * Pendiente por decisión del autor (NO se define aún; se implementará desde
 * Figma). No es un valor inventable.
 */
export const pending = [
  "Spacing sección-a-sección (se define al implementar layouts desde Figma)",
  "Controles visuales de selección (se implementan con Book a Session)",
] as const;

export const tokens = {
  colors,
  fontFamilies,
  fontWeights,
  typography,
  actionSizes,
  spacing,
  iconGap,
  radius,
  grid,
  breakpoints,
  header,
  interaction,
  form,
} as const;

export type Tokens = typeof tokens;
export type ColorToken = keyof typeof colors;
export type ActionSize = keyof typeof actionSizes;
export type Breakpoint = keyof typeof breakpoints;
export type Spacing = (typeof spacing)[number];

export default tokens;
