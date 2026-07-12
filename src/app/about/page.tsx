// Instagram icon component
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { Nav } from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Kwesi Wusu",
};

export default function About() {
  return (
    <section className="animate-page-in min-h-screen flex items-center justify-center px-6 pt-52 pb-16">
      <Nav />
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-5 text-white/70 text-sm md:text-base leading-relaxed font-light">
          <p>
            Kwesi Wusu is a filmmaker based in Ghana, driven by a passion for
            visual storytelling that moves people. From narrative-driven short
            films to high-energy music videos and polished commercial work,
            Kwesi brings a cinematic eye and a collaborative spirit to every
            project.
          </p>
          <p>
            With experience spanning direction, cinematography, and editing,
            Kwesi approaches each frame with intention — grounded in the belief
            that the best stories are the ones told honestly. Whether behind the
            camera or in the edit bay, the goal is always the same: make
            something that stays with the viewer.
          </p>
          <p>
            Based in Accra, available for projects worldwide. Let&apos;s tell
            your story.
          </p>
        </div>
        <a
          href="https://instagram.com/joey_0w"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-sm tracking-wider font-light"
          aria-label="Instagram profile"
        >
          <InstagramIcon />
          <span>@joey_0w</span>
        </a>
      </div>
    </section>
  );
}
