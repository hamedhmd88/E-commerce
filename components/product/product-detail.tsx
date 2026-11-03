"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/services/productService";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Heart,
  Images,
  Minus,
  Pause,
  Play,
  Plus,
  ShoppingBag,
  Star,
  Trash2,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { useWishlist } from "@/components/account/wishlist-provider";
import { storeToast } from "@/components/ui/store-toast";

type GalleryView = {
  src: string;
  label: string;
  transform: string;
  spritePosition?: string;
  spritePanelRatio?: string;
};

const portraitConceptSheets = new Set([3, 10, 15, 19, 20]);

function getGallery(product: Product): GalleryView[] {
  const sources = [
    ...new Set([product.image, ...(product.images ?? [])]),
  ].slice(0, 6);
  if (sources.length === 1 && product.id >= 1 && product.id <= 20) {
    const labels = [
      "Front concept view",
      "Front-left concept view",
      "Left side concept view",
      "Back concept view",
      "Right side concept view",
      "Front-right concept view",
    ];
    return [
      { src: product.image, label: "Catalog photo", transform: "none" },
      ...labels.map((label, index) => ({
        src: `/product-views/product-${String(product.id).padStart(2, "0")}-concept-cutout.webp`,
        label,
        transform: "none",
        spritePosition: `${(index % 3) * 50}% ${index < 3 ? 0 : 100}%`,
        spritePanelRatio: portraitConceptSheets.has(product.id)
          ? "2 / 3"
          : "1 / 1",
      })),
    ];
  }
  if (sources.length > 1)
    return sources.map((src, index) => ({
      src,
      label: `Photo ${index + 1}`,
      transform: "none",
    }));
  return [
    { src: product.image, label: "Original view", transform: "none" },
    {
      src: product.image,
      label: "Tilted left",
      transform: "translate(-3%, 2%) rotate(-9deg)",
    },
    {
      src: product.image,
      label: "Tilted right",
      transform: "translate(3%, 2%) rotate(9deg)",
    },
  ];
}

export function ProductDetail({ product }: { product: Product }) {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedView, setSelectedView] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setPrefersReducedMotion(media.matches);
      if (media.matches) setIsPlaying(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    setSelectedView(0);
    setIsPlaying(false);
  }, [product.id]);
  const views = getGallery(product);
  const view = views[selectedView] ?? views[0];
  useEffect(() => {
    if (!isPlaying || views.length < 2) return;
    const timer = window.setInterval(
      () =>
        setSelectedView((current) =>
          current < 1 || current >= views.length - 1 ? 1 : current + 1,
        ),
      650,
    );
    return () => window.clearInterval(timer);
  }, [isPlaying, views.length]);
  const quantity = items.find((item) => item.id === product.id)?.quantity ?? 0;
  const saved = isInWishlist(product.id);
  const isConceptGallery = views.some((item) => Boolean(item.spritePosition));
  const hasAdditionalPhotos =
    !isConceptGallery && views.some((item) => item.src !== product.image);

  const renderView = (item: GalleryView, thumbnail = false) =>
    item.spritePosition ? (
      <div
        role="img"
        aria-label={
          thumbnail
            ? undefined
            : `${product.title}, ${item.label.toLowerCase()}`
        }
        aria-hidden={thumbnail || undefined}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className="block h-full max-w-full bg-no-repeat"
          style={{
            aspectRatio: item.spritePanelRatio,
            backgroundImage: `url(${item.src})`,
            backgroundSize: "300% 200%",
            backgroundPosition: item.spritePosition,
          }}
        />
      </div>
    ) : (
      <Image
        src={item.src}
        alt={thumbnail ? "" : `${product.title}, ${item.label.toLowerCase()}`}
        fill
        priority={!thumbnail}
        sizes={thumbnail ? "96px" : "(max-width: 1024px) 100vw, 52vw"}
        className={
          thumbnail
            ? "object-contain p-2"
            : "object-contain p-4 transition-transform duration-500 ease-out sm:p-8"
        }
        style={{ transform: item.transform }}
      />
    );

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
    <article className="pb-20">
      <Link
        href="/products"
        className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to the collection
      </Link>
      <div className="grid gap-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 xl:gap-16">
        <div className="min-w-0">
          <div className="glass-panel catalog-detail-stage relative aspect-[.96] min-h-[340px] overflow-hidden rounded-[2rem] p-6 sm:aspect-[1.05] sm:min-h-[500px]">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--hero-tint),transparent_65%)] opacity-45"
              aria-hidden="true"
            />
            <div className="absolute inset-8 overflow-hidden rounded-[1.4rem]">
              {renderView(view)}
            </div>
            <span className="absolute bottom-5 start-5 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-xl">
              {view.label}
            </span>
            <span className="absolute end-5 top-5 rounded-full border border-border/70 bg-background/80 px-3 py-2 text-xs text-muted-foreground backdrop-blur-xl">
              {selectedView + 1} / {views.length}
            </span>
          </div>
          <div
            className="mt-4 flex gap-3 overflow-x-auto pb-2"
            role="group"
            aria-label="Product image views"
          >
            {views.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setSelectedView(index);
                }}
                aria-pressed={selectedView === index}
                aria-label={`Show ${item.label.toLowerCase()}`}
                className={`catalog-thumb relative size-20 shrink-0 overflow-hidden rounded-xl border bg-card/65 transition-all duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-ring sm:size-24 ${selectedView === index ? "border-primary ring-2 ring-primary/25" : "border-border/70 hover:border-primary/50"}`}
              >
                {renderView(item, true)}
                <span className="sr-only">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Images className="size-3.5 shrink-0" />
              {isConceptGallery
                ? "First image: catalog photo. The six AI-generated concept views, including the back, may differ from the actual item."
                : hasAdditionalPhotos
                  ? "Choose a photo to inspect the product."
                  : "The catalog supplies one photo; tilted views use that same image."}
            </p>
            {isConceptGallery && (
              <button
                type="button"
                onClick={() => {
                  if (prefersReducedMotion) {
                    setSelectedView((current) =>
                      current < 1 || current >= views.length - 1
                        ? 1
                        : current + 1,
                    );
                  } else {
                    setIsPlaying((playing) => !playing);
                  }
                }}
                aria-label={
                  prefersReducedMotion
                    ? "Show next concept view"
                    : isPlaying
                      ? "Pause concept rotation"
                      : "Play concept rotation"
                }
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-ring"
              >
                {isPlaying ? (
                  <Pause className="size-3.5" />
                ) : (
                  <Play className="size-3.5" />
                )}
                {prefersReducedMotion
                  ? "Next view"
                  : isPlaying
                    ? "Pause rotation"
                    : "Rotate concept"}
              </button>
            )}
          </div>
        </div>
        <div className="min-w-0 py-2 lg:py-4">
          <Link
            href={`/category/${encodeURIComponent(product.category)}`}
            lang="en"
            dir="ltr"
            data-i18n-ignore
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-medium capitalize text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {product.category}
            <ArrowUpRight className="size-3.5" />
          </Link>
          <h1
            lang="en"
            dir="ltr"
            data-i18n-ignore
            className="max-w-2xl text-3xl font-medium leading-[1.08] tracking-[-.055em] sm:text-4xl xl:text-5xl"
          >
            {product.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1.5 font-medium">
              <Star className="size-4 fill-accent text-accent" />
              {product.rating.rate.toFixed(1)} / 5
            </span>
            <span className="text-muted-foreground">
              {product.rating.count.toLocaleString()} catalog ratings
            </span>
          </div>
          <div className="mt-7 flex flex-wrap items-end justify-between gap-3 border-b border-border/70 pb-7">
            <div>
              <p className="text-xs text-muted-foreground">Catalog price</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              Item #{product.id}
            </span>
          </div>
          <div className="py-7">
            <h2 className="text-lg font-medium">About this piece</h2>
            <p
              lang="en"
              dir="ltr"
              data-i18n-ignore
              className="mt-3 max-w-xl leading-7 text-muted-foreground"
            >
              {product.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {quantity > 0 ? (
              <div className="flex min-h-14 flex-1 items-center justify-between rounded-full border border-border bg-card/70 p-1.5">
                <button
                  type="button"
                  onClick={() =>
                    quantity === 1
                      ? removeItem(product.id)
                      : updateQuantity(product.id, quantity - 1)
                  }
                  aria-label={
                    quantity === 1 ? "Remove from bag" : "Decrease quantity"
                  }
                  className="glass-control"
                >
                  {quantity === 1 ? (
                    <Trash2 className="size-4" />
                  ) : (
                    <Minus className="size-4" />
                  )}
                </button>
                <span
                  aria-live="polite"
                  className="min-w-12 text-center font-medium"
                >
                  {quantity} in bag
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  aria-label="Increase quantity"
                  className="glass-control"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={addToCart}
                className="button-liquid inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="size-4" /> Add to bag
              </button>
            )}
            <button
              type="button"
              onClick={toggleWishlist}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved items" : "Save this item"}
              className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-border px-6 transition-colors hover:border-primary hover:text-primary ${saved ? "bg-primary/10 text-primary" : "bg-card/60"}`}
            >
              <Heart className={`size-4 ${saved ? "fill-current" : ""}`} />
              <span className="sm:hidden">{saved ? "Saved" : "Save item"}</span>
            </button>
          </div>
          <div className="glass-panel mt-8 overflow-hidden rounded-2xl">
            <h2 className="border-b border-border/60 px-5 py-4 text-sm font-semibold">
              At a glance
            </h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-5 px-5 py-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Category</dt>
                <dd className="mt-1 font-medium capitalize">
                  <span lang="en" dir="ltr" data-i18n-ignore>
                    {product.category}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Rating</dt>
                <dd className="mt-1 font-medium">
                  {product.rating.rate.toFixed(1)} out of 5
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Ratings count</dt>
                <dd className="mt-1 font-medium">
                  {product.rating.count.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Catalog item</dt>
                <dd className="mt-1 font-medium">#{product.id}</dd>
              </div>
            </dl>
          </div>
          <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-muted-foreground">
            <Check className="mt-1 size-4 shrink-0 text-primary" /> Product data
            comes from Fake Store API. Bag, account, and checkout interactions
            are demonstrations.
          </p>
        </div>
      </div>
    </article>
  );
}
