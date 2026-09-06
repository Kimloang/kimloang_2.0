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

## Notes
- The profile photo URL in `src/App.tsx` originally had an access token in the
  query string — that expires and shouldn't be committed. It's been stripped
  here. Better: put the image in `public/` (e.g. `public/profile.jpg`) and
  reference it as `/profile.jpg` so it's not dependent on an external repo/token.
