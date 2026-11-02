# Asset & Diagram Inventory Map

> **Repository:** `AngulaBadrinath/AngulaBadrinath`  
> **Last Updated:** 2026-11-03  
> **Status:** All assets verified, self-contained, and validated.

---

## 1. Visual Brand Assets

| File Path | Description | Dimensions / ViewBox | File Format | Source Counterpart |
|---|---|---|---|---|
| [`assets/banner.svg`](../assets/banner.svg) | Top Identity Banner featuring `AB/` monogram, role headline, terminal status pill, and `profile.ts` console preview | `1200 x 300` (`viewBox="0 0 1200 300"`) | Pure Vector SVG | Native vector SVG |
| [`assets/skill-orbit.svg`](../assets/skill-orbit.svg) | Radial Skill Orbit Matrix featuring 6 engineering domains connected to central `AB / ENGINEERING` node | `920 x 480` (`viewBox="0 0 920 480"`) | Pure Vector SVG | Native vector SVG |

---

## 2. Technical System Architecture & Workflow Diagrams

| File Path | Description | Dimensions / ViewBox | Format | Editable Source |
|---|---|---|---|---|
| [`assets/diagrams/ujw-architecture.svg`](../assets/diagrams/ujw-architecture.svg) | Unique Jersey Wholesale modular monolith architecture: Client Tier (Inertia SPA), Laravel Core modules, and Persistence (PostgreSQL, Redis, S3) | `960 x 560` (`viewBox="0 0 960 560"`) | Pure Vector SVG | [`assets/diagrams/source/ujw-architecture.mmd`](../assets/diagrams/source/ujw-architecture.mmd) |
| [`assets/diagrams/ujw-workflow.svg`](../assets/diagrams/ujw-workflow.svg) | End-to-end B2B order lifecycle across 5 operational roles: Salesman → Admin → Warehouse → Delivery → Accountant | `960 x 480` (`viewBox="0 0 960 480"`) | Pure Vector SVG | [`assets/diagrams/source/ujw-workflow.mmd`](../assets/diagrams/source/ujw-workflow.mmd) |
| [`assets/diagrams/ara-architecture.svg`](../assets/diagrams/ara-architecture.svg) | ARA Multi-tenant asynchronous architecture: Next.js 15, FastAPI gateway, ARQ worker queue, Ollama LLM abstraction, and PostgreSQL/MinIO storage | `960 x 560` (`viewBox="0 0 960 560"`) | Pure Vector SVG | [`assets/diagrams/source/ara-architecture.mmd`](../assets/diagrams/source/ara-architecture.mmd) |
| [`assets/diagrams/ara-analysis-workflow.svg`](../assets/diagrams/ara-analysis-workflow.svg) | Asynchronous resume upload and structured analysis workflow: Presigned S3 upload, Redis task queue, worker parsing, and LLM extraction | `960 x 500` (`viewBox="0 0 960 500"`) | Pure Vector SVG | [`assets/diagrams/source/ara-analysis-workflow.mmd`](../assets/diagrams/source/ara-analysis-workflow.mmd) |

---

## 3. Automated & Generated Telemetry Assets

| File Path | Description | Dimensions / ViewBox | Generator / Workflow | Fallback Strategy |
|---|---|---|---|---|
| [`assets/generated/user-statistician.svg`](../assets/generated/user-statistician.svg) | Self-hosted GitHub user activity metrics matching dark neon terminal aesthetic | `495 x 195` (`viewBox="0 0 495 195"`) | `.github/workflows/profile-activity.yml` (`cicirello/user-statistician`) | Committed static baseline asset present; displays verified stats |
| [`assets/generated/github-contribution-grid-snake.svg`](../assets/generated/github-contribution-grid-snake.svg) | Neon contribution snake animation synced to GitHub contribution graph | `850 x 140` (`viewBox="0 0 850 140"`) | `.github/workflows/contribution-snake.yml` (`Platane/snk`) | Committed static baseline asset present |

---

## 4. Asset Security & Technical Standards

Every SVG asset in this repository complies with the following strict constraints:
- **Valid XML:** Fully parsed and validated via `xml.etree.ElementTree` and automated validator script.
- **Zero Scripts:** No `<script>` tags or event handlers (`onload`, `onclick`, etc.).
- **Zero Foreign Objects:** No `<foreignObject>` tags that could fail in GitHub's sanitized image proxy (Camo).
- **Responsive ViewBox:** Configured with percentage width (`width="100%"`) and standard aspect ratios to guarantee crisp scaling from mobile viewports (360px) to ultra-wide desktop screens (1920px+).
- **Theme Contrast:** Colors carefully selected to maintain legibility in GitHub Dark and Dark High Contrast modes while retaining clear borders and ink contrast in Light mode.

