# TODO by Phase — Orbit Storefront Refactor

> Derived from `REFACTOR_PLAN.md` §6 Delivery Plan, under `fast-development.md` constraints
> (working MVP ≤ 2h, keep the stack, minimal new deps).
> Verification rule for every phase: `npm run typecheck` green + app behavior unchanged.

---

## Phase 0 — Setup (before step 1)

- [x] Install the only new (dev) dependencies: `npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- [x] Add `vitest` script to `package.json` (`"test": "vitest run"`) — no custom config unless required
- [x] Confirm `npm run dev` still works (baseline screenshot at 380px + full width)

**Budget:** ~10 min · **Packages:** vitest + RTL + jsdom (essential, dev-only)

---

## Phase 1 — Skeleton + Typed Store (was: provider.tsx)

- [x] Create folder structure: `features/{catalogue,purchase,session}/{api,model,store,components}` + `shared/{store,ui,lib}`
- [x] `shared/store/store.ts` — `configureStore` with three slices (`session`, `catalogue`, `purchase`), export `RootState` / `AppDispatch`
- [x] `shared/store/hooks.ts` — `useAppDispatch` / `useAppSelector` (removes all `state: any`)
- [x] Convert string-switch reducer in `app/provider.tsx` → `createSlice`; delete `provider.tsx`, mount `<Provider>` in `app/layout.tsx`
- [x] Move `sort` state INTO Redux (`catalogue` slice)

**Budget:** ~30 min · **Done when:** app runs unchanged, store fully typed, no `any` in selectors

---

## Phase 2 — features/session (prove the pattern)

- [x] `session/api/user-api.ts` — extract mock user fetch from `app/page.tsx`
- [x] `session/store/session-slice.ts` — `user`, `balance` + `fetchUser` thunk
- [x] `session/components/UserBadge.tsx` — extract header UI
- [x] `session/index.ts` — public API (component, selectors, types)

**Budget:** ~20 min · **Done when:** header renders identically from the feature's public API

---

## Phase 3 — features/catalogue: model first (TDD)

- [ ] Write FAILING tests: `filterProducts` (search + category) and `sortProducts` in `catalogue/model/filters.ts`
- [ ] Implement pure functions until green (`vitest run`)
- [ ] `catalogue/store/catalogue-slice.ts` — `items`, `status`, `search`, `category`, `sort` + `fetchProducts` thunk
- [ ] `selectFilteredProducts` — memoized `createSelector` over `(items, search, category, sort)`
- [ ] Wire dashboard to the selector

**Budget:** ~30 min · **Done when:** `vitest run` green, dashboard filters/sort via Redux selector

---

## Phase 4 — features/catalogue: UI extraction

- [ ] Extract dashboard monolith → `catalogue/components/`: `CataloguePage`, `ProductGrid`, `ProductCard`, `FilterTabs`
- [ ] Introduce `shared/ui` atoms as encountered: `Button`, `Badge`, `Price`, `Spinner`, `Icon`
- [ ] Introduce molecules: `SearchBar` (input + button), `EmptyState`
- [ ] `catalogue/index.ts` public API; `app/page.tsx` becomes a thin route

**Budget:** ~40 min · **Done when:** dashboard composed from feature components + shared atoms, zero business logic in JSX

---

## Phase 5 — features/purchase: model first (TDD), then UI

- [ ] Write FAILING tests for `decidePurchase(price, balance, stock)`: out-of-stock → insufficient balance → ok
- [ ] Implement in `purchase/model/purchase.ts` until green
- [ ] `purchase/api/product-api.ts` — detail fetch + buy simulation (stays duplicated per Resolved Decision 1)
- [ ] `purchase/store/purchase-slice.ts` — `order`, `status`; balance read via session's public selector
- [ ] Extract detail page UI → `purchase/components/`: `BuyButton`, `SpecList`, `ResultDialog` usage
- [ ] `purchase/index.ts` public API; `app/product/[id]/page.tsx` becomes a thin route

**Budget:** ~40 min · **Done when:** `vitest run` green, buy flow unchanged end-to-end

---

## Phase 6 — Dialog organism

- [ ] Extract focus trap + a11y into `shared/ui/organisms/Dialog` (no feature/store imports)
- [ ] One RTL smoke test (open/close, focus trapped)
- [ ] Manual smoke test: both purchase outcomes (success dialog, error dialog)

**Budget:** ~20 min · **Done when:** both flows verified manually + 1 passing RTL test

---

## Phase 7 — CSS extraction (OPTIONAL — first to drop under deadline)

- [ ] Split `globals.css` → tokens/base stays global; per-component CSS files beside components
- [ ] Verify visually at 380px + full width (manual only, per Resolved Decision 3)

**Budget:** flex · **Done when:** zero visual diff

---

## Checklists

### New packages (Rule 2, ranked by time saved)

| Package | Purpose | Status |
|---|---|---|
| `vitest` + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom` | TDD loops on model + components | Essential (Phase 0) |
| `@reduxjs/toolkit` / `react-redux` | Already installed — slices, thunks, `createSelector` | Present, install nothing |
| `eslint-plugin-boundaries` | Import-rule enforcement | Optional — defer to 4th feature |

### TDD scope (what test-first applies to)

- **Test-FIRST (true TDD):** only `model/` pure functions — `filterProducts`/`sortProducts` (P3) and `decidePurchase` (P5). These don't exist yet → write failing test, then extract logic from page code into the function.
- **Test-AFTER (refactor + verify):** UI extraction (P4, P6). Behavior-preserving moves of existing working code — verify unchanged, add smoke tests after. A failing test for markup that already renders proves nothing.
- **No tests:** store wiring (P1, P2) — scaffolding with no business rule to assert.

### Guardrails (from fast-development.md)

- No new state-management library; no visual redesign; no backend/auth.
- Total budget check after each phase: if > ~2h projected, drop Phase 7 → then trim Phase 4/6 polish.
- Never cut: typed store (P1), model tests (P3, P5).
