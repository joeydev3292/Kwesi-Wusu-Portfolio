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

  const buildUrl = (id: string) =>
    `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&disablekb=1&rel=0&iv_load_policy=3&enablejsapi=1&playsinline=1`;

  return (
    <>
      <Image
        src="/poster.svg"
        alt=""
        fill
        className="object-cover"
        priority
      />

      {videoIds.map((id, index) => {
        const isVisible = index === current;
        const isNext = index === next;

        let className = "absolute inset-0 pointer-events-none";
        if (isVisible && !isFading) {
          className += " opacity-100";
        } else if (isVisible && isFading) {
          className += " opacity-0 transition-opacity duration-[2000ms]";
        } else if (isNext) {
          className += " opacity-100 animate-[fadeIn_2s_ease-in-out_forwards]";
        } else {
          className += " opacity-0";
        }

        return (
          <iframe
            key={id}
            src={buildUrl(id)}
            className={className}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title="Project video"
          />
        );
      })}
    </>
  );
}
