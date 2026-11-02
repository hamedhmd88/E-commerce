export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export function addCartItem(
  items: CartItem[],
  product: Omit<CartItem, "quantity">,
): CartItem[] {
  const existing = items.find((item) => item.id === product.id);
  return existing
    ? items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    : [...items, { ...product, quantity: 1 }];
}

export function updateCartQuantity(
  items: CartItem[],
  id: number,
  quantity: number,
): CartItem[] {
  if (!Number.isInteger(quantity) || quantity <= 0)
    return items.filter((item) => item.id !== id);
  return items.map((item) => (item.id === id ? { ...item, quantity } : item));
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
