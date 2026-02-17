import { test, expect } from '@playwright/test';

test('Bar chart complete dataset', async ({ page }) => {
  await page.goto('http://localhost:3010/embedded/platform/');

  page.getByLabel(/Reports catalogue.*/i)
  await page.getByLabel(/Reports catalogue.*/i)
    .locator(page.getByRole('row').filter({ hasText: /Bar - Complete dataset/ }))
    .locator(page.getByRole('link', { name: /Request dashboard/ }))
    .click()

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Bar - Complete dataset/ })).toBeVisible()
  await expect(page).toHaveScreenshot({
    fullPage: true,
  })
});
