# QuizParts TASK.md

## Project Summary

QuizParts is an open-source framework for building quiz-style and study-practice interfaces similar to Duolingo.

The system should support:

- reusable quiz interaction primitives
- a JSON-driven quiz schema
- a headless engine
- React bindings
- future React Native support
- a theme system
- a website for testing quiz JSON and themes
- future AI-generated quiz support

The architecture must be headless-first and data-driven.

---

## Primary Goals

1. Build a monorepo for QuizParts
2. Create a strict quiz schema package
3. Create a framework-agnostic quiz engine
4. Create React bindings and headless primitives
5. Create a working playground app
6. Create a token-based theme system
7. Keep the design compatible with future React Native support
8. Keep the schema AI-friendly

---

## Non-Goals for v1

Do not build all quiz types immediately.

Do not build drag-and-drop first.

Do not build AI generation first.

Do not build enterprise or backend features yet.

Do not over-fragment the repo into too many packages at the beginning.

---

## Recommended Initial Monorepo Structure

```text
quizparts/
  package.json
  tsconfig.base.json
  pnpm-workspace.yaml
  turbo.json

  packages/
    schema/
    core/
    react/
    theme/

  apps/
    playground/
    docs/

  examples/
    react-basic/
```

---

## Package Scope for v1

**packages/schema**

Responsible for:

- TypeScript types for quizzes and questions
- runtime validation
- supported question type definitions
- schema parsing and safe error reporting

**packages/core**

Responsible for:

- quiz session state
- question state
- answer submission
- validation
- progression
- score tracking
- attempts
- feedback state

**packages/react**

Responsible for:

- React bindings for core
- provider
- hooks
- headless primitives

**packages/theme**

Responsible for:

- theme token model
- token typing
- token normalization
- helpers for mapping tokens to CSS variables later

**apps/playground**

Responsible for:

- editing quiz JSON
- validating quiz JSON
- rendering a live quiz preview
- switching themes
- overriding question states for testing

**apps/docs**

Responsible for:

- install docs
- concepts
- examples
- package documentation

---

## Supported Quiz Types for v1

Implement only these initially:

- multiple_choice
- multi_select
- text_input
- match_pairs
- order_items

Priority order:

1. multiple_choice
2. text_input
3. match_pairs
4. multi_select
5. order_items

Do not implement future types yet, but leave room in the architecture for:

- sentence_builder
- image_select
- audio_input
- drag_drop

---

## Core Design Rules

1. core must not depend on React
2. core must not depend on the DOM
3. schema must be strict and machine-friendly
4. React package should be headless first
5. UI styling must be token-driven, not hardcoded
6. architecture must be compatible with future React Native support
7. the playground must use the actual published local packages, not duplicate logic
8. all code should be TypeScript

---

## Deliverable Milestones

### Milestone 1: Monorepo Foundation

**Goal:** Set up the repo and workspace tooling.

**Tasks:**

- initialize monorepo
- configure workspace package manager
- configure TypeScript base config
- configure package build pipeline
- configure linting
- configure formatting
- configure test runner
- create placeholder packages and apps
- add root scripts

**Acceptance criteria:**

- workspace install works
- all packages build
- all apps start
- typecheck passes

---

### Milestone 2: Schema Package

**Goal:** Create the canonical quiz schema.

**Tasks:**

- define Quiz
- define QuizQuestion
- define specific question type unions
- define answer shapes
- define feedback/explanation fields
- define schema validation
- define schema parse result shape
- provide human-readable validation errors

**Acceptance criteria:**

- invalid quiz data is rejected
- valid quiz data is parsed safely
- question types are strongly typed
- package exports a stable schema API

**Suggested exports:**

- QuizSchema
- parseQuiz
- validateQuiz
- Quiz
- QuizQuestion

---

### Milestone 3: Core Engine

**Goal:** Create a framework-agnostic quiz runtime.

**Tasks:**

- define quiz session state model
- define question lifecycle states
- define selection/input state
- define submit flow
- define correctness checking
- define score tracking
- define next/previous progression
- define reset behavior
- define attempt tracking
- define event hooks or event records

Question state model should support:

- idle
- active
- answered
- correct
- incorrect
- complete

**Acceptance criteria:**

- engine can load a parsed quiz
- engine can answer questions
- engine can determine correctness
- engine can advance to next question
- engine can calculate progress
- engine has no React dependency

**Suggested exports:**

- createQuizSession
- submitAnswer
- selectChoice
- setTextInput
- goToNextQuestion
- getProgress
- resetQuiz

---

### Milestone 4: React Package

**Goal:** Create React bindings and headless primitives.

**Tasks:**

- create QuizProvider
- create useQuiz
- create useQuestion
- create useProgress
- create headless components for question rendering
- create per-question helpers where needed

Initial primitives:

- QuizRoot
- Question
- Prompt
- Choices
- Choice
- SubmitButton
- Feedback
- Progress

**Acceptance criteria:**

- a developer can render a quiz from JSON
- components expose state cleanly
- no hardcoded visual styling is required
- selection and submission work end-to-end

**Suggested developer usage target:**

```tsx
<QuizProvider quiz={quiz}>
  <Question />
  <Progress />
</QuizProvider>
```

---

### Milestone 5: Theme Package

**Goal:** Create a portable theme token system.

**Tasks:**

- define theme token shape
- define colors
- define spacing
- define radius
- define typography
- define motion
- create normalization helpers
- create default theme
- create helpers to map theme values to CSS variables

**Acceptance criteria:**

- theme object is typed
- default theme exists
- themes can be merged with overrides
- output can drive web styling later
- structure is future-compatible with React Native

**Suggested token groups:**

- colors
- radius
- spacing
- typography
- motion
- shadow

---

### Milestone 6: Playground App

**Goal:** Create the live developer playground.

**Tasks:**

- create JSON editor area
- create quiz preview area
- create validation panel
- create theme controls panel
- render parsed quizzes using @quizparts/react
- show schema errors
- allow loading sample quizzes
- allow resetting state
- allow exporting JSON
- allow switching between at least 2 themes

Suggested layout:

- left: JSON editor
- center: live quiz preview
- right: validation + theme panel

**Acceptance criteria:**

- developer can paste quiz JSON
- quiz validates live
- preview updates live
- theme changes update preview live
- invalid schema errors are readable

---

### Milestone 7: Docs App

**Goal:** Create a basic documentation site.

**Tasks:**

- add homepage
- add install guide
- add quickstart
- add schema docs
- add core engine docs
- add React docs
- add theme docs
- link to playground

**Acceptance criteria:**

- a developer can understand the project from docs alone
- install and first render example are documented
- docs reflect actual APIs

---

## Implementation Order

Build in this exact order:

1. monorepo foundation
2. schema package
3. core package
4. react package
5. simple example app
6. theme package
7. playground app
8. docs app

Do not start playground before schema + core + react are working.

---

## Suggested First Example

Create a single working example quiz with one multiple_choice question and one text_input question.

Example content:

- question 1: multiple choice
- question 2: text input
- progress indicator
- submit button
- feedback panel

**Acceptance criteria:**

- app renders from JSON only
- no hardcoded quiz logic in the example
- correctness works

---

## Suggested API Direction

**Schema**

Provide a JSON shape that AI and developers can both use safely.

Example:

```json
{
  "id": "capital-quiz",
  "title": "Capital Quiz",
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "prompt": "What is the capital of France?",
      "choices": [
        { "id": "a", "text": "Berlin" },
        { "id": "b", "text": "Paris" },
        { "id": "c", "text": "Madrid" }
      ],
      "answer": "b",
      "explanation": "Paris is the capital of France."
    }
  ]
}
```

**Core**

Keep the engine deterministic and serializable.

**React**

Expose logic through hooks and context, not monolithic widgets.

---

## Testing Requirements

Add tests for:

**schema**

- valid multiple choice parse
- invalid choice data
- missing required fields
- invalid question type
- invalid answer shape

**core**

- selecting an answer
- submitting an answer
- correct result
- incorrect result
- progression
- reset
- score tracking

**react**

- provider setup
- question rendering
- submit flow
- progress updates

**playground**

- rendering valid quiz JSON
- handling invalid quiz JSON
- theme switching

---

## DX Requirements

The project should optimize for developer experience.

A developer should eventually be able to do this with minimal code:

```tsx
import { QuizProvider, Question, Progress } from "@quizparts/react"
import { parseQuiz } from "@quizparts/schema"

const quiz = parseQuiz(data)

export function App() {
  return (
    <QuizProvider quiz={quiz}>
      <Question />
      <Progress />
    </QuizProvider>
  )
}
```

---

## Future Compatibility Notes

Do not implement these now, but make sure the architecture leaves room for them:

- React Native renderer
- styled web component package
- native themed component package
- AI quiz generation package
- adaptive learning state
- analytics events
- saved progress
- hosted cloud services
- visual theme studio
- component lab

---

## Deliverables to Produce Now

Produce the following concrete outputs:

1. working monorepo
2. working packages/schema
3. working packages/core
4. working packages/react
5. working packages/theme
6. working apps/playground
7. working apps/docs
8. one minimal example in examples/react-basic

---

## Definition of Done for v1 Foundation

The foundation is complete when:

- a quiz can be defined as JSON
- the schema validates that JSON safely
- the core engine can execute that quiz
- React can render it with headless components
- the playground can preview and validate it live
- themes can be swapped at the token level
- docs explain how to use it

---

## Optional Nice-to-Haves if Time Allows

- import/export sample quizzes in playground
- URL-persisted playground state
- copy-paste code snippet generator
- theme preset dropdown
- dark/light default themes
- question state inspector

---

## Immediate Next Task

Start with Milestone 1 and Milestone 2 only.

Do not begin styling-heavy work until:

- schema is complete
- core engine is complete
- React bindings are working

If you want, I can turn that into a second file called `ARCHITECTURE.md` with package APIs and suggested TypeScript interfaces.
