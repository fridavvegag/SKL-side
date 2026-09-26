/**
 * Contenido data-driven del Home.
 * Figma = composición/copy; Design System = estilos.
 * Tipografías Figma se respetan (incl. typos: Aanalysis, Enquieries, Adquisition, Competite).
 */

export type MediaKind = "image" | "video";

export type ProjectSize = "short" | "tall" | "xtall";

export type Project = {
  id: string;
  name: string;
  description: string;
  media: string;
  kind: MediaKind;
  size: ProjectSize;
  /** Columna desktop 1–3 (masonry). */
  column: 1 | 2 | 3;
};

export type ServicePhrase = {
  text: string;
  muted?: boolean;
};

export type Service = {
  number: string;
  name: string;
  phrases: ServicePhrase[];
};

export type CircleTile = {
  id: string;
  media: string;
  kind: MediaKind;
  size: "sm" | "lg";
};

export type CircleRow = {
  id: string;
  tiles: CircleTile[];
};

export const nav = {
  projects: { label: "PROJECTS", href: "#projects" },
  about: { label: "ABOUT", href: "#about" },
  session: { label: "skl session", href: "#session" },
  logoAlt: "SKL",
} as const;

export const mobileMenuLinks = [
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "SKL SESSION", href: "#session" },
] as const;

/**
 * Hero — Figma Sections/Hero VIDEO fill (CROP). Studio clip is not in the
 * project video set under /public/assets/videos; drop the original MP4 at
 * `media` when available. `poster` is the Figma-exported studio frame.
 */
export const hero = {
  media: "/assets/videos/home-hero.mp4",
  poster: "/assets/images/home-hero.png",
  sessionLabel: "skl session",
  sessionHref: "#session",
} as const;

/**
 * 10 proyectos del Home Desktop (Figma 375:7613).
 * Mobile usa la misma lista en una sola columna.
 */
export const projects: Project[] = [
  {
    id: "shasa",
    name: "Shasa",
    description: "E-commerce Redesign + Integrations",
    media: "/assets/images/shasa-card-01.jpg",
    kind: "image",
    size: "tall",
    column: 1,
  },
  {
    id: "ahorraconlua",
    name: "Ahorra con lua",
    description: "Brand Strategy + Web Design",
    media: "/assets/images/ahorraconlua-card-02.jpg",
    kind: "image",
    size: "short",
    column: 1,
  },
  {
    id: "yucatan",
    name: "Gob. Yucatan",
    description: "Web Development + AI automation",
    media: "/assets/images/yucatan-card-03.jpg",
    kind: "image",
    size: "tall",
    column: 1,
  },
  {
    id: "atmuniversity",
    name: "ATM University",
    description: "Web Development + Content",
    media: "/assets/videos/atmuniversity-card-01.mp4",
    kind: "video",
    size: "short",
    column: 1,
  },
  {
    id: "smashkitchen",
    name: "Smash Kitchen",
    description: "Web Design + Brand Development",
    media: "/assets/images/smashkitchen-card-04.jpg",
    kind: "image",
    size: "short",
    column: 2,
  },
  {
    id: "nonstop",
    name: "Nonstop",
    description: "Ecommerce Development + Branding",
    media: "/assets/videos/nonstop-card-02.mp4",
    kind: "video",
    size: "xtall",
    column: 2,
  },
  {
    id: "airco",
    name: "Airco",
    description: "Web Redesign + SKL SEO Intelligence™",
    media: "/assets/images/airco-card-05.jpg",
    kind: "image",
    size: "xtall",
    column: 2,
  },
  {
    id: "rhino",
    name: "Rhino",
    description: "E-commerce Redesign + Research",
    media: "/assets/images/rhino-card-06.jpg",
    kind: "image",
    size: "tall",
    column: 3,
  },
  {
    id: "scatola",
    name: "Scatola",
    description: "Behavioral Aanalysis + E-commerce Redesign",
    media: "/assets/images/scatola-card-07.jpg",
    kind: "image",
    size: "short",
    column: 3,
  },
  {
    id: "ollie",
    name: "Ollie",
    description: "E-commerce Design + Growth Marketing",
    media: "/assets/videos/ollie-card-03.mp4",
    kind: "video",
    size: "xtall",
    column: 3,
  },
];

export const whatWeDo = {
  title: "WHAT WE DO",
  services: [
    {
      number: "01",
      name: "SKL Creative™",
      phrases: [
        { text: "Brand Architecture" },
        { text: "Brand Positioning", muted: true },
        { text: "Naming" },
        { text: "Brand Strategy", muted: true },
        { text: "Brand Development" },
        { text: "Brand Identity", muted: true },
        { text: "Art Direction" },
        { text: "Graphic Design", muted: true },
        { text: "Illustration" },
        { text: "Editorial Design", muted: true },
        { text: "Motion Design" },
        { text: "3D" },
      ],
    },
    {
      number: "02",
      name: "SKL Intelligence™",
      phrases: [
        { text: "Business Strategy", muted: true },
        { text: "Business Model Design" },
        { text: "Business Innovation", muted: true },
        { text: "Market Intelligence" },
        { text: "Growth Opportunities", muted: true },
        { text: "Revenue Strategy" },
        { text: "Business Intelligence", muted: true },
        { text: "Performance Insights" },
        { text: "SKL SEO Intelligence™", muted: true },
        { text: "SKL GEO Intelligence™" },
        { text: "IA Business Strategy", muted: true },
      ],
    },
    {
      number: "03",
      name: "SKL Tech™",
      phrases: [
        { text: "User Experience" },
        { text: "User Interface", muted: true },
        { text: "Prototyping" },
        { text: "Web Development", muted: true },
        { text: "App Development" },
        { text: "E-commerce", muted: true },
        { text: "Shopify Development" },
        { text: "Front-end Development", muted: true },
        { text: "Back-end Development" },
        { text: "Integrations", muted: true },
        { text: "Digital Products" },
        { text: "IA Integrations", muted: true },
        { text: "IA Automation" },
      ],
    },
    {
      number: "04",
      name: "SKL Convert™",
      phrases: [
        { text: "Conversion Strategy", muted: true },
        { text: "CRO" },
        { text: "Funnel Optimization", muted: true },
        { text: "A/B Testing" },
        { text: "Landing Optimization", muted: true },
        { text: "Growth Strategy" },
        { text: "Paid Media Strategy", muted: true },
        { text: "Customer Acquisition" },
        { text: "Retention Strategy", muted: true },
        { text: "CRM And Lifecycle" },
        { text: "Revenue Optimization", muted: true },
        { text: "Conversion Copywriting" },
      ],
    },
    {
      number: "05",
      name: "SKL Connection™",
      phrases: [
        { text: "Campaign Concept" },
        { text: "Campaign Creative", muted: true },
        { text: "Communication Strategy" },
        { text: "Content Strategy", muted: true },
        { text: "Video Direction" },
        { text: "Art Direction", muted: true },
        { text: "Growth Marketing/ Adquisition" },
        { text: "Environmental Design", muted: true },
        { text: "Retail Design" },
      ],
    },
    {
      number: "06",
      name: "SKL Research™",
      phrases: [
        { text: "Research And Strategy", muted: true },
        { text: "User Interviews" },
        { text: "Usability Testing", muted: true },
        { text: "Market Research" },
        { text: "Competite Analysis", muted: true },
        { text: "Behavioral Analysis" },
        { text: "Journey Mapping", muted: true },
        { text: "Concept Validation" },
      ],
    },
  ] satisfies Service[],
} as const;

/**
 * Collage SKL Circle — orden exacto Figma Desktop (334:5006), no por filename.
 * R1: yucatan video, ahorraconlua, scatola video, smashkitchen
 * R2: petromayab, nonstop video, operati
 * R3: imtra | SKL CIRCLE™ | rhino video
 * R4: airco video, shasa, atmuniversity
 * R5: viva, logistictrade, ollie, swit video
 */
export const sklCircle = {
  titlePrefix: "SKL",
  titleSuffix: "CIRCLE™",
  footerLeft: "Great work can start with a brief and grow into something much bigger.",
  footerRight: ["Some came for a project.", "All became part of the circle."],
  rows: [
    {
      id: "row-01",
      tiles: [
        { id: "c1", media: "/assets/videos/yucatan-circle-01.mp4", kind: "video", size: "sm" },
        { id: "c2", media: "/assets/images/ahorraconlua-circle-01.jpg", kind: "image", size: "lg" },
        { id: "c3", media: "/assets/videos/scatola-circle-02.mp4", kind: "video", size: "sm" },
        { id: "c4", media: "/assets/images/smashkitchen-circle-02.jpg", kind: "image", size: "lg" },
      ],
    },
    {
      id: "row-02",
      tiles: [
        { id: "c5", media: "/assets/images/petromayab-circle-03.jpg", kind: "image", size: "sm" },
        { id: "c6", media: "/assets/videos/nonstop-circle-03.mp4", kind: "video", size: "lg" },
        { id: "c7", media: "/assets/images/operati-circle-04.jpg", kind: "image", size: "sm" },
      ],
    },
    {
      id: "row-03",
      tiles: [
        { id: "c8", media: "/assets/images/imtra-circle-05.jpg", kind: "image", size: "lg" },
        { id: "c9", media: "/assets/videos/rhino-circle-04.mp4", kind: "video", size: "lg" },
      ],
    },
    {
      id: "row-04",
      tiles: [
        { id: "c10", media: "/assets/videos/airco-circle-05.mp4", kind: "video", size: "sm" },
        { id: "c11", media: "/assets/images/shasa-circle-06.jpg", kind: "image", size: "lg" },
        { id: "c12", media: "/assets/images/atmuniversity-circle-07.jpg", kind: "image", size: "sm" },
      ],
    },
    {
      id: "row-05",
      tiles: [
        { id: "c13", media: "/assets/images/viva-circle-08.jpg", kind: "image", size: "lg" },
        { id: "c14", media: "/assets/images/logistictrade-circle-09.jpg", kind: "image", size: "sm" },
        { id: "c15", media: "/assets/images/ollie-circle-10.jpg", kind: "image", size: "lg" },
        { id: "c16", media: "/assets/videos/swit-circle-06.mp4", kind: "video", size: "sm" },
      ],
    },
  ] satisfies CircleRow[],
} as const;

export const footer = {
  headline: "Together, Together.",
  columns: [
    {
      id: "general",
      label: "GENERAL QUESTIONS",
      value: "hello@sklio.studio",
      href: "mailto:hello@sklio.studio",
    },
    {
      id: "business",
      label: "NEW BUSINESS ENQUIERIES",
      value: "SKL SESSION",
      href: "#session",
      icon: true,
    },
    {
      id: "insta",
      label: "INSTA",
      value: "@sklio.studio",
      href: "https://instagram.com/sklio.studio",
    },
    {
      id: "location",
      label: "LOCATION",
      value: "Mexico City. Work Worldwide",
      href: undefined,
    },
    {
      id: "copyright",
      label: "SKLIO ©2026",
      value: "Working Together",
      href: undefined,
    },
  ],
} as const;

/** Assets esenciales a precargar durante Loading (hero poster + primeras cards). */
export const homeEssentialAssets: readonly string[] = [
  hero.poster,
  hero.media,
  "/assets/images/shasa-card-01.jpg",
  "/assets/images/smashkitchen-card-04.jpg",
  "/assets/images/rhino-card-06.jpg",
];
