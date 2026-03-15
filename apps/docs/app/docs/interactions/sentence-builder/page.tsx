export default function SentenceBuilderDocPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Sentence builder</h1>
      <p>Build a sentence from a bank of tiles (e.g. translation). Tap to add a tile to the sentence, tap in the sentence to remove.</p>
      <h2 style={{ marginTop: '1.5rem' }}>Schema</h2>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '13px' }}>
{`{
  "type": "sentence_builder",
  "id": "q1",
  "prompt": "Translate: Estoy aprendiendo español",
  "tiles": ["I", "am", "learning", "Spanish"],
  "answer": ["I", "am", "learning", "Spanish"],
  "explanation": "Correct!"
}`}
      </pre>
      <h2 style={{ marginTop: '1.5rem' }}>React</h2>
      <p>Use <code>SentenceBuilder</code>. It shows a tile bank and a sentence slot; tap tiles to add, tap in the sentence to remove. <code>setSentenceOrder</code> updates the session; submit validates the sequence.</p>
      <p><a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">Playground</a> · <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">Storybook (SentenceBuilder)</a></p>
    </main>
  );
}
