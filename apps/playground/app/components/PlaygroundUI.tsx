'use client';

import { useState } from 'react';
import type { ParseResult } from '@quizparts/schema';
import { QuizProvider, QuizRoot, Progress } from '@quizparts/react';
import {
  defaultTheme,
  calmTheme,
  darkTheme,
  tokensToCssVars,
  mergeTheme,
  type ThemeOverrides,
} from '@quizparts/theme';
import { QuizRunner } from './QuizRunner';
import type { Sample } from '../samples/defaultQuiz';

const themeMap = { default: defaultTheme, calm: calmTheme, dark: darkTheme } as const;
export type ThemeId = keyof typeof themeMap;

export interface PlaygroundUIProps {
  editorValue: string;
  onEditorChange: (value: string) => void;
  parseResult: ParseResult | null;
  samples: Sample[];
  onLoadSample: (sampleId: string) => void;
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  onExport: () => void;
}

const emptyOverrides: ThemeOverrides = {};

export const PlaygroundUI = ({
  editorValue,
  onEditorChange,
  parseResult,
  samples,
  onLoadSample,
  theme,
  onThemeChange,
  onExport,
}: PlaygroundUIProps) => {
  const [overrides, setOverrides] = useState<ThemeOverrides>(emptyOverrides);
  const resolvedTheme = mergeTheme(themeMap[theme], overrides);
  const vars = tokensToCssVars(resolvedTheme);

  const patchColor = (key: 'primary' | 'success' | 'danger', value: string) =>
    setOverrides((o) => ({
      ...o,
      semantic: {
        ...o.semantic,
        color: { ...o.semantic?.color, [key]: value },
      } as ThemeOverrides['semantic'],
    }));

  const handlePrimaryChange = (hex: string) => patchColor('primary', hex);
  const handleSuccessChange = (hex: string) => patchColor('success', hex);
  const handleDangerChange = (hex: string) => patchColor('danger', hex);
  const hasOverrides = Object.keys(overrides).length > 0;

  return (
  <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
    <header style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <h1>QuizParts Playground</h1>
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value as ThemeId)}
        aria-label="Theme"
      >
        <option value="default">Play</option>
        <option value="calm">Calm</option>
        <option value="dark">Midnight</option>
      </select>
      <button type="button" onClick={onExport}>
        Export JSON
      </button>
    </header>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1fr)',
        gap: '1.5rem',
        minHeight: '400px',
      }}
      className="playground-layout"
    >
      <section aria-label="Quiz JSON editor" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="sample-select">Sample:</label>
          <select
            id="sample-select"
            onChange={(e) => onLoadSample(e.target.value)}
            style={{ flex: 1, maxWidth: '200px' }}
          >
            {samples.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <textarea
          id="quiz-json-editor"
          value={editorValue}
          onChange={(e) => onEditorChange(e.target.value)}
          spellCheck={false}
          style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '13px',
            padding: '0.75rem',
            flex: 1,
            minHeight: '320px',
            resize: 'vertical',
          }}
          aria-label="Quiz JSON"
        />
      </section>

      <section
        aria-label="Preview"
        data-theme={theme}
        style={{
          ...vars,
          border: '1px solid var(--qp-semantic-color-border)',
          borderRadius: '6px',
          padding: '1rem',
          overflow: 'auto',
          background: 'var(--qp-semantic-color-background)',
          color: 'var(--qp-semantic-color-text)',
        }}
        className="playground-preview"
      >
        {parseResult === null ? (
          <p>Loading…</p>
        ) : parseResult.success ? (
          <QuizProvider quiz={parseResult.data}>
            <QuizRoot>
              <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>{parseResult.data.title}</p>
              <Progress />
              <QuizRunner />
            </QuizRoot>
          </QuizProvider>
        ) : parseResult.errors.length > 0 ? (
          <div>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Validation errors</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {parseResult.errors.map((err, i) => (
                <li key={i}>
                  {err.path ? `${err.path}: ` : ''}{err.message}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Enter quiz JSON to preview.</p>
        )}
      </section>
    </div>

    <details style={{ marginTop: '1rem', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
      <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Theme tokens (live)</summary>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.75rem', alignItems: 'flex-end' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Primary</span>
          <input
            type="color"
            value={resolvedTheme.semantic.color.primary}
            onChange={(e) => handlePrimaryChange(e.target.value)}
            aria-label="Primary color"
            style={{ width: '48px', height: '32px', padding: 0, border: '1px solid #e2e8f0', borderRadius: '4px' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Success</span>
          <input
            type="color"
            value={resolvedTheme.semantic.color.success}
            onChange={(e) => handleSuccessChange(e.target.value)}
            aria-label="Success color"
            style={{ width: '48px', height: '32px', padding: 0, border: '1px solid #e2e8f0', borderRadius: '4px' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Danger</span>
          <input
            type="color"
            value={resolvedTheme.semantic.color.danger}
            onChange={(e) => handleDangerChange(e.target.value)}
            aria-label="Danger color"
            style={{ width: '48px', height: '32px', padding: 0, border: '1px solid #e2e8f0', borderRadius: '4px' }}
          />
        </label>
        {hasOverrides && (
          <button
            type="button"
            onClick={() => setOverrides(emptyOverrides)}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '13px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              background: '#f8fafc',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        )}
      </div>
    </details>
  </main>
  );
};
