import Image from "next/image";
import { PageLayout } from "@/components/layout/page-layout";

export default function PageLoader() {
  return (
    <PageLayout variant="catalog">
      <div
        className="mx-auto max-w-5xl py-10 sm:py-16"
        role="status"
        aria-live="polite"
        aria-label="Loading page"
      >
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="page-loader-mark grid size-20 place-items-center rounded-[1.7rem] border border-primary/20 bg-primary/10 shadow-[0_18px_45px_-25px_var(--primary)]">
            <Image
              src="/morrow-mark.svg"
              alt=""
              width={42}
              height={42}
              priority
            />
          </div>
          <p className="mt-5 font-serif text-2xl text-foreground">
            Finding your next view…
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            One moment while the page gets ready.
          </p>
          <span
            className="page-loader-track mt-6 h-1 w-32 overflow-hidden rounded-full bg-primary/15"
            aria-hidden="true"
          >
            <span className="page-loader-progress block h-full w-1/3 rounded-full bg-primary" />
          </span>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="glass-panel overflow-hidden rounded-2xl p-4"
            >
              <div className="h-36 rounded-xl bg-muted/70" />
              <div className="mt-5 h-4 w-3/4 rounded-full bg-muted/80" />
              <div className="mt-3 h-3 w-1/2 rounded-full bg-muted/60" />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
