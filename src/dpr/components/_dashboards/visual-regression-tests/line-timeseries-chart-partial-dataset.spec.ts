import { test, expect } from '@playwright/test'

test('Bar chart partial dataset', async ({ page }) => {
  await page.goto('http://localhost:3010/embedded/platform/')

  page.getByLabel(/Reports catalogue.*/i)
  await page
    .getByLabel(/Reports catalogue.*/i)
    .locator(page.getByRole('row').filter({ hasText: /Line-timeseries - Partial dataset/ }))
    .locator(page.getByRole('link', { name: /Request dashboard/ }))
    .click()

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Line-timeseries - Partial dataset/ })).toBeVisible()
  await expect(page).toHaveScreenshot({
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  })
})
