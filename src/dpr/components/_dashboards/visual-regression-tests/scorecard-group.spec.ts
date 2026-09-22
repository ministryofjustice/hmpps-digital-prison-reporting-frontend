import { expect, test } from '@playwright/test'
import { requestCatalogueVariant } from './vrtHelpers'

test('Scorecard group VRT tests', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, 'Scorecard Group - Complete data')

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: 'Scorecard Group - Complete data' })).toBeVisible()
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
    clip: {
      x: 0,
      y: 0,
      width: 1280,
      height: 6320,
    },
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.015,
  })
})
