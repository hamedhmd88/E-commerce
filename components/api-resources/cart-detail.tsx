"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { useCart } from "@/components/cart/cart-provider";
import { StatusPanel } from "@/components/feedback/status-panel";
import { Button } from "@/components/ui/button";
import { storeToast } from "@/components/ui/store-toast";
import { demoApiService } from "@/services/demoApiService";
import { productService } from "@/services/productService";

export function CartDetail({ id }: { id: number }) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const valid = Number.isInteger(id) && id > 0;
  const cart = useQuery({
    queryKey: ["sample-cart", id],
    queryFn: () => demoApiService.cart(id),
    enabled: valid,
    staleTime: 5 * 60_000,
  });
  const products = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
    staleTime: 5 * 60_000,
  });
  const productMap = new Map(
    (products.data ?? []).map((product) => [product.id, product]),
  );
  const lines = (cart.data?.products ?? []).map((line) => ({
    ...line,
    product: productMap.get(line.productId),
  }));
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce(
    (sum, line) => sum + (line.product?.price ?? 0) * line.quantity,
    0,
  );
  const canCopy =
    !products.isPending &&
    !products.isError &&
    lines.some((line) => line.product);

  function copyToBag() {
    if (!user)
      return storeToast.signIn("add items to your bag", `/carts/${id}`);
    let copied = 0;
    for (const line of lines) {
      if (!line.product) continue;
      for (let index = 0; index < line.quantity; index++) {
        addItem({
          id: line.product.id,
          title: line.product.title,
          price: line.product.price,
          image: line.product.image,
        });
        copied++;
      }
    }
    if (copied)
      storeToast.success(
        "Added to your demo bag",
        `${copied} item${copied === 1 ? "" : "s"} from sample cart #${id}`,
      );
  }

  return (
    <section className="mx-auto max-w-6xl pb-16 pt-5 lg:pt-8">
      <Link
        href="/carts/explore"
        className="mb-5 inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="size-4" /> All sample carts
      </Link>
      {!valid || cart.isError || (!cart.isPending && !cart.data?.id) ? (
        <StatusPanel
          kind={cart.isError ? "error" : "empty"}
          headingLevel={1}
          title={cart.isError ? "Sample cart is unavailable" : "Cart not found"}
          description={
            cart.isError
              ? "The public sample cart could not be loaded. Try again in a moment."
              : "This cart is not in the public sample collection."
          }
          onRetry={
            cart.isError
              ? () => {
                  void cart.refetch();
                }
              : undefined
          }
          retrying={cart.isFetching}
          actionHref="/carts/explore"
          actionLabel="Browse carts"
        />
      ) : cart.isPending ? (
        <div
          aria-label="Loading cart"
          className="glass-panel h-72 animate-pulse rounded-[2rem] motion-reduce:animate-none"
        />
      ) : (
        <>
          <div className="api-workbench-hero glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
            <div className="relative z-10">
              <p className="text-xs font-semibold tracking-[.12em] text-primary">
                FAKE STORE API / SAMPLE CART #{cart.data.id}
              </p>
              <h1 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
                A closer look at this cart.
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                A public sample collection. Add its available products to your
                browser demo bag to try the shopping flow.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/55 px-4 py-2">
                  <UserRound className="size-4 text-primary" /> User #
                  {cart.data.userId}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/55 px-4 py-2">
                  <CalendarDays className="size-4 text-primary" />{" "}
                  {cart.data.date.slice(0, 10)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/55 px-4 py-2">
                  <Package className="size-4 text-primary" /> {count} items
                </span>
              </div>
            </div>
            <ShoppingBag
              aria-hidden="true"
              className="absolute -bottom-12 right-8 size-64 rotate-[-15deg] text-primary/10"
              strokeWidth={0.7}
            />
          </div>
          <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl">Inside the cart</h2>
              {lines.map((line, index) => (
                <div
                  key={`${line.productId}-${index}`}
                  className="glass-panel flex gap-4 rounded-[1.5rem] p-4 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 motion-reduce:transform-none sm:gap-6 sm:p-5"
                >
                  <div className="catalog-image-stage relative size-24 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-white p-2 sm:size-32">
                    {line.product ? (
                      <Image
                        src={line.product.image}
                        alt={line.product.title}
                        fill
                        sizes="128px"
                        className="object-contain p-3"
                      />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <Package className="size-9 text-primary/40" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      lang={line.product ? "en" : undefined}
                      dir={line.product ? "ltr" : undefined}
                      data-i18n-ignore={line.product ? true : undefined}
                      className="text-xs uppercase tracking-widest text-primary"
                    >
                      {line.product?.category ?? `Product #${line.productId}`}
                    </p>
                    <h3
                      lang={line.product ? "en" : undefined}
                      dir={line.product ? "ltr" : undefined}
                      data-i18n-ignore={line.product ? true : undefined}
                      className="mt-1 font-serif text-lg sm:text-xl"
                    >
                      {line.product?.title ??
                        (products.isPending
                          ? "Loading product…"
                          : products.isError
                            ? "Catalog unavailable"
                            : "Product unavailable")}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Quantity: {line.quantity}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold tabular-nums">
                        {line.product
                          ? `$${(line.product.price * line.quantity).toFixed(2)}`
                          : "—"}
                      </span>
                      {line.product && (
                        <Link
                          href={`/products/${line.product.id}`}
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          Product details <ArrowRight className="size-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside
              className="glass-panel rounded-[1.75rem] p-6 lg:sticky lg:top-24"
              aria-label="Cart summary"
            >
              <p className="text-xs font-semibold tracking-[.12em] text-primary">
                CART SUMMARY
              </p>
              <h2 className="mt-2 font-serif text-2xl">Your next find</h2>
              <div className="mt-6 flex justify-between border-b border-border/60 pb-4 text-sm">
                <span className="text-muted-foreground">Items</span>
                <strong>{count}</strong>
              </div>
              <div className="flex justify-between py-4 text-sm">
                <span className="text-muted-foreground">
                  Estimated subtotal
                </span>
                <strong className="tabular-nums">
                  {products.data ? `$${subtotal.toFixed(2)}` : "—"}
                </strong>
              </div>
              <p className="mb-5 text-xs leading-5 text-muted-foreground">
                Prices are current catalog estimates. The sample API cart and
                your local demo bag are separate.
              </p>
              {products.isError && (
                <Button
                  variant="outline"
                  className="mb-3 w-full rounded-xl"
                  onClick={() => products.refetch()}
                >
                  Retry product catalog
                </Button>
              )}
              <Button
                className="min-h-12 w-full rounded-xl"
                disabled={!canCopy}
                onClick={copyToBag}
              >
                <ShoppingBag className="size-4" /> Add available items to bag
              </Button>
              <Link
                href="/cart"
                className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                View my bag <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/carts"
                className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                Try cart API methods
              </Link>
            </aside>
          </div>
        </>
      )}
    </section>
  );
}
