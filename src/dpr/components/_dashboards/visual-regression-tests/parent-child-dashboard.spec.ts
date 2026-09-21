import { expect, test } from '@playwright/test'
import { requestCatalogueVariant } from './vrtHelpers'

test('Parent-child dashboard', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, /Test Parent Dashboard/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Test Parent Dashboard/ })).toBeVisible()
  for (let i = 0; i < 10; i++) {
    console.log(
      await page.evaluate(
        () => document.documentElement.scrollHeight
      )
    );

    await page.waitForTimeout(100);
  }
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot({
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.015,
  })
})
