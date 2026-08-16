import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/dev/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      // Landing chooser at the root — highest priority entry.
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      // Dev portfolio section.
      url: `${siteConfig.url}/dev`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // IT Support / soporte portfolio section.
      url: `${siteConfig.url}/soporte`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
