import { projects } from "@/lib/constants";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    tags: string[];
    description: string;
    live: string | null;
    github: string | null;
    image: string;
    createdAt: string;
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <div className="flex flex-col gap-6 px-4 py-6 lg:flex-row lg:gap-8">
        {/* Project Image */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <div className="flex h-full grow pb-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5">
              <img
                src={project.image}
                alt={project.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary flex items-center gap-2 text-sm font-medium text-white underline underline-offset-2 transition-colors"
                >
                  live preview
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary flex items-center gap-2 text-sm font-medium text-white underline underline-offset-2 transition-colors"
                >
                  github repo
                  <Github className="h-4 w-4" />
                </Link>
              )}
            </div>
            <p className="text-end text-sm text-white/60">
              {project.createdAt}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="mb-4 flex w-full items-start justify-between gap-4">
              <div className="w-full">
                <div className="mb-2 flex w-full items-center justify-end gap-3 text-sm text-white/60">
                  <span>({project.id})</span>
                </div>
                <h2 className="group-hover:text-secondary text-2xl font-semibold text-white transition-colors md:text-3xl">
                  {project.name}
                  <span className="text-secondary">.</span>
                </h2>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-1 text-base">
                {project.tags.map((tag, idx) => (
                  <span key={tag} className="text-secondary">
                    {tag}
                    {idx < project.tags.length - 1 && (
                      <span className="text-secondary"> / </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="leading-relaxed whitespace-pre-line text-white/80">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <section>
      <div className="mb-10 pt-10">
        <h1 className="text-5xl font-semibold md:text-3xl lg:text-5xl">
          projects<span className="text-secondary">.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg">
          a collection of my work spanning web applications, ai integrations,
          and full-stack solutions
        </p>
      </div>

      <div className="space-y-8 pb-10 md:pb-20">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
