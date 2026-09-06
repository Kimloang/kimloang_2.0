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

1. Create a new GitHub repo named **`ykloang`** (must match, since `vite.config.ts`
   sets `base: '/ykloang/'` for `https://<your-username>.github.io/ykloang`).
   If you want a different repo name, change `base` in `vite.config.ts` to match.
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ykloang.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source**,
   select **GitHub Actions**.
4. Push again (or re-run the workflow from the **Actions** tab) — the site
   will be live at `https://<your-username>.github.io/ykloang/`.

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
