import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/blog-content/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sdey.me";
  const routes = ["/", "/projects", "/blogs", "/now"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const posts = getAllBlogs().map((b) => ({
    url: `${base}/blogs/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...posts];
}
