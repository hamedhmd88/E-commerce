"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    label: "Explore",
    title: "Start with what catches your eye.",
    text: "Move through clothing, jewelry, and useful technology in one clear catalog. Category pages make it easy to narrow the view and find a direction without digging through endless menus.",
    detail:
      "The journal offers practical ideas when you want a little inspiration before browsing.",
    href: "/products",
    action: "Explore the catalog",
    art: "Category paths leading to a selected collection",
  },
  {
    label: "Look closer",
    title: "Make sense of the details.",
    text: "Open a product to see its description, price, category, and customer rating together. Compare the information that matters to your routine before deciding what deserves a place in it.",
    detail:
      "Product information comes from Fake Store API, so the catalog is a live demonstration.",
    href: "/products",
    action: "Browse product details",
    art: "Two information cards comparing product details",
  },
  {
    label: "Keep favorites",
    title: "Save a short list for later.",
    text: "Use the wishlist to keep interesting finds together, or add a piece to the cart when you are ready to continue. A demo account lets you try these interactions as part of the storefront flow.",
    detail:
      "The cart and wishlist are demonstrations; they do not place a real order.",
    href: "/account/wishlist",
    action: "See the wishlist",
    art: "A favorite item moving into a shopping bag",
  },
  {
    label: "Try checkout",
    title: "See the journey come together.",
    text: "Review the cart, adjust quantities, and walk through a simulated checkout. The flow is here to show how a complete shopping experience fits together, from selection to confirmation.",
    detail: "No payment is processed and the site never asks for card details.",
    href: "/cart",
    action: "View the demo cart",
    art: "A checkout checklist with a confirmation mark and no payment form",
  },
  {
    label: "Come back",
    title: "Pick up where you left off.",
    text: "After the demo checkout, a confirmation screen shows the result and order history keeps a record in this browser. You can return to your account to review that local demonstration whenever you need it.",
    detail:
      "Demo orders stay in browser storage and are not fulfilled or shipped.",
    href: "/account/orders",
    action: "View demo orders",
    art: "A simple order history timeline with one completed demo order",
  },
] as const;

function JourneyArtwork({ index }: { index: number }) {
  const common = { fill: "#153b39", fontFamily: "Arial, sans-serif" };
  return (
    <svg
      viewBox="0 0 600 520"
      role="img"
      aria-label={steps[index].art}
      className="journey-artwork relative z-10 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`journey-bg-${index}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#eaf7f2" />
          <stop offset="1" stopColor="#d6ebe5" />
        </linearGradient>
        <linearGradient
          id={`journey-card-${index}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#f5fbf8" />
        </linearGradient>
        <filter
          id={`journey-shadow-${index}`}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="18"
            stdDeviation="18"
            floodColor="#245c55"
            floodOpacity=".16"
          />
        </filter>
      </defs>
      <rect
        x="25"
        y="24"
        width="550"
        height="472"
        rx="38"
        fill={`url(#journey-bg-${index})`}
      />
      <circle cx="498" cy="105" r="80" fill="#fff" opacity=".42" />
      <circle cx="75" cy="420" r="96" fill="#a8d7c9" opacity=".35" />
      <path
        d="M90 442 C180 410 188 476 275 444 S440 398 520 436"
        fill="none"
        stroke="#80bbaa"
        strokeWidth="2"
        strokeDasharray="7 9"
        opacity=".7"
      />
      {index === 0 && (
        <g>
          <rect
            x="82"
            y="96"
            width="436"
            height="318"
            rx="27"
            fill={`url(#journey-card-${index})`}
            filter={`url(#journey-shadow-${index})`}
          />
          <rect
            x="109"
            y="121"
            width="382"
            height="41"
            rx="20"
            fill="#edf5f1"
          />
          <circle
            cx="134"
            cy="142"
            r="7"
            fill="none"
            stroke="#4c8b7b"
            strokeWidth="3"
          />
          <path
            d="m139 147 7 7"
            stroke="#4c8b7b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="160"
            y="148"
            fontSize="15"
            fill="#66847d"
            fontFamily="Arial, sans-serif"
          >
            Explore what feels right
          </text>
          {[0, 1, 2].map((n) => (
            <g key={n}>
              <rect
                x={110 + n * 127}
                y="193"
                width="112"
                height="174"
                rx="18"
                fill={n === 1 ? "#c8e8da" : "#e8f2ee"}
              />
              <circle
                cx={166 + n * 127}
                cy="246"
                r="28"
                fill={n === 1 ? "#82b8a6" : "#b7d7cb"}
              />
              <path
                d={`M${143 + n * 127} 246h46M${166 + n * 127} 223v46`}
                stroke="#fff"
                strokeWidth="3"
                opacity=".85"
              />
              <rect
                x={126 + n * 127}
                y="302"
                width="80"
                height="8"
                rx="4"
                fill="#628e83"
                opacity=".7"
              />
              <rect
                x={137 + n * 127}
                y="320"
                width="58"
                height="7"
                rx="4"
                fill="#a0c5b8"
              />
            </g>
          ))}
          <rect
            x="224"
            y="380"
            width="152"
            height="21"
            rx="10"
            fill="#0b5d54"
          />
          <text
            x="300"
            y="395"
            fontSize="12"
            textAnchor="middle"
            fill="white"
            fontFamily="Arial, sans-serif"
          >
            Choose a direction
          </text>
        </g>
      )}
      {index === 1 && (
        <g>
          {[0, 1].map((n) => (
            <g key={n}>
              <rect
                x={74 + n * 232}
                y={115 + n * 22}
                width="214"
                height="286"
                rx="25"
                fill={`url(#journey-card-${index})`}
                filter={`url(#journey-shadow-${index})`}
              />
              <rect
                x={94 + n * 232}
                y={136 + n * 22}
                width="174"
                height="104"
                rx="17"
                fill={n ? "#d8e9e1" : "#e3efe9"}
              />
              <circle
                cx={181 + n * 232}
                cy={188 + n * 22}
                r="29"
                fill={n ? "#92c3b2" : "#afd5c6"}
              />
              <path
                d={`M${158 + n * 232} ${188 + n * 22}h46`}
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <rect
                x={95 + n * 232}
                y={263 + n * 22}
                width="135"
                height="11"
                rx="5"
                fill="#285e54"
              />
              <rect
                x={95 + n * 232}
                y={286 + n * 22}
                width="166"
                height="7"
                rx="4"
                fill="#bdd4ca"
              />
              <rect
                x={95 + n * 232}
                y={304 + n * 22}
                width="148"
                height="7"
                rx="4"
                fill="#bdd4ca"
              />
              <path
                d={`M${98 + n * 232} ${345 + n * 22}h95`}
                stroke="#e7b86b"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray="12 7"
              />
            </g>
          ))}
          <circle cx="300" cy="275" r="31" fill="#0b5d54" />
          <text
            x="300"
            y="282"
            textAnchor="middle"
            fontSize="22"
            fill="white"
            fontFamily="Arial, sans-serif"
          >
            ↔
          </text>
        </g>
      )}
      {index === 2 && (
        <g>
          <rect
            x="76"
            y="128"
            width="194"
            height="240"
            rx="27"
            fill={`url(#journey-card-${index})`}
            filter={`url(#journey-shadow-${index})`}
          />
          <rect
            x="97"
            y="151"
            width="152"
            height="122"
            rx="19"
            fill="#dcece5"
          />
          <path
            d="M173 237c-34-25-49-41-32-58 13-12 27-5 32 5 6-10 20-17 33-5 17 17 2 33-33 58Z"
            fill="#6ba996"
          />
          <rect x="112" y="297" width="120" height="10" rx="5" fill="#2a6459" />
          <rect x="127" y="317" width="90" height="7" rx="4" fill="#bbd5c9" />
          <path
            d="M280 246h48m-16-17 18 17-18 17"
            fill="none"
            stroke="#0b5d54"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="345"
            y="151"
            width="177"
            height="193"
            rx="26"
            fill="#0b5d54"
            filter={`url(#journey-shadow-${index})`}
          />
          <path
            d="M389 221h89l-9 79h-71l-9-79Zm19 0v-15c0-30 53-30 53 0v15"
            fill="none"
            stroke="white"
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="479" cy="165" r="23" fill="#b5e5d0" />
          <text
            x="479"
            y="172"
            textAnchor="middle"
            fontSize="25"
            fill="#0b5d54"
            fontFamily="Arial, sans-serif"
          >
            ✓
          </text>
        </g>
      )}
      {index === 3 && (
        <g>
          <rect
            x="107"
            y="77"
            width="386"
            height="371"
            rx="29"
            fill={`url(#journey-card-${index})`}
            filter={`url(#journey-shadow-${index})`}
          />
          <text x="139" y="124" fontSize="21" fontWeight="bold" {...common}>
            Demo checkout
          </text>
          <rect x="139" y="144" width="322" height="2" fill="#d3e3dc" />
          {[0, 1, 2].map((n) => (
            <g key={n}>
              <circle cx="158" cy={191 + n * 65} r="17" fill="#cde9dc" />
              <path
                d={`m150 ${191 + n * 65} 6 6 11-13`}
                fill="none"
                stroke="#0b5d54"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="190"
                y={182 + n * 65}
                width={n === 2 ? 140 : 196}
                height="10"
                rx="5"
                fill="#457a6e"
              />
              <rect
                x="190"
                y={201 + n * 65}
                width="112"
                height="7"
                rx="4"
                fill="#c5d9d0"
              />
            </g>
          ))}
          <rect
            x="139"
            y="376"
            width="322"
            height="42"
            rx="13"
            fill="#0b5d54"
          />
          <text
            x="300"
            y="402"
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="white"
            fontFamily="Arial, sans-serif"
          >
            Simulated confirmation
          </text>
          <circle cx="485" cy="100" r="37" fill="#b5e5d0" />
          <path
            d="m469 100 11 11 22-25"
            fill="none"
            stroke="#0b5d54"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
      {index === 4 && (
        <g>
          <rect
            x="96"
            y="86"
            width="408"
            height="355"
            rx="28"
            fill={`url(#journey-card-${index})`}
            filter={`url(#journey-shadow-${index})`}
          />
          <text x="130" y="132" fontSize="22" fontWeight="bold" {...common}>
            Your demo orders
          </text>
          <rect x="130" y="154" width="340" height="2" fill="#d3e3dc" />
          <path
            d="M165 200v157"
            stroke="#a3cabb"
            strokeWidth="4"
            strokeDasharray="8 8"
          />
          {[0, 1, 2].map((n) => (
            <g key={n}>
              <circle
                cx="165"
                cy={208 + n * 72}
                r="16"
                fill={n === 0 ? "#0b5d54" : "#cde9dc"}
              />
              <path
                d={`m159 ${208 + n * 72} 5 5 9-10`}
                fill="none"
                stroke={n === 0 ? "white" : "#0b5d54"}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect
                x="197"
                y={195 + n * 72}
                width={n === 0 ? 180 : 146}
                height="11"
                rx="5"
                fill="#376e62"
              />
              <rect
                x="197"
                y={217 + n * 72}
                width="115"
                height="7"
                rx="4"
                fill="#b8d1c5"
              />
            </g>
          ))}
          <rect
            x="130"
            y="385"
            width="340"
            height="32"
            rx="11"
            fill="#e3f2eb"
          />
          <text
            x="300"
            y="406"
            textAnchor="middle"
            fontSize="13"
            fill="#256357"
            fontFamily="Arial, sans-serif"
          >
            Saved in this browser
          </text>
        </g>
      )}
    </svg>
  );
}

export function ProductStory() {
  const [active, setActive] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    const syncToText = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.55;
      let next = 0;
      for (let index = 1; index < steps.length; index++) {
        const previousText = contentRefs.current[index - 1];
        const nextText = contentRefs.current[index];
        if (
          previousText &&
          nextText &&
          previousText.getBoundingClientRect().bottom < readingLine &&
          nextText.getBoundingClientRect().top <= readingLine
        ) {
          next = index;
        } else {
          break;
        }
      }
      setActive((current) => (current === next ? current : next));
    };
    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncToText);
    };
    scheduleSync();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
      aria-labelledby="story-title"
    >
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-medium text-primary">The Morrow journey</p>
        <h2
          id="story-title"
          className="mt-3 text-4xl font-medium tracking-[-.055em] sm:text-5xl"
        >
          From first look to final click.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Five simple steps show how this storefront works. Scroll to follow the
          journey.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <div>
          {steps.map((step, index) => (
            <div
              key={step.label}
              className="story-step flex min-h-[60vh] flex-col justify-center border-t border-border/65 py-12"
            >
              <div
                ref={(node) => {
                  contentRefs.current[index] = node;
                }}
                className="flex flex-col items-start"
              >
                <span className="text-sm font-medium text-primary">
                  0{index + 1} / 0{steps.length} &nbsp; {step.label}
                </span>
                <h3 className="mt-5 max-w-lg text-3xl font-medium leading-tight tracking-[-.045em] sm:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
                  {step.text}
                </p>
                <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
                  {step.detail}
                </p>
                <Link
                  href={step.href}
                  className="mt-7 inline-flex w-fit items-center gap-2 font-medium text-primary hover:underline"
                >
                  {step.action}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <div className="story-visual glass-panel relative mt-8 aspect-[1.15] overflow-hidden rounded-[2rem] p-3 lg:hidden">
                <JourneyArtwork index={index} />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:block">
          <div
            className="story-visual glass-panel sticky top-24 h-[72vh] min-h-[420px] max-h-[640px] overflow-hidden rounded-[2rem] p-3"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="story-halo" aria-hidden="true" />
            <JourneyArtwork key={active} index={active} />
            <span className="absolute bottom-6 start-6 z-20 rounded-full border border-border bg-background/85 px-4 py-2 text-sm backdrop-blur-lg">
              Step 0{active + 1} of 0{steps.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
