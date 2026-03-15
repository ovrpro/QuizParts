import {
  QuizProvider,
  QuizRoot,
  Question,
  Prompt,
  TextInput,
  SentenceBuilder,
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
  if (isComplete) return <p>Done! Check your score above.</p>;
  return (
    <Question>
      <Prompt />
      {currentQuestion.type === 'text_input' && <TextInput />}
      {currentQuestion.type === 'sentence_builder' && <SentenceBuilder />}
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
    <main style={{ maxWidth: '520px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Language Practice</h1>
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
