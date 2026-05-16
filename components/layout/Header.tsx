"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { ArchIcon } from "@/components/ui/ArchIcon";
import { MobileMenu } from "./MobileMenu";
import { navigation, studio } from "@/lib/content";

// CSS custom property used by .nav-reveal for staggered delay
const reveal = (i: number) =>
  ({ "--reveal-i": i } as CSSProperties);

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-500",
        scrolled &&
          "bg-bone/70 backdrop-blur-md shadow-[0_1px_0_0_rgba(163,158,148,0.25)]"
      )}
    >
      <div className="container-edge">
        <div className="flex items-center justify-between py-5 md:py-6">
          <Link
            href="/"
            className="nav-reveal group flex items-center gap-3"
            aria-label={studio.name}
            style={reveal(1)}
          >
            <ArchIcon className="h-7 w-auto text-ink transition-transform duration-700 group-hover:-translate-y-0.5" />
            <span className="font-mono-label !text-[0.7rem] text-ink">
              Atheliê · Arquitetura
            </span>
          </Link>

          {/* right group: nav + conversar pill */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-8" aria-label="primary">
              {navigation.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-reveal pretty-link font-mono-label text-ink"
                  style={reveal(i + 2)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <a
              href={studio.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-reveal inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono-label text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-bone"
              style={reveal(navigation.length + 2)}
            >
              Conversar
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
              >
                <path
                  d="M1 5 H9 M6 2 L9 5 L6 8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </a>
          </div>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
