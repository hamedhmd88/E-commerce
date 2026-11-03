# Demo checkout

Checkout is a portfolio interaction. It must use demo payment choices only and must never request a card number or CVV. Orders are local demonstration records; no payment, shipment, email, or SMS occurs. Browser storage can be cleared to reset orders.

Orders are validated when read from browser storage, so malformed saved records are ignored. If browser storage is unavailable, the completed demo order remains accessible in memory until the tab is reloaded or closed; the confirmation and history pages explain that temporary state. Checkout moves to confirmation through the app router so this in-memory order survives the transition.
