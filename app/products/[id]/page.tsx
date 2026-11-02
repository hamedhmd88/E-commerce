import { ProductCatalogDetail } from "@/components/product/product-catalog-detail";
import { PageLayout } from "@/components/layout/page-layout";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Product details",
  description: "View details from the Fake Store API demo catalog.",
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return (
    <PageLayout variant="catalog">
      <ProductCatalogDetail id={Number(id)} />
    </PageLayout>
  );
}
