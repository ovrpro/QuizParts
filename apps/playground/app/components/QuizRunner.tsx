'use client';

import {
  Question,
  Prompt,
  Choices,
  Choice,
  TextInput,
  MatchPairs,
  OrderList,
  SentenceBuilder,
  SubmitButton,
  NextButton,
  Feedback,
  useQuiz,
} from '@quizparts/react';

export const QuizRunner = () => {
  const { currentQuestion, isComplete, resetQuiz } = useQuiz();

  if (!currentQuestion) return <p>No questions.</p>;
  if (isComplete) {
    return (
      <div>
        <p>Quiz complete! Check your score above.</p>
        <button type="button" onClick={() => resetQuiz()}>
          Reset quiz
        </button>
      </div>
    );
  }

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
      {currentQuestion.type === 'text_input' && <TextInput />}
      {currentQuestion.type === 'match_pairs' && <MatchPairs />}
      {currentQuestion.type === 'order_items' && <OrderList />}
      {currentQuestion.type === 'sentence_builder' && <SentenceBuilder />}
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <SubmitButton />
        <NextButton />
        <button type="button" onClick={() => resetQuiz()}>
          Reset quiz
        </button>
      </div>
      <Feedback />
    </Question>
  );
};
