"use client";

import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BlogPageSize({ size, category, query }: { size: number; category?: string; query?: string }) {
  const router = useRouter();

  function updateSize(value: string) {
    const params = new URLSearchParams();
    if (category && category !== "All") params.set("category", category);
    if (query) params.set("q", query);
    if (value !== "10") params.set("size", value);
    router.replace(`/blog${params.size ? `?${params}` : ""}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="blog-page-size" className="text-sm text-muted-foreground">Stories per page</label>
      <Select value={String(size)} onValueChange={updateSize}>
        <SelectTrigger id="blog-page-size" className="h-10 w-20 rounded-xl border-border bg-card/70"><SelectValue /></SelectTrigger>
        <SelectContent className="rounded-xl border-border bg-card/95 shadow-xl backdrop-blur-xl">
          {[10, 20, 30].map((count) => (
            <SelectItem key={count} value={String(count)} className="rounded-lg focus:bg-primary/10 focus:text-foreground">{count}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
