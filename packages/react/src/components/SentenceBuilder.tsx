'use client';

import { useQuestion } from '../hooks/useQuestion.js';

export const SentenceBuilder = () => {
  const { question, sentenceOrder, setSentenceOrder, isSubmitted } = useQuestion();

  if (!question || question.type !== 'sentence_builder') return null;
  const { tiles } = question;
  const disabled = isSubmitted;

  const available = tiles.slice();
  for (const s of sentenceOrder) {
    const i = available.indexOf(s);
    if (i >= 0) available.splice(i, 1);
  }

  const handleAddTile = (value: string) => {
    if (disabled) return;
    setSentenceOrder([...sentenceOrder, value]);
  };

  const handleRemoveAt = (index: number) => {
    if (disabled) return;
    setSentenceOrder(sentenceOrder.filter((_, i) => i !== index));
  };

  return (
    <div data-quiz-sentence-builder style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} role="group" aria-label="Sentence builder">
      <div role="group" aria-labelledby="sentence-slot-label">
        <span id="sentence-slot-label" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Sentence:</span>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25rem',
            minHeight: '2.5rem',
            padding: '0.5rem',
            border: '1px solid #eee',
            borderRadius: '4px',
            marginTop: '0.25rem',
          }}
          data-sentence-slot
        >
          {sentenceOrder.length === 0 && (
            <span style={{ color: '#999' }}>Tap tiles below to build the sentence</span>
          )}
          {sentenceOrder.map((value, index) => (
            <button
              key={`${value}-${index}`}
              type="button"
              onClick={() => handleRemoveAt(index)}
              disabled={disabled}
              style={{ padding: '0.25rem 0.5rem', margin: '0.125rem' }}
              data-sentence-tile
            >
              {value} {!disabled && '✕'}
            </button>
          ))}
        </div>
      </div>
      <div role="group" aria-labelledby="tile-bank-label">
        <span id="tile-bank-label" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Tiles:</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.25rem' }} data-tile-bank>
          {available.map((value, i) => (
            <button
              key={`${value}-${i}`}
              type="button"
              onClick={() => handleAddTile(value)}
              disabled={disabled}
              style={{ padding: '0.35rem 0.6rem' }}
              data-tile
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
