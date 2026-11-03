"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { calculateCartPricing, type DemoPromoCode } from "@/lib/cart-pricing";
import {
  addCartItem,
  cartSubtotal,
  updateCartQuantity,
  type CartItem,
} from "@/lib/cart-state";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  promoCode: DemoPromoCode;
  applyPromoCode: (code: string) => boolean;
  pricing: ReturnType<typeof calculateCartPricing>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [promoCode, setPromoCode] = useState<DemoPromoCode>(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);
        if (Array.isArray(parsed))
          setItems(
            parsed.filter((item): item is CartItem =>
              Boolean(
                item &&
                typeof item === "object" &&
                Number.isInteger(item.id) &&
                typeof item.title === "string" &&
                typeof item.image === "string" &&
                Number.isFinite(item.price) &&
                item.price >= 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0,
              ),
            ),
          );
      }
      const savedPromo = sessionStorage.getItem("demo-promo");
      if (savedPromo === "SAVE10" || savedPromo === "FREESHIP")
        setPromoCode(savedPromo);
    } catch {
      // Keep the in-memory cart usable if browser storage is unavailable.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem("cart", JSON.stringify(items));
      } catch {
        // Keep cart interactions working without persistence.
      }
    }
  }, [items, hydrated]);

  const addItem = (product: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => addCartItem(currentItems, product));
  };

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((currentItems) => updateCartQuantity(currentItems, id, quantity));
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    try {
      sessionStorage.removeItem("demo-promo");
    } catch {
      /* Session storage is optional. */
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartSubtotal(items);
  const pricing = calculateCartPricing(totalPrice, promoCode);
  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized !== "SAVE10" && normalized !== "FREESHIP") return false;
    setPromoCode(normalized);
    try {
      sessionStorage.setItem("demo-promo", normalized);
    } catch {
      /* Session storage is optional. */
    }
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        promoCode,
        applyPromoCode,
        pricing,
        isOpen,
        setIsOpen,
        isHydrated: hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
