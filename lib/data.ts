export const navSections = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "abilities", label: "Abilities" },
  { id: "backstory", label: "Backstory" },
  { id: "quests", label: "Side quests" },
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
    "I build software around complicated real-world workflows, where data integrity, automation, integrations and reliability matter.",
  recruitLabel: "Recruit this character",
  recruitHint: "Email me about a role",
  projectsLabel: "See projects",
} as const;

// Hand-written notes in the hero's bottom-right corner.
export const heroNotes = [
  "reconciles missed payments",
  "writes the docs",
  "teaches web development",
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
  characterClass: "Backend developer",
  base: "Lagos, Nigeria",
  guild: "Ibadan Digital Academy, Backend Developer (2026)",
  mainStats: ["TypeScript", "Node.js", "NestJS", "PostgreSQL"],
  bio: "Backend-focused developer who builds fintech systems, workflow automation and internal business tools: the application logic, data models and transaction workflows underneath. I like improving how systems and teams work, and explaining them to the people who use them.",
};

export const skillGroups = [
  { label: "Languages", tone: "yellow", skills: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { label: "Backend", tone: "orange", skills: ["Node.js", "NestJS", "FastAPI", "Flask", "Django", "REST APIs"] },
  { label: "Data and queues", tone: "mint", skills: ["PostgreSQL", "Prisma", "SQLite", "Redis", "BullMQ"] },
  { label: "Frontend", tone: "sky", skills: ["React", "Next.js", "Tailwind CSS"] },
  { label: "DevOps", tone: "orange", skills: ["Docker", "GitHub Actions", "CI/CD", "Nginx", "VPS deployment"] },
  { label: "Business apps", tone: "mint", skills: ["Power Apps", "Power Automate", "SharePoint", "Google Apps Script", "ERPNext"] },
  { label: "Integrations", tone: "sky", skills: ["Payment APIs", "KYC APIs", "Savings APIs", "Webhooks"] },
  { label: "Testing and AI", tone: "yellow", skills: ["Auth and transaction tests", "Load testing", "AI-assisted workflows"] },
] as const;

// From Tolu's Work Experience doc (the CV source of truth). Years only.
export const experience = [
  {
    role: "Backend Developer",
    org: "Ibadan Digital Academy",
    period: "2026",
    points: [
      "Built ledger structures and transaction workflows for a fintech application with NestJS, Prisma and PostgreSQL.",
      "Built automated reconciliation that catches missed payment webhooks, resolves incomplete transactions and handles reversal credits.",
      "Integrated third-party payment, identity-verification (KYC) and savings APIs.",
      "Deployed services to a VPS with CI workflows and automated database backups.",
      "Built internal tools, including a certificate editor with batch PNG and PDF export and an Apps Script reporting system.",
    ],
  },
  {
    role: "Low-Code Developer",
    org: "Ha-Shem Limited",
    period: "2024",
    points: [
      "Built internal business apps with Power Apps and Power Automate.",
      "Built a request management system with a user-facing app, SharePoint records and automated email approvals.",
      "Turned manual business processes into digital workflows.",
    ],
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
  {
    slug: "multi-tenant-sales-crm",
    name: "Multi-Tenant Sales CRM",
    tagline: "From spreadsheet to web app",
    description:
      "Turned a sales team's spreadsheet CRM into a web app: a PostgreSQL schema with Row-Level Security for tenant isolation, role-based access and an audit log, pipeline stages that move from recorded activity, and order approvals, with end-to-end tests for tenancy and workflow rules.",
    stack: ["NestJS", "Prisma", "PostgreSQL", "Next.js"],
    note: "each customer's data stays in its own lane",
  },
  {
    slug: "ai-provider-fallback",
    name: "AI Assistant Provider Layer",
    tagline: "Model failover for a bookkeeping app",
    description:
      "Designed the AI assistant layer for a chat-first bookkeeping app: one shared interface across several model providers, and a fallback that skips a provider for a short time when it times out, fails or hits a rate limit.",
    stack: ["NestJS", "TypeScript", "Prisma"],
    note: "when one model stalls, the next one answers",
  },
] as const;

// Achievements and teaching, from the Work Experience doc.
export const quests = [
  {
    title: "2nd place, Cisco National Hackathon",
    year: "2021",
    detail: "Placed second in a national hackathon run by Cisco.",
  },
  {
    title: "Regional coach, Girls in ICT",
    year: "2026",
    detail: "Coached the Ibadan team to 3rd place at the South-West Regionals, from idea to prototype to presentation.",
  },
  {
    title: "Instructor, digital literacy programme",
    year: "2026",
    detail: "Taught foundational web development and computing concepts weekly, and ran practical CodeLabs sessions for an 18-student cohort.",
  },
  {
    title: "Seminar co-ordinator, with Rotary International",
    year: "2026",
    detail: "Co-ordinated a technical seminar on the practical use of AI tools and digital workflow automation.",
  },
] as const;

export const codeSnippet = `// stack.config.ts
export const stack = {
  language: "TypeScript",
  backend: ["NestJS", "FastAPI"],
  database: ["PostgreSQL", "Prisma"],
  queue: ["Redis", "BullMQ"],
  frontend: ["React", "Next.js"],
  infra: ["Docker", "GitHub Actions", "Nginx"],
} as const;

// open to backend roles`;

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
