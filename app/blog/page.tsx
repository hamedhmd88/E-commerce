import { BlogGrid } from "@/components/blog/blog-grid";
import { PageLayout } from "@/components/layout/page-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Ideas on style, thoughtful shopping, and everyday technology.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  return (
    <PageLayout customLastLabel="Blog">
      <div className="mb-14 max-w-3xl py-8 lg:py-14">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[.28em] text-primary">
          The journal
        </p>
        <h1 className="font-serif text-5xl tracking-tight sm:text-7xl">
          Stories for <em className="text-primary">everyday living.</em>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Explore ideas and practical guides across style, accessories, and
          technology. Editorial content is part of this portfolio demonstration.
        </p>
      </div>
      <BlogGrid category={category} query={q} />
    </PageLayout>
  );
}
