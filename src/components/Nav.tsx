"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/works", label: "WORKS" },
  { href: "/contact", label: "CONTACT ME" },
  { href: "/about", label: "ABOUT" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-6 pb-8 px-8 bg-[rgba(17,19,24,0.85)] backdrop-blur-sm [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
      <Link
        href="/"
        aria-label="Kwesi Wusu — Home"
        className="mb-4 md:mb-0"
      >
        <Image
          src="/kwesiwusulogo.svg"
          alt="Kwesi Wusu"
          width={120}
          height={32}
          className="w-auto h-16"
          priority
        />
      </Link>
      <ul className="flex items-center gap-8 mt-0">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm tracking-widest transition-colors ${
                  isActive
                    ? "text-accent font-medium"
                    : "text-white/80 hover:text-white font-light"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
