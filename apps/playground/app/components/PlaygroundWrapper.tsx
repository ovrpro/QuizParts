'use client';

import { useState, useEffect, useCallback } from 'react';
import { parseQuiz, type ParseResult } from '@quizparts/schema';
import { getDefaultEditorValue, samples } from '../samples/defaultQuiz';
import { PlaygroundUI } from './PlaygroundUI';

const PARSE_DEBOUNCE_MS = 450;

const parseEditorValue = (raw: string): ParseResult => {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { success: false, errors: [{ path: '', message: 'Enter quiz JSON to preview.' }] };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return { success: false, errors: [{ path: '', message: 'Invalid JSON' }] };
  }
  return parseQuiz(parsed);
};

export const PlaygroundWrapper = () => {
  const [editorValue, setEditorValue] = useState(getDefaultEditorValue);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [theme, setTheme] = useState<'default' | 'dark'>('default');

  useEffect(() => {
    const t = setTimeout(
      () => setParseResult(parseEditorValue(editorValue)),
      PARSE_DEBOUNCE_MS
    );
    return () => clearTimeout(t);
  }, [editorValue]);

  const handleEditorChange = useCallback((value: string) => {
    setEditorValue(value);
  }, []);

  const handleLoadSample = useCallback((sampleId: string) => {
    const sample = samples.find((s) => s.id === sampleId);
    if (sample) {
      setEditorValue(JSON.stringify(sample.data, null, 2));
    }
  }, []);

  const handleExport = useCallback(() => {
    const blob = new Blob([editorValue], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [editorValue]);

  return (
    <PlaygroundUI
      editorValue={editorValue}
      onEditorChange={handleEditorChange}
      parseResult={parseResult}
      samples={samples}
      onLoadSample={handleLoadSample}
      theme={theme}
      onThemeChange={setTheme}
      onExport={handleExport}
    />
  );
};
