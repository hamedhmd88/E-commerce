import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review the items in your local demo bag.",
  robots: { index: false, follow: false },
};

export default function Cart() {
  return (
    <PageLayout customLastLabel="Cart">
      <CartPage />
    </PageLayout>
  );
}
