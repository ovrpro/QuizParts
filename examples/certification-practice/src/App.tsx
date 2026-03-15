import {
  QuizProvider,
  QuizRoot,
  Question,
  Prompt,
  Choices,
  Choice,
  OrderList,
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
  if (isComplete) return <p>Practice complete! Check your score above.</p>;
  const isChoice = currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'multi_select';
  return (
    <Question>
      <Prompt />
      {isChoice && 'choices' in currentQuestion && (
        <Choices>
          {currentQuestion.choices.map((c) => (
            <Choice key={c.id} choiceId={c.id} />
          ))}
        </Choices>
      )}
      {currentQuestion.type === 'order_items' && <OrderList />}
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
      <h1>Certification Practice</h1>
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
