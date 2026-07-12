import { getProjectBySlug } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { StillImages } from "@/components/StillImages";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not Found — Kwesi Wusu" };
  return { title: `${project.title} — Kwesi Wusu` };
}

function getYouTubeEmbedId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|m\.youtube\.com\/(?:watch\?v=|v\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const youtubeId = project.youtubeUrl
    ? getYouTubeEmbedId(project.youtubeUrl)
    : null;

  return (
    <article className="min-h-screen px-6 pt-32 pb-20">
      <Link
        href="/works"
        className="inline-flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-sm tracking-wider mb-12"
      >
        <ArrowLeft size={16} />
        BACK TO WORKS
      </Link>

      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-white">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/50">
            {project.role && (
              <span className="text-accent font-semibold">{Array.isArray(project.role) ? (project.role as string[]).join(", ") : project.role}</span>
            )}
            {project.year && <span>{project.year}</span>}
            {project.genre && (
              <span className="uppercase tracking-wider text-xs">
                {project.genre}
              </span>
            )}
          </div>
        </header>

        {youtubeId ? (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={`${project.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-sm"
            />
          </div>
        ) : project.videoUrl ? (
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full rounded-sm"
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        ) : project.thumbnail ? (
          <div className="relative aspect-video w-full">
            <Image
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              fill
              className="object-cover rounded-sm"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        ) : null}

        {project.description && (
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            {project.description}
          </p>
        )}

        {project.stillImages && project.stillImages.length > 0 && (
          <StillImages images={project.stillImages as string[]} title={project.title} />
        )}
      </div>
    </article>
  );
}
