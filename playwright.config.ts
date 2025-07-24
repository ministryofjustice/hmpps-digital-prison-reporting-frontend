import { defineConfig, devices } from '@playwright/test';

// Toggle this to true to run headless, false to run headed
const runHeadless = false;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
    headless: runHeadless,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: runHeadless,
      },
    },

    // other browsers commented out for now
  ],
});