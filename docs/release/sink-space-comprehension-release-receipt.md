# Sink Space comprehension upgrade release receipt

Date: 2026-09-05 (Australia/Perth)

Status: **CONTROLLED GITHUB RELEASE COMPLETE — CANONICAL AND AUTHENTICATED EVIDENCE INCOMPLETE**

## Durable source identity

- Repository: `tristanxsinclair/www.eblocki.space`
- Implementation commit: `51461b83cff1b91ffc8d24a30c9b804e65b80a2f`
- Pull request: [#112](https://github.com/tristanxsinclair/www.eblocki.space/pull/112)
- Protected-main merge commit: `ee3481ee38dab05a0dbad2f9bb51d5efc1dd6e22`
- Required checks passed before merge: `Verify product`, `Test, build, and lint`, and `Playwright (mobile-chromium)`
- Additional Datadog build check passed.

## What shipped in source

- The public and first-use journeys now explain the university-work loop as work -> verdict -> gap -> correction.
- Advanced operating-profile setup no longer blocks the first proof submission.
- Verdict copy distinguishes observed evidence, inferred assessment, and recommended correction.
- Privacy-safe activation events cover artifact submission, correction start, and second-attempt submission without artifact or verdict text.
- Existing proof scoring, Court, XP, payments, database schema, and Supabase functions were not replaced or duplicated.

## Local clean-tree verification

Verification was repeated after the implementation commit, starting and ending with an empty `git status --porcelain`.

| Gate | Result | Evidence |
| --- | --- | --- |
| Clean install | PASS | `npm ci`; 645 packages installed from the committed lockfile |
| Tests | PASS | 52 files, 377 tests |
| TypeScript | PASS | `npx tsc -p tsconfig.app.json --noEmit` |
| Eblocki lint ratchet | PASS | `npm run lint:eblocki`; no warnings or errors |
| Full lint | PASS WITH DEBT | 0 errors and 12 pre-existing warnings outside this upgrade |
| Production build | PASS | Vite 5.4.21; 1,979 modules transformed |
| Build mutation check | PASS | `supabase/functions/mcp/index.ts` SHA-256 remained `A3DE4B6E9D268CE0583342613B44AADEF325F7E6388D4E565AD29117928C67E0` before and after build |
| Bundle guard | PASS | 1,538.3 KB JS / 1,611.3 KB budget; 107.3 KB CSS / 117.2 KB budget |
| Route smoke | PASS | 17/17 SPA routes returned HTTP 200 |
| Production-high audit gate | PASS | `npm audit --omit=dev --audit-level=high` exited 0 |

The Windows build mutation was isolated in `vite.config.ts`. `@lovable.dev/mcp-js` 0.20.x receives an absolute drive-letter path on Windows and can replace the tracked MCP function with an unresolved wrapper. Normal Windows builds now retain the reviewed generated function. Linux CI and Lovable builds still run MCP generation; `EBLOCKI_FORCE_MCP_GENERATION=true` provides an explicit Windows opt-in for validating an upstream fix.

## Advisory classification

`npm audit fix` was run without `--force`; it applied only non-breaking transitive patches and reduced the report from 9 findings (3 high, 6 moderate) to 4 findings (1 high, 3 moderate).

- Patched: `browserslist` build-tool advisories and `fast-uri` transitive runtime advisory.
- Remaining high: the Vite/esbuild Windows development-server file-read path. Vite is a development/build dependency and is not included in the deployed browser runtime. Automatic remediation requires the breaking Vite 8 upgrade.
- Remaining moderate: Vite/esbuild development-server request exposure and two React Router advisories. React Router remediation requires a deliberate v7 migration.
- Decision: do not run `npm audit fix --force`; schedule Vite 8 and React Router 7 as compatibility work with Lovable, Capacitor, routing, and browser regression coverage.

## Performance and visual evidence

- The bundle-size guard passes, but mobile-profile Lighthouse on the local production build measured performance 38, accessibility 94, best practices 100, and SEO 100.
- Mobile metrics: FCP 4,175 ms, LCP 7,440 ms, TBT 2,016 ms, CLS 0.0195, TTI 8,151 ms.
- This is observed local synthetic evidence, not real-user monitoring. It blocks an unqualified wider-distribution performance claim, but did not prevent this controlled source/Pages release.
- Verified local upgraded landing screenshot: [local-verified-desktop.png](./screenshots/sink-space-upgrade/local-verified-desktop.png) at 1281x720 with no horizontal overflow.
- Canonical pre-publication screenshot: [canonical-pre-lovable-publish.png](./screenshots/sink-space-upgrade/canonical-pre-lovable-publish.png). It records that the custom domain still served the prior hero after the GitHub deployment.

## Controlled deployment identity

GitHub Pages workflow run [33947108601](https://github.com/tristanxsinclair/www.eblocki.space/actions/runs/33947108601) completed successfully from the merge commit.

- Deployment ID: `6277511626`
- Deployment environment: `github-pages`
- Commit SHA: `ee3481ee38dab05a0dbad2f9bb51d5efc1dd6e22`
- Build ID: `github-pages-33947108601-1`
- Build timestamp: `2026-09-05T05:24:34.417Z`
- Built main asset: `assets/index-KxASu_Tu.js`
- Downloaded Pages artifact SHA-256: `B8348090CB2663D802273183A189C61EE5046AC1480E108602303CA7986123EE`

The downloaded deployment artifact was inspected and contains the exact commit SHA, build ID, timestamp, and `github-pages` environment above. This proves what GitHub built and deployed.

## Canonical production truth

`https://eblocki.space/?release=ee3481e` was cache-bypassed and inspected after the Pages deployment. It still rendered the prior `Stop fake productivity. Turn effort into proof.` experience rather than the new `Improve from the work you actually produce.` experience.

Therefore:

- GitHub Pages deployment: **VERIFIED**.
- Lovable/custom-domain publication: **NOT COMPLETE**.
- Canonical deployed build identity: **does not yet match main**.
- No claim is made that the public Eblocki product has shipped this upgrade.

## Authenticated proof-to-correction loop

The production `/proof` route redirected to `/auth`. The available in-app browser had no Eblocki or Lovable session, no connected Chrome session was available, and the host had no `E2E_TEST_USER_EMAIL`, `E2E_TEST_USER_PASSWORD`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ACCESS_TOKEN`, or saved Playwright auth state.

No account was invented, no production user was seeded, and no credentials were extracted. Consequently these required artifacts are still missing:

- first artifact persisted record ID;
- first verdict persisted record and screenshot;
- correction-start screenshot;
- second-attempt persisted record ID;
- proof that the second attempt links correctly without duplicate settlement.

## Migration readiness

This upgrade contains no schema migration and no generated Supabase type change. Production schema and Edge Function alignment were not queried because read-only Supabase access was unavailable. Local migration files are not deployment evidence.

## Exact closure sequence

1. In an owner-authenticated Lovable session, sync/publish main merge `ee3481ee38dab05a0dbad2f9bb51d5efc1dd6e22`.
2. Re-open `https://eblocki.space` with a cache-bypass query and confirm the new hero plus the compiled build identity.
3. Sign in with an approved test or owner account and run submission -> verdict persistence -> correction -> second attempt.
4. Record both artifact IDs, verdict/settlement linkage, timestamps, and screenshots without exposing private artifact content or tokens.
5. Run a mobile Lighthouse or field-performance pass on the canonical build before App Store or broad distribution.

Until those steps are recorded, the honest release verdict remains: **CODE AND CONTROLLED DEPLOYMENT COMPLETE — CANONICAL/AUTHENTICATED PROOF RECEIPT INCOMPLETE**.
