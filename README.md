# Portfolio Website

> **The personal portfolio of Afolayan Iseoluwa (Tolu) — a backend-leaning full-stack developer.**

A single-page portfolio built with a neubrutalist design system: thick black
borders, hard offset shadows, and a warm cream/yellow palette. Server-rendered
with the Next.js App Router and deployed as a static site on Vercel.

**Live:** [portfolio-website-five-bay-51.vercel.app](https://portfolio-website-five-bay-51.vercel.app)

---

## Key Features

- **Neubrutalist design system** — reusable `shadow-brutal` utilities, palette,
  and border tokens defined once in the Tailwind config.
- **Component-driven** — `Header`, `Sidebar`, `ProjectCard`, `ContactPanel`,
  `Footer`, and section components compose the single page.
- **Fully responsive** — the left nav collapses to a horizontal scrollable tab
  bar on mobile; the dark contact panel stacks below the main content.
- **Purposeful micro-interactions** — subtle shadow/translate shifts on hover.
- **Content-as-data** — all copy, projects, skills, and links live in
  [`lib/data.ts`](lib/data.ts), so updates never require touching markup.

---

## Technology Stack

| Category | Technology | Usage |
| :------- | :--------- | :---- |
| **Framework** | Next.js 14 (App Router) | Routing, server components, static export |
| **Language** | TypeScript | Type-safe components and content data |
| **Styling** | Tailwind CSS | Design tokens + utility-first styling |
| **Animation** | Framer Motion | Micro-interactions (optional) |
| **Fonts** | Space Grotesk / JetBrains Mono | Display + monospace, self-hosted via `next/font` |
| **Package manager** | pnpm | Dependency management |
| **Hosting** | Vercel | CI/CD and static hosting |

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-black?style=flat-square&logo=vercel)

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tolukusan/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the dev server**

   ```bash
   pnpm dev
   ```

   The app runs at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
| :------ | :---------- |
| `pnpm dev` | Start the local development server |
| `pnpm build` | Create an optimized production build |
| `pnpm start` | Serve the production build locally |
| `pnpm lint` | Run ESLint |

---

## Project Structure

```
app/            App Router entry — layout, global styles, home page
components/     UI components (Header, Sidebar, ProjectCard, ContactPanel, …)
lib/data.ts     All site content: profile, skills, experience, projects, links
tailwind.config.ts   Design tokens (palette, shadow-brutal, fonts)
```

To update content — projects, skills, social links — edit
[`lib/data.ts`](lib/data.ts); no component changes are needed.

---

## Deployment

Deployed on **Vercel**. Every push to `main` triggers a production build and
deploy. Ensure the project's **Framework Preset** is set to *Next.js* (Vercel →
Settings → Build & Deployment) so builds serve the `.next` output.

```bash
# Manual deploy from the CLI (optional)
pnpm dlx vercel --prod
```

---

## Contributing

This is a personal project. If you spot a bug, open an issue or a PR — see the
[pull request template](.github/PULL_REQUEST_TEMPLATE/pull_request_template.md).
Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
(`type(scope): description`).
