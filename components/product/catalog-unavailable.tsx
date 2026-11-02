import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CatalogRequestError } from "@/services/catalog-error";

export function CatalogUnavailable({
  error,
  retryHref,
}: {
  error: CatalogRequestError;
  retryHref: string;
}) {
  return (
    <section
      className="mx-auto max-w-2xl py-16 text-center"
      aria-labelledby="catalog-unavailable"
    >
      <h1 id="catalog-unavailable" className="font-serif text-3xl sm:text-4xl">
        The product catalog is temporarily unavailable
      </h1>
      <p className="mt-5 text-muted-foreground">
        {error.challenged
          ? "Fake Store API is asking this request to complete a browser security check. The product data could not be loaded right now."
          : error.status === 403
            ? "Fake Store API denied this server request. Please try again later."
            : "We could not load products from Fake Store API. Please try again later."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <a href={retryHref}>Try again</a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </section>
  );
}
