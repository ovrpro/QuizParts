import { test, expect } from '@playwright/test';

test('playground app loads and shows heading', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await expect(page.locator('h1')).toHaveText('QuizParts Playground');
});

test('playground page has package info', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await expect(page.getByText(/schema|theme|react/)).toBeVisible();
});
