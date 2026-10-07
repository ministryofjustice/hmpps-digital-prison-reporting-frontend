import { expect, test } from '@playwright/test'
import { requestCatalogueVariant, takeScreenshotsOfAllCharts } from './helpers/vrtHelpers.spec'

test('Matrix chart - complete dataset auto bucketed', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, /Matrix - auto bucketed - Complete data/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Matrix - auto bucketed - Complete data/ })).toBeVisible()
  await takeScreenshotsOfAllCharts(page)
})
