import { getAllBlogs, BlogMetadata } from "@/blog-content/metadata";
import Link from "next/link";

interface BlogCardProps {
  blog: BlogMetadata;
  index: number;
}

function BlogCard({ blog, index }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link className="no-underline!" href={`/blogs/${blog.slug}`}>
      <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3 text-sm text-white/60">
              <span>({String(index + 1).padStart(3, "0")})</span>
              <span>{formatDate(blog.publishedAt)}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>

            <h2 className="group-hover:text-secondary mb-3 text-xl font-semibold text-white transition-colors md:text-2xl">
              {blog.title}
            </h2>

            <p className="mb-4 leading-relaxed text-white/80">
              {blog.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <section className="">
      <div className="mb-10">
        <h1 className="pt-2 text-2xl font-semibold md:text-3xl lg:text-5xl">
          thoughts & insights<span className="text-secondary">.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80">
          exploring my learnings, and diving deep into the technologies that
          shape our digital world
        </p>
      </div>

      {blogs.length > 0 ? (
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.slug} blog={blog} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-semibold text-white/60">
              No blogs yet
            </h2>
            <p className="text-white/40">Check back soon for new content!</p>
          </div>
        </div>
      )}
    </section>
  );
}
