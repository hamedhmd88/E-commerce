"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { StatusPanel } from "@/components/feedback/status-panel";

export type RouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function RouteError({
  reset,
  title = "This page could not load",
  description = "Something interrupted this page. Try again, or return to the home page.",
}: RouteErrorProps & { title?: string; description?: string }) {
  return (
    <PageLayout variant="catalog">
      <StatusPanel
        headingLevel={1}
        title={title}
        description={description}
        onRetry={reset}
        homeLink
        className="my-12"
      />
    </PageLayout>
  );
}
