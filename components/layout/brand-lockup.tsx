"use client";

import Image from "next/image";
import { useLanguage } from "@/components/layout/language-provider";

export function BrandLockup({ size = "header" }: { size?: "header" | "footer" }) {
  const { locale } = useLanguage();

  return (
    <span className={`brand-lockup brand-lockup-${size} inline-flex items-center gap-2.5`}>
      <Image
        src="/morrow-mark.svg"
        alt=""
        width={size === "header" ? 33 : 36}
        height={size === "header" ? 33 : 36}
        className={size === "header" ? "size-8 shrink-0" : "size-9 shrink-0"}
        priority={size === "header"}
      />
      <span
        lang={locale}
        dir={locale === "fa" ? "rtl" : "ltr"}
        data-i18n-ignore
        className="brand-wordmark inline-flex items-baseline whitespace-nowrap"
      >
        {locale === "fa" ? "مورو" : "Morrow"}
        <span className="text-primary">.</span>
      </span>
    </span>
  );
}
