import Link from "next/link";
import { ArrowUpRight, ShoppingBag, Compass, Heart } from "lucide-react";
import { BrandLockup } from "@/components/layout/brand-lockup";

const groups = [
  {
    title: "Shop",
    links: [
      ["All products", "/products"],
      ["Explore sample carts", "/carts/explore"],
      ["Electronics", "/category/electronics"],
      ["Jewelry", "/category/jewelery"],
      ["Clothing", "/products"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["Journal", "/blog"],
      ["Our story", "/about"],
      ["Questions", "/faq"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Your space",
    links: [
      ["My account", "/account"],
      ["Wishlist", "/account/wishlist"],
      ["Order history", "/account/orders"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer-scene border-t border-border/60">
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-10 sm:px-8 lg:px-14 lg:pt-12">
        <div className="grid gap-10 border-b border-border/70 pb-10 lg:grid-cols-[1.05fr_1.4fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
            >
              <BrandLockup size="footer" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Thoughtful finds for everyday life. Explore the collection, save
              favorites, and build a demo bag at your own pace.
            </p>
            <Link
              href="/products"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Explore the collection <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-7 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 py-5 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <ShoppingBag className="size-3.5 text-primary" /> Browse
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Heart className="size-3.5 text-primary" /> Save
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Compass className="size-3.5 text-primary" /> Explore
            </span>
          </div>
          <span>Portfolio demo · Products from Fake Store API</span>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Morrow.</p>
          <p>Account, checkout, and orders are demonstrations.</p>
        </div>
      </div>
    </footer>
  );
}
