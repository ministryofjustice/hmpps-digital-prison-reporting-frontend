import { test, expect } from '@playwright/test'
import { requestCatalogueVariant, takeScreenshotsOfAllCharts } from './helpers/vrtHelpers.spec'

test('Bar chart complete dataset', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, /Box plot chart Examples/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  const chartCount = await page.locator('canvas').count()
  await page.waitForFunction(expected => window.chartsReady === expected, chartCount)

  await expect(page.getByRole('heading', { name: /Box plot chart Examples/ })).toBeVisible()

  await takeScreenshotsOfAllCharts(page)
})
