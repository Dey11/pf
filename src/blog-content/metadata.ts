export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogMetadata[] = [
  {
    slug: "use-optimistic-hook",
    title: "React 19's useOptimistic Hook",
    description:
      "Learn how React 19's useOptimistic hook creates smooth, responsive user interfaces by managing state updates efficiently.",
    publishedAt: "2025-06-06",
    readTime: "10 min read",
    tags: ["React", "React 19", "Performance", "Hooks", "useOptimistic"],
  },
];

export function getBlogBySlug(slug: string): BlogMetadata | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogs(): BlogMetadata[] {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
