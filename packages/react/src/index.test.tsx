import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => cleanup());
import { parseQuiz } from '@quizparts/schema';
import {
  REACT_VERSION,
  QuizProvider,
  useQuiz,
  useProgress,
  QuizRoot,
  Question,
  Prompt,
  Choices,
  Choice,
  SubmitButton,
  Feedback,
  Progress,
  TextInput,
  NextButton,
} from './index.js';

const quizJson = {
  id: 'test',
  title: 'Test Quiz',
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      prompt: 'What is 2+2?',
      choices: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
      ],
      answer: 'b',
      explanation: '2+2 equals 4.',
    },
    {
      id: 'q2',
      type: 'text_input',
      prompt: 'Say hello',
      answer: 'hello',
    },
  ],
};

const parsed = parseQuiz(quizJson);
const quiz = parsed.success ? parsed.data : { id: '', title: '', questions: [] };

describe('@quizparts/react', () => {
  it('exports REACT_VERSION', () => {
    expect(REACT_VERSION).toBe('0.0.1');
  });

  it('throws when useQuiz is used outside QuizProvider', () => {
    const Throwing = () => {
      useQuiz();
      return null;
    };
    expect(() => render(<Throwing />)).toThrow(/QuizProvider/);
  });

  it('throws when useProgress is used outside QuizProvider', () => {
    const Throwing = () => {
      useProgress();
      return null;
    };
    expect(() => render(<Throwing />)).toThrow(/QuizProvider/);
  });

  it('Feedback shows nothing before submit', () => {
    render(
      <QuizProvider quiz={quiz}>
        <Question>
          <Prompt />
          <Choices>
            <Choice choiceId="a" />
            <Choice choiceId="b" />
          </Choices>
          <Feedback />
        </Question>
      </QuizProvider>
    );
    expect(screen.queryByText('Correct!')).not.toBeInTheDocument();
    expect(screen.queryByText('Incorrect.')).not.toBeInTheDocument();
  });

  it('SubmitButton is disabled when no selection', () => {
    render(
      <QuizProvider quiz={quiz}>
        <Question>
          <Prompt />
          <Choices>
            <Choice choiceId="a" />
            <Choice choiceId="b" />
          </Choices>
          <SubmitButton />
        </Question>
      </QuizProvider>
    );
    const submitBtn = screen.getAllByRole('button').find((b) => b.textContent === 'Answer');
    expect(submitBtn).toBeDisabled();
  });

  it('provider and useQuiz expose quiz state', () => {
    const Reader = () => {
      const { quiz: q, currentQuestionIndex, questionCount } = useQuiz();
      return (
        <span data-testid="info">
          {q.title} {currentQuestionIndex + 1}/{questionCount}
        </span>
      );
    };
    render(
      <QuizProvider quiz={quiz}>
        <Reader />
      </QuizProvider>
    );
    expect(screen.getByTestId('info')).toHaveTextContent('Test Quiz 1/2');
  });

  it('multiple choice: select and submit', async () => {
    const user = userEvent.setup();
    render(
      <QuizProvider quiz={quiz}>
        <QuizRoot>
          <Question>
            <Prompt />
            <Choices>
              <Choice choiceId="a" />
              <Choice choiceId="b" />
            </Choices>
            <SubmitButton />
            <Feedback />
          </Question>
        </QuizRoot>
      </QuizProvider>
    );
    expect(screen.getByText('What is 2+2?')).toBeInTheDocument();
    const choiceB = document.querySelector('[data-choice-id="b"]');
    if (choiceB) await act(() => user.click(choiceB as HTMLElement));
    expect(choiceB).toHaveAttribute('data-selected');
    const submitBtn = screen.getAllByRole('button').find((b) => b.textContent === 'Answer');
    if (submitBtn) await act(() => user.click(submitBtn));
    expect(screen.getByText('Correct!')).toBeInTheDocument();
    expect(screen.getByText('2+2 equals 4.')).toBeInTheDocument();
  });

  it('progress updates after submit and next', async () => {
    const user = userEvent.setup();
    render(
      <QuizProvider quiz={quiz}>
        <Progress />
        <Question>
          <Prompt />
          <Choices>
            <Choice choiceId="a" />
            <Choice choiceId="b" />
          </Choices>
          <SubmitButton />
          <NextButton />
        </Question>
      </QuizProvider>
    );
    expect(screen.getByLabelText(/Question 1 of 2/)).toBeInTheDocument();
    const choiceB = document.querySelector('[data-choice-id="b"]');
    if (choiceB) await act(() => user.click(choiceB as HTMLElement));
    const submitBtn = screen.getAllByRole('button').find((b) => b.textContent === 'Answer');
    if (submitBtn) await act(() => user.click(submitBtn));
    const nextBtn = screen.getByRole('button', { name: 'Next' });
    await act(() => user.click(nextBtn));
    expect(screen.getByText('Say hello')).toBeInTheDocument();
  });

  it('text input: type and submit', async () => {
    const user = userEvent.setup();
    const quizTextOnly = { ...quiz, questions: [quiz.questions[1]!] };
    render(
      <QuizProvider quiz={quizTextOnly}>
        <Question>
          <Prompt />
          <TextInput />
          <SubmitButton />
          <Feedback />
        </Question>
      </QuizProvider>
    );
    const input = screen.getByRole('textbox');
    await act(() => user.type(input, 'hello'));
    const submitBtn = screen.getAllByRole('button').find((b) => b.textContent === 'Answer');
    if (submitBtn) await act(() => user.click(submitBtn));
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('useProgress returns current, total, percent', () => {
    const Reader = () => {
      const p = useProgress();
      return (
        <span data-testid="prog">
          {p.current}/{p.total} {p.percent}%
        </span>
      );
    };
    render(
      <QuizProvider quiz={quiz}>
        <Reader />
      </QuizProvider>
    );
    expect(screen.getByTestId('prog')).toHaveTextContent('1/2 0%');
  });

  it('resetQuiz restores initial state', async () => {
    const user = userEvent.setup();
    const ResetButton = () => {
      const { resetQuiz: reset } = useQuiz();
      return <button type="button" onClick={() => reset()}>Reset</button>;
    };
    render(
      <QuizProvider quiz={quiz}>
        <Progress />
        <Question>
          <Prompt />
          <Choices>
            <Choice choiceId="a" />
            <Choice choiceId="b" />
          </Choices>
          <SubmitButton />
        </Question>
        <ResetButton />
      </QuizProvider>
    );
    const choiceB = document.querySelector('[data-choice-id="b"]');
    if (!choiceB) throw new Error('Choice b not found');
    await act(() => user.click(choiceB as HTMLElement));
    const submitBtn = screen.getAllByRole('button').find((b) => b.textContent === 'Answer');
    if (submitBtn) await act(() => user.click(submitBtn));
    expect(screen.getByText('Score: 1')).toBeInTheDocument();
    await act(() => user.click(screen.getByRole('button', { name: 'Reset' })));
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
    expect(screen.getByText('What is 2+2?')).toBeInTheDocument();
  });
});
