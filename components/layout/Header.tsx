"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { ArchIcon } from "@/components/ui/ArchIcon";
import { MobileMenu } from "./MobileMenu";
import { urlFor } from "@/sanity/lib/image";
import type { Navigation, SiteSettings } from "@/sanity/types";

const FALLBACK_NAV = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
];

const reveal = (i: number) => ({ "--reveal-i": i } as CSSProperties);

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function safeLogoUrl(logo: Navigation["logo"]): string {
  if (!logo || !logo.asset) return "";
  try {
    return urlFor(logo).width(240).url();
  } catch {
    return "";
  }
}

type Props = {
  navigation?: Navigation | null;
  settings?: SiteSettings | null;
};

export function Header({ navigation, settings }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links =
    navigation?.primary && navigation.primary.length > 0
      ? navigation.primary
      : FALLBACK_NAV;

  const companyName =
    navigation?.companyName ?? settings?.name ?? "Atheliê Arquitetura";
  const whatsapp = settings?.whatsapp;

  const logoUrl = useMemo(() => safeLogoUrl(navigation?.logo), [navigation?.logo]);
  const logoAlt = navigation?.logo?.alt ?? companyName;

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
            aria-label={companyName}
            style={reveal(1)}
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={28}
                height={28}
                className="h-7 w-auto transition-transform duration-700 group-hover:-translate-y-0.5"
                priority
              />
            ) : (
              <ArchIcon className="h-7 w-auto text-ink transition-transform duration-700 group-hover:-translate-y-0.5" />
            )}
            <span className="font-mono-label !text-[0.7rem] text-ink">
              {companyName}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-8" aria-label="primary">
              {links.map((item, i) => {
                const active = isNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "nav-reveal pretty-link font-mono-label transition-colors duration-300",
                      active
                        ? "text-sage-dark"
                        : "text-ink hover:text-sage-dark"
                    )}
                    style={reveal(i + 2)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-reveal inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono-label text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-bone"
                style={reveal(links.length + 2)}
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
            )}
          </div>

          <MobileMenu navigation={navigation} settings={settings} />
        </div>
      </div>
    </header>
  );
}
