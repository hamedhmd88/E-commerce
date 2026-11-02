import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck, Sparkles } from "lucide-react";

const principles = [
  {
    icon: Sparkles,
    title: "A focused edit",
    text: "A small set of categories, easy to explore.",
  },
  {
    icon: Check,
    title: "Clear product details",
    text: "Ratings, descriptions, and prices stay close to each item.",
  },
  {
    icon: ShieldCheck,
    title: "A transparent demo",
    text: "Catalog data is live; checkout and accounts are simulated.",
  },
];

export function EditorialNote() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
      <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card/60 lg:grid-cols-[1fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden sm:min-h-[420px]">
          <Image
            src="/modern-home-office.png"
            alt="Calm, considered objects arranged in a home workspace"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <p className="glass-panel absolute bottom-5 left-5 rounded-full px-4 py-2 text-sm text-white">
            Objects for the everyday
          </p>
        </div>
        <div className="p-7 sm:p-10 lg:p-14">
          <p className="mb-4 flex items-center gap-3 text-sm font-medium text-primary">
            <span className="h-px w-7 bg-primary" />
            The idea behind the edit
          </p>
          <h2 className="max-w-lg text-4xl font-medium leading-tight tracking-[-.055em] sm:text-5xl">
            A calmer way to find your next favorite.
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
            Morrow brings clothing, jewelry, and useful technology into one
            simple catalog. Browse at your own pace, compare details, and see
            how a complete storefront can feel clear from first glance to
            checkout.
          </p>
          <div className="mt-8 space-y-5">
            {principles.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Read about this project <ArrowLeft className="size-4 rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
