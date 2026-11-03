"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { localeCookie, type Locale } from "@/lib/i18n/locale";
import { translate } from "@/lib/i18n/translate";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};
const LanguageContext = createContext<LanguageContextValue | null>(null);
const originals = new WeakMap<Node, { source: string; translated: string }>();
const attributeOriginals = new WeakMap<
  Element,
  Map<string, { source: string; translated: string }>
>();
const attributes = ["aria-label", "placeholder", "title", "alt"] as const;
const ignored = "[data-i18n-ignore],script,style,textarea,code,pre";

function applyLanguage(locale: Locale, roots?: readonly Node[]) {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";

  function updateText(node: Node) {
    const current = node.textContent ?? "";
    const previous = originals.get(node);
    const source =
      previous && current === previous.translated ? previous.source : current;
    const translated = translate(source, locale);
    originals.set(node, { source, translated });
    if (translated !== current) node.textContent = translated;
  }

  function updateAttributes(element: Element) {
    const stored = attributeOriginals.get(element) ?? new Map();
    for (const attribute of attributes) {
      const current = element.getAttribute(attribute);
      if (current === null) continue;
      const previous = stored.get(attribute);
      const source =
        previous && current === previous.translated ? previous.source : current;
      const translated = translate(source, locale);
      stored.set(attribute, { source, translated });
      if (translated !== current) element.setAttribute(attribute, translated);
    }
    attributeOriginals.set(element, stored);
  }

  function visit(element: Element) {
    if (element.closest(ignored)) return;
    updateAttributes(element);
    for (const child of element.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) updateText(child);
      else if (child.nodeType === Node.ELEMENT_NODE) visit(child as Element);
    }
  }

  if (roots) {
    for (const node of roots) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.parentElement?.closest(ignored)) updateText(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        visit(node as Element);
      }
    }
  } else if (document.body) visit(document.body);
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, updateLocale] = useState(initialLocale);
  const router = useRouter();

  useEffect(() => {
    const options: MutationObserverInit = {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...attributes],
    };
    let queued = false;
    let active = true;
    const changed = new Set<Node>();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) changed.add(node);
        } else {
          changed.add(mutation.target);
        }
      }
      if (queued) return;
      queued = true;
      queueMicrotask(() => {
        queued = false;
        if (!active) return;
        observer.disconnect();
        applyLanguage(locale, [...changed]);
        changed.clear();
        observer.observe(document.body, options);
      });
    });
    // Next can hydrate nested client components after this provider mounts.
    // Wait for the document load before touching their server-rendered text.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      timer = setTimeout(() => {
        if (!active) return;
        applyLanguage(locale);
        observer.observe(document.body, options);
      }, 400);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      active = false;
      window.removeEventListener("load", start);
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [locale]);

  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${localeCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    updateLocale(next);
    router.refresh();
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("LanguageProvider is missing");
  return context;
}
