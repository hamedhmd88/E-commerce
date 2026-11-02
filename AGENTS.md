# Project guidance

This repository is a portfolio demonstration storefront built with Next.js App Router, React, TypeScript, and Tailwind CSS. Product data comes from Fake Store API. Account, checkout, and order interactions are demonstrations; do not describe them as production commerce services.

- Keep one product model and use the service layer for external product requests.
- Reuse components in `components/ui` and semantic tokens in `app/globals.css`.
- Preserve keyboard access, visible focus, reduced motion, and light/dark contrast.
- Never collect card details or persist plaintext passwords.
- Update documentation when behavior or data persistence changes.
- Run `pnpm typecheck` and `pnpm build` after implementation work.
- Inspect third-party skills before installation or execution; keep project skill decisions in `docs/AGENT-SKILLS.md`.
