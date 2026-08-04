# 0001. Personal portfolio website

**Date**: 2026-08-02
**Status**: In Progress

## Summary

Build a static personal portfolio for Mark Angel in Next.js. The page follows the supplied warm cream resume style reference, uses Mark's supplied portrait, and presents his work as a complete full stack developer profile. Search metadata, structured content, responsive behavior, and accessible interaction are part of the build.

## Context

The portfolio needs to turn a dense set of project, internship, education, and achievement details into a page that is quick to scan while still showing technical depth. The supplied desktop reference fixes the visual direction and section composition. The implementation must derive mobile behavior because only a desktop reference was supplied.

The site is informational and has no database, authentication, private data, or runtime API. It should ship as static HTML with minimal client code.

## Requirements

**User stories**:

- As a recruiter, I want a concise summary of Mark's skills and experience so that I can assess his fit quickly.
- As a technical reviewer, I want project context, contribution details, and technology choices so that I can understand his engineering depth.
- As a visitor on any device, I want a fast and readable page so that I can browse the portfolio comfortably.

**Acceptance criteria**:

- **AC-1**: The page faithfully matches the supplied warm cream, forest green, orange, bordered card visual language and section composition.
- **AC-2**: The hero identifies Mark Angel, uses the supplied portrait, and provides working in page navigation.
- **AC-3**: ParsuWISE appears as the capstone case study with its description, challenge, approach, contribution, and complete technology stack.
- **AC-4**: College Rage, the heuristic evaluation reporting site, and Dearly appear as separate project cards with descriptions and technology stacks.
- **AC-5**: Internship, education, and achievement details match the supplied content.
- **AC-6**: The layout has no horizontal overflow and remains readable and usable on mobile, tablet, laptop, and wide desktop screens.
- **AC-7**: The page uses semantic landmarks, logical headings, visible keyboard focus, descriptive image text, and reduced motion support.
- **AC-8**: The site includes descriptive metadata, Open Graph data, robots directives, a sitemap, and Person plus WebSite structured data.
- **AC-9**: A production build completes successfully and emits a static page without runtime data dependencies.

## Options considered

### Option 1: Faithful single page resume portfolio

Reproduce the supplied composition as one information rich page with local data and CSS interface mockups.

**Pros**:

- Closest to the requested reference
- Fast to scan and simple to deploy
- No external content dependencies

**Cons**:

- Dense sections require careful responsive adaptation
- Mock project interfaces are illustrative rather than real screenshots

### Option 2: Minimal editorial portfolio

Use a simpler hero and a small number of large case study sections.

**Pros**:

- Easier to maintain
- More room for each project

**Cons**:

- Does not match the supplied reference
- Hides useful breadth below long scroll sections

## Decision

**Chosen option**: Option 1, faithful single page resume portfolio

Use the Next.js App Router with TypeScript and plain token driven CSS. Render all portfolio content on the server from local typed data. Use CSS built interface mockups for projects that have no supplied screenshots.

## Rationale

The reference is both the art direction and the composition. A static server rendered page is the simplest fit for fixed portfolio content and provides useful HTML to search engines without adding client runtime complexity. Local CSS mockups keep the visual result complete while avoiding fabricated external assets.

## Feature design

**Data model sketch**:

- `Profile`: required name, role, introduction, location, availability, portrait path
- `CaseStudy`: required name, description, challenge, approach, contribution, stack list
- `Project`: required name, description, stack list, visual variant
- `Experience`: required role, organization, date range, bullet list, stack list
- `Education`: required degree, school, date range
- `Achievement`: required title
- All values are immutable local TypeScript data. There is no persistence.

**API surface**:

No runtime API. The root page is rendered from local data at build time.

**Value sourcing**:

| Action | Value produced or displayed | Source |
|---|---|---|
| Render hero | Name, role, availability, portrait | Profile data and `public/mark-angel.png` |
| Render case study | ParsuWISE narrative and stack | User supplied capstone content |
| Render project grid | Three project summaries and stacks | User supplied project content |
| Render experience | Role, organization, dates, work, stack | User supplied internship content |
| Render education and achievements | Degree, school, dates, awards | User supplied education content |
| Generate search metadata | Title, description, identity, page type | Profile and site configuration |

**Key invariants**:

- User supplied facts and spelling are preserved, with capitalization and grammar normalized only for presentation.
- No project link, email address, domain, statistic, or employer fact is invented.
- Navigation targets an existing section id.
- The portrait is served locally.

**Security model**:

All content is public and read only. The page accepts no user input and stores no visitor data.

**Critical test scenarios**:

- Happy path: load the root page and browse every supplied section, verifies **AC-2** through **AC-5**.
- Responsive path: render at 375, 768, 1024, and 1440 CSS pixels with no horizontal overflow, verifies **AC-6**.
- Accessibility path: tab through links with visible focus and use reduced motion, verifies **AC-7**.
- Search path: inspect the generated head, robots, sitemap, and JSON LD, verifies **AC-8**.
- Build path: run the production build successfully, verifies **AC-9**.

## Build plan

1. Scaffold the static Next.js App Router project and local assets, satisfies **AC-2**, **AC-9**.
2. Record the image based design direction and create the global token system, satisfies **AC-1**, **AC-6**.
3. Build the hero, profile strip, and navigation, satisfies **AC-1**, **AC-2**, **AC-7**.
4. Build the ParsuWISE case study and interface mockup, satisfies **AC-1**, **AC-3**.
5. Build the additional projects, toolkit, internship, education, and achievements, satisfies **AC-4**, **AC-5**.
6. Add metadata, structured data, robots, and sitemap output, satisfies **AC-8**.
7. Run type, lint, build, accessibility, and responsive self checks, satisfies **AC-6**, **AC-7**, **AC-9**.

## Consequences

**Positive**:

- The portfolio is fast, portable, and simple to deploy.
- Every supplied detail is visible in one coherent recruiter friendly page.

**Negative / tradeoffs**:

- Project interface visuals are representative mockups until real screenshots are supplied.
- Contact and external project buttons cannot be added safely without real destinations.

**Neutral**:

- The canonical site URL uses one environment variable at deployment time.

## Follow-up

- [ ] Add verified GitHub, LinkedIn, resume, email, project demo, and source links when available.
- [ ] Replace CSS interface mockups with real project screenshots if desired.
