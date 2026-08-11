# WP0 — Production Truth Receipt

## Verdict

**BLOCKED — external deployment, production schema/runtime, and authenticated-loop evidence are missing.**

## Repository

- Repository: `tristanxsinclair/www.eblocki.space`
- Branch: `codex/wp0-production-truth`
- Inspected base HEAD SHA: `6ab937ce806a3e67e3d420706afd9b332db64ebb`
- Base commit: `Merge pull request #110 from tristanxsinclair/codex/eblocki-sophistication`
- WP0 implementation commit: `c991de409e0479767281886590c5b32d22c8672b`
- Working tree: clean after focused commits
- Remote status: `codex/wp0-production-truth` pushed; draft PR #111 targets `main`

## Build identity

- Commit SHA: injected from a validated deployment variable or `git rev-parse HEAD`; otherwise unavailable
- Build ID: deployment-supplied ID, or SHA plus UTC build time when SHA is known; otherwise unavailable
- Build timestamp: UTC ISO-8601 timestamp generated when Vite evaluates the production build
- Environment: explicit deployment environment, falling back to the Vite mode
- App version: `0.0.0` from `package.json`

GitHub CI, Pages, and E2E builds now supply `github.sha`, the Actions run ID/attempt, and an explicit environment. The client-visible object contains only the five fields above; it does not read or expose application secrets.

## Lovable WP0 audit

Claimed:

- roadmap
- build metadata
- Settings card
- clean typecheck
- 367 passing tests

Observed at `origin/main` before this work:

- no `docs/release/personal-evidence-twin-roadmap.md`
- no `src/lib/eblocki/build-info.ts`
- no Settings build-information card
- no build metadata injection in `vite.config.ts`
- no reproducible evidence for the claimed typecheck or test count

Corrections:

- implemented the build identity contract and honest unavailable state
- added the Settings System/build-information card
- added build metadata tests
- added trusted metadata inputs to GitHub build workflows
- added the gated roadmap and this receipt
- added a database uniqueness guard for one XP settlement per non-null proof ID
- applied non-breaking transitive security patches; no force or major upgrade was used

## Verification matrix

| Check | Command / evidence | Status | Observation |
| --- | --- | --- | --- |
| Typecheck | `npm exec -- tsc -p tsconfig.app.json --noEmit` | PASS | exited 0 with no diagnostics |
| Tests | `npm test` | PASS | 50 files, 375 tests passed |
| Build | `npm run build` | PASS | Vite 5.4.21; 1,977 modules; existing >500 kB chunk warning |
| Lint | `npm run lint:eblocki`; `npm run lint` | PASS | targeted gate clean; repository lint 0 errors and 12 existing warnings |
| Route smoke | preview on `127.0.0.1:4172`; `npm run smoke:routes` | PASS | 17/17 routes returned HTTP 200 |
| Bundle guardrail | `npm run perf:bundle-size` | PASS | all JS/CSS chunks within repository budgets |
| Production audit | `npm audit --omit=dev --audit-level=high` | PASS | no high production finding; two moderate React Router advisories remain and require a breaking v7 upgrade |
| CI | GitHub PR #111 checks for `c991de4` | PASS | Verify product, test/build/lint, mobile Playwright, and Pages build all passed; Supabase Preview skipped |

## Supabase alignment

- Local schema: `proof_artifacts` drives the `cle_after_proof_insert` trigger; the May 20 CLE migration creates `xp_events`, `court_verdicts`, `domain_levels`, `operator_level`, and `identity_ledger`.
- Generated types: contain the proof, verdict, XP, ledger, commitment, objective, operator, and domain structures read by current source.
- Frontend writes: `Proof.tsx` inserts the generated `proof_artifacts` fields, then links commitments/objectives using ownership and null guards.
- CLE: Postgres creates the authoritative verdict, XP event, ledger entry, and progression updates after artifact insert. `court_verdicts.proof_id` is already a primary key.
- Duplicate protection: the WP0 migration adds a partial unique index on `xp_events(proof_id)` for non-null proof IDs. Court is one-per-proof; commitment/objective closure is guarded; multiple ledger kinds for one proof remain intentional.
- Production state: **UNVERIFIED**. Local migration files are not deployment evidence.
- Edge functions: local Coach and support functions were inspected; deployed source/version could not be matched.

Verdict: **UNVERIFIED**

## Production identity

- Canonical URL: `https://eblocki.space`
- Expected SHA: WP0 candidate commit not yet published
- Live SHA: unavailable
- Expected build ID: generated when the candidate is built by the publisher
- Live build ID: unavailable
- Repo → live: **UNVERIFIED**

Observed on 11 August 2026 (Australia/Perth): the public landing page loaded. Navigating to `/settings` redirected to `/auth`, and the live signed-out surface exposed no build identity.

## Authenticated production evidence loop

- Session available: no
- Artifact submission: not observed
- Artifact ID: unavailable
- Court verdict: not observed
- Court verdict ID: unavailable
- XP settlement: not observed
- XP event ID: unavailable
- Quest/objective closure: not observed
- Progression update: not observed
- Next command: not observed
- Refresh persistence: not observed
- Duplicate settlement check: source/migration audit only; production behaviour not observed

Status: **NOT OBSERVED**

## Remaining blockers

- WP0 candidate is committed, pushed, and green in CI, but is not merged or published to canonical production.
- The new XP uniqueness migration is not verified as applied in production.
- Production Supabase schema and Edge Function versions cannot be matched to repository source with current access.
- Canonical production exposes no SHA/build ID that can be matched to the candidate.
- No legitimate authenticated production session was available for the real evidence-settlement loop.

## Evidence limitations

- GitHub Pages success proves only the separate Pages workflow, not canonical Lovable publication.
- Signed-out route access does not prove authenticated application behaviour.
- Generated types and local migrations do not prove production database state.
- Edge Function source presence does not prove deployment.

## Final WP0 decision

WP0 is **BLOCKED**. Local source/build verification passes, but canonical production identity, production Supabase/runtime alignment, and an authenticated non-duplicating settlement loop remain unobserved. WP1 must not begin.
