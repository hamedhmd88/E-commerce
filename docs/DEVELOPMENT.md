# Development

Install with `pnpm install --frozen-lockfile`, then run `pnpm dev`. Run `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test:unit`, `pnpm test:e2e`, and `pnpm build` before sharing a change. Run `pnpm api:check` when diagnosing live catalog access. The project uses `pnpm-lock.yaml`; avoid mixing package managers. Copy `.env.example` to `.env.local` only when overriding the API or site origin. A reachable Fake Store API is needed for live catalog data.

Development and production builds use Next.js's standard `.next` directory, which Vercel detects for deployment. `pnpm build` clears `.next` and retries transient Windows `EPERM` output locks. Do not run a development server and a production build in the same checkout at the same time. Set `NEXT_VISUAL_DIST_DIR` only when an isolated custom output is specifically needed. Type checking uses `tsconfig.build.json` so generated development types cannot interfere with production builds.
