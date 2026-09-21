# Portfolio design direction

Updated September 21, 2026. The current user-supplied reference is `public/design.png`; it supersedes the earlier cream and blue visual directions in the original specification.

Reproduce the dark emerald background, mint typography and buttons, compact bordered cards, portrait-led hero, decorative code panel, and section proportions. Use `public/profile.png` for the portrait and share metadata. Keep Mark Angel Concina’s real identity, contact destinations, projects, education, and achievements.

The visual source of truth is `app/redesign.css`. The desktop reference is 1448 × 1086; the main content is centered at 1116px and the header/hero at 1034px. The custom portrait and real text necessarily differ from the sample. All six projects remain available in a native disclosure, with three featured screenshots shown initially. About details retain internship and education context.

Responsive layouts adapt at 1150, 900, 600, and 370px, with an expanded desktop layout above 1600px. Navigation wraps below the brand on smaller screens; the portrait follows the introduction on phones. Quality cards use two columns on phones, projects and experience stack, and skill chips use three columns. Visible keyboard focus, native disclosures, image descriptions, and reduced motion are supported.

The CV PDF is absent in the current workspace. The CTA requests the CV by email instead of linking to the missing file.

## Full-screen hero update

The header is now 73px on desktop and 113px when navigation wraps. The hero fills the remaining small viewport height with a content-safe minimum. Desktop content widens to 1600px with proportionally larger text, portrait, buttons, and status cards. Mobile content can exceed one viewport to avoid clipping.

## Combined About and Skills

About and Skills now share one section with a 100svh minimum height, larger profile copy and quality cards, and eight technology categories. The full original toolkit and project-specific technologies are retained. Currently Learning remains distinct from the other categories. Navigation uses About & Skills; the nested #skills anchor remains available. Content grows beyond one viewport on smaller screens rather than clipping.

## Expanded project gallery

All six projects are displayed directly in large cards, with local previews, full descriptions, complete stacks, and available demo/source links. The View All Projects disclosure is removed; its anchor remains on the gallery. The layout uses three columns on desktop, two on tablets, and one on phones. Redis uses its existing API screenshot; Letterly clearly shows an in-development placeholder.

Project readability update: gallery now uses two wide desktop columns and one column at 900px and below. Screenshot aspect ratios remain uncropped. Project descriptions are 16px on desktop; technology badges are 15px with larger padding (13px on phones).

## GitHub activity

A full-screen GitHub section follows Projects. Live public profile statistics come from api.github.com/users/kingsmark16. Contribution history uses the existing github-contributions-api.jogruber.de integration, with selectable years. Totals, active days, longest streak within the selected range, and busiest day derive from returned daily counts. Profile and calendar load independently with timeouts, cancellation, and retry states. The wide calendar scrolls within its card on phones; a date field exposes daily counts without requiring hover. No API secret is shipped.

## Expanded closing sections

GitHub statistics now show only contributions and public repositories. Experience uses a spacious two-column grid with larger icons and text; contact uses a large invitation, prominent email and CV-request actions, contact tiles, and larger social links. The footer has larger branding, tagline, copyright, and a back-to-top link. These layouts stack on smaller screens.

GSAP motion is mounted by `app/layout.tsx` through `PortfolioMotion`. The first visit plays a labeled hero timeline, section cards reveal on scroll, milestone cards sequence their icon and text, decorative orbs use scroll parallax, and a fixed mint bar tracks reading progress. At 900px and below, travel distances decrease. Reduced motion and print skip the animation setup. Content stays visible without JavaScript. Scoped matchMedia cleanup owns only this component's animations; font, image, and content size changes refresh scroll positions.

Initial paint uses a short-lived `data-motion-boot` visibility gate only for new navigation with normal motion preferences. `PortfolioMotion` releases it after installing GSAP starting styles. An 1800ms fallback reveals content if hydration is delayed, and late hydration skips the hero entrance. Reload and browser history restoration skip entrance replays so visible content does not reset; parallax, progress, and GitHub count effects remain active. Already visible section content also skips first-mount reveals.
