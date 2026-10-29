# AI RULES — FAST DEVELOPMENT MODE

## Main Objective

Finish the existing project as quickly as possible, targeting a working MVP within 2 hours.

Your responsibility is to actively identify and recommend tools, npm packages, libraries, frameworks, CLI utilities, APIs, and reusable components that can significantly reduce development time.

## Existing Technology Stack

- Next.js 16
- React 19
- TypeScript 5.9
- Redux Toolkit
- React Redux
- Lucide React

Keep this stack unless there is a compelling technical reason to change it.

## Rule 1 — Always Look for Faster Solutions

Before implementing any feature:

1. Check whether a reliable package or tool already solves the problem.
2. Prefer established libraries over writing complex functionality manually.
3. Check whether the existing dependencies already provide the required functionality.
4. Recommend the fastest practical solution.
5. Avoid packages that add more configuration time than they save.

## Rule 2 — Proactively Recommend Packages

When a feature is requested, identify helpful packages automatically.

For example:

- UI components → shadcn/ui
- Styling → Tailwind CSS
- Forms → React Hook Form
- Validation → Zod
- Notifications → Sonner
- API caching → RTK Query
- Charts → Recharts
- Dates → date-fns
- Browser testing → Playwright

These are examples, not mandatory dependencies. Recommend a package only when the feature actually needs it.

## Rule 3 — Explain Recommendations Clearly

For each recommended package, provide:

- Package or tool name
- Purpose
- Why it accelerates development
- Installation command
- Basic usage example
- Compatibility with the existing project
- Whether it is essential or optional

Rank recommendations by expected time saved.

## Rule 4 — Avoid Reinventing the Wheel

Never manually implement complex functionality if an existing well-maintained solution is substantially faster and suitable.

Prefer:
- Ready-made components
- Built-in framework functionality
- Reusable hooks
- Existing npm packages
- Official SDKs
- Simple integration patterns

## Rule 5 — Keep Setup Minimal

- Never recreate the existing project.
- Avoid unnecessary dependencies.
- Check package compatibility with Next.js 16 and React 19.
- Prefer packages with straightforward installation.
- Avoid switching state-management libraries.
- Do not duplicate functionality already provided by Next.js or Redux Toolkit.
- Avoid unnecessary paid services.

## Rule 6 — Optimize for 2 Hours

For every development decision, ask:

"Is there a reliable tool, package, or existing feature that can accomplish this faster?"

Spend no more than 5 minutes evaluating tools for a feature.

Prioritize implementing working functionality over unnecessary customization.

## Rule 7 — Recommend Tools During Development

Do not recommend tools only at the beginning.

Whenever a task could be completed significantly faster with a package or utility:

1. Identify the tool.
2. Explain the time-saving benefit briefly.
3. Check compatibility.
4. Integrate it when appropriate.
5. Continue development.

## Rule 8 — Final Goal

Deliver a working application with minimal unnecessary custom code, reliable dependencies, and verified essential features.

Think like an experienced developer who knows the npm ecosystem and chooses the fastest reliable solution for each task.