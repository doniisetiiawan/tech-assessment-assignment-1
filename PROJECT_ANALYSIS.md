# Project Analysis — Orbit Refactoring Assignment 01

## 1. Project Overview

**Orbit** is a demo device storefront (smartphones and tablets) built with Next.js App Router, React 19, TypeScript, and Redux Toolkit. Per the README, it is deliberately the **starting point of a refactoring exercise**: the UI is polished, but the implementation is intentionally tangled (monolithic components, inline mock APIs, duplicated data, an untyped Redux store).

Main functionality:

- Dashboard with simulated user and product APIs.
- Product catalogue (6 devices) with search, category filters, and price sorting.
- Product detail page with specifications, simulated detail API, and deep-linkable URLs (`/product/3`).
- Simulated purchase flow: $1,050 demo wallet, buy API, pending state, success / insufficient-balance dialogs.
- Responsive layout, loading/error/empty states, keyboard focus trap in the dialog.

No backend, payment provider, or real data — all APIs are local `Promise`/`setTimeout` simulations. State resets on reload.

## 2. Project Structure

```
tech-assessment-assignment-1/
├── app/
│   ├── layout.tsx          # Root layout; mounts Redux <Provider> and global CSS
│   ├── provider.tsx        # Redux store: one big switch-style reducer (all app state)
│   ├── globals.css         # ~all styling: plain CSS, design tokens, device art, responsive breakpoints
│   ├── page.tsx            # Dashboard: header, welcome, filters, product grid, benefits, footer (~600-line monolith)
│   └── product/[id]/
│       └── page.tsx        # Detail page: mock API, buy flow, success dialog, focus trap (single monolith)
├── docs/                   # Reference material (not app code)
│   ├── atomic-design.md
│   ├── clean-architecture.md
│   ├── feature-driven-development.md
│   └── test-driven-development.md
├── fast-development.md     # AI guidance rules for rapid MVP development
├── README.md               # Run instructions and feature description
├── package.json
└── tsconfig.json
```

The `docs/` folder contains methodology references (Atomic Design, Clean Architecture, FDD, TDD) — clearly provided as the intended target patterns for the refactoring assignment, since the current code follows none of them.

## 3. Architecture

Current architecture is **minimal and flat** — effectively two client-rendered page monoliths:

```
layout.tsx → provider.tsx (Redux store) → page.tsx / product/[id]/page.tsx
```

**Data flow:**

1. On mount, each page creates local mock APIs (`setTimeout` + `Promise`) and dispatches string-typed actions (`USER`, `PRODUCTS`, `SELECTED`, `ORDER`, `SEARCH`, `CATEGORY`) into a single reducer defined in [provider.tsx](file:///Users/SNPMAC020/Documents/tech-assessment-assignment-1/app/provider.tsx).
2. Components read state via `useSelector((state: any) => ...)` — no selectors, no typed slices.
3. Filtering/sorting is done inline in the dashboard render (derived from `state.products`, `state.search`, `state.category`, plus a local `sort` useState that is *not* in Redux).
4. Purchase logic (validation, order creation, balance check) lives inside the `buy()` function of the detail page component.

**Design patterns present:** none structurally — no separation of concerns, no feature slicing, no container/presenter split. Both pages mix data fetching, business rules, presentation, and styling concerns in single files. The dialog implements a manual focus trap (accessibility concern) directly inside the page.

## 4. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^16.0.0 |
| UI | React + ReactDOM | ^19.2.0 |
| State | Redux Toolkit + React Redux | ^2.9.0 / ^9.2.0 |
| Icons | lucide-react | ^0.468.0 |
| Language | TypeScript (strict mode) | ^5.9.0 |

Scripts: `dev`, `build`, `start`, `typecheck` (`tsc --noEmit`). No test runner, linter, formatter, or CI configured. `next.config.*` is absent (defaults used). Fonts loaded via Google Fonts `@import` with system-font fallback.

Notably, Redux Toolkit's `createSlice`/`createAsyncThunk` are installed but **unused** — the store uses a hand-written string-switch reducer with `any` payloads, which defeats RTK's type safety.

## 5. Core Features

| Feature | How it works |
|---|---|
| **User session (simulated)** | Dashboard fetches a mock user (name, email, membership, $1,050 wallet) after ~450ms; dispatched as `USER` into the store. Wallet balance lives in Redux and never deducts after purchase. |
| **Catalogue** | 6 hardcoded devices (iPhone 16 Pro, Galaxy S25 Ultra, iPad Air, Pixel 9 Pro, Galaxy Tab S10+, iPhone 16) fetched after ~750ms. Products get a precomputed `priceLabel`. |
| **Filtering & sorting** | Category tabs (All/Smartphones/Tablets) and search text come from Redux; price sort direction is **local component state** (inconsistent with the rest). Filtering/sorting recomputed on every render without memoization. |
| **Product detail** | `/product/[id]` independently re-fetches from a **duplicated inline catalogue** (array-of-arrays format, mapped to an object). Unknown IDs render a "not found" state. `SELECTED` is dispatched but never read anywhere. |
| **Purchase flow** | `buy()` simulates a POST (~1100ms): rejects out-of-stock, returns `insufficient_balance` if price > balance, else an order object. Orders appended to Redux (`ORDER`). Busy flag prevents duplicate submits. Success/failure dialog shows result and returns to dashboard. |
| **Accessibility** | `aria` labels/roles on key elements, focus moves into and is trapped within the dialog, restored on close; `prefers-reduced-motion` respected in CSS. |
| **Visuals** | Device illustrations are pure CSS (rotated front/back device mockups, camera arrays, per-color-tone CSS variables). Fully responsive down to 380px. |

---

*Analysis based on the codebase as of 2026-10-29. No existing project files were modified.*
