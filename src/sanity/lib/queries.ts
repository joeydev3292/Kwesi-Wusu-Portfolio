import { client } from "./client";

export async function getProjects() {
  if (!client) return [];
  return client.fetch(`*[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    year,
    role,
    description,
    genre,
    mediaType,
    "thumbnailUrl": thumbnail.asset->url,
    youtubeUrl,
    "posterUrl": stillImages[0].asset->url
  }`);
}

export async function getProjectVideos(): Promise<string[]> {
  if (!client) return [];
  const projects = await client.fetch<{ youtubeUrl: string }[]>(
    `*[_type == "project" && defined(youtubeUrl)] | order(order asc, _createdAt desc) {
      youtubeUrl
    }`
  );
  return projects
    .map((p) => {
      const match = p.youtubeUrl?.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/
      );
      return match?.[1] ?? null;
    })
    .filter(Boolean) as string[];
}

export async function getProjectBySlug(slug: string) {
  if (!client) return null;
  return client.fetch(`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    role,
    description,
    genre,
    mediaType,
    "videoUrl": videoFile.asset->url,
    youtubeUrl,
    "thumbnail": thumbnail.asset->url,
    "stillImages": stillImages[].asset->url
  }`, { slug });
}
