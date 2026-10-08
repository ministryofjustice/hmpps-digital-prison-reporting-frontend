import { expect, test } from '@playwright/test'
import { requestCatalogueVariant, takeScreenshotsOfAllCharts, verifyChartHeights } from './helpers/vrtHelpers.spec'

test('Matrix chart - complete dataset', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, /Matrix - Complete data/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Matrix - Complete data/ })).toBeVisible()

  await verifyChartHeights(page, [761, 301, 141])
  await takeScreenshotsOfAllCharts(page)
  await verifyChartHeights(page, [761, 301, 141]) // verify a second time to check if heights has changed after taking screenshots
})
