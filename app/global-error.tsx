"use client";

import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background px-5 font-sans text-foreground">
        <main className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
          <h1 className="font-serif text-3xl">The storefront could not load</h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            A page-level issue interrupted the experience. Try loading the site
            again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 min-h-11 rounded-full bg-primary px-6 font-medium text-primary-foreground hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
