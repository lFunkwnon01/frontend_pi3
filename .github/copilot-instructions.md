# Copilot AI Coding Agent Instructions for EcoPlaya Frontend

## Project Overview
- **EcoPlaya** is a Next.js/React web app for collaborative coastal care, with user roles (public, authenticated, admin) and a focus on community engagement, event reporting, and rewards.
- The main entry point is `app/page.tsx` (public home). Authenticated users are redirected to `/dashboard`.
- UI is built with custom components in `components/ui/` (e.g., `button.tsx`, `card.tsx`, `carousel.tsx`).
- Partner logos and public assets are in `public/` (e.g., `starbucks_logo.png`, `aje_logo.png`).

## Architecture & Patterns
- **Routing:** Uses Next.js App Router (`app/` directory). Each subfolder in `app/` is a route; `[id]` folders are dynamic routes.
- **Authentication:** Logic in `lib/auth.ts` and `app/auth/`. `getCurrentUser()` is used to check auth state and redirect.
- **UI Patterns:**
  - Use `components/ui/` for all base UI elements (buttons, cards, carousel, etc.).
  - For carousels/sliders, use `Carousel`, `CarouselContent`, `CarouselItem` from `components/ui/carousel.tsx`.
  - Use Tailwind CSS utility classes for layout and theming (see `app/globals.css`).
- **Data & State:**
  - Mock/demo data in `lib/mock-data.ts`.
  - Use React hooks for state and effects; see `hooks/` for custom hooks.

## Developer Workflows
- **Install dependencies:** `pnpm install`
- **Run dev server:** `pnpm dev`
- **Build for production:** `pnpm build`
- **No formal test suite** (as of Oct 2025); manual testing via browser.
- **Debugging:** Use browser devtools and React DevTools; no custom debug scripts.

## Project-Specific Conventions
- **Public Home Page:**
  - `app/page.tsx` is the landing page for unauthenticated users. Focus on clear calls to action, partner logos, mission/vision, testimonials, and student/volunteer info.
  - Authenticated users are auto-redirected to `/dashboard`.
- **Assets:**
  - Place new partner logos in `public/` and reference them with `/`-relative paths.
  - Use descriptive, lowercase, hyphenated filenames for new assets.
- **UI Consistency:**
  - Always use components from `components/ui/` for new UI features.
  - Follow existing section structure: Hero, Features, Impact, CTA, etc.

## Integration Points
- **External Libraries:**
  - Uses `embla-carousel-react` for carousels.
  - Icons from `lucide-react`.
- **No backend API integration** in this repo; all data is local or mocked.

## Examples
- To add a new partner logo carousel: use `Carousel` from `components/ui/carousel.tsx` and import images from `public/`.
- To add a new feature card: update the `features` array in `app/page.tsx` and use the `Card` component.

## Key Files & Directories
- `app/page.tsx` — Public home page (edit here for landing changes)
- `components/ui/` — All base UI components
- `public/` — Static assets (logos, images)
- `lib/auth.ts` — Auth logic
- `hooks/` — Custom React hooks

---
For more details, see `README.md` or ask for clarification on project-specific patterns.
