# Design system

The storefront uses a mineral-glass palette: cool porcelain surfaces, deep sea-green actions, and a restrained brass accent. Semantic light and dark tokens live in `app/globals.css`; Geist remains the interface typeface, with scale and spacing carrying the editorial character.

Product, category, and editorial surfaces share translucent panels, soft borders, and image-led layouts. Blur is decorative and falls back to opaque surfaces when reduced transparency is requested. Framer Motion handles the home collection carousel and product-detail entrance; the carousel pauses on hover, offers manual controls, and stops autoplay when reduced motion is enabled. Global CSS also respects reduced motion and provides visible keyboard focus.
