import { REACT_VERSION } from '@quizparts/react';
import { SCHEMA_VERSION } from '@quizparts/schema';

export default function App() {
  return (
    <main>
      <h1>QuizParts React Basic</h1>
      <p>
        react {REACT_VERSION}, schema {SCHEMA_VERSION}
      </p>
    </main>
  );
}
