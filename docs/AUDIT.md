# Repository audit

This audit records the status of the 24 preliminary findings against the current repository. It is a snapshot, not a claim that every browser interaction has been exhaustively verified.

| #   | Finding                           | Classification         | Current disposition                                                                            |
| --- | --------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | Canary Next.js                    | Confirmed defect       | Replaced with stable 15.5.28.                                                                  |
| 2   | React compatibility               | Already resolved       | React 18 is within Next 15.5.28 peer range.                                                    |
| 3   | Ignored TypeScript errors         | Confirmed defect       | Suppression removed; `pnpm typecheck` passes.                                                  |
| 4   | Ignored ESLint errors             | Confirmed defect       | Suppression removed; ESLint configured and passing.                                            |
| 5   | Disabled image optimization       | Confirmed defect       | Replaced with Fake Store API remote image pattern.                                             |
| 6   | `latest` dependency ranges        | Maintenance issue      | Direct dependencies pinned.                                                                    |
| 7   | Mixed framework dependencies      | Maintenance issue      | Direct Remix, Svelte, and Vue dependencies removed.                                            |
| 8   | Duplicate models/components       | Architectural weakness | Product schema centralized; unused duplicate category and blog components removed.             |
| 9   | Inconsistent product fetching     | Architectural weakness | Product service validates responses; route fetches consolidated.                               |
| 10  | TanStack Query integration        | Architectural weakness | Catalog data now uses browser queries, following the API's documented browser request pattern. |
| 11  | Inconsistent auth storage         | Confirmed defect       | Browser demo session uses sessionStorage.                                                      |
| 12  | Plaintext browser credentials     | Confirmed defect       | Password persistence removed.                                                                  |
| 13  | Duplicate cart calculations       | Confirmed defect       | Shared pricing module used across cart and checkout.                                           |
| 14  | Inconsistent demo orders          | Confirmed defect       | Stable browser-local order record used in success and history.                                 |
| 15  | Inconsistent category pages       | Confirmed defect       | Category route uses Fake Store API.                                                            |
| 16  | Filter and URL state              | UX weakness            | Search, filters, sorting, and page state use URL parameters.                                   |
| 17  | Hardcoded blog organization       | Architectural weakness | Structured local articles and related content now used.                                        |
| 18  | Fabricated homepage statistics    | UX weakness            | Removed from the homepage.                                                                     |
| 19  | Unclear simulated forms           | UX weakness            | Contact and newsletter disclose local demo behavior.                                           |
| 20  | Inaccurate README                 | Maintenance issue      | Rewritten for actual architecture and limitations.                                             |
| 21  | Missing tests                     | Missing feature        | Node unit and Playwright suites added; coverage is still selective.                            |
| 22  | Overlapping animation libraries   | Maintenance issue      | Unused motion sections and direct motion/swiper packages removed.                              |
| 23  | Inconsistent UI patterns          | UX weakness            | Shared semantic tokens and page styling improved; visual audit continues.                      |
| 24  | SEO, accessibility, error/loading | Missing feature        | Metadata, sitemap, robots, skip link, and route error UI added; full audit continues.          |
