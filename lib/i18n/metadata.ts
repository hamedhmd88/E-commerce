import type { Metadata } from "next";
import { cookies } from "next/headers";
import { localeCookie, normalizeLocale } from "./locale";
import { translate } from "./translate";

export async function localizedMetadata(metadata: Metadata): Promise<Metadata> {
  const locale = normalizeLocale((await cookies()).get(localeCookie)?.value);
  if (locale === "en") return metadata;
  return {
    ...metadata,
    title:
      typeof metadata.title === "string"
        ? translate(metadata.title, locale)
        : metadata.title,
    description:
      typeof metadata.description === "string"
        ? translate(metadata.description, locale)
        : metadata.description,
  };
}
