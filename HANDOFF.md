# Handoff: character-led portfolio layout

For the next Claude Code session (web) working on branch `spike/3d-hero`.
Read this whole file before changing anything. Delete it in the final commit
of this work.

## Where things stand

- The site is a one-page Next.js 14 (App Router) portfolio for Afolayan
  Iseoluwa ("Tolu"), a backend-leaning full-stack developer. The audience is
  recruiters and engineering managers.
- `main` is the live site (Vercel). Nothing on this branch is merged.
- This branch contains, in order:
  1. The **character-sheet redesign**: `app/page.tsx` and `components/*`.
     It is finished and reviewed, with 19 page checks passing.
  2. Three **throwaway prototypes** under `app/spike/*` and `components/spike/*`.
     Only `/spike/character` matters now. The 3D ones (`/spike`,
     `/spike/shapes`) were rejected and can be deleted.
- **The character:** Tolu drew him, then Gemini polished him in a hand-inked
  comic style. He has brown skin, spiky black hair with a faded undercut, and a
  deliberately **blank face**. He wears a brown and black buffalo-plaid
  overshirt over an olive tee, black trousers and brown sneakers. There are six
  transparent poses in `public/character/cut/`:

  | file | pose | natural size |
  |---|---|---|
  | `wave.webp` | standing, waving, hand in pocket | 437×1066 |
  | `hang.webp` | hanging by both hands from a ledge (hands at ~3% from top) | 329×1060 |
  | `point.webp` | standing side-on, pointing right (mirror with `scaleX(-1)` to point left) | 610×1086 |
  | `sit.webp` | sitting on a ledge (seat line at ~59% from top) | 554×1076 |
  | `peek.webp` | leaning in from the right, waving; a thin vertical "wall" line on its right edge | 599×1200 |
  | `thumbs.webp` | thumbs up, hand on hip (unused so far) | 490×1083 |

  New poses must come from Tolu on a flat `#FF00FF` background. Cut them with
  `scripts/cut-character.sh <input> <name> [--white]` (needs ffmpeg).
  The original JPEGs are not in the repo.
- `/spike/character` places the poses on the redesigned page. Tolu's verdict:
  the idea works, but the poses are **too small and crammed into gaps**.

## What Tolu wants now (his words, then what they mean)

1. **"This structure instead of the current one":** follow the layout of the
   GAZU fashion-site reference he shared. It is a sequence of full-width bands,
   each with one strong idea:
   - a thin ink top strip;
   - a light header with links on the left, a centred wordmark and actions on
     the right;
   - a **hero band**: a giant word across the full width, a tall figure standing
     in front of it, small mono copy top-left, buttons bottom-left, and a small
     note bottom-right;
   - a **dark band** of three image-plus-text tiles;
   - a **split band**: a big image on one side, a large heading and text plus a
     button on the other;
   - a light **feature strip** of four icon-and-label items;
   - a product grid.

   Borrow the structure and rhythm, not GAZU's branding or photography.
2. **"The point of the images is to take space and be visible":** the poses
   are layout elements, not decorations squeezed into gaps. Give each one its
   own column or area. Make them **much bigger**: the hero figure should fill the
   band's height, and section poses roughly 380–560px tall on desktop.
3. **"Use more spacing; images allow spacing to be a layout decision":** be
   generous with vertical rhythm. Let the poses define the whitespace.
4. **"One card and one project in view at a time, so the audience can soak it
   up":**
   - each project gets its own band, about one viewport tall: diagram, text and
     a pose;
   - the same goes for the profile, abilities, backstory and education content:
     one per band, not side-by-side cards.
   - Consider `scroll-snap` (proximity, not mandatory), but never trap scrolling.
5. **"peek.webp could pop up and show the contact details directly":** replace
   "jump to #party" with a popover:
   - clicking the corner figure makes him **pop up** (slide up and in from the
     corner) holding or next to a speech-bubble card with the contact details:
     email (with a copy button), GitHub, LinkedIn, WhatsApp and the "Recruit this
     character" mailto button;
   - it must be a real `<button aria-expanded aria-controls>` that opens a
     labelled dialog or popover;
   - Esc and an outside click close it, focus moves into it on open and returns
     to the button on close, and it works by keyboard;
   - with reduced motion, it appears without sliding.

## Suggested mapping (a proposal; adjust and say why)

| GAZU band | Portfolio band | Pose |
|---|---|---|
| top strip | "Available for work · Based in Nigeria · Open to backend roles" | none |
| header | name wordmark centred; section links left; "Recruit" right | none |
| hero | giant `TOLU`, figure in front, role top-left, Recruit and See projects bottom-left | `wave`, full band height |
| dark band, 3 tiles | quick character stats: Class, Base, Current guild (from `profile`) | none, or a small `thumbs` |
| split band | **one band per project** (4 bands), alternating sides: diagram plus text on one side, a pose on the other | `point` at the diagram, `hang` from the band's top edge, `sit` on the diagram frame, and so on |
| feature strip, 4 items | **Abilities**: the four skill groups as four columns with swatch chips | none |
| (extra) | Backstory band, Education band | `sit` / `thumbs` |
| footer area | "Add to party?" contact band | `point` at the Recruit button |
| floating | `peek` corner figure that opens the contact popover | `peek` |

On phones, poses stay visible but sit **in the flow** (above or below their
band's content, around 260–320px tall), never overlapping text.

## Constraints you must keep

These come from the approved design spec, which is not in the repo
(`docs/` is gitignored on Tolu's machine):

- **Copy:** all copy lives in `lib/data.ts`. Never invent achievements,
  metrics, clients or testimonials. Banned on the page: "hours to minutes",
  "fewer broken builds", percentages, "idempotency", "cron", "webhook", and the
  names Ajoti, DigitalBridge, StitchPro and IDA AI Sandbox.
- **NDA:** project diagrams show only steps named in each project's published
  description. They already exist in `components/diagrams/*`; reuse them.
- **The character's face stays blank.** Images are decorative (`alt=""`,
  `aria-hidden`) unless they are a control, like the peek button.
- **Accessibility:**
  - one `<h1>` and a correct heading order;
  - AA contrast, so no small orange text on cream or white;
  - visible focus;
  - honour `prefers-reduced-motion`.
- **Speed:** no new runtime dependencies. Remove `three` and `@types/three`
  when you delete the 3D prototypes. Use plain `<img>` with width and height
  (or `next/image`), and lazy-load poses below the fold. Text must never wait
  on an image or animation.
- **Layout:** responsive from 360px with no horizontal page scroll.
- **Email:** every `mailto:` comes from `emailHref` in `lib/data.ts` (the
  address may change later).
- **Design tokens:** keep the existing ones (`tailwind.config.ts`): cream,
  ink, yellow, orange, mint, sky; `border-3`, `shadow-brutal*`,
  `rounded-brutal*`; the Space Grotesk, JetBrains Mono and Caveat (`font-hand`)
  fonts. The GAZU look is calmer, so lean on cream, ink and whitespace, with
  orange as the one accent.

## How to work

- Setup: `pnpm install`. Dev server: `pnpm dev`.
- **Tests:** run `pnpm build && pnpm check` (`node:test` in
  `scripts/check-page.test.mjs`, which reads the prerendered
  `.next/server/app/index.html`), then `pnpm lint`.
  - The checks encode the current structure (for example header folder tabs,
    `scroll-mt-32`, and section ids `profile`, `abilities`, `backstory`,
    `projects`, `education`, `party`).
  - Update the checks deliberately when the structure changes. Keep the
    content, NDA, privacy, email and accessibility guards.
  - Add checks for the new behaviour (one project per band, the peek popover's
    `aria-expanded`/`aria-controls`, poses sized and present).
- Build the new layout as the real `app/page.tsx`, not under `/spike`. Delete
  the spike pages and `components/spike/` when done.
- Check it in a browser at 1440, 1024, 768 and 375px.
- Commit in small steps on this branch. Do **not** merge into `main` or deploy.
  Tolu reviews first.

## Known minor issues from the last review (fix if you touch them)

- Small orange labels (`text-orange-dark`) fall below AA contrast.
- Tab-row focus rings are clipped; there are no explicit `focus-visible` styles.
- The turnaround CSS (`.sketch-*` in `app/globals.css`, `components/Turnaround.tsx`)
  becomes dead once the hero uses the character. Remove it along with its checks.
