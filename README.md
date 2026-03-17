# QuizParts

Open-source framework for building quiz-style and study-practice interfaces (e.g. Duolingo-like experiences). **Start with `@quizparts/react`** for the full UI story; it includes the headless engine and schema support. Use `@quizparts/core` and `@quizparts/schema` directly only if you need a framework-agnostic or custom UI.

## Install

**Web (React)** — the main package people use:

```bash
npm install @quizparts/react @quizparts/theme
# or
yarn add @quizparts/react @quizparts/theme
```

`@quizparts/react` depends on `@quizparts/schema` and `@quizparts/core`; you don’t need to install them separately unless you’re building a custom or headless integration.

**React Native:**

```bash
npm install @quizparts/react-native
```

## Quick start

1. Define a quiz as JSON (or use `createQuizFromJson` from `@quizparts/react`).
2. Wrap your app (or quiz section) in `QuizProvider` with the parsed quiz.
3. Render `QuizFlow` for the full flow (questions + complete screen), or compose `Question`, `DefaultQuestionLayout`, and primitives yourself.

**Minimal example (web):**

```tsx
import { QuizProvider, QuizRoot, QuizFlow, createQuizFromJson } from '@quizparts/react';
import '@quizparts/theme/play.css';

const quiz = createQuizFromJson({
  id: 'demo',
  title: 'Demo Quiz',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is 2 + 2?',
      choices: [{ id: 'a', text: '3' }, { id: 'b', text: '4' }],
      answer: 'b',
    },
  ],
});

export default function App() {
  return (
    <QuizProvider quiz={quiz}>
      <QuizRoot>
        <QuizFlow />
      </QuizRoot>
    </QuizProvider>
  );
}
```

**React Native:** Use `ThemeProvider`, `QuizProvider`, `QuizRoot`, and `QuizFlow` from `@quizparts/react-native`; no CSS import.

## Packages

| Package | Description |
|---------|-------------|
| **`@quizparts/react`** | **Start here.** React provider, components, and hooks for web (QuizProvider, QuizRoot, Card, Question, Choices, Feedback, etc.). Includes engine + schema. |
| `@quizparts/theme` | Theme tokens and default CSS (play.css) for web. Use with `@quizparts/react`. |
| `@quizparts/react-native` | React Native components and theme for mobile (Card, QuizFlow, ThemeProvider, etc.). |
| `@quizparts/schema` | Quiz and question types, validation, `parseQuiz` / `createQuizFromJson`. Dependency of react; use directly for headless/custom UIs. |
| `@quizparts/core` | Headless quiz engine (session, submit, progress). Dependency of react; use directly for non-React or custom UIs. |

## Documentation

See the [docs](apps/docs) app in this repository for installation, concepts, and API details. A [playground](apps/playground) app is included to try quiz JSON and themes live.

## Compatibility

- **Node:** 18+
- **React:** 18+ (for `@quizparts/react` and `@quizparts/react-native`)

## Development

From a clone of the repository:

```bash
yarn install
yarn build
yarn dev
```

- `yarn dev` — starts docs and playground with HMR.
- `yarn lint` / `yarn typecheck` / `yarn test` — quality checks across the monorepo.
- `yarn test:e2e` — Playwright E2E tests.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.

## License

MIT
