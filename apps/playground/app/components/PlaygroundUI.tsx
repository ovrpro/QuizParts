'use client';

import type { ParseResult } from '@quizparts/schema';
import { QuizProvider, QuizRoot, Progress } from '@quizparts/react';
import { defaultTheme, darkTheme, tokensToCssVars } from '@quizparts/theme';
import { QuizRunner } from './QuizRunner';
import type { Sample } from '../samples/defaultQuiz';

const themeMap = { default: defaultTheme, dark: darkTheme } as const;

export interface PlaygroundUIProps {
  editorValue: string;
  onEditorChange: (value: string) => void;
  parseResult: ParseResult | null;
  samples: Sample[];
  onLoadSample: (sampleId: string) => void;
  theme: 'default' | 'dark';
  onThemeChange: (theme: 'default' | 'dark') => void;
  onExport: () => void;
}

export const PlaygroundUI = ({
  editorValue,
  onEditorChange,
  parseResult,
  samples,
  onLoadSample,
  theme,
  onThemeChange,
  onExport,
}: PlaygroundUIProps) => (
  <main style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
    <header style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <h1>QuizParts Playground</h1>
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value as 'default' | 'dark')}
        aria-label="Theme"
      >
        <option value="default">Default</option>
        <option value="dark">Dark</option>
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
          ...tokensToCssVars(themeMap[theme]),
          border: `1px solid var(--qp-colors-border, #e2e8f0)`,
          borderRadius: '6px',
          padding: '1rem',
          overflow: 'auto',
          background: 'var(--qp-colors-background)',
          color: 'var(--qp-colors-text)',
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
  </main>
);
