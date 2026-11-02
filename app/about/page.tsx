import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Layers3,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "About",
  description: "The story and scope of the Morrow portfolio storefront.",
};

export default function AboutPage() {
  return (
    <PageLayout customLastLabel="About">
      <section className="mx-auto max-w-5xl py-10 lg:py-20">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.28em] text-primary">
          About the project
        </p>
        <h1 className="max-w-4xl font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
          A more considered way to <em className="text-primary">explore.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Morrow is a portfolio demonstration of a modern storefront. It brings
          a varied product catalog into a calm, useful shopping interface
          designed to make discovery feel effortless.
        </p>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Layers3,
              title: "Real catalog",
              copy: "Products, prices, and categories are sourced from Fake Store API. Availability depends on that service.",
            },
            {
              icon: MousePointerClick,
              title: "Thoughtful interaction",
              copy: "Search, shopping lists, cart controls, and account journeys are designed as a coherent frontend experience.",
            },
            {
              icon: ShieldCheck,
              title: "Honest demonstration",
              copy: "Accounts and checkout are simulated. No real payment is collected and no physical order is placed.",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <Icon className="mb-6 size-7 text-primary" aria-hidden />
              <h2 className="font-serif text-2xl">{title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-muted p-8 sm:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-primary">
              Explore the collection
            </p>
            <h2 className="mt-3 font-serif text-3xl">
              Find something that fits your day.
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-primary-foreground"
          >
            Browse products <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
