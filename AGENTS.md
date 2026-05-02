# AGENTS.md — AI agent rules for this repository

## Repository context (read first)

This project is a **SvelteKit 2** app on **Svelte 5** and **Vite**, using **TypeScript**. Styling is **Tailwind CSS v4** via `@tailwindcss/vite`, with global design tokens and base styles in **`src/routes/layout.css`** (`@theme`, `@layer base`). **`<svelte:style>`** blocks and route-scoped CSS (e.g. `*.css` next to routes) may exist. Content and data helpers live under **`src/lib/`** (e.g. `src/lib/content/`). Public assets go in **`static/`**. API routes use **`+server.ts`** under **`src/routes/api/`**. Typical verification: **`npm run check`** (and **`npm run lint`** when appropriate).

Agents must treat this file as **binding** alongside user instructions.

---

## Purpose

- Preserve the existing **architecture**, **design system** (tokens, typography, palette), **naming patterns**, and **coding style** used in this repo.
- Prefer **small, targeted edits** over broad rewrites. The default outcome is a **minimal, reviewable diff** that solves the stated problem only.

---

## Core editing rules

- **Never** make unrelated changes (no drive-by cleanups, opinionated formatting sweeps, or “while I’m here” edits).
- **Never** refactor working code unless the user **explicitly** asks for a refactor.
- **Never** rename files, folders, variables, components, routes, or exports unless **required** to complete the task.
- **Never** add or upgrade **dependencies** (npm packages) unless the user **explicitly** approves them.
- **Reuse** existing utilities, components, patterns, and conventions before creating new abstractions or files.
- Keep **diffs minimal** and **easy to review**; one logical change per pass when possible.

**Examples**

| Allowed | Disallowed |
|--------|------------|
| Change one handler in `+page.svelte` to fix a bug | Rename routes for “consistency” without a task requiring it |
| Add a field to an existing type and its single consumer | Introduce a new UI library “for convenience” |
| Extend `src/lib/content/*` using the same patterns | Copy-paste a second implementation of link resolution |

---

## CSS protection rule

**Do not modify any CSS** unless the user **explicitly** asks for a **styling / visual / layout** change.

This includes **not** editing, without explicit instruction:

- **`.css`**, **`.scss`**, **`.sass`**, **`.less`**
- **`tailwind.config.*`** (this project may use Tailwind v4 theme in CSS instead)
- **Design tokens, `@theme`, or theme-adjacent blocks** in `layout.css` or elsewhere
- **Inline `style=` attributes** or **`<style>` / CSS blocks in `.svelte` files**
- **Class names** solely for cleanup, “prettier” naming, or personal preference

Also **do not** change **spacing, colors, typography, layout, breakpoints, animations, borders, shadows, or visual hierarchy** unless the user explicitly asked for that outcome.

If a feature seems to need UI work:

1. **First** use **existing** classes, components, and markup patterns **without** changing stylesheets.
2. If the work **clearly** requires touching CSS or visuals but the request was **not** explicitly about styling, **stop** and state that **CSS or visual changes need explicit approval** before proceeding.

---

## UI / component rules

- Preserve the **current visual design** as delivered; do not “improve” or restyle by default.
- **Do not restyle** existing components unless explicitly asked.
- **Match** surrounding patterns for markup, composition, and file layout (`+page.svelte`, `+layout.svelte`, `+server.ts`, etc.).
- **Prefer extending** existing components over replacing them wholesale.

---

## Code change behavior

Before editing:

1. **Read** the relevant files (call sites, types, styles if explicitly in scope).
2. **Describe** the planned change briefly.
3. **List** which files will be touched.

After editing:

1. **Summarize** exactly what changed and **why** (tie each change to the request).
2. **Call out** assumptions, uncertainties, or follow-ups (e.g. content/CMS, env vars, deployment).

---

## Safety checks

Before finishing:

- Look for **nearby patterns** in the repo and align with them.
- Avoid breaking **public** or **cross-route** contracts (URLs, exported helpers, API shapes) unless the task requires it and impacts are acknowledged.
- Keep **accessibility** intact (labels, semantics, focus, landmarks) — do not remove `aria-*` or headings for convenience.
- Keep **responsive** behavior intact unless explicitly changing layout.
- Keep **existing error handling** intact unless fixing a bug or implementing agreed new behavior.

---

## When uncertain

- **Ask** for clarification instead of guessing business rules, copy, or product intent.
- If a request might require **CSS** or **visual** changes, **ask permission first** per the CSS protection rule.

---

## Agent checklist (before sending the final result)

- [ ] Did I avoid CSS and visual changes unless explicitly requested?
- [ ] Did I keep the diff **minimal** and scoped to the task?
- [ ] Did I **reuse** existing patterns instead of inventing new ones?
- [ ] Did I avoid **unrelated** refactors and renames?
- [ ] Did I preserve **visual**, **a11y**, and **responsive** behavior?
- [ ] Did I list **touched files** and summarize **what changed and why**?
- [ ] Did I flag **assumptions** or **dependencies** (including any need for user approval)?
