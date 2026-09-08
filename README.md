# Zealed Fujoshi 

---

## Build and develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # serves the built site locally
```

---

## Project layout

```
.
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── public/               # Static assets (ads, carousel, partners)\
└── src/
    ├── components/       # UI Components (Glassmorphic design system)\
    ├── content/          # Content Collections\
    │   ├── config.ts    # Schema for press/posts\
    │   └── press/        # Markdown files for blog posts\
    ├── layouts/          # Page wrappers (BaseLayout)\
    ├── pages/            # File-based routing\
    │   ├── index.astro    # Homepage (Featured posts & Events)\
    │   ├── contact.astro # Contact page\
    │   ├── podcasts/      # Podcast index and dynamic pages\
    │   └── posts/        # Paginated blog index and dynamic pages\
    └── styles/           # Global CSS & Themes\
```

---

## Deployment & CMS

- **Potential CMS Options**: TinaCMS or DecapCMS.
- **Strategy**: Leveraging Astro Content Collections to allow the CMS to edit Markdown files directly in the repository!
---
