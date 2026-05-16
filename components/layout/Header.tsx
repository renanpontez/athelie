import Link from "next/link";
import { ArchIcon } from "@/components/ui/ArchIcon";
import { MobileMenu } from "./MobileMenu";
import { navigation, studio } from "@/lib/content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="container-edge">
        <div className="flex items-center justify-between py-5 md:py-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={studio.name}
          >
            <ArchIcon className="h-7 w-auto text-ink transition-transform duration-700 group-hover:-translate-y-0.5" />
            <span className="font-mono-label !text-[0.7rem] text-ink">
              Atheliê · Arquitetura
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="primary"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="pretty-link font-mono-label text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={studio.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-mono-label text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-bone"
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

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
