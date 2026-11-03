import { localizedMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { CartGallery } from "@/components/api-resources/cart-gallery";

export const generateMetadata = (): Promise<Metadata> =>
  localizedMetadata({
    title: "Explore sample carts",
    description: "Browse Fake Store API sample carts and their products.",
  });

export default function ExploreCartsPage() {
  return (
    <PageLayout customLastLabel="Explore carts" variant="catalog">
      <CartGallery />
    </PageLayout>
  );
}
