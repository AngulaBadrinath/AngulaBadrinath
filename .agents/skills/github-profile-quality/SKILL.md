---
name: github-profile-quality
description: Quality, brand, and rendering standards for maintaining Angula Badrinath's interactive engineering GitHub profile.
---

# GitHub Profile Engineering Quality Standards

This skill defines the architectural, visual, factual, and accessibility standards for `AngulaBadrinath/AngulaBadrinath`.

## 1. Visual Identity & Brand Design Tokens

All SVGs, diagrams, and README styling must adhere to the official terminal theme:

```css
--bg: #050505;                       /* Near-black canvas */
--panel: #0a0d0d;                    /* Elevated terminal panel */
--line: rgba(180, 255, 230, 0.16);   /* Subtle technical border */
--ink: #edfdf6;                      /* Primary readable text */
--muted: #8e9d97;                    /* Secondary / technical metadata */
--green: #00ff9c;                    /* Primary neon mint highlight */
--cyan: #00f7ff;                     /* Secondary cyan data accent */
--violet: #8b5cf6;                   /* Tertiary violet AI/worker accent */
```

### Visual Rules
- **Monogram:** Use `AB/` as the monospace terminal brand mark.
- **Theme Consistency:** Mint (`#00ff9c`) is primary, Cyan (`#00f7ff`) is secondary, Violet (`#8b5cf6`) is used sparingly for AI/async workers.
- **Banned Elements:** No generic emoji walls, no 50+ third-party badge strips, no fake animated JavaScript widgets, no unstyled visitor counters.

---

## 2. GitHub README Constraints & Allowed Interactions

GitHub sanitizes markdown into a restricted HTML subset:

### Permitted Patterns:
1. Native `<details>` and `<summary>` for collapsible technical deep dives, workflows, and code breakdowns.
2. Standard Markdown anchor links matching rendered heading IDs (e.g., `#about`, `#skills`, `#selected-work`).
3. Clickable image links and repository hyperlinks.
4. Self-contained static vector SVGs (`assets/*.svg`, `assets/diagrams/*.svg`) committed locally to the repository.
5. High-contrast text legible across both GitHub Dark and Light themes.

### Strictly Forbidden:
- Custom JavaScript, React components, inline event handlers (`onclick`, etc.).
- `<iframe`, `<script`, `<foreignObject>`, external stylesheet links.
- SVGs relying on external web fonts or unescaped XML entities.
- Non-functional button-like controls without explicit hyperlink targets.

---

## 3. Content Truthfulness & Factual Safeguards

- **Graduation Status:** B.Tech Graduate, 2026. Never use "expected" or "currently pursuing". Do not list CGPA.
- **Industry Experience:** ~3 months as Python Developer at Programmica (Dec 2024 — Feb 2025). Never inflate to multi-year employment.
- **Project Provenance:**
  - `Unique-Distributors`: Wholesale Distribution Management System (Laravel 13, React 19, Inertia 3, PostgreSQL 18, Redis 7, Docker, Playwright).
  - `ARA`: AI Resume Analyzer (FastAPI, Next.js 15, PostgreSQL, Redis ARQ worker, MinIO/S3, optional Ollama).
  - `Universal Wholesale`: Client delivery case study (respect client privacy; no proprietary credentials, domains, or client identity).
- **Zero Fabrication:** No invented star counts, download numbers, uptime claims, or fake skill percentage bars.

---

## 4. Verification & Validation Commands

Run these checks whenever modifying profile assets or documentation:

```bash
# 1. Validate XML parsing on all SVGs
python -c "import xml.etree.ElementTree as ET, glob; [print(f'PASS: {s}') if ET.parse(s) else None for s in glob.glob('assets/**/*.svg', recursive=True)]"

# 2. Run automated profile asset validator
node scripts/validate-profile-assets.mjs

# 3. Check Git branch status
git status --short
```
