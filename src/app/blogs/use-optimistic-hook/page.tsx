import { default as UseOptimisticBlog } from "@/blog-content/use-optimistic-hook.mdx";
import { getBlogBySlug } from "@/blog-content/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const blog = getBlogBySlug("use-optimistic-hook");

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | dey's blog`,
    description: blog.description,
    keywords: blog.tags.join(", "),
    authors: [{ name: "Shreyan Dey" }],
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: ["Shreyan Dey"],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
    },
  };
}

export default function Page() {
  const blog = getBlogBySlug("use-optimistic-hook");

  if (!blog) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative py-10">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.description,
            datePublished: blog.publishedAt,
            author: { "@type": "Person", name: "Shreyan Dey" },
            mainEntityOfPage: `https://sdey.me/blogs/${blog.slug}`,
            image: ["https://sdey.me/og.jpg"],
          }),
        }}
      />
      <Link
        href="/blogs"
        className="hover:text-secondary mb-8 inline-flex items-center gap-2 text-white/60 no-underline! transition-colors hover:underline!"
      >
        <span>back to all posts</span>
      </Link>

      <header className="mb-8 border-b border-white/10 pb-8">
        <div className="mb-4 flex items-center gap-3 text-sm text-white/60">
          <span>({formatDate(blog.publishedAt)})</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Blog content */}
      <UseOptimisticBlog />
    </div>
  );
}
