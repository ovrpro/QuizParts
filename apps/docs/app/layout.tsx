import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', lineHeight: 1.5 }}>
        <nav style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #eee' }}>
          <Link href="/" style={{ marginRight: '1rem', fontWeight: 600 }}>QuizParts</Link>
          <Link href="/get-started" style={{ marginRight: '1rem' }}>Get started</Link>
          <Link href="/docs" style={{ marginRight: '1rem' }}>Docs</Link>
          <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" style={{ marginRight: '1rem' }}>Playground</a>
          <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">Storybook</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
