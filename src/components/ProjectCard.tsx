import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  slug: string;
  role: string;
  thumbnailUrl?: string | null;
  year?: number | null;
  genre?: string | null;
}

export function ProjectCard({
  title,
  slug,
  role,
  thumbnailUrl,
  year,
  genre,
}: ProjectCardProps) {
  return (
    <Link
      href={`/works/${slug}`}
      className="group block overflow-hidden rounded-sm"
    >
      <div className="relative aspect-video bg-white/5 overflow-hidden">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-80"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white/20 text-sm">
            No thumbnail
          </div>
        )}
      </div>
      <div className="pt-4 space-y-1">
        <h3 className="text-white font-semibold text-sm tracking-wide">
          {title}
        </h3>
        <p className="text-accent text-xs tracking-wider font-medium">{role}</p>
        {year && (
          <p className="text-white/40 text-xs">
            {year}
            {genre && ` · ${genre}`}
          </p>
        )}
      </div>
    </Link>
  );
}
