import { PageLayout } from "@/components/layout/page-layout";
import { CategoryCatalog } from "@/components/product/category-catalog";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const selected = decodeURIComponent(category);

  return (
    <PageLayout customLastLabel={selected}>
      <header className="mb-10 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          The collection
        </p>
        <h1 className="text-4xl font-semibold capitalize tracking-tight md:text-5xl">
          {selected}
        </h1>
        <p className="mt-3 text-muted-foreground">Explore this collection.</p>
      </header>
      <CategoryCatalog category={selected} />
    </PageLayout>
  );
}
