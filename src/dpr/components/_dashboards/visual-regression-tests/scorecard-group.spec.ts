import { expect, test } from '@playwright/test'
import { requestCatalogueVariant, takeScreenshotsOfAllScorecards } from './helpers/vrtHelpers.spec'

test('Scorecard group VRT tests', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, 'Scorecard Group - Complete data')

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: 'Scorecard Group - Complete data' })).toBeVisible()
  await takeScreenshotsOfAllScorecards(page)
})
