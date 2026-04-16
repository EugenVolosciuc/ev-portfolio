# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build (also runs next-sitemap via postbuild)
npm run start     # Start production server
npm run lint      # ESLint via next lint
```

There are no tests in this project.

## Architecture

Personal portfolio site for Eugen Volosciuc at `deveugen.com`. Built with Next.js 12 (pages router), TypeScript, and Tailwind CSS.

**Content model:** All content lives as Markdown in `src/content/`. Pages like About and Projects pull from single `.md` files; blog posts each have their own file in `src/content/blog-posts/`. Frontmatter (via `gray-matter`) provides metadata (title, date, tags, catchphrase). At build time, `getStaticProps`/`getStaticPaths` reads these files from the filesystem — there is no CMS or external API.

**Rendering pipeline:** `markdown-it` converts Markdown to HTML, which is rendered via `dangerouslySetInnerHTML` styled with the `@tailwindcss/typography` prose classes.

**Key data flow for blog:**
1. `src/pages/blog/index.tsx` — reads all posts, sorts and passes as props
2. `src/pages/blog/[slug].tsx` — reads a single post by slug from filename
3. `src/pages/blog/tag/[tag].tsx` — filters posts by frontmatter tag
4. Utilities in `src/utils/` handle read time calculation, sorting, and delays

**Styling:** Tailwind with a custom accent color `#EEB868` and two custom fonts (RobotoMono, Lora) self-hosted from `public/fonts/`. Typography plugin used for Markdown prose styling.

**Animations:** Framer Motion throughout; `src/components/AnimatedText.tsx` handles letter-by-letter text animation. `src/components/Cursor.tsx` is a custom cursor that tracks mouse state.

**Forms:** Formspree (`@formspree/react`) is integrated in the contact page but currently disabled.

**SEO:** `next-sitemap` runs post-build to generate `sitemap.xml` and `robots.txt` targeting `https://www.deveugen.com`.

**Path aliases:** `tsconfig.json` sets `baseUrl: ./src`, so imports resolve from `src/` without relative paths.
