# Architecture

The application uses Next.js App Router under `app/`. Shared UI lives in `components/`, product requests in `services/`, browser demo state in providers and `lib/`, and static editorial material in `data/` where applicable. Fake Store API is the primary source for product records. Account and purchase data are simulated in the browser and do not represent a backend account or a charged order.

The current architecture retains legacy route and component locations to keep the project usable during incremental refactoring. Server rendering is preferred for content that does not need browser state; client providers own cart, wishlist, theme, and demo session interactions. Catalog filtering and cart pricing live in pure modules under `lib/` and have unit tests.
