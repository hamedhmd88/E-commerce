# Decision: browser-only commerce demonstrations

The portfolio uses session-based demo account state and browser-local orders. This keeps the checkout coherent without introducing payment or identity infrastructure. The UI must disclose that orders are simulated and never ask for real card credentials. Browser storage is neither a production database nor an authorization boundary.
