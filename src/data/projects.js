export const projects = [
  {
    name: "QualiQ",
    year: "2026",
    images: [
      "/projects/qualiq-login.webp",
      "/projects/qualiq-dimensoes.webp",
      "/projects/qualiq-slas.webp",
    ],
    stack: ["Angular", "TypeScript", "Supabase", "Tailwind CSS"],
    description: {
      pt: "Sistema de Gestão da Qualidade (SGQ) que transforma informação em conhecimento, decisão e melhoria contínua.",
      en: "A Quality Management System (QMS) that turns information into knowledge, decisions, and continuous improvement.",
    },
    links: [],
    demo: "https://qualiq-homo.vercel.app",
  },
  {
    name: "Codei",
    year: "2026",
    images: [
      "/projects/codei-perfil.webp",
      "/projects/codei-post.webp",
      "/projects/codei-feed.webp",
    ],
    stack: ["Angular", "TypeScript", "AdonisJS", "Socket.IO"],
    description: {
      pt: "Rede social para desenvolvedores com feed, perfis, amizades e mensagens em tempo real.",
      en: "A social network for developers with a feed, profiles, friendships and real-time messaging.",
    },
    links: [
      {
        kind: "frontend",
        url: "https://github.com/oeduardodev/PROJETO-Codei-frontend",
      },
      {
        kind: "backend",
        url: "https://github.com/oeduardodev/PROJETO-Codei-backend",
      },
    ],
    demo: "https://projeto-codei-frontend.vercel.app",
  },
  {
    name: "Ninho",
    year: "2026",
    images: [
      "/projects/ninho-login.webp",
      "/projects/ninho-cadastro.webp",
      "/projects/ninho-comunidade.webp",
    ],
    stack: ["React Native", "Expo", "NestJS", "PostgreSQL"],
    description: {
      pt: "Aplicativo de saúde mental com autenticação e uma comunidade para compartilhar e acolher.",
      en: "A mental health app with authentication and a community built for sharing and support.",
    },
    links: [
      {
        kind: "frontend",
        url: "https://github.com/oeduardodev/PROJETO-Ninho-frontend",
      },
      {
        kind: "backend",
        url: "https://github.com/oeduardodev/PROJETO-Ninho-backend",
      },
    ],
  },
];
