# QuizParts

Open-source framework for building quiz-style and study-practice interfaces (e.g. Duolingo-like experiences).

- **Headless-first:** JSON-driven schema, framework-agnostic core, React bindings.
- **Docs:** [TASK.md](TASK.md) (goals, milestones), [INFRASTRUCTURE.md](INFRASTRUCTURE.md) (stack, CI/CD, deployment).

## Development

```bash
yarn install
yarn build
yarn dev
```

- `yarn dev` — starts docs (port 3000) and playground (port 3001) with HMR.
- `yarn lint` / `yarn typecheck` / `yarn test` — quality checks across the monorepo.
- `yarn test:e2e` — Playwright E2E tests (starts apps automatically).

## Packages

| Package | Description |
|---------|-------------|
| `@quizparts/schema` | Quiz and question types, validation |
| `@quizparts/core` | Headless quiz engine |
| `@quizparts/react` | React provider and headless components |
| `@quizparts/theme` | Theme tokens |

## Apps

- **docs** — Documentation and quickstart.
- **playground** — Live quiz JSON editor and preview.

## License

MIT
