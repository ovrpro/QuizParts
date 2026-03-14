# INFRASTRUCTURE.md

## Overview

QuizParts is an open-source monorepo for building quiz-style and study-practice interfaces.

The infrastructure must support three things well:

1. package development and publishing
2. docs/playground deployment
3. future expansion into hosted services

The v1 goal is to keep infrastructure simple, fast, and low-cost while preserving a clean path to scale.

---

## Infrastructure Goals

### v1 goals

- support a TypeScript monorepo
- support local package development
- support automated testing and CI
- support npm publishing
- support public docs and playground deployment
- support easy collaboration in GitHub
- avoid unnecessary backend complexity

### non-goals for v1

- no required database
- no required auth system
- no required API server
- no hosted quiz storage
- no paid cloud features yet
- no multi-region architecture yet

---

## High-Level Architecture

```text
GitHub Repository
  ├─ packages/*
  ├─ apps/docs
  ├─ apps/playground
  └─ examples/*

CI/CD
  ├─ lint
  ├─ typecheck
  ├─ test
  ├─ build
  └─ publish packages

Deployment
  ├─ npm registry for packages
  └─ Cloudflare Pages for docs/playground
```

---

## Core Stack

**Repo / Build**

- Yarn workspaces
- Turborepo
- TypeScript
- ESLint
- Prettier
- Changesets

**Testing**

- Vitest for unit tests
- Playwright for app and integration tests

**Apps**

- Next.js for docs and playground

**Hosting / Delivery**

- GitHub for source control
- GitHub Actions for CI/CD
- npm for package publishing
- Cloudflare Pages for docs/playground deployment

---

## Why This Stack

**Yarn workspaces**

Use Yarn because it aligns with existing preference and works well for monorepos.

**Turborepo**

Use Turborepo for:

- task orchestration
- caching
- parallel builds
- package dependency awareness

**Changesets**

Use Changesets because QuizParts is a multi-package npm ecosystem.

Benefits:

- version package changes clearly
- generate release PRs
- automate publishing
- keep changelogs manageable

**Next.js**

Use Next.js for the docs and playground because it gives:

- a single framework for docs + interactive tools
- static export options
- good DX
- future room for server routes if needed later

**Cloudflare Pages**

Use Cloudflare Pages for v1 site hosting because:

- low friction
- fast global delivery
- inexpensive
- fits future edge expansion if needed

---

## Monorepo Structure

```text
quizparts/
  package.json
  yarn.lock
  turbo.json
  tsconfig.base.json
  .eslintrc.cjs
  .prettierrc
  .changeset/
  .github/
    workflows/
      ci.yml
      release.yml
      deploy-docs.yml

  packages/
    schema/
    core/
    react/
    theme/

  apps/
    docs/
    playground/

  examples/
    react-basic/
```

---

## Package Build Strategy

Each package should build independently.

**Package outputs**

Each package should produce:

- ESM output
- type declarations

Recommended output shape:

```text
dist/
  index.js
  index.d.ts
```

**Package rules**

- shared packages must not depend on DOM APIs unless explicitly web-only
- core, schema, and theme must remain platform-agnostic
- react may depend on React, but not browser-only globals
- package entry points should remain simple and stable

---

## Workspace Scripts

Root package.json should include scripts like:

```json
{
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "test:e2e": "turbo run test:e2e",
    "clean": "turbo run clean",
    "release": "changeset publish"
  }
}
```

---

## Environment Strategy

**v1 environment philosophy**

Keep environments minimal.

For the open-source foundation, most code should work without environment variables.

**likely v1 environment variables**

For apps only:

- `NEXT_PUBLIC_SITE_URL=`
- `NEXT_PUBLIC_GITHUB_URL=`

If playground sharing is added later:

- `NEXT_PUBLIC_PLAYGROUND_SHARE_ENABLED=`

If future AI endpoints are added:

- `QUIZPARTS_AI_API_KEY=`
- `QUIZPARTS_AI_BASE_URL=`

**environment rules**

- avoid env vars in shared packages
- env vars belong in apps or deployment config
- shared libraries should remain pure and reusable

---

## Development Infrastructure

**Local development workflow**

Developers should be able to:

1. install dependencies once
2. run one command to start apps
3. update packages and see apps reflect changes immediately

Expected local command:

```bash
yarn dev
```

This should start:

- docs app
- playground app
- package watchers where needed

**local development requirements**

- HMR for app changes
- fast rebuilds for package changes
- type-safe package imports across workspace
- no manual linking

---

## CI/CD Plan

### CI Workflow

Create `.github/workflows/ci.yml`

On pull request and push to main:

Run:

1. install dependencies
2. restore cache
3. lint
4. typecheck
5. test
6. build packages
7. build apps

**CI goals**

- block broken packages from merging
- block broken docs/playground builds
- keep main always releasable

**CI example stages**

- checkout
- setup node
- setup yarn cache
- install
- lint
- typecheck
- unit tests
- playwright tests
- build

---

### Release Workflow

Create `.github/workflows/release.yml`

**Release system**

Use Changesets.

Recommended flow:

1. contributor adds a changeset when package changes affect users
2. CI validates branch
3. merge to main
4. Changesets creates or updates release PR
5. merge release PR
6. GitHub Action publishes packages to npm

**release requirements**

- npm token stored in GitHub secrets
- publish only from main
- versioning automated
- changelogs generated automatically

**release secrets**

- `NPM_TOKEN`

---

### Deployment Workflow

Create `.github/workflows/deploy-docs.yml`

**Deployment target**

Deploy docs and playground through Cloudflare Pages.

Two options:

1. **separate projects**
   - docs.quizparts.com
   - quizparts.com/playground or playground.quizparts.com

2. **single site**
   - quizparts.com
   - quizparts.com/docs
   - quizparts.com/playground

**recommendation**

For v1, prefer a single site:

- simpler deployment
- simpler branding
- easier navigation

**deployment trigger**

- deploy previews on pull requests if possible
- production deploy on merge to main

---

## App Infrastructure

**docs app**

Purpose:

- landing page
- installation docs
- quickstart
- package documentation
- examples
- links to playground

Requirements:

- static where possible
- MDX-friendly
- lightweight
- able to import live examples from real packages

**playground app**

Purpose:

- paste/edit quiz JSON
- validate schema
- render live preview
- test themes
- inspect state

Requirements:

- client-side JSON editing
- no required backend for v1
- local validation through @quizparts/schema
- local rendering through @quizparts/react
- theme switching through @quizparts/theme

**recommended client-side tools**

- Monaco or CodeMirror for JSON editor
- localStorage for draft persistence
- URL state for sharable examples later

---

## State Persistence Strategy

**v1 playground persistence**

Use:

- localStorage for unsaved drafts
- query params or hash-based encoding later for sharing

**do not add yet**

- database persistence
- user accounts
- server-side quiz storage

Keep it local first.

---

## Testing Infrastructure

**Unit testing**

Use Vitest in packages:

- schema
- core
- react
- theme

**required coverage areas**

**schema**

- valid quiz parsing
- invalid quiz parsing
- readable validation errors
- supported question type validation

**core**

- selecting answers
- submission flow
- correctness
- progression
- reset
- progress calculation

**react**

- provider works
- question rendering
- state propagation
- submit flow

**theme**

- token normalization
- token merging
- default theme behavior

**E2E testing**

Use Playwright for:

- playground loading
- rendering a valid quiz
- showing validation errors on invalid quiz
- theme switching
- docs quickstart availability

---

## Caching and Performance

**local**

Use Turborepo caching for:

- builds
- lint
- tests
- typecheck

**CI**

Use GitHub Actions cache for:

- Yarn dependencies
- Turborepo cache where appropriate

**site performance**

Because v1 is mostly static and client-rendered:

- keep docs statically rendered where possible
- lazy load heavy editor components in playground
- keep playground dependencies isolated from package runtime where possible

---

## Package Publishing Strategy

All publishable packages live under:

`@quizparts/*`

Example:

- @quizparts/schema
- @quizparts/core
- @quizparts/react
- @quizparts/theme

**publish requirements**

Each package should include:

- name
- version
- type
- main
- module if needed
- types
- exports
- files

**versioning strategy**

Use semver.

Rules:

- patch for fixes
- minor for backward-compatible additions
- major for breaking changes

---

## Secrets and Access Management

**GitHub secrets needed**

- `NPM_TOKEN`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

**access rules**

- only maintainers can publish
- publishing only via GitHub Actions
- no manual local publishing to production registry

---

## Branching Strategy

**recommended branches**

- main for production-ready code
- feature branches for all work

**protection rules**

Protect main with:

- required CI checks
- no force pushes
- pull request review required

---

## Open Source Operations

**community-facing files**

Add:

- README.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- LICENSE
- SECURITY.md

**recommendation**

Use MIT or Apache-2.0 for broad adoption.

If the goal is ecosystem spread, MIT is the simplest choice.

---

## Observability for v1

No heavy observability stack is needed yet.

**enough for v1**

- GitHub Actions logs
- Playwright screenshots/videos on failures
- browser console inspection in playground development

**later**

If the site becomes a real product, add:

- lightweight analytics
- error reporting
- usage telemetry for playground interactions if desired

Do not add this yet unless there is a clear product need.

---

## Future Infrastructure Expansion

This is not part of v1, but the plan should leave room for it.

**future services**

- quiz storage API
- theme storage API
- user accounts
- AI quiz generation API
- hosted quiz delivery
- analytics/event ingestion
- collaborative theme sharing

**likely future stack**

A reasonable future stack could be:

- Next.js frontend
- Cloudflare Workers or API routes
- Postgres for data
- object storage for media assets
- queue/job system for AI generation and analytics aggregation

But none of this should block the v1 open-source foundation.

---

## React Native Infrastructure Considerations

To preserve a future React Native path:

- core must stay free of browser APIs
- schema must stay pure TS
- theme must not assume CSS-only output
- package APIs must remain renderer-agnostic where possible

This means the current infra must support:

- pure package builds
- reusable TypeScript outputs
- no DOM coupling in core logic

---

## Deployment Topology Recommendation

**v1 topology**

```text
GitHub
  ├─ source code
  ├─ pull requests
  ├─ CI/CD
  └─ releases

npm
  └─ package registry

Cloudflare Pages
  └─ docs + playground
```

This is enough for:

- open-source growth
- developer adoption
- low ops overhead

---

## Rollout Plan

**Phase 1**

Set up:

- GitHub repo
- Yarn workspaces
- Turborepo
- TypeScript
- package skeletons
- docs and playground app skeletons

**Phase 2**

Set up:

- CI workflow
- test runners
- linting
- package builds

**Phase 3**

Set up:

- Changesets
- npm publish workflow

**Phase 4**

Deploy:

- docs and playground to Cloudflare Pages

**Phase 5**

Add:

- PR preview deployments
- sharable playground URLs
- richer docs examples

**Phase 6**

Later:

- hosted services if product direction expands

---

## Definition of Done for Infrastructure v1

Infrastructure is complete when:

- the monorepo installs cleanly
- all workspace packages build
- all apps run locally
- CI validates lint, typecheck, test, and build
- packages can publish to npm through Changesets
- docs and playground deploy automatically
- the setup preserves a clean path to React Native and future cloud features

---

## Recommended Initial Setup Checklist

- initialize GitHub repository
- configure Yarn workspaces
- configure Turborepo
- configure TypeScript base config
- configure ESLint and Prettier
- add Vitest
- add Playwright
- add Changesets
- create package skeletons
- create docs app
- create playground app
- create GitHub Actions CI workflow
- create GitHub Actions release workflow
- create Cloudflare Pages deployment workflow
- add root scripts
- add open source meta files

---

## Recommended Final v1 Stack

| Area | Stack |
|------|--------|
| **Source Control** | GitHub |
| **Workspace / Build** | Yarn workspaces, Turborepo, TypeScript |
| **Quality** | ESLint, Prettier, Vitest, Playwright |
| **Release** | Changesets, npm |
| **Apps** | Next.js |
| **Hosting** | Cloudflare Pages |
| **CI/CD** | GitHub Actions |
