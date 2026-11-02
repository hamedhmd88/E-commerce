import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const stories = [
  {
    title: "A wardrobe that works harder",
    image: "/sustainable-fashion.png",
    href: "/blog/versatile-wardrobe",
    tag: "Style notes",
  },
  {
    title: "The small details worth keeping",
    image: "/luxury-jewelry-care.jpg",
    href: "/blog/buying-jewelry-that-fits-your-routine",
    tag: "The edit",
  },
  {
    title: "Everyday tech, thoughtfully chosen",
    image: "/modern-technology-trends.jpg",
    href: "/blog/a-better-electronics-buying-checklist",
    tag: "Good objects",
  },
];

export function JournalSection() {
  return (
    <section
      className="journal-section relative isolate overflow-hidden py-20 lg:py-28"
      aria-labelledby="journal-title"
    >
      <div className="journal-aurora" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-medium text-primary">From the journal</p>
            <h2
              id="journal-title"
              className="mt-3 max-w-xl text-4xl font-medium tracking-[-.055em] sm:text-5xl"
            >
              Ideas for living with less, and better.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            Read the journal <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <Link
              href={story.href}
              key={story.title}
              className="journal-card glass-panel group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[1.75rem] p-6 text-white sm:min-h-[390px]"
            >
              <Image
                src={story.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <span className="relative text-sm text-white/80">
                {story.tag}
              </span>
              <span className="relative mt-2 flex items-end justify-between gap-4 text-2xl font-medium tracking-tight">
                <span>{story.title}</span>
                <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
