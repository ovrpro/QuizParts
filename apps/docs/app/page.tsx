import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>QuizParts Docs</h1>
      <p style={{ fontSize: '1.125rem', color: '#444' }}>
        QuizParts is a schema-driven quiz engine and React components for building quizzes from JSON.
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <Link href="/get-started" style={{ fontWeight: 500 }}>Get started</Link>
          {' — Install, define a quiz in JSON, and render it with React.'}
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <Link href="/docs" style={{ fontWeight: 500 }}>Documentation</Link>
          {' — Packages (schema, core, react) and where to explore.'}
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500 }}>Playground</a>
          {' — Edit quiz JSON and run the full flow live.'}
        </li>
        <li>
          <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500 }}>Storybook</a>
          {' — Component lab: Choice, Feedback, Progress, Prompt, Question states.'}
        </li>
      </ul>
    </main>
  );
}
