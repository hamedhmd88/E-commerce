import { PageLayout } from "@/components/layout/page-layout";
import { StatusPanel } from "@/components/feedback/status-panel";

export default function NotFound() {
  return (
    <PageLayout variant="catalog">
      <StatusPanel
        kind="empty"
        headingLevel={1}
        title="Page not found"
        description="That address does not match a page in this demo storefront. Browse the collection or return home."
        actionHref="/products"
        actionLabel="Browse collection"
        homeLink
        className="my-12"
      />
    </PageLayout>
  );
}
