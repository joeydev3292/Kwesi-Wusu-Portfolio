"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ProjectSlideshowProps {
  videoIds: string[];
}

export function ProjectSlideshow({ videoIds }: ProjectSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);

  const hasVideos = videoIds.length > 0;

  const advance = useCallback(() => {
    if (!hasVideos || videoIds.length <= 1) return;
    setIsFading(true);
    const upcoming = (current + 1) % videoIds.length;
    setNext(upcoming);

    setTimeout(() => {
      setCurrent(upcoming);
      setNext(null);
      setIsFading(false);
    }, 2000);
  }, [current, hasVideos, videoIds.length]);

  useEffect(() => {
    if (!hasVideos || videoIds.length <= 1) return;
    const interval = setInterval(advance, 10000);
    return () => clearInterval(interval);
  }, [advance, hasVideos, videoIds.length]);

  if (!hasVideos) {
    return (
      <Image
        src="/poster.svg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
    );
  }

  const buildUrl = (id: string) =>
    `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1&iv_load_policy=3`;

  return (
    <>
      <iframe
        key={`current-${videoIds[current]}`}
        src={buildUrl(videoIds[current])}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        title="Project video"
      />

      {next !== null && (
        <iframe
          key={`next-${videoIds[next]}`}
          src={buildUrl(videoIds[next])}
          className="absolute inset-0 w-full h-full object-cover opacity-0 animate-[fadeIn_2s_ease-in-out_forwards]"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          title="Project video"
        />
      )}
    </>
  );
}
