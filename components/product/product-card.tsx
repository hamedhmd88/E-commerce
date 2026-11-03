"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/components/cart/cart-provider";
import { useWishlist } from "@/components/account/wishlist-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { storeToast } from "@/components/ui/store-toast";
import type { Product } from "@/services/productService";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, updateQuantity, removeItem, items } = useCart();
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const quantity = items.find((item) => item.id === product.id)?.quantity ?? 0;
  const saved = isInWishlist(product.id);

  const addToCart = () => {
    if (!user) return storeToast.signIn("add items to your bag");
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    storeToast.success("Added to your bag", product.title);
  };
  const toggleWishlist = () => {
    if (!user) return storeToast.signIn("save items");
    if (saved) {
      removeFromWishlist(product.id);
      storeToast.success("Removed from saved items");
    } else {
      addToWishlist(product);
      storeToast.success("Saved for later", product.title);
    }
  };

  return (
    <Card className="catalog-product-card glass-panel group relative h-full min-w-0 gap-0 overflow-hidden rounded-[1.65rem] border-border/65 p-3 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_26px_65px_-30px_rgba(0,0,0,.35)]">
      <Link
        href={`/products/${product.id}`}
        aria-label={`View details for ${product.title}`}
        className="absolute inset-0 z-10 rounded-[1.65rem] focus-visible:outline-2 focus-visible:outline-ring"
      />
      <CardContent className="relative flex flex-1 flex-col px-0">
        <div className="catalog-image-stage relative aspect-[1.12] overflow-hidden rounded-[1.2rem] border border-border/35">
          <Image
            src={product.image || "/placeholder.svg"}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="pointer-events-none object-cover opacity-20 blur-3xl scale-125"
            aria-hidden="true"
          />
          <Image
            src={product.image || "/placeholder.svg"}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="pointer-events-none object-contain p-6 transition-transform duration-500 group-hover:scale-[1.055] sm:p-7"
          />
          <span
            lang="en"
            dir="ltr"
            data-i18n-ignore
            className="absolute right-3 top-3 rounded-full border border-primary/20 bg-background/85 px-2.5 py-1 text-[11px] font-medium capitalize text-primary backdrop-blur-xl"
          >
            {product.category}
          </span>
        </div>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={
            saved
              ? `Remove ${product.title} from saved items`
              : `Save ${product.title}`
          }
          aria-pressed={saved}
          className="absolute left-3 top-3 z-20 grid size-10 place-items-center rounded-full border border-border/70 bg-background/85 text-foreground shadow-sm backdrop-blur-xl transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Heart
            className={`size-4 ${saved ? "fill-primary text-primary" : ""}`}
          />
        </button>
        <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
          <h3
            lang="en"
            dir="ltr"
            data-i18n-ignore
            className="line-clamp-2 min-h-[2.8rem] text-sm font-semibold leading-6 text-foreground transition-colors group-hover:text-primary sm:text-base"
          >
            {product.title}
          </h3>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Star
              className="size-4 fill-accent text-accent"
              aria-hidden="true"
            />
            <span>{product.rating.rate.toFixed(1)}</span>
            <span>({product.rating.count})</span>
          </div>
          <p className="mt-auto pt-3 text-xl font-semibold tracking-tight text-foreground">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="relative z-20 px-1 pb-1 pt-1">
        {quantity > 0 ? (
          <div className="flex h-10 w-full items-center justify-between rounded-xl border border-border/70 bg-background/65 p-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-8 rounded-lg"
              onClick={() =>
                quantity === 1
                  ? removeItem(product.id)
                  : updateQuantity(product.id, quantity - 1)
              }
              aria-label={
                quantity === 1
                  ? `Remove ${product.title} from bag`
                  : `Decrease ${product.title} quantity`
              }
            >
              {quantity === 1 ? (
                <Trash2 className="size-4" />
              ) : (
                <Minus className="size-4" />
              )}
            </Button>
            <span className="font-medium tabular-nums" aria-live="polite">
              {quantity} in bag
            </span>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-8 rounded-lg"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label={`Increase ${product.title} quantity`}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={addToCart}
            className="h-10 w-full rounded-xl"
          >
            <ShoppingBag className="size-4" /> Add to bag
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
