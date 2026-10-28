import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { projects } from "./data/projects";
import "./App.css";

const socialLinks = [
  { label: "GitHub", url: "https://github.com/oeduardodev", Icon: FaGithub },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/oeduardodev/",
    Icon: FaLinkedinIn,
  },
];

const copy = {
  pt: {
    pageTitle: "Eduardo Leite | Desenvolvedor Front-end",
    metaDescription: "Portfólio de Eduardo Leite, desenvolvedor front-end com 4 anos de experiência em Angular, React e TypeScript, criando SPAs, dashboards e ERPs.",
    homeLabel: "Eduardo Leite — início",
    navLabel: "Navegação principal",
    languageLabel: "Idioma",
    socialLabel: "Redes sociais",
    portraitAlt: "Retrato de Eduardo Leite",
    nav: [
      ["Início", "inicio"],
      ["Projetos", "projetos"],
      ["Experiência", "experiencia"],
      ["Sobre", "sobre"],
      ["Contato", "contato"],
    ],
    greeting: "Olá, eu sou Eduardo Leite",
    heroStart: "Desenvolvedor",
    heroHighlight: "front-end",
    heroEnd: "com foco em aplicações web.",
    intro:
      "Há 4 anos desenvolvo Landing pages, SaaS, SPAs, dashboards e ERPs com Angular, React e TypeScript, integrando APIs e criando interfaces modernas.",
    contactMe: "Entre em contato",
    working: "Angular · React · TypeScript",
    quote:
      "Medir o progresso da programação por linhas de código é como medir o progresso da construção de aeronaves em termos de peso.",
    quoteAttribution: "Bill Gates, Tradução Livre.",
    projects: "projetos",
    projectsIntro: "Trabalhos recentes publicados no meu GitHub.",
    allRepos: "Todos os repositórios",
    frontend: "Frontend",
    backend: "API",
    code: "Código",
    demo: "Acessar",
    experience: "experiência",
    experienceIntro: "Minha trajetória em produtos web e interfaces corporativas.",
    experienceItems: [
      {
        company: "Vox Tecnologia",
        role: "Desenvolvedor Frontend",
        period: "mar/2025 – out/2026",
        description: "Desenvolvimento de ERPs municipais com Angular e TypeScript, integração de APIs RESTful com RxJS, componentes reutilizáveis, microfrontends e testes com Jasmine e Karma.",
      },
      {
        company: "Data Core Solutions Services",
        role: "Desenvolvedor Frontend",
        period: "out/2023 – mar/2025",
        description: "Criação de dashboards, SPAs e interfaces responsivas com Angular, React e TypeScript, com foco em componentização, gerenciamento de estado e integração de APIs.",
      },
      {
        company: "CL Importados",
        role: "Desenvolvedor Fullstack · freelance",
        period: "nov/2022 – out/2023",
        description: "Desenvolvimento de páginas comerciais e aplicações web com React, JavaScript e TypeScript, além de serviços e APIs com Node.js, Express e AdonisJS.",
      },
    ],
    skills: "habilidades",
    skillsIntro: "Tecnologias e práticas presentes na minha experiência profissional.",
    about: "sobre-mim",
    aboutIntro: "Minha atuação como desenvolvedor front-end.",
    aboutTitle: "Olá, eu sou o Eduardo!",
    aboutText: [
      "Sou desenvolvedor front-end com 4 anos de experiência e formação em Análise e Desenvolvimento de Sistemas pela Faculdade VINCIT. Atuei na construção de ERPs, dashboards, SPAs e interfaces comerciais e institucionais.",
      "Trabalho com Angular, React e TypeScript, criando componentes reutilizáveis, interfaces responsivas e integrações de APIs RESTful. Valorizo código organizado, testes e colaboração em equipes ágeis.",
    ],
    education: "formação",
    educationIntro: "Formação acadêmica.",
    educationItems: [
      ["Análise e Desenvolvimento de Sistemas", "Faculdade VINCIT · jan/2023 – mar/2025"],
    ],
    contact: "contato",
    contactIntro: "Tem uma ideia, projeto ou oportunidade? Vamos conversar.",
    contactBody:
      "Entre em contato por e-mail ou LinkedIn. Você também pode conhecer meus projetos no GitHub.",
    contactTitle: "Onde me encontrar",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    role: "Desenvolvedor front-end",
    media: "Redes",
    madeBy: "Feito por Eduardo Leite",
  },
  en: {
    pageTitle: "Eduardo Leite | Front-end Developer",
    metaDescription: "Eduardo Leite's portfolio: front-end developer with 4 years of experience building SPAs, dashboards and ERPs with Angular, React and TypeScript.",
    homeLabel: "Eduardo Leite — home",
    navLabel: "Main navigation",
    languageLabel: "Language",
    socialLabel: "Social links",
    portraitAlt: "Portrait of Eduardo Leite",
    nav: [
      ["Home", "inicio"],
      ["Projects", "projetos"],
      ["Experience", "experiencia"],
      ["About", "sobre"],
      ["Contact", "contato"],
    ],
    greeting: "Hi, I'm Eduardo Leite",
    heroStart: "A",
    heroHighlight: "front-end developer",
    heroEnd: "focused on web applications.",
    intro:
      "For 4 years, I have built SPAs, dashboards and ERP interfaces with Angular, React and TypeScript, integrating APIs and creating responsive experiences.",
    contactMe: "Get in touch",
    working: "Angular · React · TypeScript",
    quote:
      "Measuring programming progress by lines of code is like measuring aircraft construction progress by weight.",
    quoteAttribution: "Bill Gates, Tradução Livre.",
    projects: "projects",
    projectsIntro: "Recent work published on my GitHub.",
    allRepos: "All repositories",
    frontend: "Frontend",
    backend: "API",
    code: "Code",
    demo: "Visit site",
    experience: "experience",
    experienceIntro: "My work on web products and enterprise interfaces.",
    experienceItems: [
      {
        company: "Vox Tecnologia",
        role: "Frontend Developer",
        period: "Mar 2025 – Oct 2026",
        description: "Developed municipal ERP interfaces with Angular and TypeScript, integrated RESTful APIs with RxJS, and worked on reusable components, microfrontends and Jasmine/Karma tests.",
      },
      {
        company: "Data Core Solutions Services",
        role: "Frontend Developer",
        period: "Oct 2023 – Mar 2025",
        description: "Built dashboards, SPAs and responsive interfaces with Angular, React and TypeScript, focusing on reusable components, state management and API integration.",
      },
      {
        company: "CL Importados",
        role: "Full-stack Developer · freelance",
        period: "Nov 2022 – Oct 2023",
        description: "Developed commercial pages and web applications with React, JavaScript and TypeScript, as well as services and APIs with Node.js, Express and AdonisJS.",
      },
    ],
    skills: "skills",
    skillsIntro: "Technologies and practices from my professional experience.",
    about: "about-me",
    aboutIntro: "My work as a front-end developer.",
    aboutTitle: "Hello, I'm Eduardo!",
    aboutText: [
      "I am a front-end developer with 4 years of experience and a degree in Systems Analysis and Development from Faculdade VINCIT. I have worked on ERPs, dashboards, SPAs, and commercial and institutional interfaces.",
      "I work with Angular, React and TypeScript to build reusable components, responsive interfaces and RESTful API integrations. I value well-organized code, testing and collaboration in agile teams.",
    ],
    education: "education",
    educationIntro: "Academic background.",
    educationItems: [
      ["Systems Analysis and Development", "Faculdade VINCIT · Jan 2023 – Mar 2025"],
    ],
    contact: "contact",
    contactIntro: "Have an idea, a project or an opportunity? Let’s talk.",
    contactBody: "Reach out by email or LinkedIn, and explore my projects on GitHub.",
    contactTitle: "Find me here",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    role: "Front-end developer",
    media: "Social",
    madeBy: "Made by Eduardo Leite",
  },
};

const skillGroups = [
  {
    title: { pt: "Frontend e estado", en: "Frontend & state" },
    items: "Angular · React · TypeScript · JavaScript · RxJS · NgRx · Signals",
  },
  {
    title: { pt: "Interfaces e estilos", en: "UI & styling" },
    items: "HTML5 · CSS3 · Sass/SCSS · Material UI · Angular Material · Tailwind CSS",
  },
  {
    title: { pt: "Backend e dados", en: "Backend & data" },
    items: "Node.js · Express · AdonisJS · PostgreSQL · APIs RESTful",
  },
  {
    title: { pt: "Qualidade e métodos", en: "Quality & methods" },
    items: "Jest · Jasmine · Karma · Git · Scrum · Kanban",
  },
];

function SectionHeading({ id, title, intro, action }) {
  return (
    <div className="section-heading" id={id}>
      <div className="section-heading-main">
        <h2 id={`${id}-heading`}>
          <span>#</span>
          {title}
        </h2>
        <span className="heading-rule" aria-hidden="true" />
        {action}
      </div>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function ProjectCard({ project, language, t }) {
  return (
    <article className="project-card">
      <div className="project-art" aria-hidden="true">
        <img src={project.image ?? "/project-default.png"} alt="" loading="lazy" />
      </div>
      <div className="project-stack">{project.stack.join(" · ")}</div>
      <div className="project-details">
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <span>{project.year}</span>
        </div>
        <p>{project.description[language]}</p>
        <div className="project-actions">
          {project.links.map((link) => (
            <a
              key={link.url}
              className="outline-button"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t[link.kind]} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
          {project.demo && (
            <a
              className="text-link"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.demo} <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function App() {
  const [language, setLanguage] = useState("pt");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = t.pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.metaDescription);
  }, [language, t]);

  return (
    <div className="site-shell" lang={language === "pt" ? "pt-BR" : "en"}>
      <header className="site-header">
        <div className="header-inner page-width">
          <a
            className="brand"
            href="#inicio"
            aria-label={t.homeLabel}
            onClick={() => setMenuOpen(false)}
          >
            <span>
              <span className="brand-dot">{"<"}</span>
              oEduardoDev
              <span className="brand-dot">{"/>"}</span>{" "}
            </span>
          </a>
          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
          <nav
            id="primary-nav"
            className={`primary-nav ${menuOpen ? "is-open" : ""}`}
            aria-label={t.navLabel}
          >
            {t.nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                <span>#</span>
                {label}
              </a>
            ))}
            <div className="language-switch" role="group" aria-label={t.languageLabel}>
              <button
                type="button"
                className={language === "pt" ? "is-active" : ""}
                aria-pressed={language === "pt"}
                onClick={() => setLanguage("pt")}
              >
                PT
              </button>
              <span aria-hidden="true">/</span>
              <button
                type="button"
                className={language === "en" ? "is-active" : ""}
                aria-pressed={language === "en"}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      </header>

      <aside className="social-rail" aria-label={t.socialLabel}>
        <span className="social-line" aria-hidden="true" />
        {socialLinks.map(({ label, url, Icon }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon size={20} />
          </a>
        ))}
      </aside>

      <main>
        <section
          className="hero page-width"
          id="inicio"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {t.greeting}
            </p>
            <h1 id="hero-title">
              {t.heroStart} <span>{t.heroHighlight}</span> {t.heroEnd}
            </h1>
            <p className="hero-intro">{t.intro}</p>
            <a className="outline-button hero-cta" href="#contato">
              {t.contactMe} <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-visual">
            <div className="hero-geometry" aria-hidden="true">
              <i />
              <i />
            </div>
            <div className="portrait-frame">
              <img src="/eduardo-avatar-demo.png" alt={t.portraitAlt} />
            </div>
            <div className="dot-grid hero-dots" aria-hidden="true" />
            <div className="working-badge">
              <span className="badge-square" />
              {t.working}
            </div>
          </div>
        </section>

        <div className="quote-wrap page-width">
          <blockquote>
            <span className="quote-glyph" aria-hidden="true">
              “
            </span>
            {t.quote}
            <cite className="quote-attribution">– {t.quoteAttribution}</cite>
          </blockquote>
        </div>

        <section
          className="projects-section page-width"
          aria-labelledby="projetos-heading"
        >
          <SectionHeading
            id="projetos"
            title={t.projects}
            intro={t.projectsIntro}
            action={
              <a
                className="heading-action"
                href="https://github.com/oeduardodev?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.allRepos} <ArrowRight size={17} aria-hidden="true" />
              </a>
            }
          />
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                language={language}
                t={t}
              />
            ))}
          </div>
        </section>

        <section
          className="experience-section page-width"
          aria-labelledby="experiencia-heading"
        >
          <SectionHeading
            id="experiencia"
            title={t.experience}
            intro={t.experienceIntro}
          />
          <div className="experience-grid">
            {t.experienceItems.map(({ company, role, period, description }) => (
              <article className="experience-card" key={company}>
                <p className="experience-period">{period}</p>
                <h3>{company}</h3>
                <p className="experience-role">{role}</p>
                <p className="experience-description">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="skills-section page-width"
          aria-labelledby="habilidades-heading"
        >
          <SectionHeading
            id="habilidades"
            title={t.skills}
            intro={t.skillsIntro}
          />
          <div className="skills-layout">
            <div className="skills-decoration" aria-hidden="true">
              <div className="dot-grid" />
              <div className="decor-square decor-square--one" />
              <div className="decor-square decor-square--two" />
              <div className="decor-square decor-square--three" />
            </div>
            <div className="skill-grid">
              {skillGroups.map((group) => (
                <div className="skill-card" key={group.title.en}>
                  <h3>{group.title[language]}</h3>
                  <p>{group.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="about-section page-width"
          aria-labelledby="sobre-heading"
        >
          <SectionHeading id="sobre" title={t.about} intro={t.aboutIntro} />
          <div className="about-grid">
            <div className="about-copy">
              <h3>{t.aboutTitle}</h3>
              {t.aboutText.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <a
                className="outline-button"
                href="https://github.com/oeduardodev"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="about-visual">
              <div className="about-square about-square--back" aria-hidden="true" />
              <div className="about-square about-square--top" aria-hidden="true" />
              <div className="about-square about-square--bottom" aria-hidden="true" />
              <div className="dot-grid" aria-hidden="true" />
              <div className="about-visual-card">
                <img src="/profile-photo-send.png" alt={t.portraitAlt} />
              </div>
            </div>
          </div>
        </section>

        <section
          className="education-section page-width"
          aria-labelledby="formacao-heading"
        >
          <SectionHeading
            id="formacao"
            title={t.education}
            intro={t.educationIntro}
          />
          <div className="education-grid">
            {t.educationItems.map(([course, institution], index) => (
              <div className="education-card" key={course}>
                <span>0{index + 1}</span>
                <h3>{course}</h3>
                <p>{institution}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="contact-section page-width"
          aria-labelledby="contato-heading"
        >
          <SectionHeading
            id="contato"
            title={t.contact}
            intro={t.contactIntro}
          />
          <div className="contact-grid">
            <p>{t.contactBody}</p>
            <div className="contact-card">
              <h3>{t.contactTitle}</h3>
              {socialLinks.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={19} aria-hidden="true" />
                  {label === "GitHub" ? "@oeduardodev" : label}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
              <a href="mailto:eduardobl.contato@gmail.com">
                <Mail size={19} aria-hidden="true" />
                <span>eduardobl.contato@gmail.com</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner page-width">
          <div>
            <a className="brand" href="#inicio">
              <Code2 size={24} strokeWidth={2.5} aria-hidden="true" />
              <span>
                Eduardo<span className="brand-dot">.</span>
              </span>
            </a>
            <p>{t.role}</p>
          </div>
          <div className="footer-social">
            <h2>{t.media}</h2>
            <div>
              {socialLinks.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size={23} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} · {t.madeBy}
        </p>
      </footer>
    </div>
  );
}

export default App;
