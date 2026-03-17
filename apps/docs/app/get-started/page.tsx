export default function GetStartedPage() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1>Get started</h1>

      <h2 style={{ marginTop: '1.5rem' }}>Install</h2>
      <p>Install the React UI package (and the theme for default styles). It brings in the engine and schema for you.</p>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', borderRadius: '4px' }}>
{`yarn add @quizparts/react @quizparts/theme`}
      </pre>
      <p>Or with npm:</p>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', borderRadius: '4px' }}>
{`npm install @quizparts/react @quizparts/theme`}
      </pre>

      <h2 style={{ marginTop: '1.5rem' }}>Define a quiz (JSON)</h2>
      <p>Quizzes are plain JSON. You can use <code>createQuizFromJson</code> or <code>parseQuiz</code> from <code>@quizparts/react</code> (re-exported from <code>@quizparts/schema</code>).</p>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', borderRadius: '4px', fontSize: '13px' }}>
{`const quizJson = {
  id: 'my-quiz',
  title: 'My Quiz',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is the capital of France?',
      choices: [
        { id: 'a', text: 'Berlin' },
        { id: 'b', text: 'Paris' },
        { id: 'c', text: 'Madrid' },
      ],
      answer: 'b',
      explanation: 'Paris is the capital of France.',
    },
  ],
};

const result = parseQuiz(quizJson);
const quiz = result.success ? result.data : null;`}
      </pre>

      <h2 style={{ marginTop: '1.5rem' }}>Render with React</h2>
      <p>Wrap your app in <code>QuizProvider</code> and use the primitives: <code>Card</code>, <code>Progress</code>, <code>Question</code>, <code>Prompt</code>, <code>Choices</code> / <code>Choice</code>, <code>SubmitButton</code>, <code>NextButton</code>, <code>Feedback</code>.</p>
      <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', borderRadius: '4px', fontSize: '13px' }}>
{`import { QuizProvider, QuizRoot, Progress, Question, Prompt, Choices, Choice, SubmitButton, NextButton, Feedback, useQuiz } from '@quizparts/react';

function QuizContent() {
  const { currentQuestion, isComplete } = useQuiz();
  if (!currentQuestion) return null;
  if (isComplete) return <p>Quiz complete!</p>;
  return (
    <Question>
      <Prompt />
      <Choices>
        {currentQuestion.choices?.map((c) => (
          <Choice key={c.id} choiceId={c.id} />
        ))}
      </Choices>
      <SubmitButton />
      <NextButton />
      <Feedback />
    </Question>
  );
}

export default function App() {
  if (!quiz) return <p>Invalid quiz</p>;
  return (
    <QuizProvider quiz={quiz}>
      <QuizRoot>
        <Progress />
        <QuizContent />
      </QuizRoot>
    </QuizProvider>
  );
}`}
      </pre>
      <p>For a full runnable example, see the <code>examples/react-basic</code> app in the repo. To try editing JSON and seeing the result live, use the <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">Playground</a>.</p>
    </main>
  );
}
