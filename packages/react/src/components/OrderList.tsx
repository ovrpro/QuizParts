'use client';

import { useEffect } from 'react';
import { useQuestion } from '../hooks/useQuestion.js';

const move = (ids: string[], index: number, direction: 'up' | 'down'): string[] => {
  const next = [...ids];
  const target = direction === 'up' ? index - 1 : index + 1;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target]!, next[index]!];
  return next;
};

export const OrderList = () => {
  const { question, orderedIds, setOrderedIds, isSubmitted } = useQuestion();

  if (!question || question.type !== 'order_items') return null;
  const { items } = question;
  const itemMap = new Map(items.map((i) => [i.id, i]));
  const ids = orderedIds.length > 0 ? orderedIds : items.map((i) => i.id);
  const disabled = isSubmitted;

  useEffect(() => {
    if (orderedIds.length === 0 && items.length > 0) {
      setOrderedIds(items.map((i) => i.id));
    }
  }, [items, orderedIds.length, setOrderedIds]);

  const handleMoveUp = (index: number) => {
    if (disabled || index <= 0) return;
    setOrderedIds(move(ids, index, 'up'));
  };

  const handleMoveDown = (index: number) => {
    if (disabled || index >= ids.length - 1) return;
    setOrderedIds(move(ids, index, 'down'));
  };

  return (
    <div data-quiz-order-list style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} role="group" aria-label="Order items">
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} role="list">
        {ids.map((id, index) => {
          const item = itemMap.get(id);
          if (!item) return null;
          return (
            <li
              key={id}
              data-order-item
              data-item-id={id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0',
                borderBottom: '1px solid #eee',
              }}
            >
              <span style={{ flex: 1 }}>{item.text}</span>
              <button
                type="button"
                onClick={() => handleMoveUp(index)}
                disabled={disabled || index === 0}
                aria-label={`Move ${item.text} up`}
                style={{ padding: '0.25rem 0.5rem' }}
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => handleMoveDown(index)}
                disabled={disabled || index === ids.length - 1}
                aria-label={`Move ${item.text} down`}
                style={{ padding: '0.25rem 0.5rem' }}
              >
                ↓
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
