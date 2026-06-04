import Image from "next/image";
import Link from "next/link";
import { ArchIcon } from "@/components/ui/ArchIcon";
import { Hairline } from "@/components/ui/Hairline";
import { urlFor } from "@/sanity/lib/image";
import type { Navigation, SiteSettings } from "@/sanity/types";

const FALLBACK_NAV = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
];

function safeLogoUrl(logo: Navigation["logo"]): string {
  if (!logo || !logo.asset) return "";
  try {
    return urlFor(logo).width(320).url();
  } catch {
    return "";
  }
}

type Props = {
  navigation?: Navigation | null;
  settings?: SiteSettings | null;
};

export function Footer({ navigation, settings }: Props) {
  const year = new Date().getFullYear();
  const links =
    navigation?.footer && navigation.footer.length > 0
      ? navigation.footer
      : navigation?.primary && navigation.primary.length > 0
      ? navigation.primary
      : FALLBACK_NAV;

  const companyName =
    navigation?.companyName ?? settings?.name ?? "Atheliê Arquitetura";
  const tagline =
    settings?.tagline ??
    "Estamos prontas para ouvir suas ideias, desenhar projetos e realizar sonhos.";
  const cities = settings?.cities ?? [];
  const logoUrl = safeLogoUrl(navigation?.logo);
  const logoAlt = navigation?.logo?.alt ?? companyName;

  return (
    <footer className="container-edge pb-10 pt-24 md:pt-32">
      <Hairline />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-12">
        <div className="md:col-span-5 flex items-start gap-4">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          ) : (
            <ArchIcon className="h-10 w-auto text-ink" />
          )}
          <div>
            <p className="font-display text-2xl leading-tight">
              {companyName.split(" ").map((part, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="italic text-sage-dark">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part} </span>
                )
              )}
            </p>
            <p className="mt-2 max-w-xs text-sm text-ink-2">{tagline}</p>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono-label text-stone">Navegação</p>
          <ul className="mt-4 space-y-2">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="pretty-link text-ink text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono-label text-stone">Contato</p>
          <ul className="mt-4 space-y-2 text-sm">
            {settings?.phone && (
              <li>
                <a
                  href={settings.phoneHref ?? `tel:${settings.phone}`}
                  className="pretty-link"
                >
                  {settings.phone}
                </a>
              </li>
            )}
            {settings?.email && (
              <li>
                <a href={`mailto:${settings.email}`} className="pretty-link">
                  {settings.email}
                </a>
              </li>
            )}
            {settings?.instagram && (
              <li>
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pretty-link"
                >
                  Instagram {settings.instagramHandle ?? ""}
                </a>
              </li>
            )}
            {settings?.whatsapp && (
              <li>
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pretty-link"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-mono-label text-stone">
          © {year} {companyName} · Todos os direitos reservados
        </p>
        {cities.length > 0 && (
          <p className="font-mono-label text-stone">{cities.join(" · ")}</p>
        )}
      </div>
    </footer>
  );
}
