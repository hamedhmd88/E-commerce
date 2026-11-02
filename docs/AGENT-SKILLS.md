# Agent skills

The project initially contained no project-local `SKILL.md` or `AGENTS.md`. The host `find-skills` and `skill-installer` instructions were reviewed. Skills.sh and each source `SKILL.md` were inspected before installation.

Project-scoped copies for Codex:

- `vercel-react-best-practices` from `vercel-labs/agent-skills`: reviewed server/client fetching and kept developer-only Query Devtools out of production rendering.
- `web-design-guidelines` from `vercel-labs/agent-skills`: reviewed navigation, forms, keyboard access and focus; added a skip link and labelled commerce controls.
- `frontend-design` from `anthropics/skills`: used to assess the restrained editorial direction, typography and copy. The visual assets remain subject to provenance review.
- `playwright` host skill: reviewed for browser verification. The repository's Playwright CLI was tried for the new resource pages, but the sandbox denied browser access to localhost; route generation was verified with type checking and the production build.
- Built-in `imagegen` skill: reviewed and used to create six-angle concept turnarounds for all 20 Fake Store API items and to remove their studio backgrounds. Optimized transparent WebP sheets are stored in `public/product-views/product-01-concept-cutout.webp` through `product-20-concept-cutout.webp`. The gallery labels them as concept imagery because Fake Store API supplies only one authentic catalog photo per item. If genuine extra image URLs are available through the product model, the gallery prefers those over concept views.

They live in `.agents/skills/` and were installed with `npx skills add ... --agent codex --copy -y`. The candidate `vercel-composition-patterns` was not installed because the project already relies on straightforward component composition. `next-best-practices` and `webapp-testing` were not installed to avoid overlapping guidance; official Next.js docs and Playwright documentation were used for those areas.
