# Monarch Private Estates — Full Experience Edition

A five-page cinematic luxury real-estate concept built as a standalone React experience.

## Primary pages

- `index.html` — Home / flagship narrative
- `collection.html` — Full private collection with category filters
- `locations.html` — Eight global enclaves with interactive destination dossiers
- `journal.html` — Editorial journal with an eight-card horizontal drag rail
- `house.html` — House philosophy, services, advisors and process

## Interactive layers

- Property cards open animated residence dossiers.
- Location cards open animated destination dossiers with lifestyle, season, access and local highlights.
- Journal cards open editorial story overlays.
- Advisor cards open profile overlays.
- Service cards open detailed service overlays.
- The private-inquiry experience is available site-wide.
- Modals never lock the document body, preserving the scroll-safety fix from the previous edition.

## Motion system

- Fixed glass navigation and scroll-responsive Monarch mark.
- Inertial desktop wheel scrolling with native mobile touch behavior.
- Scene/chapter transitions and chapter indicator.
- Masked media entrances and typography choreography.
- Eight-story horizontal journal with drag, touch swipe, arrows, horizontal wheel behavior, and natural release at both ends.
- Internal page transitions between all five pages.

## Run locally

No npm install or build step is required.

### Option 1
Open `index.html` directly.

### Option 2 — recommended

```bash
./run-local.sh
```

Then open:

```text
http://localhost:8080
```

## Netlify

The project includes `netlify.toml`; the publish directory is the project root (`.`) and there is no build command.

## Important

Property and editorial photography uses remote Unsplash image URLs, so an internet connection is needed for the full photography experience.

This is a fictional concept/showcase project. Property details, prices, advisors and services are demo content.


## Stability patch
This release fixes the blank-screen issue in the previous Full Experience package. The bundled runtime is React 16.0.0, so page grouping now uses a React-16-compatible fragment helper instead of `React.Fragment` (introduced later). A visible render fallback is also included to prevent silent white-screen failures.
