import { expect, test } from '@playwright/test'

test('Parent-child dashboard', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)
  await page
    .getByLabel(/Reports catalogue.*/i)
    .locator(page.getByRole('row').filter({ hasText: /Test Parent Dashboard/ }))
    .locator(page.getByRole('link', { name: /Request dashboard/ }))
    .click()

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Test Parent Dashboard/ })).toBeVisible()
  await expect(page).toHaveScreenshot({
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.015,
  })
})
