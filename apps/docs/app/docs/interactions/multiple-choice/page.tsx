export default function MultipleChoiceDocPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Multiple choice</h1>
      <p>Single correct answer from a list of choices.</p>
      <h2 style={{ marginTop: '1.5rem' }}>Schema</h2>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '13px' }}>
{`{
  "type": "multiple_choice",
  "id": "q1",
  "prompt": "What is the capital of France?",
  "choices": [
    { "id": "a", "text": "Berlin" },
    { "id": "b", "text": "Paris" },
    { "id": "c", "text": "Madrid" }
  ],
  "answer": "b",
  "explanation": "Paris is the capital of France."
}`}
      </pre>
      <h2 style={{ marginTop: '1.5rem' }}>React</h2>
      <p>Use <code>Choices</code> and <code>Choice</code> with <code>choiceId</code>. The engine handles <code>selectChoice</code> and submit.</p>
      <p><a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">Playground</a> · <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">Storybook (Choice)</a></p>
    </main>
  );
}
