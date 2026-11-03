"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  MapPin,
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
import { StatusPanel } from "@/components/feedback/status-panel";

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
  const [pageSize, setPageSize] = useState<(typeof sizes)[number]>(5);
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
        </div>
        <UsersRound
          aria-hidden="true"
          className="absolute -bottom-10 right-4 size-56 rotate-[-10deg] text-primary/10 sm:right-16"
          strokeWidth={0.7}
        />
      </div>
      <div className="glass-panel mt-7 rounded-[1.75rem] p-5 sm:p-7">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <SlidersHorizontal className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold">Refine the directory</h2>
            <p className="text-xs text-muted-foreground">
              Search people, choose a city, or change the order.
            </p>
          </div>
        </div>
        <div className="grid gap-3 rounded-[1.25rem] border border-border/70 bg-background/40 p-3 sm:p-4 lg:grid-cols-[minmax(240px,2fr)_minmax(160px,1fr)_minmax(160px,1fr)_auto] lg:items-end">
          <div className="space-y-1.5">
            <Label
              htmlFor="users-search"
              className="text-xs font-semibold text-muted-foreground"
            >
              Search people
            </Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input
                id="users-search"
                className="h-11 rounded-xl border-border/60 bg-card/75 pl-9"
                value={search}
                onChange={(event) =>
                  change(() => setSearch(event.target.value))
                }
                placeholder="Name, email, username or address"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="users-city"
              className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"
            >
              <MapPin className="size-3.5" /> City
            </Label>
            <Select
              value={city}
              onValueChange={(value) => change(() => setCity(value))}
            >
              <SelectTrigger
                id="users-city"
                className="h-11 w-full rounded-xl border-border/60 bg-card/75"
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
          <div className="space-y-1.5">
            <Label
              htmlFor="users-sort"
              className="text-xs font-semibold text-muted-foreground"
            >
              Sort by
            </Label>
            <Select
              value={sort}
              onValueChange={(value) => change(() => setSort(value as Sort))}
            >
              <SelectTrigger
                id="users-sort"
                className="h-11 w-full rounded-xl border-border/60 bg-card/75"
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
            className="h-11 rounded-xl border-border/60 bg-card/75 px-5"
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
          <StatusPanel
            headingLevel={3}
            title="Users are unavailable"
            description="The public API could not be reached."
            onRetry={() => {
              void query.refetch();
            }}
            retrying={query.isFetching}
          />
        ) : visible.length === 0 ? (
          <StatusPanel
            kind="empty"
            headingLevel={3}
            title="No matching users"
            description="Change your search or city filter to see more public sample users."
            actionLabel="Clear filters"
            onAction={() => {
              setSearch("");
              setCity("all");
              setSort("id-asc");
              setPage(1);
            }}
          />
        ) : (
          <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-background/55 shadow-sm">
            <Table className="min-w-[1600px] border-separate border-spacing-0">
              <TableHeader className="bg-primary/8">
                <TableRow className="hover:bg-transparent">
                  {columns.map((column) => (
                    <TableHead
                      scope="col"
                      key={column.title}
                      className="h-14 border-b border-border/70 px-5 text-xs font-semibold tracking-wide text-muted-foreground first:pl-6"
                    >
                      {column.title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="h-16 even:bg-muted/25 hover:bg-primary/8"
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.title}
                        className={
                          column.title === "ID"
                            ? "px-5 pl-6 font-semibold tabular-nums text-primary"
                            : column.title === "Email"
                              ? "px-5 text-foreground"
                              : "px-5 text-muted-foreground"
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
