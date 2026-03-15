export default function OrderItemsDocPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Order items</h1>
      <p>Arrange items in the correct order. Button-based move up/down.</p>
      <h2 style={{ marginTop: '1.5rem' }}>Schema</h2>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '13px' }}>
{`{
  "type": "order_items",
  "id": "q1",
  "prompt": "Arrange numbers in order.",
  "items": [
    { "id": "3", "text": "3" },
    { "id": "1", "text": "1" },
    { "id": "2", "text": "2" }
  ],
  "answer": ["1", "2", "3"],
  "explanation": "Correct order is 1, 2, 3."
}`}
      </pre>
      <h2 style={{ marginTop: '1.5rem' }}>React</h2>
      <p>Use <code>OrderList</code>. It shows items with up/down buttons to reorder. <code>setOrderedIds</code> updates the session; submit validates order.</p>
      <p><a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">Playground</a> · <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">Storybook (OrderItems)</a></p>
    </main>
  );
}
