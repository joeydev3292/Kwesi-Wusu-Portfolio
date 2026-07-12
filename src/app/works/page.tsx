import { getProjects } from "@/sanity/lib/queries";
import { ProjectCard } from "@/components/ProjectCard";
import { Nav } from "@/components/Nav";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works — Kwesi Wusu",
};

export default async function Works() {
  const projects = await getProjects();

  return (
    <section className="animate-page-in min-h-screen px-6 pt-52 pb-20">
      <Nav />
      {projects.length === 0 ? (
        <div className="max-w-md mx-auto text-center text-white/40 text-sm space-y-4">
          <p className="font-light">No projects added yet.</p>
          <p className="text-xs font-light">
            Once Sanity is configured, log in to{" "}
            <Link
              href="/studio"
              className="text-accent underline underline-offset-2 hover:text-white"
            >
              the Studio
            </Link>{" "}
            to add your first project.
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {projects.map((project: Record<string, unknown>) => (
            <ProjectCard
              key={project._id as string}
              title={project.title as string}
              slug={(project.slug as { current: string }).current}
              role={project.role as string}
              thumbnailUrl={(project.thumbnailUrl as string) ?? null}
              year={(project.year as number) ?? null}
              genre={(project.genre as string) ?? null}
            />
          ))}
        </div>
      )}
    </section>
  );
}
