import { StatusPanel } from "@/components/feedback/status-panel";
import type { CatalogRequestError } from "@/services/catalog-error";

export function CatalogUnavailable({
  error,
  retryHref,
}: {
  error: CatalogRequestError;
  retryHref: string;
}) {
  return (
    <StatusPanel
      headingLevel={1}
      title="The product catalog is temporarily unavailable"
      description={
        error.challenged
          ? "Fake Store API is asking this request to complete a browser security check. The product data could not be loaded right now."
          : error.status === 403
            ? "Fake Store API denied this server request. Please try again later."
            : "We could not load products from Fake Store API. Please try again later."
      }
      retryHref={retryHref}
      homeLink
      className="my-12"
    />
  );
}
