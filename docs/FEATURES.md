# Feature inventory

- Product listing, category route, and product details use Fake Store API.
- The product catalog uses one filter panel, a two-ended price slider, and a page size selector (6, 9, or 12; default 9). Filter and pagination choices are reflected in the URL.
- Product cards share a consistent height and open the product detail page. The detail gallery prefers multiple genuine image URLs when supplied. Fake Store API currently supplies one image per item, so each of its 20 products shows the original catalog photo plus six clearly labeled AI-generated concept views, including a rear view. These concept views have transparent backgrounds so they share the same gallery surface in light and dark themes. They illustrate possible angles and may differ from the item sold. The gallery can step through the concept views automatically after the user starts it, or one view at a time when reduced motion is preferred.
- Storefront feedback uses a reusable, theme-aware toast with a sign-in action for account-required bag and wishlist interactions.
- Cart and wishlist use browser state.
- Demo login and registration create browser sessions.
- Checkout creates browser-local demo orders, which appear on confirmation and history pages.
- Theme, contact form, and newsletter provide local interaction feedback.
- Blog, about, and FAQ provide editorial demonstration content.
- Home includes a five-slide, user-controllable collection carousel, a journal preview, a five-step illustrated shopping journey linked to scrolling, featured products, an editorial overview, a demo newsletter, and an FAQ. The journey illustration advances when the next step's text reaches the reading area after the previous step's text ends.
- The home page is statically rendered for faster navigation. Product content still comes from Fake Store API through the shared service layer.
- The Morrow visual identity, glass surfaces, and animated gradient support light and dark themes. Motion honors reduced-motion preferences.

These are portfolio features, not production commerce services.
