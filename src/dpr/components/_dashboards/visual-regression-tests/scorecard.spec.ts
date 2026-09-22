import { test, expect } from '@playwright/test'
import {
  requestCatalogueVariant,
  takeScreenshotsOfAllCharts,
  takeScreenshotsOfAllScorecards,
} from './helpers/vrtHelpers.spec'

test('Scorecard VRT tests', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, 'Scorecard - Complete data')

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: 'Scorecard - Complete data' })).toBeVisible()
  await takeScreenshotsOfAllScorecards(page)
  await takeScreenshotsOfAllCharts(page)
})
