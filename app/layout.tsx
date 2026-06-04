import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteAnimations } from "@/components/SiteAnimations";
import { sanityFetch } from "@/sanity/client";
import {
  NAVIGATION_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";
import type { Navigation, SiteSettings } from "@/sanity/types";
import { buildMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ["settings"],
  });
  return buildMetadata({ settings });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navigation, settings] = await Promise.all([
    sanityFetch<Navigation | null>({
      query: NAVIGATION_QUERY,
      tags: ["navigation"],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["settings"],
    }),
  ]);

  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header navigation={navigation} settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer navigation={navigation} settings={settings} />
        <SiteAnimations />
      </body>
    </html>
  );
}
