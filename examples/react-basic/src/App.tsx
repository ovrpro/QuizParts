import {
  QuizProvider,
  QuizRoot,
  Question,
  Prompt,
  Choices,
  Choice,
  TextInput,
  SubmitButton,
  NextButton,
  Feedback,
  Progress,
  useQuiz,
} from '@quizparts/react';
import { quiz } from './quizData';

const QuizContent = () => {
  const { currentQuestion, isComplete } = useQuiz();
  if (!currentQuestion) return <p>No questions.</p>;
  if (isComplete) return <p>Quiz complete! Check your score above.</p>;

  return (
    <Question>
      <Prompt />
      {currentQuestion.type === 'multiple_choice' && (
        <Choices>
          {'choices' in currentQuestion &&
            currentQuestion.choices.map((c) => (
              <Choice key={c.id} choiceId={c.id} />
            ))}
        </Choices>
      )}
      {currentQuestion.type === 'text_input' && <TextInput />}
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <SubmitButton />
        <NextButton />
      </div>
      <Feedback />
    </Question>
  );
};

export default function App() {
  if (!quiz) return <main><h1>Invalid quiz</h1></main>;

  return (
    <main style={{ maxWidth: '480px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>QuizParts React Basic</h1>
      <p>{quiz.title}</p>
      <QuizProvider quiz={quiz}>
        <QuizRoot>
          <Progress />
          <QuizContent />
        </QuizRoot>
      </QuizProvider>
    </main>
  );
}
