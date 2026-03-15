export default function MultiSelectDocPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Multi select</h1>
      <p>Multiple correct answers from a list of choices. User toggles selections.</p>
      <h2 style={{ marginTop: '1.5rem' }}>Schema</h2>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '13px' }}>
{`{
  "type": "multi_select",
  "id": "q1",
  "prompt": "Select prime numbers.",
  "choices": [
    { "id": "2", "text": "2" },
    { "id": "3", "text": "3" },
    { "id": "4", "text": "4" },
    { "id": "5", "text": "5" }
  ],
  "answer": ["2", "3", "5"],
  "explanation": "2, 3, and 5 are prime."
}`}
      </pre>
      <h2 style={{ marginTop: '1.5rem' }}>React</h2>
      <p>Same <code>Choices</code> and <code>Choice</code> as multiple_choice. The engine uses <code>toggleChoice</code> and validates the selected set against <code>answer</code>.</p>
      <p><a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">Playground</a> · <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">Storybook (MultiSelect)</a></p>
    </main>
  );
}
