import { test, expect } from '@playwright/test'
import { requestCatalogueVariant } from './vrtHelpers'

test('Line-timeseries chart complete dataset', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, /Line-timeseries - Complete dataset/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Line-timeseries - Complete dataset/ })).toBeVisible()
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
