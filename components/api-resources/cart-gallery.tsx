"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { demoApiService } from "@/services/demoApiService";
import { productService } from "@/services/productService";
import { StatusPanel } from "@/components/feedback/status-panel";

const sizes = [6, 9, 12] as const;

export function CartGallery() {
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "id-desc">("newest");
  const [pageSize, setPageSize] = useState<(typeof sizes)[number]>(6);
  const [page, setPage] = useState(1);
  const carts = useQuery({
    queryKey: ["sample-carts-gallery"],
    queryFn: () => demoApiService.carts(),
    staleTime: 5 * 60_000,
  });
  const products = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
    staleTime: 5 * 60_000,
  });
  const productMap = useMemo(
    () => new Map((products.data ?? []).map((item) => [item.id, item])),
    [products.data],
  );
  const categories = useMemo(
    () =>
      [...new Set((products.data ?? []).map((item) => item.category))].sort(),
    [products.data],
  );
  const invalidDates = Boolean(from && to && from > to);
  const filtered = useMemo(() => {
    if (invalidDates) return [];
    const query = search.trim().toLowerCase();
    return (carts.data ?? [])
      .filter((cart) => {
        const date = cart.date.slice(0, 10);
        return (
          (!query ||
            String(cart.id).includes(query) ||
            cart.products.some((line) =>
              productMap
                .get(line.productId)
                ?.title.toLowerCase()
                .includes(query),
            )) &&
          (!userId || String(cart.userId) === userId.trim()) &&
          (!from || date >= from) &&
          (!to || date <= to) &&
          (category === "all" ||
            cart.products.some(
              (line) => productMap.get(line.productId)?.category === category,
            ))
        );
      })
      .sort((a, b) =>
        sort === "id-desc"
          ? b.id - a.id
          : sort === "oldest"
            ? a.date.localeCompare(b.date) || a.id - b.id
            : b.date.localeCompare(a.date) || b.id - a.id,
      );
  }, [
    carts.data,
    search,
    userId,
    from,
    to,
    category,
    sort,
    productMap,
    invalidDates,
  ]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const update = (callback: () => void) => {
    callback();
    setPage(1);
  };
  const first = filtered.length ? (currentPage - 1) * pageSize + 1 : 0;
  const last = Math.min(currentPage * pageSize, filtered.length);

  return (
    <section className="mx-auto max-w-7xl pb-16 pt-5 lg:pt-8">
      <div className="api-workbench-hero glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs font-semibold tracking-[.12em] text-primary">
            CART COLLECTION / FAKE STORE API
          </p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Carts with a story inside.
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Explore public sample carts as curated sets of products. Open a cart
            to see its items, then copy available products into your own Morrow
            demo bag.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link
              href="/carts"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/35 bg-background/55 px-5 text-primary transition-colors hover:bg-primary/10"
            >
              API cart methods <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border/70 bg-background/40 px-5 transition-colors hover:bg-background/70"
            >
              Browse products
            </Link>
          </div>
        </div>
        <ShoppingBag
          aria-hidden="true"
          className="absolute -bottom-10 right-5 size-52 rotate-[-15deg] text-primary/10 sm:right-14 sm:size-64"
          strokeWidth={0.7}
        />
      </div>

      <div className="mt-7 grid items-start gap-7 lg:grid-cols-[minmax(245px,290px)_minmax(0,1fr)]">
        <aside
          className="glass-panel rounded-[1.75rem] p-5 lg:sticky lg:top-24"
          aria-label="Cart filters"
        >
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-primary" />
            <h2 className="font-serif text-xl">Refine carts</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="cart-search">Cart ID or product</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input
                  id="cart-search"
                  className="h-11 rounded-xl bg-background/55 pl-9"
                  value={search}
                  onChange={(e) => update(() => setSearch(e.target.value))}
                  placeholder="Search sample carts"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cart-user-filter">User ID</Label>
              <Input
                id="cart-user-filter"
                type="number"
                min="1"
                className="h-11 rounded-xl bg-background/55"
                value={userId}
                onChange={(e) => update(() => setUserId(e.target.value))}
                placeholder="All users"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="space-y-1.5">
                <Label htmlFor="cart-date-from">From</Label>
                <DatePicker
                  id="cart-date-from"
                  value={from}
                  onChange={(value) => update(() => setFrom(value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cart-date-to">To</Label>
                <DatePicker
                  id="cart-date-to"
                  value={to}
                  onChange={(value) => update(() => setTo(value))}
                />
              </div>
            </div>
            {invalidDates && (
              <p role="alert" className="text-xs text-destructive">
                The start date must be before the end date.
              </p>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="cart-category">Product category</Label>
              <Select
                value={category}
                onValueChange={(value) => update(() => setCategory(value))}
              >
                <SelectTrigger
                  id="cart-category"
                  className="h-11 w-full rounded-xl bg-background/55"
                >
                  <SelectValue
                    lang={category === "all" ? undefined : "en"}
                    dir={category === "all" ? undefined : "ltr"}
                    data-i18n-ignore={category === "all" ? undefined : true}
                  />
                </SelectTrigger>
                <SelectContent className="border-border bg-card/95 backdrop-blur-xl">
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                      lang="en"
                      dir="ltr"
                      data-i18n-ignore
                      className="capitalize"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cart-sort">Sort</Label>
              <Select
                value={sort}
                onValueChange={(value) =>
                  update(() => setSort(value as typeof sort))
                }
              >
                <SelectTrigger
                  id="cart-sort"
                  className="h-11 w-full rounded-xl bg-background/55"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-card/95 backdrop-blur-xl">
                  <SelectItem value="newest">Newest date</SelectItem>
                  <SelectItem value="oldest">Oldest date</SelectItem>
                  <SelectItem value="id-desc">Highest ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl bg-background/50"
              onClick={() => {
                setSearch("");
                setUserId("");
                setFrom("");
                setTo("");
                setCategory("all");
                setSort("newest");
                setPage(1);
              }}
            >
              Clear filters
            </Button>
          </div>
        </aside>

        <div id="cart-results" className="min-w-0 scroll-mt-28">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Showing{" "}
              <strong className="tabular-nums text-foreground">
                {first}–{last}
              </strong>{" "}
              of{" "}
              <strong className="tabular-nums text-foreground">
                {filtered.length}
              </strong>{" "}
              carts
            </p>
            <div className="flex items-center gap-3">
              <Label
                htmlFor="cart-page-size"
                className="text-sm text-muted-foreground"
              >
                Per page
              </Label>
              <Select
                value={String(pageSize)}
                onValueChange={(value) =>
                  update(() => setPageSize(Number(value) as typeof pageSize))
                }
              >
                <SelectTrigger
                  id="cart-page-size"
                  className="h-10 w-20 rounded-xl bg-card/70"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-card/95 backdrop-blur-xl">
                  {sizes.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {carts.isPending ? (
            <div
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
              aria-label="Loading carts"
            >
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="glass-panel h-80 animate-pulse rounded-[1.65rem] motion-reduce:animate-none"
                />
              ))}
            </div>
          ) : carts.isError ? (
            <StatusPanel
              title="Carts are unavailable"
              description="The public API could not be reached. Try again in a moment."
              onRetry={() => {
                void carts.refetch();
              }}
              retrying={carts.isFetching}
            />
          ) : visible.length === 0 ? (
            <StatusPanel
              kind="empty"
              title="No matching carts"
              description="Change a filter or clear them to see all public samples."
              actionLabel="Clear filters"
              onAction={() => {
                setSearch("");
                setUserId("");
                setFrom("");
                setTo("");
                setCategory("all");
                setSort("newest");
                setPage(1);
              }}
            />
          ) : (
            <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((cart) => {
                const lines = cart.products.map((line) => ({
                  ...line,
                  product: productMap.get(line.productId),
                }));
                const total = lines.reduce(
                  (sum, line) =>
                    sum + (line.product?.price ?? 0) * line.quantity,
                  0,
                );
                const count = lines.reduce(
                  (sum, line) => sum + line.quantity,
                  0,
                );
                return (
                  <Link
                    key={cart.id}
                    href={`/carts/${cart.id}`}
                    className="catalog-product-card glass-panel group flex min-w-0 flex-col overflow-hidden rounded-[1.65rem] border-border/65 p-3 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_26px_65px_-30px_rgba(0,0,0,.35)] motion-reduce:transform-none"
                    aria-label={`View cart ${cart.id} details`}
                  >
                    <div className="catalog-image-stage relative flex aspect-[1.12] items-center justify-center gap-2 overflow-hidden rounded-[1.2rem] border border-border/35 p-4">
                      {lines.slice(0, 3).map((line, index) =>
                        line.product ? (
                          <div
                            key={`${line.productId}-${index}`}
                            className={`relative aspect-square w-1/3 rounded-xl bg-white p-2 shadow-lg transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none ${index === 1 ? "translate-y-3" : ""}`}
                          >
                            <Image
                              src={line.product.image}
                              alt=""
                              fill
                              sizes="120px"
                              className="object-contain p-2"
                            />
                          </div>
                        ) : (
                          <div
                            key={`${line.productId}-${index}`}
                            className="grid aspect-square w-1/3 place-items-center rounded-xl bg-card/80"
                          >
                            <ShoppingBag className="size-7 text-primary/50" />
                          </div>
                        ),
                      )}
                      <span className="absolute right-3 top-3 rounded-full border border-primary/25 bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur-xl">
                        #{cart.id}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
                      <p className="text-xs font-medium text-primary">
                        {cart.date.slice(0, 10)}
                      </p>
                      <h2 className="mt-1 font-serif text-xl">
                        Cart for user #{cart.userId}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {count} items across {cart.products.length} product
                        lines
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
                        <span className="text-sm text-muted-foreground">
                          {products.data
                            ? "Estimated subtotal"
                            : "View products"}
                        </span>
                        <span className="font-semibold">
                          {products.data ? (
                            `$${total.toFixed(2)}`
                          ) : (
                            <ArrowRight className="size-4 text-primary" />
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {pages > 1 && (
            <nav
              aria-label="Cart pages"
              className="mt-9 flex flex-wrap items-center justify-center gap-2"
            >
              <Button
                variant="outline"
                className="rounded-xl"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              >
                <ChevronLeft className="size-4" /> Previous
              </Button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((number) => (
                <Button
                  key={number}
                  variant={number === currentPage ? "default" : "outline"}
                  className="size-10 rounded-xl px-0 tabular-nums"
                  aria-current={number === currentPage ? "page" : undefined}
                  aria-label={`Page ${number}`}
                  onClick={() => setPage(number)}
                >
                  {number}
                </Button>
              ))}
              <Button
                variant="outline"
                className="rounded-xl"
                disabled={currentPage === pages}
                onClick={() => setPage(currentPage + 1)}
              >
                Next <ChevronRight className="size-4" />
              </Button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
