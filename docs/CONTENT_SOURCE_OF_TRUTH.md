# Content Source of Truth & Factual Positioning Matrix

> **Profile Subject:** Angula Badrinath (GitHub: [@AngulaBadrinath](https://github.com/AngulaBadrinath))  
> **Audited Date:** 2026-11-03  
> **Verification Status:** Fully Audited against live repository manifests, codebases, and verified public presence.

---

## 1. Developer Positioning & Personal Brand

| Claim / Field | Published Text | Source & Evidence | Confidence | Publication Policy |
|---|---|---|---|---|
| **Full Name** | Angula Badrinath | GitHub profile, Portfolio website, LinkedIn | **High (Verified)** | Safe to publish |
| **Headline / Role** | Software Engineer \| Full-Stack Development \| AI Applications | Aligned across `angula-portfolio` and profile README | **High (Verified)** | Safe to publish |
| **Education** | B.Tech Graduate, 2026 | Confirmed in prompt guidelines and portfolio source (`FULL STACK DEVELOPER / 2026`). Omit "expected" or "currently pursuing"; no CGPA displayed. | **High (Verified)** | Safe to publish |
| **Target Roles** | Full-Stack Developer, React/Frontend Developer, Node.js/Python Backend Developer, Associate Software Engineer, AI Application Developer | Supported by codebase depth in TypeScript, Python, React, and FastAPI | **High (Verified)** | Safe to publish |
| **Location & Availability** | India · Open to full-time onsite, hybrid, and remote roles; open to relocation | Portfolio and LinkedIn metadata | **High (Verified)** | Safe to publish |
| **Professional Experience (Industry)** | ~3 months as Python Developer at Programmica (Dec 2024 — Feb 2025) | `angula-portfolio/app/page.tsx` line 44; confirmed in prompt baseline. | **High (Verified)** | Safe to publish. Never inflate to 3+ years. |
| **Client Work** | Universal Wholesale & Unique Jersey Wholesale | Verified client-facing full-stack delivery and open architecture codebase (`Unique-Distributors`). | **High (Verified)** | Safe to publish. Exclude proprietary customer data and private credentials. |
| **Unverified Experience** | Versaero Private Limited (Mar–Jun 2025), K2 Edtech (Jun–Oct 2024) | Found in legacy `angula-portfolio/app/page.tsx` but unverified via formal resume. | **Medium (Omitted)** | **Omitted from primary profile timeline** to adhere to strict verification standards. Documented here. |

---

## 2. Project Evidence Matrix

### 2.1 Flagship 01: Unique Jersey Wholesale (Wholesale Distribution Management System)
- **Repository:** `https://github.com/AngulaBadrinath/Unique-Distributors` (Public)
- **Verified Tech Stack:**
  - Backend: Laravel 13 (`laravel/framework: ^13.17`), PHP 8.3/8.5 (`composer.json`)
  - Frontend: React 19 (`react: ^19.2.8`), TypeScript 7 (`typescript: ^7.0.2`), Inertia 3 (`@inertiajs/react: ^3.7.0`), Tailwind CSS 4, Vite 8
  - Data & Cache: PostgreSQL 18, Redis 7 (`predis/predis: ^3.6`), Docker Compose
  - Quality & QA: Playwright (`@playwright/test: ^1.63.0`), PHPUnit 12 (`phpunit/phpunit: ^12.5.12`), Pest harness
- **Architecture Type:** Modular Monolith with Shared Transactional Core
- **Operational Roles Implemented:**
  1. *Admin Portal* (`/admin/*`): Review orders, approve quantity adjustments, manage inventory exceptions, coordinate deliveries.
  2. *Salesman Portal* (`/salesman/*`): Mobile-first sales interface, catalog browsing, bounded price selection, order creation.
  3. *Delivery Partner Portal* (`/delivery/*`): Task-first logistics, dispatch pickup, out-for-delivery, proof of delivery upload.
  4. *Warehouse Manager Scope*: Stock reservation, inventory fulfillment, physical discrepancy logging.
  5. *Accountant Scope*: Payment verification, receivable tracking, double-entry ledger integration.
- **Publication Status:** **Safe & Recommended as Lead Project**. All architectural flows backed by `docs/AI_CONTEXT.md` and repository manifests.

---

### 2.2 Flagship 02: ARA — AI Resume Analyzer
- **Repository:** `https://github.com/AngulaBadrinath/ARA` (Public)
- **Verified Tech Stack:**
  - Frontend: Next.js 15 (`apps/web`), React, TypeScript
  - Backend API: FastAPI (`apps/api`), Python 3.12+, Pydantic v2
  - Asynchronous Workers: ARQ background worker (`app/workers`), Redis (`port 6379`)
  - Data & Storage: PostgreSQL (`port 5432`, SQLAlchemy ORM, Alembic migrations), MinIO / S3 object storage (`port 9000`)
  - AI / LLM Layer: Provider abstraction (`app/llm`) with optional local Ollama (`port 11434`) integration
- **Architecture Type:** Multi-Tenant Asynchronous Processing Architecture
- **Status:** **Active Development / Architectural Implementation**. The data model, monorepo boundaries, worker queue, and S3 upload pipelines are implemented; endpoint business logic is in active development.
- **Publication Policy:** Accurately presented as an active, architecturally structured multi-tenant system with asynchronous background workers. Do not claim millions of users or production SaaS revenue.

---

### 2.3 Supporting Project: Universal Wholesale (Client Delivery)
- **Repository:** Private / Client-Owned (No public repository link)
- **Scope:** Real-world B2B wholesale commerce workflow including product catalogs, bulk cart mechanics, wholesale pricing tiers, order status tracking, and authentication.
- **Publication Policy:** Disclosed strictly as a case study in client application delivery. Confidential client names, customer credentials, proprietary transaction volumes, and commercial agreements are strictly excluded.

---

### 2.4 Evaluated & Filtered Projects

| Project | Repository / Source | Evaluation Finding | Decision |
|---|---|---|---|
| **LinguaSync / Voice Translator** | `AngulaBadrinath/RealTime-VoiceTranslator` | Contains desktop speech recognition (PyAudio, gTTS, speech_recognition). Upstream history indicates a single "fresh init" commit with GPL v2 license and binary distributions. Provenance is partially upstream/learning-based. | **Included as secondary learning/exploratory project** with transparent attribution. Not featured as a primary flagship system. |
| **Real-Time Data Visualization** | `AngulaBadrinath/RealTime_SampleData-amazon` | Previously removed by developer from resume. Contains mock Amazon stream visualizations. | **Excluded entirely** per prompt instructions. |
| **angula-portfolio** | `AngulaBadrinath/angula-portfolio` | Personal portfolio website (Next.js 15, Tailwind CSS, dark neon aesthetic). | **Referenced as live portfolio link**; repository code reserved for separate phase. |

---

## 3. Technology Inventory & Confidence Tiers

```text
+--------------------------------------------------------------------------------+
| TIER 1: HIGH CONFIDENCE (Hands-on Project & Production Use)                    |
| - JavaScript, TypeScript, React 19, Next.js 15, Tailwind CSS                   |
| - Python 3.12+, FastAPI, Node.js, Express.js, PHP, Laravel 13, REST APIs      |
| - PostgreSQL, Redis, MinIO / S3-compatible storage                             |
| - Docker, Docker Compose, Git, GitHub Actions, Linux CLI, Playwright           |
+--------------------------------------------------------------------------------+
| TIER 2: WORKING FAMILIARITY (Integrated in Components or Freelance Work)       |
| - Inertia.js, MongoDB, MySQL, Alembic, ARQ Worker Queue, Pydantic, Vite        |
| - AWS (EC2, RDS, Route 53 basics), Sentry, WebSockets, JWT Authentication     |
+--------------------------------------------------------------------------------+
| TIER 3: CURRENTLY EXPLORING (Active Engineering Studies & Prototypes)           |
| - Local LLM integration (Ollama), Provider-agnostic LLM pipelines, RAG patterns|
| - Cloud Infrastructure as Code, Scaled Microservices                          |
+--------------------------------------------------------------------------------+
```

---

## 4. Truthfulness Safeguards Check

- [x] No fabricated star counts, download numbers, or uptime claims.
- [x] No inflated years of experience (accurately reflects 2026 graduation and ~3mo Programmica internship + client projects).
- [x] No speculative or unverified certifications.
- [x] Clear demarcation between client deliveries, active open-source architectures, and exploratory prototypes.
