import { test as base, chromium, type Page } from '@playwright/test';

export const test = base.extend<{ loginPage: Page }>({
  loginPage: async ({}, use) => {
    const context = await chromium.launchPersistentContext(
      'C:\\Users\\blaxm\\AppData\\Local\\Google\\Chrome\\User Data',
      {
        headless: false,
        channel: 'chrome',
      }
    );
    const page = await context.newPage();
    
    // Use the page in tests
    await use(page);
    
    // Cleanup after test
    await context.close();
  },
});