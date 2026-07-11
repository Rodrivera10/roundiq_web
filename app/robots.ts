import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/site";

// Le dice a Google (y a todos los buscadores) que puede rastrear todo el sitio,
// y dónde está el sitemap. Next lo sirve automáticamente en /robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La API del waitlist no aporta nada a los buscadores
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
