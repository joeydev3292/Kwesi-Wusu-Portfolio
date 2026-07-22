import Link from "next/link";
import Image from "next/image";
import { ProjectSlideshow } from "@/components/ProjectSlideshow";
import { getProjectVideos } from "@/sanity/lib/queries";

export default async function Home() {
  const videoIds = await getProjectVideos();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <ProjectSlideshow videoIds={videoIds} />
      <div className="absolute inset-0 bg-[rgba(17,19,24,0.55)]" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-6">
        <Link
          href="/"
          className="mb-4 md:mb-0 px-4 animate-[fadeInDown_0.6s_ease-out]"
          aria-label="Kwesi Wusu — Home"
        >
          <Image
            src="/kwesiwusulogo.svg"
            alt="Kwesi Wusu"
            width={70}
            height={19}
            className="w-auto h-auto"
            priority
          />
        </Link>
        <nav className="flex flex-col items-center gap-2">
          <Link
            href="/works"
            className="relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 active:after:w-full active:after:left-0 text-lg md:text-xl font-light text-white/80 hover:text-accent active:bg-white/10 active:scale-95 active:text-accent transition-all duration-300 px-4 py-1 -mx-4 -my-1 rounded animate-[fadeInUp_0.6s_ease-out_0.1s_both]"
          >
            WORKS
          </Link>
          <Link
            href="/contact"
            className="relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 active:after:w-full active:after:left-0 text-lg md:text-xl font-light text-white/80 hover:text-accent active:bg-white/10 active:scale-95 active:text-accent transition-all duration-300 px-4 py-1 -mx-4 -my-1 rounded animate-[fadeInUp_0.6s_ease-out_0.2s_both]"
          >
            CONTACT ME
          </Link>
          <Link
            href="/about"
            className="relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 active:after:w-full active:after:left-0 text-lg md:text-xl font-light text-white/80 hover:text-accent active:bg-white/10 active:scale-95 active:text-accent transition-all duration-300 px-4 py-1 -mx-4 -my-1 rounded animate-[fadeInUp_0.6s_ease-out_0.3s_both]"
          >
            ABOUT
          </Link>
        </nav>
      </div>

      <a
        href="https://instagram.com/joey_0w"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-10 left-10 z-20 flex items-center text-white/60 hover:text-accent transition-colors"
        aria-label="Instagram profile"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
    </section>
  );
}
