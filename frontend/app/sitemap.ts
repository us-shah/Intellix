import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/services",
  "/academy",
  "/portfolio",
  "/case-studies",
  "/team",
  "/careers",
  "/blog",
  "/research",
  "/pricing",
  "/faqs",
  "/contact",
  "/gallery",
  "/partners",
  "/resources",
  "/privacy",
  "/terms",
  "/cookies"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.intellix.com";
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7
  }));
}
