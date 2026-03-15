export default function MatchPairsDocPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Match pairs</h1>
      <p>Match left-hand items to right-hand items (e.g. word to translation). Tap-based pairing.</p>
      <h2 style={{ marginTop: '1.5rem' }}>Schema</h2>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '13px' }}>
{`{
  "type": "match_pairs",
  "id": "q1",
  "prompt": "Match the word to its translation.",
  "pairs": [
    { "left": "gato", "right": "cat" },
    { "left": "perro", "right": "dog" },
    { "left": "caballo", "right": "horse" }
  ],
  "answer": [["gato", "cat"], ["perro", "dog"], ["caballo", "horse"]],
  "explanation": "All correct!"
}`}
      </pre>
      <h2 style={{ marginTop: '1.5rem' }}>React</h2>
      <p>Use <code>MatchPairs</code>. It shows left/right columns and formed pairs; user taps one left then one right to match. Submit when all pairs are formed.</p>
      <p><a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">Playground</a> · <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">Storybook (MatchPairs)</a></p>
    </main>
  );
}
