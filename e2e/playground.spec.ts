import { test, expect } from '@playwright/test';

test('playground app loads and shows heading', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await expect(page.locator('h1')).toHaveText('QuizParts Playground');
});

test('playground has editor and preview with quiz runner', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.locator('.playground-preview')).toBeVisible();
  await expect(page.locator('#quiz-json-editor')).toBeVisible();
  // Default sample loads valid quiz; runner shows first question or controls
  await expect(
    page.getByText('What is the capital of France?').or(page.getByRole('button', { name: /submit/i }))
  ).toBeVisible({ timeout: 5000 });
});
