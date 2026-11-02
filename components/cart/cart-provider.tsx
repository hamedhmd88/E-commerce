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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [promoCode, setPromoCode] = useState<DemoPromoCode>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
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
      } catch {
        localStorage.removeItem("cart");
      }
    }
    setHydrated(true);
    const savedPromo = sessionStorage.getItem("demo-promo");
    if (savedPromo === "SAVE10" || savedPromo === "FREESHIP")
      setPromoCode(savedPromo);
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (hydrated) localStorage.setItem("cart", JSON.stringify(items));
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
    sessionStorage.removeItem("demo-promo");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartSubtotal(items);
  const pricing = calculateCartPricing(totalPrice, promoCode);
  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized !== "SAVE10" && normalized !== "FREESHIP") return false;
    setPromoCode(normalized);
    sessionStorage.setItem("demo-promo", normalized);
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
