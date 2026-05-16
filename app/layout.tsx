import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteAnimations } from "@/components/SiteAnimations";

export const metadata: Metadata = {
  title:
    "Atheliê Arquitetura · Arquitetura de interiores que conta histórias",
  description:
    "Estúdio de arquitetura de interiores fundado por Andressa e Tainah Hora. Projetos residenciais, comerciais e corporativos com estética, funcionalidade e conforto.",
  openGraph: {
    title:
      "Atheliê Arquitetura · Arquitetura de interiores que conta histórias",
    description:
      "Estúdio de arquitetura de interiores fundado por Andressa e Tainah Hora.",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SiteAnimations />
      </body>
    </html>
  );
}
