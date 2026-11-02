"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Check,
  Code2,
  Loader2,
  Package,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productService } from "@/services/productService";
import { demoApiService } from "@/services/demoApiService";

type Resource = "products" | "carts" | "users" | "auth";
type Action =
  | "list"
  | "single"
  | "category"
  | "user-carts"
  | "create"
  | "replace"
  | "update"
  | "delete"
  | "login";
const choices: Record<
  Resource,
  { action: Action; label: string; method: string }[]
> = {
  products: [
    { action: "list", label: "All products / sort & limit", method: "GET" },
    { action: "single", label: "One product", method: "GET" },
    {
      action: "category",
      label: "Categories / category products",
      method: "GET",
    },
    { action: "create", label: "Create sample product", method: "POST" },
    { action: "replace", label: "Replace sample product", method: "PUT" },
    { action: "update", label: "Update sample product", method: "PATCH" },
    { action: "delete", label: "Delete sample product", method: "DELETE" },
  ],
  carts: [
    { action: "list", label: "All carts / date, sort & limit", method: "GET" },
    { action: "single", label: "One cart", method: "GET" },
    { action: "user-carts", label: "Carts for a sample user", method: "GET" },
    { action: "create", label: "Create sample cart", method: "POST" },
    { action: "replace", label: "Replace sample cart", method: "PUT" },
    { action: "update", label: "Update sample cart", method: "PATCH" },
    { action: "delete", label: "Delete sample cart", method: "DELETE" },
  ],
  users: [
    { action: "list", label: "All sample users / sort & limit", method: "GET" },
    { action: "single", label: "One sample user", method: "GET" },
    { action: "create", label: "Create sample user", method: "POST" },
    { action: "replace", label: "Replace sample user", method: "PUT" },
    { action: "update", label: "Update sample user", method: "PATCH" },
    { action: "delete", label: "Delete sample user", method: "DELETE" },
  ],
  auth: [
    { action: "login", label: "Test sample login endpoint", method: "POST" },
  ],
};
const descriptions: Record<Resource, string> = {
  products: "Catalog records, categories, sorting and sample writes.",
  carts:
    "Public example carts, date filters and sample writes. These are not your Morrow bag.",
  users:
    "Public example profiles only. Password fields returned by the API are discarded.",
  auth: "Test the API's sample login endpoint. This does not sign you in to Morrow.",
};

function endpoint(
  resource: Resource,
  action: Action,
  id: number,
  category: string,
  userId: number,
) {
  if (resource === "auth") return "/auth/login";
  if (action === "category")
    return category.trim()
      ? `/products/category/${encodeURIComponent(category.trim())}`
      : "/products/categories";
  if (action === "user-carts") return `/carts/user/${userId}`;
  if (
    action === "single" ||
    action === "replace" ||
    action === "update" ||
    action === "delete"
  )
    return `/${resource}/${id}`;
  return `/${resource}`;
}

function preview(value: unknown): string {
  if (Array.isArray(value)) return JSON.stringify(value.slice(0, 12), null, 2);
  return JSON.stringify(value, null, 2) ?? "No response body";
}

function resultHighlights(value: unknown, resource: Resource) {
  if (resource === "auth" && value && typeof value === "object") {
    return (
      <p className="mb-4 rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm">
        {"authenticated" in value && value.authenticated
          ? "The sample credentials were accepted."
          : "The API did not return a usable sample token."}
      </p>
    );
  }

  const records = Array.isArray(value) ? value : [value];
  if (records.length === 0) {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        No records matched this request.
      </p>
    );
  }
  return (
    <div className="mb-4 grid gap-2 sm:grid-cols-2">
      {records.slice(0, 4).map((record, index) => {
        if (typeof record === "string")
          return (
            <div
              key={record}
              className="rounded-xl border border-border/60 bg-background/50 p-3 text-sm"
            >
              {record}
            </div>
          );
        if (!record || typeof record !== "object") return null;
        const item = record as Record<string, unknown>;
        const heading =
          typeof item.title === "string"
            ? item.title
            : typeof item.username === "string"
              ? item.username
              : resource === "carts"
                ? `Sample cart #${String(item.id ?? index + 1)}`
                : `Record #${String(item.id ?? index + 1)}`;
        const detail =
          typeof item.price === "number"
            ? `$${item.price.toFixed(2)} · ${String(item.category ?? "product")}`
            : Array.isArray(item.products)
              ? `${item.products.length} product lines · User #${String(item.userId ?? "—")}`
              : typeof item.email === "string"
                ? item.email
                : "Sample response";
        return (
          <div
            key={String(item.id ?? index)}
            className="min-w-0 rounded-xl border border-border/60 bg-background/50 p-3"
          >
            <p className="truncate text-sm font-medium">{heading}</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function ApiStudio() {
  const [resource, setResource] = useState<Resource>("products");
  const [action, setAction] = useState<Action>("list");
  const [id, setId] = useState("1");
  const [userId, setUserId] = useState("1");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("5");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("Morrow sample object");
  const [price, setPrice] = useState("19.99");
  const [email, setEmail] = useState("sample@example.com");
  const [username, setUsername] = useState("sample_demo");
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const requestIdRef = useRef(0);

  const current =
    choices[resource].find((item) => item.action === action) ??
    choices[resource][0];
  const numericId = Number(id);
  const numericUserId = Number(userId);
  const numericLimit = Number(limit);
  const isWrite = ["create", "replace", "update", "delete"].includes(action);

  async function run() {
    const requestId = ++requestIdRef.current;
    setError("");
    setResult(null);
    setLoading(true);
    try {
      if (
        resource !== "auth" &&
        !["list", "category", "create"].includes(action) &&
        (!Number.isInteger(numericId) || numericId < 1) &&
        action !== "user-carts"
      )
        throw new Error("Enter a positive record ID.");
      if (
        action === "user-carts" &&
        (!Number.isInteger(numericUserId) || numericUserId < 1)
      )
        throw new Error("Enter a positive user ID.");
      if (
        ["list", "user-carts"].includes(action) &&
        (!Number.isInteger(numericLimit) ||
          numericLimit < 1 ||
          numericLimit > 20)
      )
        throw new Error("Choose a limit between 1 and 20.");
      if (startDate && endDate && startDate > endDate)
        throw new Error("The start date must come before the end date.");
      const dates = {
        ...(startDate ? { startdate: startDate } : {}),
        ...(endDate ? { enddate: endDate } : {}),
      };
      let data: unknown;
      if (resource === "products") {
        const sample = {
          title: title.trim(),
          price: Number(price),
          description: "A temporary Morrow API Studio example.",
          category: category.trim() || "jewelery",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        };
        if (
          ["create", "replace", "update"].includes(action) &&
          (!sample.title || !Number.isFinite(sample.price) || sample.price < 0)
        )
          throw new Error("Enter a title and a valid price.");
        switch (action) {
          case "list":
            data = await productService.listFromApi({
              limit: numericLimit,
              sort,
            });
            break;
          case "single":
            data = await productService.getProduct(numericId);
            break;
          case "category":
            data = category.trim()
              ? await productService.getProductsByCategory(
                  category.trim(),
                  sort,
                )
              : await productService.getCategories();
            break;
          case "create":
            data = await productService.createDemoProduct(sample);
            break;
          case "replace":
            data = await productService.updateDemoProduct(
              numericId,
              sample,
              "put",
            );
            break;
          case "update":
            data = await productService.updateDemoProduct(
              numericId,
              { title: sample.title, price: sample.price },
              "patch",
            );
            break;
          case "delete":
            data = await productService.deleteDemoProduct(numericId);
            break;
        }
      } else if (resource === "carts") {
        const sample = {
          userId: numericUserId,
          date: new Date().toISOString().slice(0, 10),
          products: [{ productId: 1, quantity: 1 }],
        };
        if (
          ["create", "replace", "update"].includes(action) &&
          (!Number.isInteger(numericUserId) || numericUserId < 1)
        )
          throw new Error("Enter a positive user ID.");
        switch (action) {
          case "list":
            data = await demoApiService.carts({
              limit: numericLimit,
              sort,
              ...dates,
            });
            break;
          case "single":
            data = await demoApiService.cart(numericId);
            break;
          case "user-carts":
            data = await demoApiService.userCarts(numericUserId, {
              limit: numericLimit,
              sort,
              ...dates,
            });
            break;
          case "create":
            data = await demoApiService.createCart(sample);
            break;
          case "replace":
            data = await demoApiService.updateCart(numericId, sample, "put");
            break;
          case "update":
            data = await demoApiService.updateCart(
              numericId,
              { products: sample.products },
              "patch",
            );
            break;
          case "delete":
            data = await demoApiService.deleteCart(numericId);
            break;
        }
      } else if (resource === "users") {
        if (
          ["create", "replace", "update"].includes(action) &&
          (!email.includes("@") || !username.trim())
        )
          throw new Error("Enter a sample username and email address.");
        switch (action) {
          case "list":
            data = await demoApiService.users({ limit: numericLimit, sort });
            break;
          case "single":
            data = await demoApiService.user(numericId);
            break;
          case "create":
            data = await demoApiService.createUser({
              email,
              username,
              password: "morrow-public-demo-only",
              name: { firstname: "Sample", lastname: "User" },
            });
            break;
          case "replace":
            data = await demoApiService.updateUser(
              numericId,
              {
                email,
                username,
                password: "morrow-public-demo-only",
                name: { firstname: "Sample", lastname: "User" },
              },
              "put",
            );
            break;
          case "update":
            data = await demoApiService.updateUser(
              numericId,
              { email },
              "patch",
            );
            break;
          case "delete":
            data = await demoApiService.deleteUser(numericId);
            break;
        }
      } else {
        const password = passwordRef.current?.value ?? "";
        if (!username.trim() || !password)
          throw new Error(
            "Enter credentials for a public Fake Store API sample account.",
          );
        data = {
          authenticated: await demoApiService.sampleLogin(
            username.trim(),
            password,
          ),
          note: "The returned token was discarded. Your Morrow demo session is unchanged.",
        };
        if (passwordRef.current) passwordRef.current.value = "";
      }
      if (requestId === requestIdRef.current) setResult(data);
    } catch (cause) {
      if (passwordRef.current) passwordRef.current.value = "";
      if (requestId === requestIdRef.current)
        setError(
          cause instanceof Error
            ? cause.message
            : "The public API could not complete this request.",
        );
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }

  function changeResource(next: Resource) {
    requestIdRef.current += 1;
    setResource(next);
    setAction(choices[next][0].action);
    setLoading(false);
    setResult(null);
    setError("");
  }

  return (
    <section className="api-studio mx-auto max-w-6xl pb-14 pt-4 lg:pt-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[.15em] text-primary">
            <Code2 className="size-4" /> EXPLORE THE API
          </p>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
            The Morrow API Studio.
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Try every Fake Store API resource in a contained demo space. Product
            catalog requests also power the storefront; carts, users and login
            below are public sample data.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/30 px-5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
        >
          Shop the collection <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="glass-panel mb-6 flex items-start gap-3 rounded-2xl p-4 text-sm leading-6">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
        <p>
          <strong>Public demo data.</strong> POST, PUT, PATCH and DELETE return
          example responses; they do not permanently change Fake Store API
          records. Do not enter real personal credentials or details here. API
          login does not sign you in to Morrow.
        </p>
      </div>

      <Tabs
        value={resource}
        onValueChange={(value) => changeResource(value as Resource)}
      >
        <TabsList className="mb-5 grid h-auto w-full grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-card/60 p-2 sm:grid-cols-4">
          <TabsTrigger value="products" className="min-h-11 rounded-xl">
            <Box className="size-4" /> Products
          </TabsTrigger>
          <TabsTrigger value="carts" className="min-h-11 rounded-xl">
            <ShoppingBag className="size-4" /> Carts
          </TabsTrigger>
          <TabsTrigger value="users" className="min-h-11 rounded-xl">
            <Users className="size-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="auth" className="min-h-11 rounded-xl">
            <ShieldCheck className="size-4" /> Auth
          </TabsTrigger>
        </TabsList>
        {(["products", "carts", "users", "auth"] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
              <div className="glass-panel rounded-[1.75rem] p-5 sm:p-7">
                <div className="mb-6 flex items-start gap-3 border-b border-border/60 pb-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Package className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl">
                      {tab[0].toUpperCase() + tab.slice(1)}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {descriptions[tab]}
                    </p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="api-operation">Operation</Label>
                    <Select
                      value={action}
                      onValueChange={(value) => {
                        requestIdRef.current += 1;
                        setAction(value as Action);
                        setLoading(false);
                        setResult(null);
                        setError("");
                      }}
                    >
                      <SelectTrigger
                        id="api-operation"
                        className="w-full rounded-xl bg-background/55"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border bg-card/95 backdrop-blur-xl">
                        {choices[tab].map((choice) => (
                          <SelectItem key={choice.action} value={choice.action}>
                            {choice.method} · {choice.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {["single", "replace", "update", "delete"].includes(
                      action,
                    ) && (
                      <div className="space-y-2">
                        <Label htmlFor="api-id">Record ID</Label>
                        <Input
                          id="api-id"
                          type="number"
                          min="1"
                          value={id}
                          onChange={(event) => setId(event.target.value)}
                        />
                      </div>
                    )}
                    {["list", "user-carts"].includes(action) && (
                      <div className="space-y-2">
                        <Label htmlFor="api-limit">Limit (1–20)</Label>
                        <Input
                          id="api-limit"
                          type="number"
                          min="1"
                          max="20"
                          value={limit}
                          onChange={(event) => setLimit(event.target.value)}
                        />
                      </div>
                    )}
                    {(["list", "user-carts"].includes(action) ||
                      (tab === "products" &&
                        action === "category" &&
                        Boolean(category.trim()))) && (
                      <div className="space-y-2">
                        <Label htmlFor="api-sort">Sort by ID</Label>
                        <Select
                          value={sort}
                          onValueChange={(value) =>
                            setSort(value as "asc" | "desc")
                          }
                        >
                          <SelectTrigger
                            id="api-sort"
                            className="w-full rounded-xl bg-background/55"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asc">Ascending</SelectItem>
                            <SelectItem value="desc">Descending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {tab === "products" &&
                      ["category", "create", "replace", "update"].includes(
                        action,
                      ) && (
                        <div className="space-y-2">
                          <Label htmlFor="api-category">
                            Category{" "}
                            {action === "category" && (
                              <span className="font-normal text-muted-foreground">
                                (blank lists all)
                              </span>
                            )}
                          </Label>
                          <Input
                            id="api-category"
                            value={category}
                            onChange={(event) =>
                              setCategory(event.target.value)
                            }
                            placeholder="e.g. jewelery"
                          />
                        </div>
                      )}
                    {tab === "carts" &&
                      ["user-carts", "create", "replace", "update"].includes(
                        action,
                      ) && (
                        <div className="space-y-2">
                          <Label htmlFor="api-user-id">Sample user ID</Label>
                          <Input
                            id="api-user-id"
                            type="number"
                            min="1"
                            value={userId}
                            onChange={(event) => setUserId(event.target.value)}
                          />
                        </div>
                      )}
                    {tab === "carts" &&
                      ["list", "user-carts"].includes(action) && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="api-start">From date</Label>
                            <Input
                              id="api-start"
                              type="date"
                              value={startDate}
                              onChange={(event) =>
                                setStartDate(event.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="api-end">To date</Label>
                            <Input
                              id="api-end"
                              type="date"
                              value={endDate}
                              onChange={(event) =>
                                setEndDate(event.target.value)
                              }
                            />
                          </div>
                        </>
                      )}
                    {tab === "products" &&
                      ["create", "replace", "update"].includes(action) && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="api-title">Sample title</Label>
                            <Input
                              id="api-title"
                              value={title}
                              onChange={(event) => setTitle(event.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="api-price">Sample price</Label>
                            <Input
                              id="api-price"
                              type="number"
                              min="0"
                              step="0.01"
                              value={price}
                              onChange={(event) => setPrice(event.target.value)}
                            />
                          </div>
                        </>
                      )}
                    {tab === "users" &&
                      ["create", "replace", "update"].includes(action) && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="api-email">Sample email</Label>
                            <Input
                              id="api-email"
                              type="email"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="api-username">
                              Sample username
                            </Label>
                            <Input
                              id="api-username"
                              value={username}
                              onChange={(event) =>
                                setUsername(event.target.value)
                              }
                            />
                          </div>
                        </>
                      )}
                    {tab === "auth" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="api-auth-name">
                            Public sample username
                          </Label>
                          <Input
                            id="api-auth-name"
                            autoComplete="off"
                            value={username}
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="api-auth-password">
                            Public sample password
                          </Label>
                          <Input
                            id="api-auth-password"
                            ref={passwordRef}
                            type="password"
                            autoComplete="off"
                            placeholder="Cleared after request"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setUsername("mor_2314");
                            if (passwordRef.current)
                              passwordRef.current.value = "83r5^_";
                          }}
                          className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-2 text-left text-xs font-medium text-primary transition-colors hover:bg-primary/10 sm:col-span-2"
                        >
                          Fill public sample credentials
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5">
                    <code className="rounded-lg bg-background/65 px-3 py-2 text-xs text-primary">
                      {current.method}{" "}
                      {endpoint(
                        resource,
                        action,
                        numericId,
                        category,
                        numericUserId,
                      )}
                    </code>
                    <Button
                      onClick={run}
                      disabled={loading}
                      className="min-h-11 rounded-xl px-6"
                    >
                      {loading ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      ) : (
                        <ArrowRight className="mr-2 size-4" />
                      )}
                      Run request
                    </Button>
                  </div>
                </div>
              </div>
              <div className="glass-panel flex min-h-96 min-w-0 flex-col overflow-hidden rounded-[1.75rem]">
                <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 sm:px-7">
                  <div>
                    <h2 className="font-serif text-xl">Response preview</h2>
                    <p className="text-xs text-muted-foreground">
                      Live API response · first 12 records shown
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${error ? "bg-destructive/10 text-destructive" : result !== null ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                  >
                    {error ? "Error" : result !== null ? "Received" : "Ready"}
                  </span>
                </div>
                <div
                  className="flex flex-1 items-center justify-center p-5 sm:p-7"
                  aria-live="polite"
                >
                  {error ? (
                    <p
                      role="alert"
                      className="max-w-md text-center text-sm leading-6 text-destructive"
                    >
                      {error}
                    </p>
                  ) : result !== null ? (
                    <div className="w-full min-w-0">
                      <div className="mb-3 flex items-center gap-2 text-xs text-primary">
                        <Check className="size-4" /> Request completed
                        {isWrite ? " · changes are not saved by the API" : ""}
                      </div>
                      {resultHighlights(result, resource)}
                      <p className="mb-2 text-xs font-medium text-muted-foreground">
                        Response details
                      </p>
                      <pre className="max-h-[32rem] overflow-auto rounded-xl border border-border/60 bg-background/70 p-4 text-xs leading-6 text-foreground">
                        {preview(result)}
                      </pre>
                    </div>
                  ) : (
                    <p className="max-w-xs text-center text-sm leading-6 text-muted-foreground">
                      Choose an operation and run it to inspect the public
                      sample response.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
