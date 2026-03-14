import { REACT_VERSION } from '@quizparts/react';
import { SCHEMA_VERSION } from '@quizparts/schema';
import { THEME_VERSION } from '@quizparts/theme';

export default function PlaygroundPage() {
  return (
    <main>
      <h1>QuizParts Playground</h1>
      <p>Edit quiz JSON and preview (placeholder).</p>
      <p>
        Packages: react {REACT_VERSION}, schema {SCHEMA_VERSION}, theme{' '}
        {THEME_VERSION}
      </p>
    </main>
  );
}
