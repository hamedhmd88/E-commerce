"use client";

import Image from "next/image";
import { useLanguage } from "@/components/layout/language-provider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  return (
    <div
      role="group"
      aria-label={locale === "fa" ? "انتخاب زبان" : "Choose language"}
      className="flex items-center gap-0.5 rounded-full border border-border/60 bg-background/40 p-1"
    >
      {(
        [
          { code: "fa", label: "فارسی", flag: "/flags/ir.svg" },
          { code: "en", label: "English", flag: "/flags/gb.svg" },
        ] as const
      ).map(({ code, label, flag }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={
            locale === "fa" ? `تغییر زبان به ${label}` : `Switch to ${label}`
          }
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
          className={`grid min-h-9 min-w-9 place-items-center rounded-full transition-[background-color,transform,box-shadow] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transform-none ${locale === code ? "bg-primary/12 shadow-sm ring-1 ring-primary/30" : "hover:bg-primary/8"}`}
        >
          <Image
            src={flag}
            alt=""
            width={23}
            height={16}
            className="h-4 w-[23px] rounded-[2px] object-cover shadow-sm"
          />
        </button>
      ))}
    </div>
  );
}
