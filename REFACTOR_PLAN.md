# Refactor Plan — Orbit Storefront

> Blueprint for refactoring the current codebase to follow the methodologies in `docs/`
> (Feature-Driven Development, Clean Architecture, Atomic Design, TDD),
> under the constraints of `fast-development.md` (working MVP, minimal dependencies, keep the stack).

---

## 1. Context & Goals

**Problem.** The app is two client-rendered monoliths (~600-line dashboard, monolithic detail page) with:

- One hand-written string-switch reducer in `app/provider.tsx` — `createSlice`/`createAsyncThunk` installed but unused; `useSelector((state: any) => ...)` everywhere.
- Business logic (purchase validation, balance check, filtering/sorting) inline in page components.
- Duplicated product catalogue (dashboard array vs. detail-page array-of-arrays).
- Mock APIs (`setTimeout` + `Promise`) defined inside components.
- All styling in one ~global `globals.css`; no component structure at all.
- No tests, no selectors, `sort` state living outside Redux inconsistently.

**Goals.**

1. Organize code **by feature** (FDD / feature-sliced) with a public API per feature.
2. Apply **Clean Architecture inside each feature**: pure domain logic → use-case hooks → UI, so dependencies point inward.
3. Structure shared UI with **Atomic Design** (atoms / molecules / organisms) in `shared/ui`.
4. Make the core business rules **test-first** (TDD) with Vitest + React Testing Library.

**Non-goals.**

- No backend, no real API, no auth — mock APIs stay, just relocated.
- No new state-management library (keep Redux Toolkit).
- No Storybook / CI / lint-boundaries plugin for the MVP — note where they'd go later.
- No visual redesign; keep the exact UI and CSS output.

**Quality attributes that matter here:** change locality (one feature = one folder), testability of purchase logic, type safety of the store.

---

## 2. Target Architecture

Feature-sliced structure with Atomic Design governing shared UI and Clean layering inside each feature:

```
app/                          # routing + composition root ONLY
  layout.tsx                  # mounts <Provider>, global CSS
  page.tsx                    # dashboard route  → features/catalogue
  product/[id]/page.tsx       # detail route     → features/purchase
  globals.css                 # tokens + base styles only (extracted per-component CSS)
  provider.tsx                # DELETED → shared/store

features/
  catalogue/                  # "Browse and filter the product catalogue"
    api/products-api.ts       # mock fetch (setTimeout simulation)
    model/filters.ts          # PURE: filterProducts, sortProducts, Category type
    store/catalogue-slice.ts  # createSlice: products, status, search, category, sort
    components/               # feature organisms: FilterTabs, ProductCard, ProductGrid
    index.ts                  # PUBLIC API: <CataloguePage/>, selectors, types
  purchase/                   # "View a device and buy it with wallet balance"
    api/product-api.ts        # single source of truth for product detail + buy simulation
    model/purchase.ts         # PURE: canPurchase(price, balance, stock) → 'ok' | 'insufficient_balance' | 'out_of_stock'
    store/purchase-slice.ts   # order, status, balance handling via RTK extraReducers
    components/               # BuyButton, SpecList, ResultDialog (with focus trap)
    index.ts
  session/                    # "Greet the signed-in user with wallet balance"
    api/user-api.ts
    store/session-slice.ts    # user, balance
    components/UserBadge.tsx
    index.ts

shared/
  store/store.ts              # configureStore + typed RootState/AppDispatch (was provider.tsx)
  store/hooks.ts              # useAppDispatch / useAppSelector (kills `state: any`)
  ui/                         # Atomic Design — business-agnostic only
    atoms/       Button, Badge, Spinner, Icon, Price
    molecules/   SearchBar (input+button), FormField, EmptyState
    organisms/   Dialog (focus trap + a11y), Header, Footer
  lib/                        # formatPrice, date helpers
```

**Dependency rules** (enforced by convention now, `eslint-plugin-boundaries` later):

```
app → features → shared            (never reversed)
features ⇄ features                (forbidden; only via public index.ts if ever needed)
shared/ui never imports features
feature internals: components → model/store/api; model imports nothing
```

### Data flow (after refactor)

```
page.tsx (route) → feature index.ts → page component (composition only)
  ├── dispatches thunk (api/ → mock I/O)
  ├── selects via typed selectors (store/)
  └── renders feature components + shared/ui atoms
Business rules live in model/ (pure functions) — called by hooks/components, unit-tested directly.
```

---

## 3. Key Interfaces & Data Model

### Typed store (replaces the string-switch reducer)

```ts
// shared/store/store.ts
export const store = configureStore({
  reducer: { session: sessionReducer, catalogue: catalogueReducer, purchase: purchaseReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// shared/store/hooks.ts — no more `state: any`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Feature slices (RTK, finally used as intended)

```ts
// features/catalogue/store/catalogue-slice.ts
const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState: { items: [] as Product[], status: 'idle', search: '', category: 'all', sort: 'none' },
  reducers: {
    searchChanged(state, action: PayloadAction<string>) { state.search = action.payload; },
    categoryChanged(state, action: PayloadAction<Category>) { state.category = action.payload; },
    sortChanged(state, action: PayloadAction<SortDirection>) { state.sort = action.payload; }, // sort moves INTO Redux
  },
  extraReducers: (b) => b.addCase(fetchProducts.fulfilled, (s, a) => { s.items = a.payload; s.status = 'succeeded'; }),
});
```

```ts
// features/purchase/model/purchase.ts — the one business rule worth TDD-ing
export type PurchaseDecision = 'ok' | 'insufficient_balance' | 'out_of_stock';
export function decidePurchase(price: number, balance: number, inStock: boolean): PurchaseDecision {
  if (!inStock) return 'out_of_stock';
  return price > balance ? 'insufficient_balance' : 'ok';
}
```

### Public API per feature

```ts
// features/catalogue/index.ts — everything else is private
export { CataloguePage } from './components/catalogue-page';
export { selectFilteredProducts } from './store/catalogue-slice';
export type { Product, Category } from './model/types';
```

`selectFilteredProducts` = memoized `createSelector` over `(items, search, category, sort)` — fixes the unmemoized per-render filtering and puts sorting in one place.

---

## 4. Alternatives Considered

| Option | Why rejected |
|---|---|
| **Full Clean Architecture globally** (`domain/ application/ infrastructure/ presentation/` at top level) | Horizontal layers resurrect the "touch 5 directories per change" problem; docs' own guidance: apply Clean layering *inside* features instead. Overkill for a 3-feature MVP. |
| **Full FSD 7-layer model** (`processes/pages/widgets/...`) | Ceremony without benefit at 3 features; the simplified variant (features + shared) is the docs' own recommendation for small-to-medium projects. |
| **shadcn/ui + Tailwind for shared/ui** | Would be fastest for greenfield, but the app has polished custom CSS and a non-goal of visual change; restyling costs more than it saves. Keep plain CSS, moved into component-scoped files. |
| **Full Atomic Design tree in `shared/` (templates/pages levels)** | With App Router, routes are pages; templates add a layer with one instance each. Keep only atoms/molecules/organisms. |

---

## 5. Risks & Trade-offs

- **`globals.css` extraction is the riskiest step** — device art CSS is entangled with global selectors and custom properties. Mitigate by extracting per-component CSS *last*, after behavior is preserved and covered by smoke tests; keep tokens in `globals.css`.
- **Feature-boundary drift**: `purchase` needs product data; resist importing `catalogue` internals — duplicate the minimal fetch in `purchase/api` (already the case today) or promote `Product` type to `shared/lib/types.ts` only.
- **Optimizing away**: tests and folder discipline are the first things a 2-hour deadline will tempt you to cut. Cut visual polish and lint-boundaries tooling instead — those are listed as non-goals.
- **What we traded away**: no enforcement tooling for import rules (convention only, for now); no Storybook isolation (docs recommend it; defer).

---

## 6. Delivery Plan (ordered, each step shippable)

Per `fast-development.md`: each step uses what the stack already provides (RTK slices, selectors) before adding anything new. **Only new dependency: Vitest + RTL + jsdom** (dev-only, essential for the TDD goal).

1. **Skeleton + typed store** — create folder structure; replace `provider.tsx` with `shared/store` (`configureStore`, typed hooks, three empty slices). App runs unchanged. *(30 min)*
2. **`features/session`** — extract mock user API → slice + `<UserBadge>`. Small feature, proves the pattern. *(20 min)*
3. **`features/catalogue` model first (TDD)** — write failing tests for `filterProducts`/`sortProducts`, make green, wire `selectFilteredProducts` into dashboard. *(30 min)*
4. **`features/catalogue` UI** — extract dashboard monolith into feature components; introduce `shared/ui` atoms as they're encountered (Button, Badge, Price, SearchBar…). *(40 min)*
5. **`features/purchase` model first (TDD)** — `decidePurchase` tests (out-of-stock, insufficient, ok) before moving `buy()`; then extract detail page UI (product source stays duplicated in `purchase/api` per Resolved Decision 1). *(40 min)*
6. **Dialog organism** — extract focus trap into `shared/ui/organisms/Dialog`; smoke-test both flows manually + one RTL test. *(20 min)*
7. **CSS extraction** — split `globals.css` into tokens/base + component files. Verify visually at 380px width. *(flex / optional)*

**Verification per step:** `npm run typecheck` green + app behavior unchanged; steps 3 & 5 additionally `vitest run` green.

**Recommended packages** (Rule 2, ranked by time saved):

| Package | Purpose | Essential? | Install |
|---|---|---|---|
| `vitest` + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom` | TDD loops on pure model functions and components | Essential for steps 3/5 | `npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom` |
| `@reduxjs/toolkit` / `react-redux` | Already installed — `createSlice`, `createAsyncThunk`, `createSelector` come with RTK; **install nothing** | Already present | — |
| `eslint-plugin-boundaries` | Mechanical import-rule enforcement | Optional (defer) | `npm i -D eslint-plugin-boundaries` |

---

## 7. Resolved Decisions

1. **Product catalogue stays duplicated** — `purchase/api` keeps its own fetch rather than importing from `features/catalogue`. Unification would add a cross-feature export layer with no user-visible value inside the 2-hour MVP budget (Rules 5 & 6). Revisit when a 3rd feature needs products.
2. **Wallet balance lives in `features/session`** — it is user state. `purchase` reads it via a selector exported from session's public API, keeping the buy flow a pure decision (`decidePurchase(price, balance, stock)`) with no cross-slice reducer wiring.
3. **CSS extraction verified manually only** — no visual-regression tooling (violates Rule 5: config time > time saved). Manual check at 380px and full width; step 7 remains optional and is the first thing to drop if the deadline pressures.

---

## 8. Appendix — Atomic Design Mapping

How `shared/ui` maps onto Atomic Design levels. Business-agnostic only — anything that knows about products/orders/balance is a feature component, not an atom.

### Levels

| Level | Location | Contents | Rule |
|---|---|---|---|
| **Atoms** | `shared/ui/atoms/` | `Button`, `Badge`, `Spinner`, `Icon`, `Price` | Smallest styled units; props in, DOM out; no data fetching, no store access |
| **Molecules** | `shared/ui/molecules/` | `SearchBar` (input + button), `FormField`, `EmptyState` | Compose 2+ atoms into one interaction unit; still business-agnostic (props only) |
| **Organisms** | `shared/ui/organisms/` | `Dialog` (focus trap + a11y), `Header`, `Footer` | Self-contained sections; may hold local state (e.g. dialog open) but never import features/store |

### Composition flow (bottom-up)

```
atoms (Button, Price)
   └── molecules (SearchBar = Input + Button)
         └── organisms (Header = UserBadge slot + branding)
               └── feature components (ProductCard, BuyButton = feature-flavored compositions)
                     └── feature pages (CataloguePage, detail page)
                           └── app routes
```

### Boundary rules

- `shared/ui` never imports `features/*` or the store — data enters via props or `children` slots.
- Atoms use design tokens (CSS custom properties in `globals.css`), never hardcoded colors/sizes — a token change propagates everywhere (docs best practice #1).
- Feature components (e.g. `ProductCard`) are **not** atoms even if small: they encode business meaning. They may compose `shared/ui` atoms.
- Feature-specific visuals (device art) stay in feature CSS; `shared/ui` owns only generic primitives.
- Pages/templates level omitted: App Router routes are the pages; feature page components play the template role. Revisit when a 3rd distinct layout arrives (e.g. checkout) — see §4.

### Examples of classification

| Element | Level | Why |
|---|---|---|
| `<Price value={…}/>` | Atom | Formats + styles a number; no context |
| `<SearchBar query onQueryChange/>` | Molecule | Two atoms, one behavior, props-driven |
| `<Dialog open onClose>` | Organism | Focus trap, portal, local a11y state |
| `<ProductCard product/>` | Feature component | Knows `Product` type → lives in `features/catalogue/components`, composes `atoms/Price` + `atoms/Badge` |

---

## 9. Appendix — Clean Architecture Layer Mapping

How the target structure maps onto Clean Architecture. Note: layering is applied *inside* features (see §4), not as top-level directories.

### Entities (Domain — innermost, depends on nothing)

| Component | Location | Responsibility |
|---|---|---|
| `Product`, `User`, `Category`, `SortDirection` types | `features/*/model/types.ts` | Core data shapes |
| `filterProducts` / `sortProducts` | `features/catalogue/model/filters.ts` | Pure catalogue rules |
| `decidePurchase(price, balance, stock)` | `features/purchase/model/purchase.ts` | Buy rule → `'ok' \| 'insufficient_balance' \| 'out_of_stock'` |

Imports nothing; unit-tested directly (TDD steps 3 & 5). ✅ Fully compliant.

### Use Cases (Application)

Not a separate class layer — deliberately pushed into RTK thunks + selectors:

| Component | Location | Responsibility |
|---|---|---|
| `fetchProducts` / `buyProduct` / `fetchUser` thunks | `features/*/store/*-slice.ts` | Orchestrate one intention: call API → update slice |
| `selectFilteredProducts` (`createSelector`) | catalogue slice | Read-side use case composing filter → sort entities |
| purchase hook (implied) | `features/purchase/components/` | Binds `decidePurchase` to balance from session's public API |

Imports Entities and Gateway interfaces. ✅ Points inward.

### Interface Adapters

- **Controllers:** `app/page.tsx`, `app/product/[id]/page.tsx` (thin routes); feature page components (dispatch + compose); `shared/store/hooks.ts` (typed `useAppSelector`/`useAppDispatch` — the React↔store boundary contract).
- **Presenters:** selectors shaping store state for views (`selectFilteredProducts`).
- **Repositories/Gateways:** `features/catalogue/api/products-api.ts`, `features/purchase/api/product-api.ts`, `features/session/api/user-api.ts` (mock fetch). Redux slices act as the app's "database"; composition root is `shared/store/store.ts`.

### Frameworks & Drivers (Infrastructure / outermost)

React 19 + Next.js App Router (`app/layout.tsx` mounts `<Provider>`), Redux Toolkit store, mock persistence (`setTimeout` simulation), `shared/ui` (atoms/molecules/organisms) + CSS.

### Layer diagram

```
Infrastructure:  Next.js App Router · React · RTK store · mock API · shared/ui · CSS
                     ▼ depends on
Adapters:        routes + feature page components + typed hooks (controllers)
                 selectors (presenters) · features/*/api/*.ts (gateways)
                     ▼ depends on
Use Cases:       fetchProducts · buyProduct · fetchUser (thunks) · selectFilteredProducts
                     ▼ depends on
Entities:        decidePurchase · filterProducts · sortProducts · types  (pure, no imports)
```

Request flow — buy:

```
Button (shared/ui) → dispatch buyProduct (use case) → purchase/api (gateway I/O)
  → decidePurchase(price, balance, stock) [entity] → purchase-slice reducer
  → selectors → React re-renders ResultDialog
```

### Known deviations & mitigations

1. **No Gateway interfaces** — thunks import mock API modules directly. Cheap fix when a real API arrives: define `ProductsApi`/`PurchaseApi` interfaces per feature, inject via thunk arg. Accepted for MVP.
2. **Duplicated product fetch** — `purchase/api` vs `catalogue/api` (Resolved Decision 1). Mitigate by promoting `Product` type to `shared/lib/types.ts` so only the fetch, not the contract, is duplicated.
3. **Use cases implicit in thunks** — fine at 3 features; extract pure orchestrator into `model/` if buy logic grows (refunds, coupons).
4. **Import rules convention-only** — `eslint-plugin-boundaries` deferred (§6); add when a 4th feature lands.
