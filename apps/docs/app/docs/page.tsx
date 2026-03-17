export default function DocsPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Docs</h1>
      <p>Overview of QuizParts packages and where to explore components and behavior.</p>

      <h2 style={{ marginTop: '1.5rem' }}>Packages</h2>
      <ul>
        <li>
          <strong>@quizparts/react</strong> — Start here. React UI: <code>QuizProvider</code>, <code>QuizRoot</code>, and primitives (<code>Card</code>, <code>Progress</code>, <code>Question</code>, <code>Prompt</code>, <code>Choices</code>, <code>Choice</code>, <code>TextInput</code>, <code>MatchPairs</code>, <code>OrderList</code>, <code>SentenceBuilder</code>, <code>SubmitButton</code>, <code>NextButton</code>, <code>Feedback</code>). Re-exports <code>createQuizFromJson</code> from schema; use this package for the full quiz UI story.
        </li>
        <li>
          <strong>@quizparts/theme</strong> — Theme tokens and default CSS (play.css) for web. Use with <code>@quizparts/react</code>.
        </li>
        <li>
          <strong>@quizparts/react-native</strong> — React Native UI: <code>ThemeProvider</code>, <code>QuizProvider</code>, <code>QuizRoot</code>, <code>Card</code>, <code>QuizFlow</code>, and the same primitives as web.
        </li>
        <li>
          <strong>@quizparts/schema</strong> — Quiz and question types (multiple_choice, multi_select, text_input, etc.), <code>parseQuiz</code> and <code>validateQuiz</code> for JSON. Dependency of react; use directly for headless or custom UIs.
        </li>
        <li>
          <strong>@quizparts/core</strong> — Session state, <code>createQuizSession</code>, actions (<code>selectChoice</code>, <code>submitAnswer</code>, <code>goToNextQuestion</code>, etc.), and <code>checkCorrectness</code>. Dependency of react; use directly for non-React or custom UIs.
        </li>
      </ul>

      <h2 style={{ marginTop: '1.5rem' }}>Interaction types</h2>
      <p><a href="/docs/interactions">Interactions</a> — Multiple choice, multi select, match pairs, order items, sentence builder. Schema examples and React usage for each.</p>

      <h2 style={{ marginTop: '1.5rem' }}>Explore</h2>
      <ul>
        <li>
          <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">Storybook</a> — Component lab. View Card, Choice, Feedback, Progress, Prompt, and Question in every state (default, selected, correct, incorrect, disabled, etc.).
        </li>
        <li>
          <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">Playground</a> — Edit quiz JSON and run the full quiz flow live. Use samples or paste your own JSON.
        </li>
      </ul>
    </main>
  );
}
