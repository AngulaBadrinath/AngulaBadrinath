# Content Source of Truth & Factual Positioning Matrix

> **Profile Subject:** Angula Badrinath (GitHub: [@AngulaBadrinath](https://github.com/AngulaBadrinath))  
> **Audited Date:** 2026-11-03 (Release-Hardening Pass)  
> **Verification Status:** Verified against live codebases, route definitions, models, database migrations, and dependency manifests.

---

## 1. Developer Positioning & Personal Brand

| Claim / Field | Published Text | Source & Evidence | Confidence | Publication Policy |
|---|---|---|---|---|
| **Full Name** | Angula Badrinath | GitHub profile, Portfolio website, LinkedIn | **High (Verified)** | Safe to publish |
| **Headline / Role** | Software Engineer \| Full-Stack Development \| AI Applications | Aligned across `angula-portfolio` and profile README | **High (Verified)** | Safe to publish |
| **Education** | B.Tech Graduate, 2026 | Confirmed in prompt guidelines and portfolio source (`FULL STACK DEVELOPER / 2026`). Omit "expected" or "currently pursuing"; no CGPA displayed. | **High (Verified)** | Safe to publish |
| **Target Roles** | Full-Stack Developer, React/Frontend Developer, Node.js/Python Backend Developer, Associate Software Engineer, AI Application Developer | Supported by codebase depth in TypeScript, Python, React, FastAPI, and Laravel | **High (Verified)** | Safe to publish |
| **Location & Availability** | India · Open to full-time onsite, hybrid, and remote roles; open to relocation | Portfolio and LinkedIn metadata | **High (Verified)** | Safe to publish |
| **Professional Experience (Industry)** | ~3 months as Python Developer at Programmica (Dec 2024 — Feb 2025) | `angula-portfolio/app/page.tsx` line 44; confirmed in prompt baseline. | **High (Verified)** | Safe to publish. Never inflate to 3+ years. |
| **Client Work** | Universal Wholesale & Unique Jersey Wholesale | Verified client-facing full-stack delivery and open architecture codebase (`Unique-Distributors`). | **High (Verified)** | Safe to publish. Exclude proprietary customer data and private credentials. |
| **Unverified Experience** | Versaero Private Limited (Mar–Jun 2025), K2 Edtech (Jun–Oct 2024) | Found in legacy `angula-portfolio/app/page.tsx` but unverified via formal resume. | **Medium (Omitted)** | **Omitted from primary profile timeline** to adhere to strict verification standards. Documented here. |

---

## 2. Deep Project Architecture Cross-Check

### 2.1 Unique Jersey Wholesale (`Unique-Distributors`)
- **Repository:** `https://github.com/AngulaBadrinath/Unique-Distributors` (Public)
- **Framework & Runtime Versions Verified:**
  - Backend: Laravel 13 (`laravel/framework: ^13.17`), PHP 8.3/8.5 (`composer.json`)
  - Frontend: React 19 (`react: ^19.2.8`), TypeScript 7 (`typescript: ^7.0.2`), Inertia 3 (`@inertiajs/react: ^3.7.0`), Tailwind CSS 4 (`tailwindcss: ^4.0.0`), Vite 8 (`vite: ^8.0.0`)
  - Persistence: PostgreSQL 18, Redis 7 (`predis/predis: ^3.6`), Docker Compose
  - Testing: Playwright (`@playwright/test: ^1.63.0`), PHPUnit 12 (`phpunit/phpunit: ^12.5.12`), Pest test harness
- **Genuinely Implemented Capabilities (Verified in Codebase):**
  - **Atomic Pessimistic Row Locking:** `OrderAllocationService.php` uses `DB::transaction()` with `Order::where(...)->lockForUpdate()` and `OrderItem::lockForUpdate()->orderBy('id', 'asc')` to deterministically prevent concurrency allocation race conditions.
  - **Double-Entry General Ledger:** Full accounting subsystem verified: `GeneralLedgerService.php`, `JournalService.php`, `ChartOfAccountsTable`, `JournalEntriesAndLinesTables`, `BalanceSheetService.php`, `TrialBalanceService.php`. Database triggers enforce strict immutability on posted invoices and audit lines (`2026_09_06_000012_create_invoice_immutability_triggers.php`).
  - **5 Role Scopes:** Implemented portals and permissioned scopes for Admin (`/admin/*`), Salesman (`/salesman/*`), Delivery (`/delivery/*`), Warehouse Manager, and Accountant.
  - **Proof of Delivery (PoD):** `DeliveryEvidenceService.php` validates server-side magic-bytes (`\xFF\xD8\xFF` for JPEG, `\x89PNG\r\n\x1a\n` for PNG) and enforces a 5MB size ceiling.
- **Configured vs. Active Architecture Nuances (Labeled Transparently):**
  - **Storage:** Defaults to local private disk (`storage_path('app/private')`) with configuration hooks for S3 via `FILESYSTEM_DISK` and `config/filesystems.php`. Remote S3 is an architected driver option rather than an active cloud deployment.
  - **Queues:** Synchronous domain transactions are active in the current application flow. Redis/Database queue connections are configured (`config/queue.php`) and table migrations exist (`create_jobs_table`), but `app/Jobs` does not host asynchronous background tasks in the current baseline.

---

### 2.2 ARA — AI Resume Analyzer (`ARA`)
- **Repository:** `https://github.com/AngulaBadrinath/ARA` (Public)
- **Framework & Runtime Versions Verified:**
  - Frontend: Next.js 15 (`apps/web`), React 19, TypeScript, Tailwind CSS
  - Backend API: FastAPI (`apps/api`), Python 3.12+, Pydantic v2, SQLAlchemy ORM
  - Persistence: PostgreSQL 18, Docker Compose
  - LLM Inference: Local Ollama model integration (`apps/api/app/services/ollama_service.py`)
- **Genuinely Implemented Capabilities (Verified in Codebase):**
  - **Multi-Tenant Scoping:** All database entities enforce `organization_id` foreign keys and UUID primary keys. Endpoints require JWT authentication scoped to the user's tenant organization.
  - **Multipart Ingestion:** `POST /api/v1/resumes/upload` streams uploaded PDF documents to local disk (`uploads/`) and invokes `resume_parser.py` (`pypdf`) for character extraction.
  - **Synchronous LLM Pipeline:** `POST /api/v1/analysis/jobs` creates an `AnalysisJob` row in PostgreSQL, synchronously triggers `ollama_service.analyze_resume(text)`, stores structured JSON (skills, gaps, score) in `AnalysisRepository`, and marks status as `COMPLETED`.
- **Target Blueprint vs. Active Implementation (Labeled Transparently):**
  - **Asynchronous Workers (Target Blueprint):** `apps/api/app/workers/__init__.py` contains `WorkerSettings` and stubbed async job hooks (`analyze_resume_job`) for ARQ over Redis 7. This is documented in `architecture.md` as the target horizontal scaling blueprint, whereas the working implementation executes synchronously.
  - **Direct S3 Presigned Uploads (Target Blueprint):** Target architecture specifies direct browser-to-S3 presigned uploads to bypass API buffering. The current working implementation utilizes direct multipart streaming to the FastAPI upload endpoint.

---

### 2.3 Supporting Project: Universal Wholesale (Client Delivery)
- **Repository:** Private / Client-Owned (No public repository link)
- **Scope:** Real-world B2B wholesale commerce workflow including product catalogs, bulk cart mechanics, wholesale pricing tiers, order status tracking, and authentication.
- **Publication Policy:** Disclosed strictly as a case study in client application delivery. Confidential client names, customer credentials, proprietary transaction volumes, and commercial agreements are strictly excluded.

---

## 3. Security Audit & Credential Assessment (`ARA/.env.production`)

- **Audit Trigger:** Mandatory security review of tracked configuration files in public repositories.
- **Local Inspection Result:**
  - Inspected `ARA/.env.production` locally without logging, copying, or committing any secret values.
  - Network endpoints (`DATABASE_URL`, `REDIS_URL`, `S3_ENDPOINT`, `LLM_API_BASE`) point to internal Docker container service names (`db`, `redis`, `minio:9000`, `ollama:11434`), rather than public cloud endpoints or AWS ARNs.
  - However, custom non-trivial strings are present for `SECRET_KEY`, database password, and S3 access/secret keys.
- **Risk Assessment:**
  - Committed secrets in public repositories create exposure risks if credentials or patterns are reused across environments, and trigger automated scanning alerts (GitGuardian / GitHub Secret Scanning).
- **Remediation & Rotation Advisory (for Repository Owner):**
  1. Immediately rotate the JWT `SECRET_KEY`, PostgreSQL user password, and MinIO access/secret keys if any of these values were reused in personal or staging infrastructure.
  2. Untrack `.env.production` from Git:
     ```bash
     git rm --cached .env.production
     echo ".env.production" >> .gitignore
     git commit -m "chore(security): untrack .env.production"
     git push
     ```
  3. If history purging is required, use `git-filter-repo` to redact the commit that introduced the file.
- **Profile Task Boundary:** Strictly maintained. No files inside `AngulaBadrinath/ARA` were modified or committed in this task.

---

## 4. Truthfulness Safeguards Check

- [x] No fabricated star counts, download numbers, or uptime claims.
- [x] No inflated years of experience (accurately reflects 2026 graduation and ~3mo Programmica internship + client projects).
- [x] Explicit demarcation between active codebase implementations and target architectural blueprints.
- [x] Distinct segregation between Unique Jersey Wholesale (open architecture) and Universal Wholesale (private client case study).
- [x] Zero secrets, tokens, or credentials published.
