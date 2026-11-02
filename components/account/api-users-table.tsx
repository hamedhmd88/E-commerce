"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  UsersRound,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { demoApiService, type SampleUser } from "@/services/demoApiService";

const sizes = [5, 10, 20] as const;
type Sort = "id-asc" | "id-desc" | "name-asc" | "name-desc";

const columns: {
  title: string;
  value: (entry: SampleUser) => string | number | undefined;
}[] = [
  { title: "ID", value: (entry) => entry.id },
  { title: "First name", value: (entry) => entry.name?.firstname },
  { title: "Last name", value: (entry) => entry.name?.lastname },
  { title: "Username", value: (entry) => entry.username },
  { title: "Email", value: (entry) => entry.email },
  { title: "Phone", value: (entry) => entry.phone },
  { title: "City", value: (entry) => entry.address?.city },
  { title: "Street", value: (entry) => entry.address?.street },
  { title: "Number", value: (entry) => entry.address?.number },
  { title: "ZIP", value: (entry) => entry.address?.zipcode },
  { title: "Latitude", value: (entry) => entry.address?.geolocation?.lat },
  { title: "Longitude", value: (entry) => entry.address?.geolocation?.long },
];

export function ApiUsersTable() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [sort, setSort] = useState<Sort>("id-asc");
  const [pageSize, setPageSize] = useState<(typeof sizes)[number]>(10);
  const [page, setPage] = useState(1);
  const query = useQuery({
    queryKey: ["sample-api-users-table"],
    queryFn: () => demoApiService.users(),
    enabled: !authLoading && Boolean(user),
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (!authLoading && !user)
      router.replace("/login?redirect=%2Faccount%2Fusers");
  }, [authLoading, user, router]);

  const cities = useMemo(
    () =>
      [
        ...new Set(
          (query.data ?? [])
            .map((entry) => entry.address?.city)
            .filter((value): value is string => Boolean(value)),
        ),
      ].sort(),
    [query.data],
  );
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (query.data ?? [])
      .filter((entry) => {
        const fields = columns.map((column) => column.value(entry));
        return (
          (city === "all" || entry.address?.city === city) &&
          (!term ||
            fields.some((value) =>
              String(value ?? "")
                .toLowerCase()
                .includes(term),
            ))
        );
      })
      .sort((a, b) => {
        if (sort === "id-desc") return b.id - a.id;
        if (sort === "name-asc" || sort === "name-desc") {
          const result =
            `${a.name?.firstname ?? ""} ${a.name?.lastname ?? ""}`.localeCompare(
              `${b.name?.firstname ?? ""} ${b.name?.lastname ?? ""}`,
            );
          return sort === "name-asc"
            ? result || a.id - b.id
            : -result || b.id - a.id;
        }
        return a.id - b.id;
      });
  }, [query.data, search, city, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const first = filtered.length ? (currentPage - 1) * pageSize + 1 : 0;
  const last = Math.min(currentPage * pageSize, filtered.length);
  const change = (callback: () => void) => {
    callback();
    setPage(1);
  };

  if (authLoading || !user)
    return (
      <div className="mx-auto max-w-7xl pb-16 pt-5">
        <div
          className="glass-panel h-72 animate-pulse rounded-[2rem] motion-reduce:animate-none"
          aria-label="Checking session"
        />
      </div>
    );

  return (
    <section className="mx-auto max-w-7xl pb-16 pt-5 lg:pt-8">
      <div className="api-workbench-hero glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs font-semibold tracking-[.12em] text-primary">
            PUBLIC USERS / FAKE STORE API
          </p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            People behind the sample store.
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            Explore public sample records, filter by person or city, and control
            how many rows you see. Passwords are never shown.
          </p>
          <Link
            href="/account/users/manage"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/35 bg-background/55 px-5 text-sm text-primary transition-colors hover:bg-primary/10"
          >
            Try user API methods <ArrowRight className="size-4" />
          </Link>
        </div>
        <UsersRound
          aria-hidden="true"
          className="absolute -bottom-10 right-4 size-56 rotate-[-10deg] text-primary/10 sm:right-16"
          strokeWidth={0.7}
        />
      </div>
      <div className="glass-panel mt-7 rounded-[1.75rem] p-5 sm:p-7">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[200px] flex-[2] space-y-1.5">
            <Label htmlFor="users-search">Find a user</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input
                id="users-search"
                className="h-11 rounded-xl bg-background/55 pl-9"
                value={search}
                onChange={(event) =>
                  change(() => setSearch(event.target.value))
                }
                placeholder="Name, email, username or address"
              />
            </div>
          </div>
          <div className="min-w-36 flex-1 space-y-1.5">
            <Label htmlFor="users-city">City</Label>
            <Select
              value={city}
              onValueChange={(value) => change(() => setCity(value))}
            >
              <SelectTrigger
                id="users-city"
                className="h-11 w-full rounded-xl bg-background/55"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-card/95 backdrop-blur-xl">
                <SelectItem value="all">All cities</SelectItem>
                {cities.map((entry) => (
                  <SelectItem key={entry} value={entry}>
                    {entry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-36 flex-1 space-y-1.5">
            <Label htmlFor="users-sort">Sort</Label>
            <Select
              value={sort}
              onValueChange={(value) => change(() => setSort(value as Sort))}
            >
              <SelectTrigger
                id="users-sort"
                className="h-11 w-full rounded-xl bg-background/55"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-card/95 backdrop-blur-xl">
                <SelectItem value="id-asc">ID: low to high</SelectItem>
                <SelectItem value="id-desc">ID: high to low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            className="h-11 rounded-xl bg-background/55"
            onClick={() => {
              setSearch("");
              setCity("all");
              setSort("id-asc");
              setPage(1);
            }}
          >
            Clear filters
          </Button>
        </div>
        <div className="mb-4 mt-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl">User directory</h2>
            <p
              className="mt-1 text-sm text-muted-foreground"
              aria-live="polite"
            >
              Showing {first}–{last} of {filtered.length} users
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Label
              htmlFor="users-page-size"
              className="text-sm text-muted-foreground"
            >
              Per page
            </Label>
            <Select
              value={String(pageSize)}
              onValueChange={(value) =>
                change(() => setPageSize(Number(value) as typeof pageSize))
              }
            >
              <SelectTrigger
                id="users-page-size"
                className="h-10 w-20 rounded-xl bg-background/55"
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
        {query.isPending ? (
          <div
            className="h-80 animate-pulse rounded-xl bg-muted/40 motion-reduce:animate-none"
            aria-label="Loading users"
          />
        ) : query.isError ? (
          <div
            role="alert"
            className="rounded-xl border border-border/70 bg-background/50 p-7"
          >
            <h3 className="font-serif text-xl">Users are unavailable.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The public API could not be reached.
            </p>
            <Button className="mt-4 rounded-xl" onClick={() => query.refetch()}>
              <RefreshCw className="size-4" /> Try again
            </Button>
          </div>
        ) : visible.length === 0 ? (
          <p className="rounded-xl border border-border/70 bg-background/50 p-8 text-center text-muted-foreground">
            No users match these filters.
          </p>
        ) : (
          <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-background/45">
            <Table className="min-w-[1200px]">
              <TableHeader className="bg-primary/5">
                <TableRow className="hover:bg-transparent">
                  {columns.map((column) => (
                    <TableHead scope="col" key={column.title}>
                      {column.title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-primary/5">
                    {columns.map((column) => (
                      <TableCell
                        key={column.title}
                        className={
                          column.title === "ID"
                            ? "font-semibold tabular-nums text-primary"
                            : undefined
                        }
                      >
                        {column.value(entry) ?? "—"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {pages > 1 && (
          <nav
            aria-label="User pages"
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            <Button
              variant="outline"
              className="rounded-xl"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              <ChevronLeft className="size-4" /> Previous
            </Button>
            {Array.from({ length: pages }, (_, index) => index + 1).map(
              (number) => (
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
              ),
            )}
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
    </section>
  );
}
