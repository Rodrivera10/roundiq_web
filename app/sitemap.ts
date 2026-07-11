import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/site";

// Lista de páginas para que Google las indexe. Hoy es una sola (la landing).
// Cuando agreguemos más páginas (blog, precios, etc.) se suman acá.
// Next lo sirve automáticamente en /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
