export type ProjectCategory = "residencial" | "comercial" | "corporativo";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  city: string;
  year: number;
  image: string;
  imageAlt: string;
  area?: string;
  scope?: string[];
  summary?: string;
  description?: string;
  gallery?: { src: string; alt: string }[];
};

export type Service = {
  slug: string;
  ordinal: string;
  name: string;
  tagline: string;
  description: string;
  forWho?: string[];
  includes?: string[];
  steps?: { name: string; description: string }[];
  duration?: string;
  faq?: { q: string; a: string }[];
  relatedProjectSlugs?: string[];
  differentiators?: { title: string; description: string }[];
};

export type Pillar = {
  ordinal: string;
  name: string;
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
  image: unsplash("1497366811353-6870744d04b2", 2000),
  imageAlt: "Escritório corporativo PWR — São Paulo, com madeira clara e iluminação difusa",
  projectName: "Escritório PWR",
  projectCity: "São Paulo · SP",
  projectCategory: "corporativo",
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
    area: "180m²",
    scope: ["Projeto Completo", "Execução"],
    summary:
      "Um lar à beira-mar pensado para abraçar a paisagem — paleta neutra, curvas suaves e materiais que envelhecem bem.",
    description:
      "Reforma completa de um apartamento à beira-mar, projetado para integrar a vista da janela à atmosfera dos ambientes. Optamos por uma paleta de areia, marfim e madeira clara, com mobiliário curvo que dialoga com a linha do horizonte. Todos os ambientes sociais foram desenhados para receber família e amigos sem perder a sensação de refúgio.",
    gallery: [
      { src: unsplash("1600210492486-724fe5c67fb0"), alt: "Sala íntima com sofá curvo e luz natural" },
      { src: unsplash("1600585154340-be6161a56a0c"), alt: "Vista panorâmica do living" },
      { src: unsplash("1618221195710-dd6b41faaea6"), alt: "Quarto principal em tons de areia" },
      { src: unsplash("1502672260266-1c1ef2d93688"), alt: "Detalhe de mesa lateral em madeira" },
    ],
  },
  {
    slug: "escritorio-pwr",
    name: "Escritório PWR",
    category: "corporativo",
    city: "São Paulo · SP",
    year: 2024,
    image: unsplash("1497366811353-6870744d04b2"),
    imageAlt: "Escritório corporativo aberto com mesa de madeira clara e iluminação difusa",
    area: "320m²",
    scope: ["Projeto Completo", "Acompanhamento de Obra"],
    summary:
      "Escritório corporativo que equilibra produtividade e identidade — madeira clara, vidro e zonas de descompressão.",
    description:
      "Projeto de uma sede corporativa em São Paulo, com áreas abertas de trabalho, salas de reunião acústicas e copa-lounge para integração do time. A identidade do escritório foi traduzida em uma paleta sóbria com pontos de cor controlados, mobiliário modular e iluminação difusa de baixa temperatura.",
    gallery: [
      { src: unsplash("1497366216548-37526070297c"), alt: "Sala de reunião com painel acústico" },
      { src: unsplash("1497215842964-222b430dc094"), alt: "Posto de trabalho aberto" },
      { src: unsplash("1505691938895-1758d7feb511"), alt: "Lounge corporativo" },
    ],
  },
  {
    slug: "consultorio-rafaela-holanda",
    name: "Consultório Rafaela Holanda",
    category: "comercial",
    city: "Fortaleza · CE",
    year: 2023,
    image: unsplash("1556909114-f6e7ad7d3136"),
    imageAlt: "Consultório com poltrona elegante, parede em tom areia e luz suave",
    area: "60m²",
    scope: ["Projeto Completo"],
    summary:
      "Um consultório acolhedor que reflete a presença e a marca pessoal da profissional.",
    description:
      "Projeto de consultório clínico em Fortaleza, desenhado para acolher pacientes em um ambiente sereno e elegante. A paleta combina tons quentes de areia, madeira e cortinas leves que filtram a luz. Cada detalhe — do mobiliário à iluminação — foi escolhido para reforçar a marca pessoal e a tranquilidade do atendimento.",
    gallery: [
      { src: unsplash("1604014237800-1c9102c219da"), alt: "Recepção do consultório" },
      { src: unsplash("1611892440504-42a792e24d32"), alt: "Sala de atendimento" },
    ],
  },
  {
    slug: "aviarte-sp",
    name: "Aviarte",
    category: "comercial",
    city: "São Paulo · SP",
    year: 2023,
    image: unsplash("1604014237800-1c9102c219da"),
    imageAlt: "Loja com prateleiras curvas, paleta quente e iluminação focal",
    area: "95m²",
    scope: ["Projeto Completo"],
    summary:
      "Varejo com identidade — prateleiras curvas, paleta quente e jornada de cliente cuidadosamente coreografada.",
    description:
      "Projeto comercial para a Aviarte, em São Paulo. A loja foi pensada como uma sequência de cenas curatoriais: arcos e curvas guiam o olhar pelas vitrines, enquanto a iluminação focal valoriza cada peça em exposição. A paleta quente reforça a sensação de hospitalidade.",
    gallery: [
      { src: unsplash("1567401893414-76b7b1e5a7a5"), alt: "Vitrine principal" },
      { src: unsplash("1615874959474-d609969a20ed"), alt: "Detalhe das prateleiras curvas" },
    ],
  },
  {
    slug: "capital-upgrade-alphaville",
    name: "Capital Upgrade",
    category: "corporativo",
    city: "Alphaville · SP",
    year: 2023,
    image: unsplash("1618219944342-824e40a13285"),
    imageAlt: "Sala corporativa com painéis ripados de madeira e iluminação cênica",
    area: "210m²",
    scope: ["Projeto Completo"],
    summary:
      "Escritório executivo em Alphaville com identidade discreta e materialidade marcante.",
  },
  {
    slug: "consultorio-transfer-psicologia",
    name: "Consultório Transfer Psicologia",
    category: "comercial",
    city: "Fortaleza · CE",
    year: 2023,
    image: unsplash("1611892440504-42a792e24d32"),
    imageAlt: "Sala de atendimento com poltronas confortáveis e tons quentes",
    area: "55m²",
    scope: ["Projeto Completo"],
    summary:
      "Espaço acolhedor para terapia, com luz indireta e isolamento acústico cuidadoso.",
  },
  {
    slug: "loja-engenhoca-parque",
    name: "Loja Engenhoca Parque",
    category: "comercial",
    city: "Fortaleza · CE",
    year: 2022,
    image: unsplash("1567401893414-76b7b1e5a7a5"),
    imageAlt: "Loja conceitual com mobiliário lúdico e cores vivas",
    area: "120m²",
    scope: ["Projeto Completo"],
    summary:
      "Loja conceitual com identidade lúdica e jornada de cliente desenhada para famílias.",
  },
  {
    slug: "apartamento-cozinha-verde",
    name: "Apartamento Cozinha Verde",
    category: "residencial",
    city: "Fortaleza · CE",
    year: 2024,
    image: unsplash("1565182999561-18d7dc61c393"),
    imageAlt: "Cozinha com armários verdes e bancada de mármore",
    area: "140m²",
    scope: ["Projeto Completo", "Execução"],
    summary:
      "Reforma de cozinha integrada com armários em tom verde-musgo e detalhes em latão.",
  },
  {
    slug: "apartamento-briza",
    name: "Apartamento Briza",
    category: "residencial",
    city: "Fortaleza · CE",
    year: 2024,
    image: unsplash("1600210492486-724fe5c67fb0"),
    imageAlt: "Sala leve e ventilada com mobiliário em fibras naturais",
    area: "95m²",
    scope: ["Consultoria", "Projeto Completo"],
    summary:
      "Apartamento compacto repensado para ventilação natural e materiais leves.",
  },
  {
    slug: "projeto-pequena-magia",
    name: "Projeto Pequena Magia",
    category: "residencial",
    city: "Fortaleza · CE",
    year: 2022,
    image: unsplash("1618221195710-dd6b41faaea6"),
    imageAlt: "Quarto infantil com paleta suave e mobiliário sob medida",
    area: "30m²",
    scope: ["Projeto Completo"],
    summary:
      "Quarto infantil sob medida, com soluções de armazenamento e atmosfera lúdica.",
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  residencial: "Residencial",
  comercial: "Comercial",
  corporativo: "Corporativo",
};

export const services: Service[] = [
  {
    slug: "consultoria",
    ordinal: "01",
    name: "Consultoria",
    tagline: "Para quem quer mudar o essencial.",
    description:
      "Avaliação técnica e visual do ambiente com soluções profissionais para funcionalidade e design — sem um projeto detalhado.",
    duration: "2 a 3 semanas",
    forWho: [
      "Você quer ajustes pontuais sem fazer uma reforma completa.",
      "Já tem o espaço pronto e quer um olhar profissional sobre o que melhorar.",
      "Procura a primeira aproximação com um estúdio antes de contratar um projeto maior.",
    ],
    includes: [
      "Visita técnica e diagnóstico do ambiente.",
      "Paleta de cores, materiais e referências visuais.",
      "Plano de ação priorizado, com pequenas e médias intervenções.",
      "Reunião de devolutiva com tudo documentado.",
    ],
    steps: [
      { name: "Briefing", description: "Entendemos suas rotinas, gostos e expectativas." },
      { name: "Visita", description: "Avaliação presencial ou virtual com fotos detalhadas." },
      { name: "Estudo", description: "Diagnóstico técnico + sugestões de melhorias." },
      { name: "Devolutiva", description: "Reunião final com plano de ação e próximos passos." },
    ],
    faq: [
      {
        q: "A consultoria substitui um projeto completo?",
        a: "Não. A consultoria é ideal para mudanças pontuais. Se você precisa de planta, executivo e detalhamento, vale considerar o Projeto Completo.",
      },
      {
        q: "A consultoria pode evoluir para um projeto?",
        a: "Sim. Muitos clientes começam pela consultoria e seguem com a gente para o projeto completo. O valor inicial é considerado no escopo seguinte.",
      },
    ],
    relatedProjectSlugs: ["apartamento-briza", "consultorio-transfer-psicologia"],
  },
  {
    slug: "projeto-completo",
    ordinal: "02",
    name: "Projeto Completo",
    tagline: "Do briefing à última especificação.",
    description:
      "Estudo preliminar, anteprojeto, executivo, detalhamento, 3D e acompanhamento. Atenção rigorosa ao processo e à atmosfera do espaço.",
    duration: "8 a 16 semanas, conforme escala",
    forWho: [
      "Reforma completa de apartamento, casa, consultório, loja ou escritório.",
      "Imóvel novo na planta que precisa de planejamento desde o início.",
      "Quem busca um projeto pensado nos detalhes, com identidade clara.",
    ],
    includes: [
      "Briefing aprofundado e moodboard de direção.",
      "Estudo preliminar e anteprojeto.",
      "Projeto executivo completo (plantas técnicas, marcenaria, elétrica, hidráulica).",
      "Detalhamento e especificações de materiais e mobiliário.",
      "Render 3D dos ambientes principais.",
      "Acompanhamento técnico durante a obra.",
    ],
    steps: [
      { name: "Briefing", description: "Identidade do projeto, rotinas, restrições, referências." },
      { name: "Estudo", description: "Partido arquitetônico, moodboards, estudos volumétricos." },
      { name: "Anteprojeto", description: "Plantas iniciais com layout aprovado." },
      { name: "Executivo", description: "Detalhamento completo de marcenaria, elétrica e hidráulica." },
      { name: "Especificações", description: "Curadoria de materiais, mobiliário, iluminação." },
      { name: "Acompanhamento", description: "Suporte técnico durante a execução." },
    ],
    differentiators: [
      {
        title: "Processo paramétrico",
        description: "Tainah traduz o partido em modelos paramétricos, garantindo precisão técnica em cada decisão.",
      },
      {
        title: "Atmosfera com intenção",
        description: "Andressa cuida da atmosfera — luz, materialidade, gestos — para que o espaço conte uma história.",
      },
    ],
    faq: [
      {
        q: "Quanto tempo dura um projeto completo?",
        a: "De 8 a 16 semanas, dependendo da metragem, complexidade e nível de detalhamento desejado.",
      },
      {
        q: "Vocês fazem 3D realista?",
        a: "Sim. Renderizamos os ambientes principais para você visualizar a proposta antes da obra.",
      },
      {
        q: "Posso contratar só o projeto e executar com outro construtor?",
        a: "Sim. O projeto executivo é entregue com tudo documentado para qualquer obra qualificada executar.",
      },
    ],
    relatedProjectSlugs: [
      "apartamento-beira-mar",
      "escritorio-pwr",
      "consultorio-rafaela-holanda",
    ],
  },
  {
    slug: "execucao",
    ordinal: "03",
    name: "Execução",
    tagline: "Da planta à entrega das chaves.",
    description:
      "Gerenciamento de obra, fornecedores, cronograma e compras. Controle de qualidade com transparência em cada etapa.",
    duration: "Conforme cronograma da obra",
    forWho: [
      "Você já tem um projeto pronto e quer alguém de confiança gerenciando a obra.",
      "Quer contratar projeto + execução em um único pacote.",
      "Mora em outra cidade e precisa de acompanhamento técnico local.",
    ],
    includes: [
      "Planejamento de cronograma e orçamento detalhado.",
      "Curadoria e contratação de fornecedores e mão de obra.",
      "Gestão de compras com transparência financeira.",
      "Acompanhamento técnico semanal de obra.",
      "Controle de qualidade e checklist de entrega.",
    ],
    steps: [
      { name: "Planejamento", description: "Cronograma, orçamento, definição de fornecedores." },
      { name: "Compras", description: "Curadoria e aquisição de materiais e mobiliário." },
      { name: "Obra", description: "Execução com acompanhamento técnico semanal." },
      { name: "Entrega", description: "Vistoria final, checklist e entrega das chaves." },
    ],
    differentiators: [
      {
        title: "Transparência financeira",
        description: "Você acompanha cada compra e cada serviço — sem surpresas no fechamento.",
      },
      {
        title: "Curadoria de fornecedores",
        description: "Trabalhamos com uma rede de profissionais selecionados em Fortaleza, SP e Alphaville.",
      },
    ],
    faq: [
      {
        q: "Vocês executam projetos de outros arquitetos?",
        a: "Sim, mediante avaliação técnica do projeto e alinhamento com o escritório de origem.",
      },
      {
        q: "Como funciona o controle financeiro?",
        a: "Apresentamos planilha de obra atualizada semanalmente, com todos os recibos e comprovantes.",
      },
    ],
    relatedProjectSlugs: ["capital-upgrade-alphaville", "aviarte-sp"],
  },
];

export const pillars: Pillar[] = [
  {
    ordinal: "01",
    name: "Conforto",
    description:
      "Cada decisão — escala, luz, materialidade — é tomada para que o ambiente abrace quem o vive.",
  },
  {
    ordinal: "02",
    name: "Funcionalidade",
    description:
      "Beleza sem função não dura. Estudamos rotinas reais para que o espaço trabalhe a seu favor.",
  },
  {
    ordinal: "03",
    name: "Modernidade",
    description:
      "Soluções contemporâneas, materiais que envelhecem bem e atenção ao que é atemporal.",
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
  src: "/founders.png",
  alt: "Andressa e Tainah Hora, sócias da Atheliê Arquitetura",
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
