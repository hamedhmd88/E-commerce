import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const groups = [
  {
    title: "Shop",
    links: [
      ["All products", "/products"],
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
      ["Sign in", "/login"],
      ["Create account", "/register"],
      ["My account", "/account"],
      ["Order history", "/account/orders"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer-scene relative isolate overflow-hidden border-t border-border/50">
      <div className="footer-art" aria-hidden="true">
        <Image
          src="/modern-home-office.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[.12]"
        />
      </div>
      <div className="footer-orb" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-16 sm:px-8 lg:px-14 lg:pt-24">
        <div className="grid gap-12 border-b border-border/70 pb-16 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-3xl font-semibold tracking-[-.06em]"
            >
              <Image src="/morrow-mark.svg" alt="" width={42} height={42} />
              Morrow<span className="text-primary">.</span>
            </Link>
            <p className="mt-6 max-w-sm leading-7 text-muted-foreground">
              Considered finds for the days ahead. Explore clothing, jewelry,
              and useful objects in one calm place.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary/35 px-5 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore the collection <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="font-semibold">{group.title}</h3>
                <ul className="mt-5 space-y-3">
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
        <div className="flex flex-col justify-between gap-3 pt-7 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Morrow. Portfolio demonstration.</p>
          <p>
            Products: Fake Store API · Account and checkout interactions are
            simulated.
          </p>
        </div>
      </div>
    </footer>
  );
}
