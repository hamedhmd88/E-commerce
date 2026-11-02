# Development

Install with `pnpm install --frozen-lockfile`, then run `pnpm dev`. Run `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test:unit`, `pnpm test:e2e`, and `pnpm build` before sharing a change. Run `pnpm api:check` when diagnosing live catalog access. The project uses `pnpm-lock.yaml`; avoid mixing package managers. Copy `.env.example` to `.env.local` only when overriding the API or site origin. A reachable Fake Store API is needed for live catalog data.

Development output stays in `.next`; production builds and `pnpm start` use `.next-build`, also inside this repository. This lets a development server on port 3000 stay active while building. `pnpm build` clears only `.next-build` and retries transient Windows `EPERM` output locks. Type checking uses `tsconfig.build.json` so generated development types cannot interfere with production builds.
