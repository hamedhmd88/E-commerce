"use client";

import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/components/cart/cart-provider";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/layout/language-provider";

export function CartSidebar() {
  const { locale } = useLanguage();
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side={locale === "fa" ? "left" : "right"}
        className="cart-drawer w-full gap-0 border-border/70 bg-card/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-[32rem] [&>button]:right-5 [&>button]:top-5 [&>button]:rounded-full [&>button]:bg-background/70 [&>button]:p-2"
      >
        <SheetHeader className="border-b border-border/70 px-6 pb-5 pt-7 sm:px-8">
          <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShoppingBag className="size-5" />
          </div>
          <SheetTitle className="font-serif text-3xl tracking-tight">
            Shopping Cart
          </SheetTitle>
          <SheetDescription>
            {totalItems} {totalItems === 1 ? "item" : "items"} in your demo bag
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center px-8">
              <div className="max-w-xs text-center">
                <div className="mx-auto mb-5 grid size-20 place-items-center rounded-[1.75rem] border border-primary/20 bg-primary/5">
                  <ShoppingBag className="size-9 text-primary" />
                </div>
                <h3 className="font-serif text-2xl">Your bag is waiting.</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Find something you love and it will appear here.
                </p>
                <Button
                  asChild
                  className="mt-6 rounded-full px-6"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/products">
                    Explore products <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-4 rounded-2xl border border-border/70 bg-background/60 p-3 shadow-sm sm:grid-cols-[6rem_minmax(0,1fr)]"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-card p-2">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3
                          lang="en"
                          dir="ltr"
                          data-i18n-ignore
                          className="line-clamp-2 pr-2 text-sm font-semibold leading-5"
                        >
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm font-semibold tabular-nums text-primary">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5">
                          <Button
                            aria-label={`Decrease quantity of ${item.title}`}
                            variant="outline"
                            size="icon"
                            className="size-8 rounded-lg bg-card"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-7 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <Button
                            aria-label={`Increase quantity of ${item.title}`}
                            variant="outline"
                            size="icon"
                            className="size-8 rounded-lg bg-card"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            aria-label={`Remove ${item.title} from cart`}
                            variant="ghost"
                            size="icon"
                            className="ml-auto size-8 rounded-lg text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t border-border/70 bg-background/50 px-6 py-5 sm:px-8">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-serif text-2xl font-semibold tabular-nums text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs leading-5 text-muted-foreground">
                  Checkout is a demonstration. No payment details are collected.
                </p>
                <div className="space-y-2">
                  <Button
                    asChild
                    className="w-full rounded-xl"
                    size="lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl bg-transparent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/cart">View Cart</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
