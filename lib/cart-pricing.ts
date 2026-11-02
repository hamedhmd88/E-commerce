export type DemoPromoCode = "SAVE10" | "FREESHIP" | null;

export function calculateCartPricing(
  subtotal: number,
  promo: DemoPromoCode = null,
) {
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const discount =
    promo === "SAVE10"
      ? Math.round(subtotal * 0.1 * 100) / 100
      : promo === "FREESHIP"
        ? shipping
        : 0;
  return {
    subtotal,
    shipping,
    tax,
    discount,
    total: Math.round((subtotal + shipping + tax - discount) * 100) / 100,
  };
}
