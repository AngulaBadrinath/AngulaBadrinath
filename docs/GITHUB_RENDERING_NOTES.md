# GitHub Markdown & Profile Rendering Guidelines

> **Target Platform:** GitHub Profile README (`AngulaBadrinath/AngulaBadrinath`)  
> **Renderer:** GitHub Flavored Markdown (GFM) + HTML Sanitizer (HTML5lib-based) + Camo Image Proxy  
> **Audited Date:** 2026-11-03

---

## 1. Supported GitHub Interaction Mechanics

GitHub profile READMEs are statically rendered documents, not client-side web applications. All interactive patterns must use supported, native GitHub mechanisms:

### 1.1 Collapsible Technical Disclosures (`<details>` & `<summary>`)
- Native HTML `<details>` and `<summary>` elements are fully supported by GitHub's sanitizer.
- Used in this profile for:
  - Six deep-dive skill domain technology breakdowns under the Skill Orbit.
  - Four technical architecture blueprints and workflow sequences in the Architecture Laboratory.
  - Telemetry and automation notes under the Activity Dashboard.
- **Best Practice:** Keep `<summary>` contents brief and formatted with `<b>` tags for visual hierarchy. Always place an empty line `<br />` before markdown content inside `<details>` to prevent markdown parsing glitches.

### 1.2 Markdown Heading Anchors
- GitHub automatically injects anchor links into every heading (`#`, `##`, `###`).
- **Slug Generation Algorithm:**
  1. Convert heading text to lowercase.
  2. Strip punctuation, special characters (e.g., `—`, `·`, `/`, `&`).
  3. Replace whitespace sequences with a single hyphen (`-`).
- All internal quick-navigation links in the header (`#about`, `#skills`, `#selected-work`, etc.) and intra-document jump links (`#unique-jersey-wholesale-modular-monolith-architecture`) have been verified against this exact slug generation rule.

### 1.3 Camo Image Proxy & SVG Handling
- GitHub proxies all images through its caching reverse proxy (`camo.githubusercontent.com`).
- To prevent Camo image loading errors or security blocking:
  - SVGs must NOT contain `<script>`, `<foreignObject>`, or inline JavaScript event listeners (`onclick`, `onerror`).
  - SVGs must NOT reference remote font stylesheets (`@import url(...)`) or external bitmap images (`<image href="http://...">`).
  - Standard system font stacks (`ui-monospace`, `Consolas`, `system-ui`, `-apple-system`) are utilized directly.
  - Relative paths (`./assets/banner.svg`) must match exact filesystem case.

---

## 2. Responsive & Multi-Theme Considerations

### 2.1 Viewport Scaling
- GitHub desktop READMEs render at a maximum width of approximately 896px (`prose` container).
- On GitHub Mobile (iOS/Android apps and mobile web), the container narrows to 320px–420px.
- **Technique Applied:** All diagram SVGs use `viewBox="0 0 W H"` with `width="100%"` and `height="100%"`. Text labels use minimum font sizes of 9.5px to remain readable when scaled down to mobile viewports.

### 2.2 Theme Contrast
- The visual theme utilizes the dark terminal aesthetic from `angulabadrinath.vercel.app`:
  - Background: `#050505`
  - Neon Mint: `#00ff9c`
  - Cyan: `#00f7ff`
  - Text Ink: `#edfdf6`
- Because the SVGs contain their own dark panel backgrounds (`#050505` / `#0a0d0d`), they render identically with high contrast regardless of whether the user has GitHub configured in Dark Default, Dark Dimmed, or Light theme.

---

## 3. Disallowed Anti-Patterns

1. **Fake JavaScript Widgets:** GitHub strips all `<script>` tags, iframe embeds, and CSS keyframe animations that attempt to emulate web app interactivity.
2. **Unsupported CSS:** Custom `<style>` tags in README markdown are stripped by GitHub. All styling is encapsulated inside self-contained SVG assets.
3. **External Badge Sprawl:** Unreliable third-party badge APIs (e.g., dynamic hit counters, external stats servers) create latency, tracking risks, and frequent broken image badges. This profile uses self-hosted, GitHub Actions-generated SVG assets committed directly to the repository.
