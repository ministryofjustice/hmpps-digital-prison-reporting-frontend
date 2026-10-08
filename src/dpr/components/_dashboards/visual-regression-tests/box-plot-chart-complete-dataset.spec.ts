import { test, expect } from '@playwright/test'
import { requestCatalogueVariant, takeScreenshotsOfAllCharts } from './helpers/vrtHelpers.spec'

test('Bar chart complete dataset', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, /Box plot chart Examples/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Box plot chart Examples/ })).toBeVisible()

  const chartCount = await page.getByRole('tabpanel').count()

  await page.waitForFunction(expected => {
    return window.chartsReady?.size === expected
  }, chartCount)

  await takeScreenshotsOfAllCharts(page)
})
