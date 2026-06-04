"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { Navigation, SiteSettings } from "@/sanity/types";

const FALLBACK_NAV = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
];

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

type Props = {
  navigation?: Navigation | null;
  settings?: SiteSettings | null;
};

export function MobileMenu({ navigation, settings }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  const links =
    navigation?.primary && navigation.primary.length > 0
      ? navigation.primary
      : FALLBACK_NAV;

  const whatsapp = settings?.whatsapp;
  const instagram = settings?.instagram;
  const instagramHandle = settings?.instagramHandle;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Abrir menu"
        className="md:hidden inline-flex flex-col gap-1.5 p-2"
      >
        <span className="block h-px w-6 bg-ink" />
        <span className="block h-px w-6 bg-ink" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md container-edge flex flex-col"
      >
        <nav
          className="flex-1 flex flex-col items-center justify-center gap-8 text-center"
          aria-label="mobile"
        >
          {links.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-display text-4xl leading-none transition-colors duration-300",
                  active
                    ? "text-sage-dark italic"
                    : "text-ink hover:text-sage-dark"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex flex-col items-center gap-4 pb-10">
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-mono-label text-bone"
            >
              Iniciar conversa
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M1 7 H13 M8 2 L13 7 L8 12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </a>
          )}
          {instagram && instagramHandle && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-label text-stone hover:text-ink transition-colors"
            >
              {instagramHandle}
            </a>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
