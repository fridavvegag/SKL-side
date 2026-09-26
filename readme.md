# skl site

A modern static site starter built with [Vite](https://vite.dev).

## Requirements

- Node.js 20+ (developed against Node 22)
- npm 10+

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:5173
npm run build     # produce a production build in dist/
npm run preview   # serve the production build at http://localhost:4173
```

## Project structure

```
index.html        # HTML entry point
src/main.js       # app entry, renders the landing page
src/style.css     # styles
public/           # static assets served as-is (e.g. favicon.svg)
```

## Cloud Agent environment

The Cloud Agent environment is configured in `.cursor/environment.json`:

- `install` runs `npm install`
- a `dev` terminal runs `npm run dev`
- port `5173` (Vite dev server) is exposed
