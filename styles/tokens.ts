/**
 * Foundation design tokens (TypeScript source of truth).
 *
 * These mirror the CSS custom properties defined in `app/globals.css` and are
 * intended for programmatic use (e.g. computing values in code, sharing with
 * tooling, or feeding a future styling layer). Prefer the CSS variables for
 * styling; use these when you need the raw values in TypeScript.
 */

export const colors = {
  neutral: {
    0: "#ffffff",
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  success: { 50: "#ecfdf5", 500: "#10b981", 600: "#059669" },
  warning: { 50: "#fffbeb", 500: "#f59e0b", 600: "#d97706" },
  danger: { 50: "#fef2f2", 500: "#ef4444", 600: "#dc2626" },
  info: { 50: "#eff6ff", 500: "#3b82f6", 600: "#2563eb" },
} as const;

export const fontFamilies = {
  sans: 'var(--font-inter), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
} as const;

export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export const letterSpacings = {
  tight: "-0.02em",
  normal: "0em",
  wide: "0.02em",
} as const;

export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

export const radii = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const borderWidths = {
  thin: "1px",
  thick: "2px",
} as const;

export const shadows = {
  xs: "0 1px 2px 0 rgb(15 23 42 / 0.05)",
  sm: "0 1px 3px 0 rgb(15 23 42 / 0.1), 0 1px 2px -1px rgb(15 23 42 / 0.1)",
  md: "0 4px 6px -1px rgb(15 23 42 / 0.1), 0 2px 4px -2px rgb(15 23 42 / 0.1)",
  lg: "0 10px 15px -3px rgb(15 23 42 / 0.1), 0 4px 6px -4px rgb(15 23 42 / 0.1)",
  xl: "0 20px 25px -5px rgb(15 23 42 / 0.1), 0 8px 10px -6px rgb(15 23 42 / 0.1)",
} as const;

export const zIndices = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1700,
  tooltip: 1800,
} as const;

export const durations = {
  fast: "150ms",
  normal: "250ms",
  slow: "400ms",
} as const;

export const easings = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  emphasized: "cubic-bezier(0.3, 0, 0, 1.2)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
} as const;

/** Responsive breakpoints in pixels (min-width). */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const tokens = {
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  spacing,
  radii,
  borderWidths,
  shadows,
  zIndices,
  durations,
  easings,
  breakpoints,
} as const;

export type Tokens = typeof tokens;
export type ColorScale = keyof typeof colors;
export type NeutralShade = keyof typeof colors.neutral;
export type PrimaryShade = keyof typeof colors.primary;
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type Spacing = keyof typeof spacing;
export type Radius = keyof typeof radii;
export type Shadow = keyof typeof shadows;
export type ZIndex = keyof typeof zIndices;
export type Breakpoint = keyof typeof breakpoints;

export default tokens;
