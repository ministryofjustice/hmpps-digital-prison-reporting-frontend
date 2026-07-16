import { test, expect } from '@playwright/test'
import { getCatalogueVariant } from './vrtHelpers'

test('Line-timeseries chart complete dataset', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  getCatalogueVariant(page, /Line-timeseries - Complete dataset/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Line-timeseries - Complete dataset/ })).toBeVisible()
  await expect(page).toHaveScreenshot({
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.015,
  })
})
