export const navSections = [
  { id: "about", number: "01", label: "About" },
  { id: "skills", number: "02", label: "Skills & Stack" },
  { id: "experience", number: "03", label: "Experience" },
  { id: "projects", number: "04", label: "Projects" },
  { id: "education", number: "05", label: "Education" },
  { id: "contact", number: "06", label: "Contact" },
] as const;

export const skillGroups = [
  {
    label: "Languages",
    tone: "sky",
    skills: ["TypeScript", "Python"],
  },
  {
    label: "Backend",
    tone: "mint",
    skills: ["Node.js", "NestJS", "FastAPI", "BullMQ", "Redis"],
  },
  {
    label: "Data",
    tone: "sky",
    skills: ["PostgreSQL", "Prisma"],
  },
  {
    label: "Frontend",
    tone: "mint",
    skills: ["React", "Next.js"],
  },
] as const;

export const experience = [
  {
    role: "Lead Developer",
    org: "Ibadan Digital Academy",
    period: "2025 — Present",
    // TODO: replace with real responsibilities / achievements
    description:
      "Leading development for the academy's internal tooling and training platforms, mentoring peer developers, and shipping full-stack features end to end.",
  },
] as const;

export const projects = [
  {
    slug: "financial-ledger-reconciliation",
    name: "Financial Ledger & Reconciliation System",
    tagline: "Reliable fintech infrastructure",
    description:
      "Built core financial application logic, ledger schemas, and transaction state handling, including scheduled reconciliation for missed payment events and automated reversal credits.",
    stack: ["NestJS", "Node.js", "Prisma", "PostgreSQL"],
    tab: "FEATURED",
  },
  {
    slug: "internal-workflow-automation",
    name: "Internal Workflow Automation Suite",
    tagline: "Productivity and reporting tools",
    description:
      "Developed internal tools for shared task management, certificate generation, image-layout automation, book-cover mockups, and standardized operational reporting.",
    stack: ["TypeScript", "Node.js", "Workflow Automation"],
  },
  {
    slug: "educational-content-publishing",
    name: "Educational Content Publishing Platform",
    tagline: "Content infrastructure for digital learning",
    description:
      "Refactored a legacy content framework, resolved structural issues, and improved publishing pipelines and programmatic layouts for structured educational materials.",
    stack: ["TypeScript", "React", "Next.js"],
  },
  {
    slug: "enterprise-request-management",
    name: "Enterprise Request Management System",
    tagline: "Automated internal operations",
    description:
      "Built an internal request workflow with a dedicated interface, centralized SharePoint records, and automated multi-stage email routing for enterprise operations.",
    stack: ["Power Apps", "Power Automate", "SharePoint"],
  },
] as const;

export const codeSnippet = `// stack.config.ts
export const stack = {
  language: "TypeScript",
  backend: ["NestJS", "FastAPI"],
  database: ["PostgreSQL", "Prisma"],
  queue: ["Redis", "BullMQ"],
  frontend: ["React", "Next.js"],
} as const;

// currently building: financial infrastructure
// status: shipping features weekly`;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/tolukusan", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/iseoluwa-afolayan",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:ise.fola@gmail.com", icon: "email" },
  {
    label: "Resume",
    href: "https://docs.google.com/document/d/1fdvg2jY9BoKpJgKonYnveo_eB8Cn_e0oJdmXAwO5CAQ",
    icon: "resume",
  },
] as const;
