import { localizedMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Layers3,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { ExperienceShowcase } from "@/components/about/experience-showcase";

export const generateMetadata = (): Promise<Metadata> =>
  localizedMetadata({
    title: "About",
    description: "The story and scope of the Morrow portfolio storefront.",
  });

export default function AboutPage() {
  return (
    <PageLayout customLastLabel="About" variant="catalog">
      <section className="mx-auto max-w-6xl py-4 lg:py-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.28em] text-primary">
          About the project
        </p>
        <h1 className="max-w-4xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          A more considered way to <em className="text-primary">explore.</em>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Morrow is a portfolio demonstration of a modern storefront. It brings
          a varied product catalog into a calm, useful shopping interface
          designed to make discovery feel effortless.
        </p>
        <ExperienceShowcase />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
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
              className="glass-panel rounded-[1.5rem] p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none"
            >
              <Icon className="mb-4 size-6 text-primary" aria-hidden />
              <h2 className="font-serif text-xl sm:text-2xl">{title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </div>
          ))}
        </div>
        <div className="glass-panel mt-6 flex flex-wrap items-center justify-between gap-5 rounded-[1.75rem] p-7 sm:p-9">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-primary">
              Explore the collection
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
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
