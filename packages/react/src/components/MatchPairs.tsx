'use client';

import { useState } from 'react';
import { useQuestion } from '../hooks/useQuestion.js';

export const MatchPairs = () => {
  const { question, matchPairs, setMatchPairs, isSubmitted } = useQuestion();
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);

  if (!question || question.type !== 'match_pairs') return null;
  const { pairs } = question;
  const lefts = pairs.map((p) => p.left);
  const rights = pairs.map((p) => p.right);
  const usedLeft = new Set(matchPairs.map(([l]) => l));
  const usedRight = new Set(matchPairs.map(([, r]) => r));
  const availableLeft = lefts.filter((l) => !usedLeft.has(l));
  const availableRight = rights.filter((r) => !usedRight.has(r));
  const disabled = isSubmitted;

  const handleLeftClick = (left: string) => {
    if (disabled) return;
    setSelectedLeft((prev) => (prev === left ? null : left));
  };

  const handleRightClick = (right: string) => {
    if (disabled || !selectedLeft) return;
    setMatchPairs([...matchPairs, [selectedLeft, right]]);
    setSelectedLeft(null);
  };

  const handleRemovePair = (index: number) => {
    if (disabled) return;
    setMatchPairs(matchPairs.filter((_, i) => i !== index));
  };

  return (
    <div data-quiz-match-pairs style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} role="group" aria-label="Match pairs">
      {matchPairs.length > 0 && (
        <div>
          <span id="match-pairs-formed" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Matched:</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0.25rem 0 0', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {matchPairs.map(([l, r], i) => (
              <li key={`${l}-${r}-${i}`}>
                <button
                  type="button"
                  onClick={() => handleRemovePair(i)}
                  disabled={disabled}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                  data-match-pair
                >
                  {l} → {r} {!disabled && '✕'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div role="group" aria-labelledby="match-left-label">
          <span id="match-left-label" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Left</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0.25rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }} role="list">
            {availableLeft.map((left) => (
              <li key={left}>
                <button
                  type="button"
                  onClick={() => handleLeftClick(left)}
                  disabled={disabled}
                  data-match-left
                  {...(selectedLeft === left && { 'data-selected': '' })}
                  aria-pressed={selectedLeft === left}
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontWeight: selectedLeft === left ? 600 : 400,
                  }}
                >
                  {left}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div role="group" aria-labelledby="match-right-label">
          <span id="match-right-label" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Right</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0.25rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }} role="list">
            {availableRight.map((right) => (
              <li key={right}>
                <button
                  type="button"
                  onClick={() => handleRightClick(right)}
                  disabled={disabled}
                  data-match-right
                  style={{ padding: '0.5rem 0.75rem' }}
                >
                  {right}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
