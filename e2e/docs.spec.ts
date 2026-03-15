import { test, expect } from '@playwright/test';

test('docs app loads and shows heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('QuizParts Docs');
});

test('docs /docs route loads', async ({ page }) => {
  await page.goto('/docs');
  await expect(page.locator('h1')).toHaveText('Docs');
});

test('docs /get-started has install and example', async ({ page }) => {
  await page.goto('/get-started');
  await expect(page.locator('h1')).toHaveText('Get started');
  await expect(page.getByRole('heading', { name: 'Install' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Render with React' })).toBeVisible();
});
