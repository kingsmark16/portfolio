# Portfolio design direction

source: image

## Character

Warm, practical, and credible. The page should feel like a carefully typeset technical resume mixed with a product case study. It uses a cream paper canvas, near black type, forest green for trust, and burnt orange for energy.

## Build mandate

Match the supplied desktop reference faithfully. Keep the page information rich, bordered, and compact. Use large confident hero type, thin warm borders, small labels, rounded cards, sparse shadows, dashboard inspired project visuals, and botanical line decorations used only as quiet background detail.

The portrait is the hero anchor. ParsuWISE is the dominant case study. Supporting projects are equal cards. Toolkit, about and internship, activity, education, achievements, and the closing orange call to action follow the same order as the reference.

## Composition

1. Top navigation with initials mark and section links
2. Hero statement with portrait and engineering status cards
3. Profile facts strip
4. ParsuWISE capstone case study with narrative and dashboard mockup
5. Three supporting project cards
6. Technical toolkit grouped by discipline
7. About and internship split panel
8. Education and achievements
9. Orange opportunity call to action
10. Dark compact footer

## Components

- Thin bordered cards with modest rounding
- Solid green, outline, orange, and amber button treatments
- Uppercase eyebrow labels
- Compact skill chips
- Dashboard cards and miniature data visualizations
- Line icons with consistent stroke weight

## Responsive behavior

- At wide sizes, retain the dense reference composition in a centered sheet.
- At tablet sizes, stack case study copy above its interface mockup and use two column supporting grids.
- At mobile sizes, collapse all grids to one column, hide nonessential decorative status cards, allow dashboard tables to scroll, and use full width actions.
- Navigation remains available as a compact wrapped link row without requiring client side state.

## Tokens

The values live in `app/globals.css`. That file is the only source of truth for color, spacing, type, border, radius, shadow, and motion values.

## Do and do not

Do preserve tight hierarchy, real content, high contrast, and clearly grouped information.

Do use semantic sections and readable body copy at every viewport.

Do not introduce dark mode, glass effects, neon gradients, oversized empty areas, or decorative animation that is absent from the reference.

Do not invent contact details, project links, or work statistics.
