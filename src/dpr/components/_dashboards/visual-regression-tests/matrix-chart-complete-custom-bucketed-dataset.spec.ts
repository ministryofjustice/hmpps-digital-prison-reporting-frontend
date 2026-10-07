import { expect, test } from '@playwright/test'
import { requestCatalogueVariant, takeScreenshotsOfAllCharts } from './helpers/vrtHelpers.spec'

test('Matrix chart - complete dataset custom bucketed', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, /Matrix - custom bucketed - Complete data/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Matrix - custom bucketed - Complete data/ })).toBeVisible()
  await takeScreenshotsOfAllCharts(page)
})
