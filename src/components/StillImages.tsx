"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";

interface StillImagesProps {
  images: string[];
  title: string;
}

export function StillImages({ images, title }: StillImagesProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const prev = useCallback(() => {
    setSelected((s) => (s !== null ? (s - 1 + images.length) % images.length : null));
  }, [images.length]);

  const next = useCallback(() => {
    setSelected((s) => (s !== null ? (s + 1) % images.length : null));
  }, [images.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (selected === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((url, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-video rounded-sm overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src={url}
              alt={`${title} still ${i + 1}`}
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-80 active:opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </button>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => document.documentElement.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-sm tracking-widest font-light"
        >
          BACK TO TOP <ArrowUp size={14} />
        </button>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center animate-[fadeIn_0.2s_ease-out]"
          onClick={close}
          onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const diff = e.changedTouches[0].clientX - touchStart.current;
            if (diff > 50) prev();
            if (diff < -50) next();
            touchStart.current = null;
          }}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-wider z-10">
            {selected + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
                aria-label="Next"
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl max-h-[85vh] mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selected]}
              alt={`${title} still ${selected + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
