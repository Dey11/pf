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
    slug: "use-transition-hook",
    title: "React 19's useTransition Hook",
    description:
      "Learn how React 19's useTransition hook creates smooth, responsive user interfaces by managing state updates efficiently.",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "React 19", "Performance", "Hooks"],
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
