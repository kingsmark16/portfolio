# Mark Angel Concina Portfolio

A responsive Next.js portfolio with project previews, skills, experience, contact details, and live public GitHub activity. The site uses a static export and deploys to Vercel through the GitHub integration.

## Development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the production domain when building locally. Vercel also supplies a production URL through its environment.

## Release checks

```sh
npm run lint
npm run typecheck
npm run build
```

The production build writes the static site to `out/`. Push the verified commit to `main` to trigger the existing Vercel production deployment. Confirm the Vercel commit status succeeds before considering the release complete.

## Project structure

- `app/page.tsx`: portfolio content and project data.
- `app/redesign.css`: responsive styles and motion starting states.
- `app/components/PortfolioMotion.tsx`: GSAP entrances, handwriting sequence, parallax, and scroll progress.
- `app/components/AnimatedCount.tsx`: accessible GitHub count animations.
- `app/components/GitHubActivity.tsx`: public GitHub data, contribution calendar, and filters.
- `app/components/PortfolioNavigation.tsx`: section navigation and active states.
- `app/site-config.ts`: metadata, canonical URL, and contact links.
- `public/`: images, icons, and the downloadable resume.

## Motion verification

Check first opening, reloading at the top and bottom, phone and desktop widths, reduced motion, and year/date changes in GitHub activity. New visits animate the hero; reload and history restoration keep already rendered content visible. If hydration takes longer than 1.8 seconds, the hero becomes visible and skips the late entrance.

`scripts/browser/scroll-restoration.js` is a reusable Playwright browser-tool function. Open the local site, then pass this file to the browser `run_code` tool through its `filename` argument. It checks three bottom-of-page reloads each at phone and desktop widths and fails on runtime errors or missing scroll restoration. It is a browser-tool script, not a standalone Node test.

Generated builds, screenshots, browser sessions, and local agent files are ignored by Git and ESLint. The visual design and motion conventions are documented in `design.md`.
