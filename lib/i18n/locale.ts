export type Locale = "en" | "fa";

export const localeCookie = "morrow-locale";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fa";
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : "en";
}
