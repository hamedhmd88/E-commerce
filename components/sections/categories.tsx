import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Useful tools, made simple",
    image: "/modern-electronics-technology-gadgets.jpg",
    position: "center",
  },
  {
    name: "Jewelry",
    slug: "jewelery",
    description: "Details to keep close",
    image: "/luxury-jewelry-elegant-accessories.jpg",
    position: "center",
  },
  {
    name: "Men’s clothing",
    slug: "men's clothing",
    description: "Everyday foundations",
    image: "/photo-slider/manclth1.jpg",
    position: "center 35%",
  },
  {
    name: "Women’s clothing",
    slug: "women's clothing",
    description: "A fresh point of view",
    image: "/photo-slider/womanclth1.jpg",
    position: "center 35%",
  },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
      <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-sm font-medium text-primary">
            <span className="h-px w-7 bg-primary" />
            Explore by category
          </p>
          <h2 className="text-4xl font-medium tracking-[-.055em] sm:text-5xl">
            Find your own direction.
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          View everything <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${encodeURIComponent(category.slug)}`}
            className="category-tile group relative isolate min-h-[230px] overflow-hidden rounded-[1.5rem] border border-border sm:min-h-[280px]"
          >
            <Image
              src={category.image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              style={{ objectPosition: category.position }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5 transition-opacity group-hover:from-black/80" />
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white sm:inset-x-5 sm:bottom-5">
              <div>
                <h3 className="text-lg font-medium sm:text-xl">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-white/75">
                  {category.description}
                </p>
              </div>
              <span className="glass-panel grid size-10 shrink-0 place-items-center rounded-full text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
