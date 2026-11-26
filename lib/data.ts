export const navSections = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "abilities", label: "Abilities" },
  { id: "backstory", label: "Backstory" },
  { id: "party", label: "Add to party" },
] as const;

export const party = {
  heading: "Add to party?",
  line: "Need a backend developer on your team? I'm open to roles.",
} as const;

export const hero = {
  name: "Afolayan Iseoluwa",
  nickname: "Tolu",
  pitch:
    "I build reliable backend systems (ledgers, job queues, automation) and the interfaces on top of them.",
  recruitLabel: "Recruit this character",
  recruitHint: "Email me about a role",
  projectsLabel: "See projects",
} as const;

// Hand-written notes in the hero's bottom-right corner.
export const heroNotes = [
  "thinks in queues and transactions",
  "ships weekly",
  "fixes what breaks at 2am",
] as const;

export type Profile = {
  characterClass: string;
  base: string;
  guild: string;
  mainStats: readonly string[];
  bio: string;
  likes?: readonly string[];
  dislikes?: readonly string[];
};

export const profile: Profile = {
  characterClass: "Backend / full-stack developer",
  base: "Nigeria",
  guild: "Ibadan Digital Academy, Lead Developer (2025 to present)",
  mainStats: ["TypeScript", "Node.js", "NestJS", "PostgreSQL"],
  bio: "Lead Developer at Ibadan Digital Academy. I build reliable backend systems and the full-stack products around them, from fintech savings platforms to internal tooling.",
};

export const skillGroups = [
  {
    label: "Languages",
    tone: "yellow",
    skills: ["TypeScript", "Python"],
  },
  {
    label: "Backend",
    tone: "orange",
    skills: ["Node.js", "NestJS", "FastAPI", "BullMQ", "Redis"],
  },
  {
    label: "Data",
    tone: "mint",
    skills: ["PostgreSQL", "Prisma"],
  },
  {
    label: "Frontend",
    tone: "sky",
    skills: ["React", "Next.js"],
  },
] as const;

export const experience = [
  {
    role: "Lead Developer",
    org: "Ibadan Digital Academy",
    period: "2025 \u2014 Present",
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
    note: "missed payments get caught and credited back",
    tab: "FEATURED",
  },
  {
    slug: "internal-workflow-automation",
    name: "Internal Workflow Automation Suite",
    tagline: "Productivity and reporting tools",
    description:
      "Developed internal tools for shared task management, certificate generation, image-layout automation, book-cover mockups, and standardized operational reporting.",
    stack: ["TypeScript", "Node.js", "Workflow Automation"],
    note: "the repetitive jobs, automated",
  },
  {
    slug: "educational-content-publishing",
    name: "Educational Content Publishing Platform",
    tagline: "Content infrastructure for digital learning",
    description:
      "Refactored a legacy content framework, resolved structural issues, and improved publishing pipelines and programmatic layouts for structured educational materials.",
    stack: ["TypeScript", "React", "Next.js"],
    note: "untangled the old framework first",
  },
  {
    slug: "enterprise-request-management",
    name: "Enterprise Request Management System",
    tagline: "Automated internal operations",
    description:
      "Built an internal request workflow with a dedicated interface, centralized SharePoint records, and automated multi-stage email routing for enterprise operations.",
    stack: ["Power Apps", "Power Automate", "SharePoint"],
    note: "requests route themselves",
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
  { label: "WhatsApp", href: "https://wa.me/2348141581870", icon: "whatsapp" },
] as const;

// Every mailto: on the page uses this, so the address changes in one place.
export const emailHref = socialLinks.find((link) => link.icon === "email")!
  .href;
