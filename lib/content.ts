export type ProjectCategory = "residencial" | "comercial" | "corporativo";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  city: string;
  year: number;
  image: string;
  imageAlt: string;
};

export type Service = {
  slug: string;
  ordinal: string;
  name: string;
  tagline: string;
  description: string;
};

export type Founder = {
  name: string;
  role: string;
  bio: string;
};

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const studio = {
  name: "Atheliê Arquitetura",
  shortName: "Atheliê",
  tagline: "Arquitetura que conta a sua história.",
  manifesto:
    "Acreditamos que cada projeto é uma oportunidade de contar uma história única — unindo estética, funcionalidade e conforto em ambientes feitos para durar.",
  cities: ["Fortaleza", "São Paulo", "Alphaville"],
  phone: "(85) 9.9145-5979",
  phoneHref: "tel:+5585991455979",
  email: "atheliearquitetura@gmail.com",
  whatsapp: "https://wa.me/message/CNLSM24A456OM1",
  instagram: "https://instagram.com/ath.elie",
  instagramHandle: "@ath.elie",
};

export const navigation = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contato", href: "/contato" },
];

export const heroFeature = {
  image: unsplash("1600210491892-03d54c0aaf87", 2000),
  imageAlt: "Sala de estar contemporânea com paleta neutra, sofá curvo e luz natural",
  projectName: "Apartamento Beira Mar",
  projectCity: "Fortaleza · CE",
  projectCategory: "residencial",
  projectYear: 2024,
};

export const projects: Project[] = [
  {
    slug: "apartamento-beira-mar",
    name: "Apartamento Beira Mar",
    category: "residencial",
    city: "Fortaleza · CE",
    year: 2024,
    image: unsplash("1600566753190-17f0baa2a6c3"),
    imageAlt: "Sala de estar com vista para o mar, paleta neutra e mobiliário curvo",
  },
  {
    slug: "escritorio-pwr",
    name: "Escritório PWR",
    category: "corporativo",
    city: "São Paulo · SP",
    year: 2024,
    image: unsplash("1497366811353-6870744d04b2"),
    imageAlt: "Escritório corporativo aberto com mesa de madeira clara e iluminação difusa",
  },
  {
    slug: "consultorio-rafaela-holanda",
    name: "Consultório Rafaela Holanda",
    category: "comercial",
    city: "Fortaleza · CE",
    year: 2023,
    image: unsplash("1556909114-f6e7ad7d3136"),
    imageAlt: "Consultório com poltrona elegante, parede em tom areia e luz suave",
  },
  {
    slug: "aviarte-sp",
    name: "Aviarte",
    category: "comercial",
    city: "São Paulo · SP",
    year: 2023,
    image: unsplash("1604014237800-1c9102c219da"),
    imageAlt: "Loja com prateleiras curvas, paleta quente e iluminação focal",
  },
];

export const services: Service[] = [
  {
    slug: "consultoria",
    ordinal: "01",
    name: "Consultoria",
    tagline: "Para quem quer mudar o essencial.",
    description:
      "Avaliação técnica e visual do ambiente com soluções profissionais para funcionalidade e design — sem um projeto detalhado.",
  },
  {
    slug: "projeto-completo",
    ordinal: "02",
    name: "Projeto Completo",
    tagline: "Do briefing à última especificação.",
    description:
      "Estudo preliminar, anteprojeto, executivo, detalhamento, 3D e acompanhamento. Atenção rigorosa ao processo e à atmosfera do espaço.",
  },
  {
    slug: "execucao",
    ordinal: "03",
    name: "Execução",
    tagline: "Da planta à entrega das chaves.",
    description:
      "Gerenciamento de obra, fornecedores, cronograma e compras. Controle de qualidade com transparência em cada etapa.",
  },
];

export const founders: Founder[] = [
  {
    name: "Andressa Hora",
    role: "Co-fundadora · Criação",
    bio: "Pós-graduada em Design de Interiores pelo IED. Traz delicadeza, leveza e espontaneidade para cada projeto — sempre envolvida na área criativa.",
  },
  {
    name: "Tainah Hora",
    role: "Co-fundadora · Processo",
    bio: "Especializada em projetos paramétricos pela Belas Artes. Foca em identidade e processo, com perspicácia e objetividade.",
  },
];

export const foundersPortrait = {
  src: unsplash("1573496359142-b8d87734a5a2", 1400),
  alt: "Andressa e Tainah Hora, sócias da Atheliê Arquitetura, em sessão de trabalho",
};

export const processSteps = [
  {
    ordinal: "01",
    name: "Briefing",
    description:
      "Escutamos suas ideias, rotinas e referências. É aqui que nasce a identidade do projeto.",
  },
  {
    ordinal: "02",
    name: "Estudo",
    description:
      "Partido arquitetônico, moodboards e estudos volumétricos para alinhar a direção.",
  },
  {
    ordinal: "03",
    name: "Projeto",
    description:
      "Anteprojeto, executivo, detalhamento e especificações — tudo pronto para a obra.",
  },
  {
    ordinal: "04",
    name: "Obra",
    description:
      "Acompanhamento técnico e curadoria de fornecedores até a entrega das chaves.",
  },
];
