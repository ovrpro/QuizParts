import { test, expect } from '@playwright/test';

test('docs app loads and shows heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('QuizParts Docs');
});

test('docs /docs route loads placeholder', async ({ page }) => {
  await page.goto('/docs');
  await expect(page.locator('h1')).toHaveText('Docs');
});
