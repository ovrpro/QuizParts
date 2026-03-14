import type { Decorator } from '@storybook/react';
import { QuizProvider } from '@quizparts/react';
import { getDefaultMockQuiz } from '../mocks/mockQuiz';
import type { Quiz } from '@quizparts/schema';
import type { QuizSession } from '@quizparts/core';

export const withQuizProvider: Decorator = (Story, context) => {
  const quiz = (context.parameters.quiz as Quiz | undefined) ?? getDefaultMockQuiz();
  const initialSession = context.parameters.initialSession as QuizSession | undefined;
  return (
    <QuizProvider quiz={quiz} initialSession={initialSession}>
      <Story />
    </QuizProvider>
  );
};
