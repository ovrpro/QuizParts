import Link from 'next/link';

export default function InteractionsIndexPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Interaction types</h1>
      <p>QuizParts supports six core learning interactions. Each has a schema shape and React primitives.</p>
      <ul>
        <li><Link href="/docs/interactions/multiple-choice">Multiple choice</Link> — Single correct answer</li>
        <li><Link href="/docs/interactions/multi-select">Multi select</Link> — Multiple correct answers</li>
        <li><Link href="/docs/interactions/match-pairs">Match pairs</Link> — Match left/right items</li>
        <li><Link href="/docs/interactions/order-items">Order items</Link> — Arrange in correct order</li>
        <li><Link href="/docs/interactions/sentence-builder">Sentence builder</Link> — Build sentence from tiles</li>
      </ul>
      <p>Text input is documented in <Link href="/get-started">Get started</Link>. For schema and React usage for each type, open the links above.</p>
    </main>
  );
}
