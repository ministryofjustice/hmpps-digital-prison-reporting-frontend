import { test, expect } from '@playwright/test'

test('Line chart complete dataset', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)
  await page
    .getByLabel(/Reports catalogue.*/i)
    .locator(page.getByRole('row').filter({ hasText: /Line - Complete dataset/ }))
    .locator(page.getByRole('link', { name: /Request dashboard/ }))
    .click()

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Line - Complete dataset/ })).toBeVisible()
  await expect(page).toHaveScreenshot({
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.015,
  })
})
