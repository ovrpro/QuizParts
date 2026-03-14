import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'docs',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*docs.*\.spec\.ts/,
    },
    {
      name: 'playground',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:3001' },
      testMatch: /.*playground.*\.spec\.ts/,
    },
  ],
  webServer: [
    {
      command: 'yarn workspace @quizparts/docs dev',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'yarn workspace @quizparts/playground dev',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
