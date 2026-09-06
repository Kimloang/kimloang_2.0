# Yen Kimloang — Portfolio (API-doc style)

React + Vite + TypeScript + Tailwind CSS. Renders the CV as a mock API reference page.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This repo already includes `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages automatically on every push to `main`.

Your site is live as a **project site** at `https://kimloang.github.io/kimloang_2.0/`,
so `vite.config.ts` is set to `base: '/kimloang_2.0/'` to match. If you ever
rename the repo, update `base` to match the new repo name exactly.

1. Push this project to the **`kimloang_2.0`** repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/kimloang/kimloang_2.0.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment → Source** — this
   **must** be set to **GitHub Actions**, not "Deploy from a branch". If it's
   left on "branch", GitHub serves your raw source files as-is, which 404s.
3. Check the **Actions** tab — the "Deploy to GitHub Pages" workflow should
   run and go green.
4. The site is live at `https://kimloang.github.io/kimloang_2.0/`.

## Adding your photo
Drop a square headshot into `public/profile.jpg` — the page picks it up
automatically (see `public/PUT_YOUR_PHOTO_HERE.txt`). If it's missing, the
page falls back to a generated initials avatar so it never looks broken
during dev or before you add one.

## Adding your résumé
The "Download résumé" button in the hero points at `/resume.pdf`. Drop your
actual PDF into `public/resume.pdf` and it'll work as-is.

## What's new in this pass
- **Boot-sequence hero**: a one-time `curl` / loading beat before the profile
  resolves — fits the "live API" concept instead of a static page.
- **Real headshot slot** with automatic fallback avatar (no broken image
  states, ever).
- **Stat pills** (years experience, companies, systems shipped) — all
  computed from the data in `cvData`, not made up.
- **Status bar** ("all systems operational", region, uptime) — a small,
  on-brand flourish for a backend engineer's page.
- **Space Grotesk** for headings, **JetBrains Mono** for code/labels — two
  deliberate typefaces instead of the default system sans everywhere.
- **Download résumé** button.
