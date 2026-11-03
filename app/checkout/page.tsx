import { localizedMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { CheckoutPage } from "@/components/cart/checkout-page";
import { PageLayout } from "@/components/layout/page-layout";

export const generateMetadata = (): Promise<Metadata> =>
  localizedMetadata({
    title: "Demo Checkout",
    description: "Place a simulated order without payment or delivery.",
    robots: { index: false, follow: false },
  });

export default function Checkout() {
  return (
    <PageLayout customLastLabel="Checkout">
      <CheckoutPage />
    </PageLayout>
  );
}
