"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Box,
  Check,
  CircleAlert,
  Loader2,
  PackagePlus,
  Pencil,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { StatusPanel } from "@/components/feedback/status-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productService, type Product } from "@/services/productService";
import {
  demoApiService,
  type SampleCart,
  type SampleUser,
} from "@/services/demoApiService";

type Resource = "products" | "carts" | "users";
type RecordItem = Product | SampleCart | SampleUser;
type WriteAction = "post" | "put" | "patch" | "delete";
type Line = { productId: string; quantity: string };

const content = {
  products: {
    eyebrow: "THE COLLECTION / PRODUCT API",
    title: "Shape a sample product.",
    description:
      "Browse the live catalog, inspect one item, then try create, replace, edit or delete requests.",
    icon: Box,
  },
  carts: {
    eyebrow: "PUBLIC DATA / CART API",
    title: "Explore sample carts.",
    description:
      "See public cart records, filter by date or user, and try every cart write method.",
    icon: ShoppingBag,
  },
  users: {
    eyebrow: "YOUR SPACE / USERS API",
    title: "Explore sample profiles.",
    description:
      "Browse public sample users and try profile create, replace, edit and delete requests.",
    icon: Users,
  },
} as const;

const links = [
  { href: "/products", label: "Collection" },
  { href: "/products/manage", label: "Product tools" },
  { href: "/carts/explore", label: "Explore carts" },
  { href: "/carts", label: "API carts" },
  { href: "/account/users", label: "Users table" },
  { href: "/account/users/manage", label: "User API tools" },
];

function isProduct(item: RecordItem): item is Product {
  return "title" in item;
}
function isCart(item: RecordItem): item is SampleCart {
  return "products" in item;
}
function isUser(item: RecordItem): item is SampleUser {
  return "username" in item;
}
function errorMessage(cause: unknown) {
  if (cause instanceof Error && cause.message === "Network Error")
    return "The public API is unreachable. Check your connection and try again.";
  if (cause instanceof Error) return cause.message;
  return "The public API could not complete this request.";
}

export function ResourceWorkbench({ resource }: { resource: Resource }) {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [limit, setLimit] = useState("8");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selected, setSelected] = useState<RecordItem | null>(null);
  const [selectionBusy, setSelectionBusy] = useState(false);
  const selectionRequest = useRef(0);
  const [action, setAction] = useState<WriteAction>("post");
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [writeResponse, setWriteResponse] = useState<unknown>(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("jewelery");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  );
  const [cartUserId, setCartUserId] = useState("1");
  const [cartDate, setCartDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [lines, setLines] = useState<Line[]>([
    { productId: "1", quantity: "1" },
  ]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const numberLimit = Number(limit);
  const validLimit =
    Number.isInteger(numberLimit) && numberLimit >= 1 && numberLimit <= 20;
  const filterUserId = Number(filterUser);
  const query = useQuery({
    queryKey: [
      "resource-workbench",
      resource,
      validLimit ? numberLimit : 8,
      sort,
      from,
      to,
      filterUser,
    ],
    enabled: resource !== "users" || (!authLoading && Boolean(user)),
    queryFn: async (): Promise<RecordItem[]> => {
      const options = { limit: validLimit ? numberLimit : 8, sort };
      if (resource === "products") return productService.listFromApi(options);
      if (resource === "users") return demoApiService.users(options);
      if (from && to && from > to)
        throw new Error("The start date must come before the end date.");
      const dates = {
        ...(from ? { startdate: from } : {}),
        ...(to ? { enddate: to } : {}),
      };
      if (filterUser) {
        if (!Number.isInteger(filterUserId) || filterUserId < 1)
          throw new Error("Enter a positive sample user ID.");
        return demoApiService.userCarts(filterUserId, { ...options, ...dates });
      }
      return demoApiService.carts({ ...options, ...dates });
    },
  });

  const meta = content[resource];
  const Icon = meta.icon;
  const records = query.data ?? [];

  useEffect(() => {
    if (resource === "users" && !authLoading && !user)
      router.replace("/login?redirect=%2Faccount%2Fusers");
  }, [resource, authLoading, user, router]);

  function populate(item: RecordItem) {
    if (isProduct(item)) {
      setTitle(item.title);
      setPrice(String(item.price));
      setCategory(item.category);
      setDescription(item.description);
      setImage(item.image);
    } else if (isCart(item)) {
      setCartUserId(String(item.userId));
      setCartDate(item.date.slice(0, 10));
      setLines(
        item.products.map((line) => ({
          productId: String(line.productId),
          quantity: String(line.quantity),
        })),
      );
    } else if (isUser(item)) {
      setUsername(item.username);
      setEmail(item.email);
      setFirstName(item.name?.firstname ?? "");
      setLastName(item.name?.lastname ?? "");
      setPhone(item.phone ?? "");
      setCity(item.address?.city ?? "");
      setStreet(item.address?.street ?? "");
    }
  }

  async function selectRecord(id: number) {
    const request = ++selectionRequest.current;
    setSelectedId(id);
    setSelected(null);
    setSelectionBusy(true);
    setError("");
    setFeedback("");
    setConfirmDelete(false);
    setAction("patch");
    try {
      const item =
        resource === "products"
          ? await productService.getProduct(id)
          : resource === "carts"
            ? await demoApiService.cart(id)
            : await demoApiService.user(id);
      if (!item) throw new Error("This record is no longer available.");
      if (request === selectionRequest.current) {
        setSelected(item);
        populate(item);
      }
    } catch (cause) {
      if (request === selectionRequest.current) {
        setSelectedId(null);
        setSelected(null);
        setError(errorMessage(cause));
      }
    } finally {
      if (request === selectionRequest.current) setSelectionBusy(false);
    }
  }

  function chooseAction(next: WriteAction) {
    setAction(next);
    setConfirmDelete(false);
    setFeedback("");
    setWriteResponse(null);
    setError("");
  }

  async function submit(writeAction: WriteAction) {
    setBusy(true);
    setError("");
    setFeedback("");
    setWriteResponse(null);
    try {
      let response: unknown;
      if (writeAction !== "post" && !selectedId)
        throw new Error("Choose a record from the list first.");
      if (resource === "products") {
        const numericPrice = Number(price);
        if (
          writeAction !== "delete" &&
          (!title.trim() ||
            !Number.isFinite(numericPrice) ||
            numericPrice < 0 ||
            !category.trim() ||
            !description.trim() ||
            !/^https?:\/\//.test(image))
        )
          throw new Error(
            "Complete the title, price, category, description and image URL.",
          );
        const payload = {
          title: title.trim(),
          price: numericPrice,
          category: category.trim(),
          description: description.trim(),
          image: image.trim(),
        };
        if (writeAction === "post")
          response = await productService.createDemoProduct(payload);
        else if (writeAction === "delete")
          response = await productService.deleteDemoProduct(selectedId!);
        else
          response = await productService.updateDemoProduct(
            selectedId!,
            writeAction === "patch"
              ? { title: payload.title, price: payload.price }
              : payload,
            writeAction,
          );
      } else if (resource === "carts") {
        const numericUserId = Number(cartUserId);
        const products = lines.map((line) => ({
          productId: Number(line.productId),
          quantity: Number(line.quantity),
        }));
        if (
          writeAction !== "delete" &&
          (!Number.isInteger(numericUserId) ||
            numericUserId < 1 ||
            !cartDate ||
            !products.length ||
            products.some(
              (line) =>
                !Number.isInteger(line.productId) ||
                line.productId < 1 ||
                !Number.isInteger(line.quantity) ||
                line.quantity < 1,
            ))
        )
          throw new Error(
            "Enter a valid user, date and at least one product line.",
          );
        const payload = { userId: numericUserId, date: cartDate, products };
        if (writeAction === "post")
          response = await demoApiService.createCart(payload);
        else if (writeAction === "delete")
          response = await demoApiService.deleteCart(selectedId!);
        else
          response = await demoApiService.updateCart(
            selectedId!,
            writeAction === "patch" ? { products: payload.products } : payload,
            writeAction,
          );
      } else {
        if (
          writeAction !== "delete" &&
          (!username.trim() ||
            !/^\S+@\S+\.\S+$/.test(email) ||
            !firstName.trim() ||
            !lastName.trim())
        )
          throw new Error("Complete the sample username, email and name.");
        const payload = {
          username: username.trim(),
          email: email.trim(),
          name: { firstname: firstName.trim(), lastname: lastName.trim() },
          phone: phone.trim(),
          address: { city: city.trim(), street: street.trim() },
        };
        if (writeAction === "post")
          response = await demoApiService.createUser({
            ...payload,
            password: "morrow-public-demo-only",
          });
        else if (writeAction === "delete")
          response = await demoApiService.deleteUser(selectedId!);
        else
          response = await demoApiService.updateUser(
            selectedId!,
            writeAction === "patch"
              ? { email: payload.email, username: payload.username }
              : { ...payload, password: "morrow-public-demo-only" },
            writeAction,
          );
      }
      setWriteResponse(response);
      setFeedback(
        `${writeAction.toUpperCase()} returned a sample response. The public API did not save this change.`,
      );
      setConfirmDelete(false);
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="api-workbench mx-auto max-w-7xl pb-12 pt-4 lg:pt-8">
      <div className="api-workbench-hero glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
        <div className="relative z-10 max-w-3xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[.12em] text-primary">
            <Sparkles className="size-4" /> {meta.eyebrow}
          </p>
          <h1 className="font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            {meta.description}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Public sample data · Write requests return a response but do not
            persist on Fake Store API.
          </p>
        </div>
        <Icon
          aria-hidden="true"
          className="absolute -bottom-10 right-2 size-52 rotate-[-15deg] text-primary/10 sm:right-12 sm:size-64"
          strokeWidth={0.7}
        />
      </div>

      <nav
        aria-label="API resource pages"
        className="mt-5 flex flex-wrap gap-2"
      >
        {links.map((link) => {
          const active =
            (resource === "products" && link.href === "/products/manage") ||
            (resource === "carts" && link.href === "/carts") ||
            (resource === "users" && link.href === "/account/users/manage");
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 bg-card/55 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {resource === "users" && (authLoading || !user) ? (
        <div className="glass-panel mt-6 rounded-2xl p-8 text-center text-muted-foreground">
          Checking your demo session…
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(350px,.95fr)]">
          <div className="space-y-5">
            <div className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl">Live records</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose one to inspect and edit a sample request.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => query.refetch()}
                  disabled={query.isFetching}
                  className="rounded-full bg-background/50"
                >
                  <RefreshCw
                    className={`size-4 ${query.isFetching ? "animate-spin" : ""}`}
                  />{" "}
                  Refresh
                </Button>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="resource-limit">Show up to</Label>
                  <Input
                    id="resource-limit"
                    type="number"
                    min="1"
                    max="20"
                    value={limit}
                    onChange={(event) => setLimit(event.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="resource-sort">Order by ID</Label>
                  <Select
                    value={sort}
                    onValueChange={(value) => setSort(value as "asc" | "desc")}
                  >
                    <SelectTrigger
                      id="resource-sort"
                      className="w-full rounded-xl bg-background/60"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Oldest first</SelectItem>
                      <SelectItem value="desc">Newest first</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {resource === "carts" && (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="resource-user">Sample user ID</Label>
                      <Input
                        id="resource-user"
                        type="number"
                        min="1"
                        value={filterUser}
                        onChange={(event) => setFilterUser(event.target.value)}
                        placeholder="All users"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="resource-from">From date</Label>
                      <DatePicker
                        id="resource-from"
                        value={from}
                        onChange={setFrom}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="resource-to">To date</Label>
                      <DatePicker
                        id="resource-to"
                        value={to}
                        onChange={setTo}
                      />
                    </div>
                  </>
                )}
              </div>
              {!validLimit && (
                <p role="alert" className="mt-3 text-xs text-destructive">
                  Choose a number from 1 to 20.
                </p>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {query.isPending ? (
                Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="glass-panel h-36 animate-pulse rounded-2xl motion-reduce:animate-none"
                  />
                ))
              ) : query.isError ? (
                <StatusPanel
                  className="col-span-full"
                  title="Sample records are unavailable"
                  description={errorMessage(query.error)}
                  onRetry={() => {
                    void query.refetch();
                  }}
                  retrying={query.isFetching}
                />
              ) : records.length === 0 ? (
                <StatusPanel
                  className="col-span-full"
                  kind="empty"
                  title="No matching records"
                  description="Change or clear the filters to see more public sample records."
                  actionLabel="Clear filters"
                  onAction={() => {
                    setLimit("8");
                    setSort("asc");
                    setFilterUser("");
                    setFrom("");
                    setTo("");
                  }}
                />
              ) : (
                records.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => selectRecord(item.id)}
                    disabled={busy}
                    aria-pressed={selectedId === item.id}
                    className={`api-workbench-card glass-panel flex min-h-32 w-full items-center gap-4 rounded-2xl p-4 text-left transition-[transform,border-color] hover:-translate-y-1 hover:border-primary/55 motion-reduce:transform-none ${selectedId === item.id ? "border-primary/70" : ""}`}
                  >
                    {isProduct(item) ? (
                      <span className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-white p-2">
                        <Image
                          src={item.image}
                          alt=""
                          width={72}
                          height={72}
                          className="max-h-full w-auto object-contain"
                          unoptimized
                        />
                      </span>
                    ) : (
                      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-serif text-xl text-primary">
                        {isCart(item) ? (
                          <ShoppingBag className="size-6" />
                        ) : (
                          item.name?.firstname?.[0] || "U"
                        )}
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-primary">
                        #{item.id}
                      </span>
                      <strong className="mt-1 block line-clamp-2 text-sm">
                        {isProduct(item)
                          ? item.title
                          : isCart(item)
                            ? `Cart for user #${item.userId}`
                            : item.username}
                      </strong>
                      <span className="mt-1 block truncate text-xs text-muted-foreground">
                        {isProduct(item)
                          ? `$${item.price.toFixed(2)} · ${item.category}`
                          : isCart(item)
                            ? `${item.products.length} product lines · ${item.date.slice(0, 10)}`
                            : item.email}
                      </span>
                    </span>
                    <ArrowRight className="ml-auto size-4 shrink-0 text-primary/70" />
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="glass-panel h-fit rounded-[1.75rem] p-5 sm:p-7 lg:sticky lg:top-24">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {action === "post" ? (
                  <PackagePlus className="size-5" />
                ) : action === "delete" ? (
                  <Trash2 className="size-5" />
                ) : (
                  <Pencil className="size-5" />
                )}
              </span>
              <div>
                <h2 className="font-serif text-2xl">Request editor</h2>
                <p className="text-sm text-muted-foreground">
                  {selected
                    ? `Selected record #${selectedId}`
                    : "Create a new sample or select a record."}
                </p>
              </div>
            </div>
            <div
              className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4"
              role="group"
              aria-label="Request method"
            >
              {(["post", "put", "patch", "delete"] as const).map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => chooseAction(method)}
                  aria-pressed={action === method}
                  className={`min-h-11 rounded-xl border px-2 text-xs font-bold transition-colors ${action === method ? "border-primary bg-primary text-primary-foreground" : "border-border/70 bg-background/45 hover:border-primary/60"}`}
                >
                  {method.toUpperCase()}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              {action === "post"
                ? "Create a sample record."
                : action === "put"
                  ? "Replace the selected sample record."
                  : action === "patch"
                    ? "Update selected fields."
                    : "Request removal of the selected sample record."}
            </p>

            {action !== "delete" && (
              <div className="api-workbench-fields mt-6 grid gap-4 sm:grid-cols-2">
                {resource === "products" && (
                  <>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="wb-title">Product title</Label>
                      <Input
                        id="wb-title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="A useful object"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-price">Price</Label>
                      <Input
                        id="wb-price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-category">Category</Label>
                      <Input
                        id="wb-category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="wb-description">Description</Label>
                      <Textarea
                        id="wb-description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="wb-image">Image URL</Label>
                      <Input
                        id="wb-image"
                        type="url"
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                      />
                    </div>
                  </>
                )}
                {resource === "carts" && (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-user-id">Sample user ID</Label>
                      <Input
                        id="wb-user-id"
                        type="number"
                        min="1"
                        value={cartUserId}
                        onChange={(event) => setCartUserId(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-date">Cart date</Label>
                      <DatePicker
                        id="wb-date"
                        value={cartDate}
                        onChange={setCartDate}
                      />
                    </div>
                    <div className="space-y-3 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <Label>Product lines</Label>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="rounded-lg"
                          onClick={() =>
                            setLines([
                              ...lines,
                              { productId: "1", quantity: "1" },
                            ])
                          }
                        >
                          Add line
                        </Button>
                      </div>
                      {lines.map((line, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[1fr_1fr_auto] gap-2"
                        >
                          <Input
                            aria-label={`Product ID for line ${index + 1}`}
                            type="number"
                            min="1"
                            value={line.productId}
                            onChange={(event) =>
                              setLines(
                                lines.map((entry, position) =>
                                  position === index
                                    ? {
                                        ...entry,
                                        productId: event.target.value,
                                      }
                                    : entry,
                                ),
                              )
                            }
                          />
                          <Input
                            aria-label={`Quantity for line ${index + 1}`}
                            type="number"
                            min="1"
                            value={line.quantity}
                            onChange={(event) =>
                              setLines(
                                lines.map((entry, position) =>
                                  position === index
                                    ? { ...entry, quantity: event.target.value }
                                    : entry,
                                ),
                              )
                            }
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            aria-label={`Remove line ${index + 1}`}
                            disabled={lines.length === 1}
                            onClick={() =>
                              setLines(
                                lines.filter(
                                  (_, position) => position !== index,
                                ),
                              )
                            }
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground">
                        Product ID · Quantity
                      </p>
                    </div>
                  </>
                )}
                {resource === "users" && (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-username">Username</Label>
                      <Input
                        id="wb-username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-email">Email</Label>
                      <Input
                        id="wb-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-first">First name</Label>
                      <Input
                        id="wb-first"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-last">Last name</Label>
                      <Input
                        id="wb-last"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-phone">Phone (sample)</Label>
                      <Input
                        id="wb-phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="wb-city">City</Label>
                      <Input
                        id="wb-city"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="wb-street">Street</Label>
                      <Input
                        id="wb-street"
                        value={street}
                        onChange={(event) => setStreet(event.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground sm:col-span-2">
                      Use fictional details only. A fixed public demo password
                      is sent for POST/PUT and is never saved here.
                    </p>
                  </>
                )}
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="mt-5 flex items-start gap-2 rounded-xl border border-destructive/35 bg-destructive/10 p-3 text-sm text-destructive"
              >
                <CircleAlert className="mt-0.5 size-4 shrink-0" />
                {error}
              </p>
            )}
            {feedback && (
              <p
                role="status"
                className="api-workbench-feedback mt-5 flex items-start gap-2 rounded-xl border border-primary/35 bg-primary/10 p-3 text-sm text-foreground"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {feedback}
              </p>
            )}
            {writeResponse !== null && (
              <details className="mt-4 rounded-xl border border-border/60 bg-background/45 p-3">
                <summary className="text-sm font-medium">
                  View API response
                </summary>
                <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-background/70 p-3 text-xs leading-5">
                  {JSON.stringify(writeResponse, null, 2)}
                </pre>
              </details>
            )}
            {selectionBusy && (
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Loading record…
              </p>
            )}
            {action === "delete" && confirmDelete ? (
              <div className="mt-6 rounded-xl border border-destructive/35 bg-destructive/10 p-4">
                <p className="text-sm font-medium">
                  Send DELETE for sample record #{selectedId}?
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  The API will return a sample response; its stored data will
                  remain.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={busy}
                    onClick={() => submit("delete")}
                  >
                    {busy && <Loader2 className="size-4 animate-spin" />}{" "}
                    Confirm request
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                type="button"
                disabled={
                  busy || selectionBusy || (action !== "post" && !selected)
                }
                onClick={() =>
                  action === "delete" ? setConfirmDelete(true) : submit(action)
                }
                className="mt-6 min-h-12 w-full rounded-xl"
              >
                {busy ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : action === "delete" ? (
                  <Trash2 className="size-4" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
                {action === "delete"
                  ? "Review DELETE request"
                  : `Send ${action.toUpperCase()} request`}
              </Button>
            )}
          </div>
        </div>
      )}
      <p className="mt-8 text-center text-xs text-muted-foreground">
        These public API samples are separate from your Morrow cart, account
        profile and demo orders.
      </p>
    </section>
  );
}
