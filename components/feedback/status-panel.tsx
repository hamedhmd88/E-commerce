"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, RotateCcw, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type StatusPanelProps = {
  title: string;
  description: string;
  kind?: "error" | "empty";
  headingLevel?: 1 | 2 | 3;
  onRetry?: () => void;
  retryHref?: string;
  retrying?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  homeLink?: boolean;
  className?: string;
};

export function StatusPanel({
  title,
  description,
  kind = "error",
  headingLevel = 2,
  onRetry,
  retryHref,
  retrying = false,
  actionLabel,
  onAction,
  actionHref,
  homeLink = false,
  className = "",
}: StatusPanelProps) {
  const Icon = kind === "error" ? AlertTriangle : SearchX;
  const headingClass = "font-serif text-2xl text-foreground sm:text-3xl";
  return (
    <section
      role={kind === "error" ? "alert" : "status"}
      className={`glass-panel mx-auto flex w-full max-w-2xl flex-col items-center rounded-[1.75rem] px-6 py-12 text-center sm:px-10 ${className}`}
    >
      <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      {headingLevel === 1 ? (
        <h1 className={headingClass}>{title}</h1>
      ) : headingLevel === 3 ? (
        <h3 className={headingClass}>{title}</h3>
      ) : (
        <h2 className={headingClass}>{title}</h2>
      )}
      <p className="mt-3 max-w-lg leading-7 text-muted-foreground">
        {description}
      </p>
      {(onRetry || retryHref || onAction || actionHref || homeLink) && (
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {onRetry && (
            <Button
              type="button"
              onClick={onRetry}
              disabled={retrying}
              className="rounded-full px-5"
            >
              <RotateCcw
                className={`size-4 ${retrying ? "animate-spin motion-reduce:animate-none" : ""}`}
                aria-hidden="true"
              />
              {retrying ? "Trying again…" : "Try again"}
            </Button>
          )}
          {retryHref && (
            <Button asChild className="rounded-full px-5">
              <a href={retryHref}>
                <RotateCcw className="size-4" aria-hidden="true" /> Try again
              </a>
            </Button>
          )}
          {onAction && actionLabel && (
            <Button
              type="button"
              onClick={onAction}
              className="rounded-full px-5"
            >
              {actionLabel}
            </Button>
          )}
          {actionHref && actionLabel && (
            <Button asChild className="rounded-full px-5">
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          )}
          {homeLink && (
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href="/">
                <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
              </Link>
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
