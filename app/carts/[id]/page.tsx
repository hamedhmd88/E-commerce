import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { CartDetail } from "@/components/api-resources/cart-detail";

export const metadata: Metadata = {
  title: "Sample cart details",
  description: "Explore the products in a Fake Store API sample cart.",
};

export default async function CartDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PageLayout customLastLabel={`Cart #${id}`} variant="catalog">
      <CartDetail id={Number(id)} />
    </PageLayout>
  );
}
