# DEVELOPMENT RULES — FAST MVP MODE (NO AI)

## Main Objective

Complete the existing project as quickly as possible, targeting a fully functional MVP within **2 hours**.

The application must work **without artificial intelligence, machine learning models, LLM APIs, AI agents, or AI-powered services**.

Prioritize established npm packages, ready-made components, built-in framework features, and deterministic programming solutions.

**Main principle: Use existing reliable technology instead of building everything from scratch.**

## Existing Technology Stack

- Next.js 16
- React 19
- TypeScript 5.9
- Redux Toolkit
- React Redux
- Lucide React

Keep this stack unless there is a compelling technical reason to change it.

Do not recreate the project or replace working infrastructure.

## Rule 1 — No AI Dependencies

The final application must function independently of AI.

Strictly avoid:

- OpenAI, Anthropic, Gemini, or other LLM APIs
- AI agents and autonomous AI services
- AI-generated responses or AI-powered functionality
- Machine learning model inference
- AI-dependent SDKs, platforms, or backend services
- Features requiring AI API keys or AI subscriptions

Use traditional programming, deterministic algorithms, standard APIs, databases, and established libraries instead.

If a requested feature is commonly implemented using AI, identify a practical non-AI alternative.

## Rule 2 — Always Find the Fastest Solution

Before implementing a feature:

1. Check whether the existing project already provides the functionality.
2. Check whether Next.js, React, or Redux Toolkit includes a built-in solution.
3. Look for a reliable npm package that solves the problem.
4. Prefer reusable components and straightforward integrations.
5. Choose the solution requiring the least implementation and configuration time.

Avoid writing complex custom functionality when an established solution is significantly faster.

## Rule 3 — Proactively Recommend Packages

Identify useful packages whenever they can accelerate development.

Examples:

| Feature | Preferred Solution |
|---|---|
| UI components | shadcn/ui |
| Styling | Tailwind CSS |
| Forms | React Hook Form |
| Validation | Zod |
| Notifications | Sonner |
| API caching | RTK Query |
| Charts | Recharts |
| Date utilities | date-fns |
| Icons | Existing Lucide React |
| Browser testing | Playwright |
| HTTP requests | Native fetch |
| Authentication | Existing auth solution or suitable established library |

These are examples, not mandatory dependencies.

Only recommend packages when they solve an actual requirement.

Do not install unnecessary dependencies.

## Rule 4 — Explain Package Recommendations

For each recommended package, provide:

1. **Name:** Package or tool name.
2. **Purpose:** What problem it solves.
3. **Time saved:** Why it is faster than custom implementation.
4. **Installation:** Required npm command.
5. **Usage:** Minimal integration example.
6. **Compatibility:** Compatibility with the existing stack.
7. **Priority:** Essential or optional.

Rank recommendations by expected development time saved.

Keep explanations concise and practical.

## Rule 5 — Avoid Reinventing the Wheel

Prefer the following implementation order:

1. Existing project code and dependencies
2. Built-in Next.js and React functionality
3. Existing Redux Toolkit utilities
4. Established open-source packages
5. Ready-made reusable components
6. Small custom implementations
7. Complex custom implementations only when necessary

Avoid creating functionality already available through reliable libraries.

Do not introduce unnecessary abstractions, wrappers, or architectural layers.

## Rule 6 — Keep Setup Minimal

- Never recreate the existing project.
- Reuse the current folder structure.
- Preserve existing working features.
- Avoid unnecessary package installations.
- Verify compatibility with Next.js 16 and React 19.
- Prefer packages with simple setup.
- Do not switch state-management libraries.
- Do not duplicate existing functionality.
- Avoid unnecessary paid services.
- Avoid complicated environment configurations.
- Prefer solutions that work locally.

If a dependency adds more setup work than it saves, do not use it.

## Rule 7 — Optimize for the 2-Hour Deadline

Development must be organized around delivering a working MVP.

**Time budget:**

- 10 minutes — Inspect project and identify missing functionality.
- 85 minutes — Implement essential MVP features.
- 20 minutes — Test, debug, and verify functionality.
- 5 minutes — Final cleanup and delivery.

For every development decision, ask:

**"What is the fastest reliable non-AI solution that delivers the required functionality?"**

Spend no more than 5 minutes evaluating tools for an individual feature.

Do not overengineer.

Focus on working features before visual polish or optional improvements.

## Rule 8 — Prioritize MVP Features

Use this priority order:

**P0 — Must Have**
- Essential application functionality
- Critical user flows
- Required data handling
- Basic error handling
- Functional navigation

**P1 — Should Have**
- Responsive layout
- User feedback and notifications
- Form validation
- Loading states
- Important usability improvements

**P2 — Optional**
- Advanced animations
- Complex visual effects
- Extensive customization
- Nonessential integrations
- Additional convenience features

Complete P0 before working on P1 or P2.

Never sacrifice essential functionality for unnecessary polish.

## Rule 9 — Recommend Tools During Development

Tool recommendations are not limited to the beginning of development.

When a task can be completed significantly faster using an existing package:

1. Identify the package.
2. Check whether it already exists in the project.
3. Verify compatibility.
4. Explain the time-saving benefit.
5. Integrate it when appropriate.
6. Continue implementing the feature.

Do not interrupt development for unnecessary research or package comparisons.

## Rule 10 — Prefer Simple Architecture

Follow the existing project architecture.

- Use TypeScript for application code.
- Use React functional components and hooks.
- Use Redux Toolkit for appropriate shared application state.
- Prefer RTK Query when API caching is needed and suitable.
- Use Next.js built-in routing and server capabilities.
- Reuse existing components and utilities.
- Keep components focused and maintainable.
- Avoid unnecessary global state.
- Avoid adding new frameworks without strong justification.

Choose the simplest architecture that works reliably.

## Rule 11 — Implement, Don't Just Recommend

The primary responsibility is to deliver working functionality.

Do not stop after suggesting packages or describing possible solutions.

When implementation is requested:

1. Inspect the relevant existing code.
2. Select the fastest appropriate solution.
3. Install required dependencies if needed.
4. Implement the functionality.
5. Fix integration issues.
6. Test essential behavior.
7. Report what was completed.

Prioritize real implementation over excessive planning and explanation.

## Rule 12 — Verify Essential Functionality

Before considering a feature complete:

- Confirm that the implementation works.
- Check TypeScript errors.
- Verify imports and dependencies.
- Test critical user interactions.
- Check loading, empty, and error states where relevant.
- Confirm that existing features still work.
- Verify that no AI services are required.
- Run the available build and test commands when practical.

Do not claim that a feature is verified unless it has actually been tested.

## Rule 13 — Avoid Unnecessary Work

Do not:

- Rewrite functioning code without a clear reason.
- Introduce complicated architecture.
- Install several packages for the same purpose.
- Build custom UI components when suitable reusable ones exist.
- Add AI features or integrations.
- Spend excessive time on minor styling.
- Refactor unrelated project files.
- Add features outside MVP requirements.
- Create unnecessary documentation or boilerplate.

Every development action should contribute directly to the MVP.

## Rule 14 — Final Goal

Deliver a working application that is:

- **100% independent of AI services**
- Functional within the 2-hour MVP target
- Built on the existing technology stack
- Based on reliable, reusable libraries
- Minimal in unnecessary custom code
- Easy to maintain and extend
- Verified for essential user flows
- Free from unnecessary dependencies and configuration

**Final development philosophy:**

Build fast. Reuse existing solutions. Minimize complexity. Avoid AI dependencies. Deliver working functionality first.

**The objective is not to write the most code. The objective is to finish a reliable, fully functional, non-AI MVP in the shortest practical time.**