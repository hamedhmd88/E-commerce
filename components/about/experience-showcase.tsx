"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Compass, Layers3, Pause, Play, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";

const chapters = [
  {
    eyebrow: "01 / DISCOVERY", title: "Start with the real catalog", icon: Compass,
    summary: "Explore the range without losing your place. Search, category, price and page size make the catalog easier to navigate.",
    facts: ["Products and prices come from Fake Store API", "Filters and pagination are reflected in the URL", "Catalog availability depends on the external service"],
    signal: "LIVE PRODUCT DATA", path: "/products",
  },
  {
    eyebrow: "02 / CONSIDERATION", title: "Look closer before deciding", icon: Layers3,
    summary: "Product pages bring descriptions, imagery and practical controls together, so each choice feels considered.",
    facts: ["Product details use the same service layer", "Additional gallery views are labeled as concepts", "The journal offers local editorial demo articles"],
    signal: "PRODUCT + EDITORIAL", path: "/blog",
  },
  {
    eyebrow: "03 / PERSONAL SPACE", title: "Keep track of what matters", icon: ShoppingBag,
    summary: "A bag and wishlist let you try a familiar shopping flow and return to the items you noticed.",
    facts: ["Bag and wishlist use browser state", "Account journeys are demonstrations", "No physical purchase is created"],
    signal: "BROWSER-BASED DEMO", path: "/products",
  },
  {
    eyebrow: "04 / CLEAR BOUNDARIES", title: "A demo that says what it is", icon: ShieldCheck,
    summary: "The experience shows how a modern storefront can work while making the limits of the demo clear.",
    facts: ["Checkout is simulated", "No card details are collected", "Contact messages are not sent to a support team"],
    signal: "TRANSPARENT BY DESIGN", path: "/contact",
  },
] as const;

export function ExperienceShowcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReducedMotion(media.matches); if (media.matches) setPlaying(false); };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % chapters.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion]);

  const chapter = chapters[active];
  const Icon = chapter.icon;

  return (
    <section className="glass-panel about-showcase relative mt-8 overflow-hidden rounded-[2rem] p-5 sm:p-7 lg:p-8" aria-labelledby="showcase-title">
      <div className="story-diagram-glow" aria-hidden="true" />
      <div className="relative flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-6">
        <div><p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[.16em] text-primary"><Sparkles className="size-4" /> THE MORROW EXPERIENCE</p><h2 id="showcase-title" className="mt-2 max-w-2xl font-serif text-2xl sm:text-3xl">How the storefront comes together.</h2></div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setActive((active + chapters.length - 1) % chapters.length)} aria-label="Previous chapter" className="about-control"><ArrowLeft className="size-4" /></button>
          <button type="button" onClick={() => setActive((active + 1) % chapters.length)} aria-label="Next chapter" className="about-control"><ArrowRight className="size-4" /></button>
          <button type="button" onClick={() => setPlaying((value) => !value)} disabled={reducedMotion} aria-label={playing ? "Pause slideshow" : "Play slideshow"} className="about-control" title={reducedMotion ? "Automatic motion is disabled by your preferences" : undefined}>{playing ? <Pause className="size-4" /> : <Play className="size-4" />}</button>
        </div>
      </div>

      <div className="relative mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)]">
        <div className="about-map rounded-[1.5rem] border border-border/70 p-5 sm:p-7" aria-label="Four stages of the demo storefront">
          <div className="mb-8 flex items-center justify-between text-xs text-muted-foreground"><span>VISITOR JOURNEY</span><span>0{active + 1} / 0{chapters.length}</span></div>
          <div className="relative space-y-3 before:absolute before:bottom-7 before:left-6 before:top-7 before:w-px before:bg-primary/25">
            {chapters.map((item, index) => {
              const StepIcon = item.icon;
              return <button key={item.eyebrow} type="button" onClick={() => setActive(index)} aria-current={index === active ? "step" : undefined} className={`about-map-node relative flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-300 ${index === active ? "border-primary/45 bg-primary/12 shadow-lg shadow-primary/5" : "border-border/60 bg-background/50 hover:border-primary/35 hover:bg-primary/5"}`}>
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${index === active ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}><StepIcon className="size-5" /></span>
                <span className="min-w-0"><span className="block text-[.65rem] font-semibold tracking-[.16em] text-primary">{item.eyebrow}</span><span className="mt-0.5 block text-sm font-semibold sm:text-base">{item.title}</span></span>
                {index === active && <span className="ml-auto hidden size-2 shrink-0 rounded-full bg-primary sm:block" aria-hidden="true" />}
              </button>;
            })}
          </div>
          <div className="mt-7 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-primary about-live-dot" /> Select a step to explore the flow</div>
        </div>

        <div key={active} className="about-detail flex flex-col rounded-[1.5rem] border border-primary/25 bg-background/55 p-6 backdrop-blur-xl sm:p-8" aria-live="polite">
          <div className="flex items-start justify-between gap-3"><span className="flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon className="size-7" /></span><span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[.65rem] font-semibold tracking-wider text-primary">{chapter.signal}</span></div>
          <p className="mt-8 text-xs font-semibold tracking-[.18em] text-primary">{chapter.eyebrow}</p>
          <h3 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">{chapter.title}</h3>
          <p className="mt-4 leading-7 text-muted-foreground">{chapter.summary}</p>
          <ul className="mt-7 space-y-3 border-t border-border/60 pt-6">{chapter.facts.map((fact) => <li key={fact} className="flex items-start gap-3 text-sm leading-6"><Check className="mt-1 size-4 shrink-0 text-primary" /><span>{fact}</span></li>)}</ul>
          <div className="mt-auto flex items-center justify-between gap-4 pt-8"><Link href={chapter.path} className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">Explore this part <ArrowRight className="size-4" /></Link><div className="flex gap-1.5" aria-label="Slideshow position">{chapters.map((item, index) => <button key={item.eyebrow} type="button" onClick={() => setActive(index)} aria-label={`Show chapter ${index + 1}`} aria-current={index === active ? "step" : undefined} className={`h-1.5 rounded-full transition-all ${index === active ? "w-7 bg-primary" : "w-2 bg-primary/25 hover:bg-primary/55"}`} />)}</div></div>
        </div>
      </div>
    </section>
  );
}
