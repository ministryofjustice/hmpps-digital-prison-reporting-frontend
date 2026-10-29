import { test, expect } from '@playwright/test'
import { requestCatalogueVariant, takeScreenshotsOfAllCharts } from './helpers/vrtHelpers.spec'

test('Boxplot chart', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, /Boxplot charts dashboard/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Boxplot charts dashboard/ })).toBeVisible()

  await takeScreenshotsOfAllCharts(page)
})
