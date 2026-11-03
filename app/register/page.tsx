import { localizedMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { RegisterGate } from "@/components/auth/register-gate";

export const generateMetadata = (): Promise<Metadata> =>
  localizedMetadata({
    title: "Create a Demo Account",
    description:
      "Try the Morrow portfolio storefront account experience in your browser.",
    robots: { index: false, follow: false },
  });

export default function RegisterPage() {
  return (
    <PageLayout customLastLabel="Register" variant="catalog">
      <section className="mx-auto max-w-3xl py-6 lg:py-10">
        <p className="text-sm font-medium text-primary">Your Morrow space</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
          Create a demo account.
        </h1>
        <p className="mb-8 mt-4 max-w-2xl leading-7 text-muted-foreground">
          Try saved finds and browser-local orders. This is a portfolio
          demonstration, so use fictional details and a unique demo password.
        </p>
        <RegisterGate />
      </section>
    </PageLayout>
  );
}
