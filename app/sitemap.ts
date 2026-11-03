import type { MetadataRoute } from "next";

const routes = [
  "",
  "/products",
  "/products/manage",
  "/carts",
  "/carts/explore",
  "/about",
  "/blog",
  "/contact",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return routes.map((route) => ({
    url: `${origin}${route}`,
    changeFrequency: "weekly",
  }));
}
