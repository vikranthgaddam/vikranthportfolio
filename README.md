# Vikranth Gaddam — Software Engineering Portfolio (`vikranthportfolio`)

Warm Editorial Minimalist portfolio for **Vikranth Gaddam** (`vikranthgaddam.com`), built with semantic HTML5, custom CSS design tokens, and modular ES JavaScript.

## Repository Structure

- `index.html` — Semantic HTML5 document and editorial sections (`01 / Selected Work`, `02 / Experience`, `03 / Competency Matrix`, `04 / Contact`).
- `css/index.css` — Custom CSS design system (Warm Alabaster `#F8F6F1`, Stone `#F1EDE6`, Espresso Ink `#1F1B17`, Burnt Sienna `#B44622`) + print-ready resume stylesheet.
- `js/data.js` — Centralized configuration for profile details, featured case studies, experience timeline, and technical competencies.
- `js/main.js` — Interactive controller for project category filtering, accessible slide-over technical case study drawer, expandable timeline, and one-click email copy.
- `CNAME` — Custom domain binding (`vikranthgaddam.com`).
- `.github/workflows/deploy.yml` — Automated GitHub Pages deployment workflow.

---

## Squarespace Custom Domain Setup (`vikranthgaddam.com`)

1. **Squarespace DNS Settings**:
   In your Squarespace Domains dashboard for `vikranthgaddam.com` → **DNS** → **DNS Settings**:
   - Remove default Squarespace parking presets if present.
   - Add the following custom records:

| Host | Type | Value / Data |
| :--- | :--- | :--- |
| `@` | `A` | `185.199.108.153` |
| `@` | `A` | `185.199.109.153` |
| `@` | `A` | `185.199.110.153` |
| `@` | `A` | `185.199.111.153` |
| `www` | `CNAME` | `vikranthgaddam.github.io` |

2. **GitHub Pages Settings**:
   - Visit **Settings → Pages** in `vikranthgaddam/vikranthportfolio`.
   - Ensure **Custom domain** is set to `vikranthgaddam.com` and check **Enforce HTTPS** once DNS verification finishes.
