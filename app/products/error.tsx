"use client";

import { Button } from "@/components/ui/button";

export default function CatalogError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">
        The catalog is temporarily unavailable
      </h1>
      <p className="mt-3 text-muted-foreground">
        We could not load products from Fake Store API. Please try again.
      </p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
