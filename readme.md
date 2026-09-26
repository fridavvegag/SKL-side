# skl site

A [Next.js](https://nextjs.org) project using TypeScript and the App Router.

## Requirements

- Node.js 20+ (developed against Node 22)
- npm 10+

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:3000
npm run build     # create a production build
npm run start     # serve the production build
```

## Project structure

```
app/layout.tsx    # root layout
app/page.tsx      # home page
next.config.ts    # Next.js configuration
tsconfig.json     # TypeScript configuration
```

## Cloud Agent environment

The Cloud Agent environment is configured in `.cursor/environment.json`:

- `install` runs `npm install`
- a `dev` terminal runs `npm run dev`
- port `3000` (Next.js dev server) is exposed
