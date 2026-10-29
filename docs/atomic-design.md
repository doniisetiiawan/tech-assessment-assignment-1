# Atomic Design

A methodology for crafting design systems by breaking interfaces into five hierarchical levels — from the smallest building blocks (atoms) up to full pages.

## 1. Overview

**Atomic Design** is a design methodology created by **Brad Frost** in 2013. Inspired by chemistry — where atoms bond into molecules, which combine into organisms — it applies the same mental model to user interfaces: break entire interfaces down into their fundamental building blocks, then work upward from there.

Core idea, quoted from Stephen Hay (via Brad Frost):

> "We're not designing pages, we're designing systems of components."

### Purpose

| Goal | How Atomic Design achieves it |
| --- | --- |
| **Consistency** | Shared atoms and molecules enforce uniform styling and behavior across the product. |
| **Scalability** | New pages and features are assembled from proven components instead of built from scratch. |
| **Reusability** | Components are designed once and reused everywhere (DRY principle). |
| **Shared vocabulary** | Designers, developers, and stakeholders speak the same language ("that's an organism-level change"). |
| **Abstract-to-concrete traversal** | Teams can move between primitives and final context, ensuring the system works in real usage. |

### Two directions of work

- **Bottom-up (assembling):** build atoms → molecules → organisms → templates → pages. This crafts the system "right out of the gate."
- **Top-down (deconstructing):** start from pages and break them into constituent parts. Useful when auditing an existing UI.

In practice, the levels are **not a strict linear assembly line** — they're used concurrently to shape the final UI.

---

## 2. The Five Levels

```
Atoms ──► Molecules ──► Organisms ──► Templates ──► Pages
(small)                                          (complex)
```

### 2.1 Atoms

The **smallest, indivisible** units of an interface. They cannot be broken down further without losing their function.

**Examples:** button, input, label, icon, badge, heading, avatar, color palette, font styles, spacing tokens, animations.

**Characteristics:**
- Single responsibility; abstract on their own (a button alone "does" little).
- No dependencies on other components.
- Should use design tokens only (no hardcoded colors/sizes).

```tsx
// atoms/Button.tsx
type ButtonProps = {
  variant: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
};

export function Button({ variant, onClick, children }: ButtonProps) {
  return (
    <button className={`btn btn--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### 2.2 Molecules

**Groups of atoms bonded together** — the smallest functional units of a compound. A molecule "does one thing well."

**Examples:**
- Search bar = input + button
- Form field = label + input + error message
- Menu item = icon + text
- Navigation item = link + icon

```tsx
// molecules/SearchBar.tsx — input atom + button atom combined
import { Button } from '../atoms/Button';

export function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(new FormData(e.currentTarget).get('q') as string);
      }}
    >
      <input name="q" type="search" placeholder="Search…" />
      <Button variant="primary">Search</Button>
    </form>
  );
}
```

### 2.3 Organisms

**Groups of molecules** (and/or atoms) joined into a relatively complex, distinct **section of an interface**. Organisms can combine similar molecules (a product grid repeating the same card) or different ones (a header containing logo, nav, and search).

**Examples:** header/masthead, footer, navigation bar, product card grid, signup form section, hero section.

```tsx
// organisms/Header.tsx — multiple molecules composed
import { SearchBar } from '../molecules/SearchBar';
import { MenuItem } from '../molecules/MenuItem';

export function Header({ onSearch }: { onSearch: (q: string) => void }) {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <img src="/logo.svg" alt="Home" />
      </a>
      <nav>
        <MenuItem icon="home" label="Home" href="/" />
        <MenuItem icon="user" label="Profile" href="/profile" />
      </nav>
      <SearchBar onSearch={onSearch} />
    </header>
  );
}
```

### 2.4 Templates

**Groups of organisms stitched together to form page layouts.** The chemistry analogy ends here — templates focus on the page's structure: where content goes, without real content. They typically begin life as wireframes with placeholder text and increase in fidelity over time.

**Examples:** homepage layout, article page layout, dashboard layout, checkout flow layout.

```tsx
// templates/HomeTemplate.tsx — structure only, placeholder content
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

export function HomeTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header onSearch={() => {}} />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}
```

### 2.5 Pages

**Specific instances of templates** where placeholder content is replaced with **real, representative content**. Pages are the highest level of fidelity — where users (and stakeholders) actually spend their attention, and where the design system gets validated in context.

**Examples:** homepage with real products, a user profile with actual data, cart with one item vs. ten items.

Pages are also where you test **content variations** — long headlines vs. short ones, empty states vs. full states — and loop back to adjust molecules/organisms accordingly.

```
Template  →  Page
[headline placeholder]  →  "Summer Sale Ends Friday"
[empty cart section]    →  cart with 3 items + discount code
```

---

## 3. Best Practices

1. **Use tokens, not hardcoded values.** Atoms should reference design tokens (`--color-primary`, `--space-2`) so a single change propagates everywhere.
2. **Keep components single-responsibility.** If a component does two unrelated things, split it.
3. **Don't over-taxonomy.** Don't burn weeks debating "is a chip an atom or a molecule?" — the taxonomy is a guide, not a religion. Most systems fail from design/code drift, not from a wrong label.
4. **Use both directions.** Assemble bottom-up, but validate top-down from real pages; let page-level findings loop back into lower levels.
5. **Isolate and test components.** Render molecules/organisms in isolation (e.g., **Storybook**) to verify they work outside full-page context.
6. **Make components portable.** Organisms shouldn't assume page-level context; pass data via props, not globals.
7. **Design states deliberately.** Document hover, focus, disabled, loading, empty, and error states per component (plus accessibility per WCAG).
8. **Keep design and code in sync.** Maintain living documentation so the system doesn't "rot" after the initial build.
9. **Co-locate sensibly.** A common structure mirrors the hierarchy:

```
src/
  components/
    atoms/        # Button, Input, Icon, Label
    molecules/    # SearchBar, FormField, MenuItem
    organisms/    # Header, Footer, ProductGrid
  templates/      # HomeTemplate, ArticleTemplate
  pages/          # real routes consuming templates
```

10. **Avoid rigidity.** Levels are a mental model; some components blur lines, and that's acceptable. Optimize for team clarity, not purist classification.

---

## 4. Real-World Use Cases & Recommendations

### Use cases

| Scenario | Why Atomic Design fits |
| --- | --- |
| **Design systems at scale** (multi-product orgs) | Shared component library guarantees cross-product consistency. |
| **E-commerce sites** | Product cards (molecules) repeat in grids (organisms) across listing, cart, and checkout pages. |
| **Content platforms / media sites** | Article templates reused across thousands of pages with varied content. |
| **Large teams (designers + developers)** | Common vocabulary reduces handoff friction and review ambiguity. |
| **Rapid MVP development** | Starting from a component library makes page assembly fast and predictable. |

### Implementation recommendations

1. **Start with an interface audit.** Extract repeatable elements from existing screens — those become your first atoms and molecules.
2. **Build a component library** in your framework of choice (React/Vue/Angular) that reflects the atomic structure.
3. **Document as you go** — usage rules, states, and accessibility notes per component, ideally in a catalog tool.
4. **Test in isolation first**, then in page context.
5. **Apply pragmatically** in modern stacks: shadcn/ui, Material UI, and Chakra UI already ship atom/molecule-grade primitives — compose them into organisms instead of rebuilding everything.

### Tooling quick reference

| Purpose | Tools |
| --- | --- |
| Component catalog / isolation | Storybook, Pattern Lab (Frost's original tool) |
| UI primitives (atoms/molecules) | shadcn/ui, Radix UI, Material UI, Chakra UI |
| Design-code sync | Figma component libraries, design tokens (Style Dictionary) |
| Testing | Playwright, Testing Library, Chromatic (visual regression) |

---

## 5. References

1. Brad Frost — *Atomic Web Design* (original article, 2013): <https://bradfrost.com/blog/post/atomic-web-design/>
2. Brad Frost — *Atomic Design* (free book): <https://atomicdesign.bradfrost.com/>
3. Pattern Lab (tool implementing the methodology): <https://patternlab.io/>
4. LogRocket — *Atomic design components in UI design*: <https://blog.logrocket.com/ux-design/atomic-design-components-ui-design/>
5. UXPin — *Essential Design System Components (2026 Guide)*: <https://www.uxpin.com/studio/blog/design-system-components/>
6. Mykola Aleksandrov — *Atomic Design in Practice*: <https://www.mykolaaleksandrov.dev/posts/2025/11/atomic-design-in-practice/>
7. Feature-Sliced Design blog — *Atomic Design: Build UIs That Actually Scale*: <https://feature-sliced.design/uz/blog/atomic-design-architecture>
8. Dan Mall — *Element Collages*: <https://v3.danmall.com/articles/rif-element-collages/>
