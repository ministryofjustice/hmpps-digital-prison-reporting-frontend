import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'

export const requestCatalogueVariant = async (page: Page, name: string | RegExp) => {
  await page
    .getByLabel(/Reports catalogue.*/i)
    .getByRole('listitem')
    .filter({
      has: page.getByRole('heading', { name }),
    })
    .getByRole('link', {
      name: /Request (dashboard|report)/i,
    })
    .first()
    .click()
}

export const takeScreenshotsOfAllCharts = async (page: Page) => {
  const charts = await page.getByRole('tabpanel').all()
  await Promise.all(charts.map(async (chart, idx) => {
    await expect(chart).toHaveScreenshot(
      `chart-${idx}.png`,
      {
        animations: 'disabled',
        maxDiffPixelRatio: 0.015,
      }
  )
  }))
}

export const takeScreenshotsOfAllScorecards = async (page: Page) => {
  const charts = await page.locator('.dpr-scorecard').all()
  await Promise.all(charts.map(async (chart, idx) => {
    await expect(chart).toHaveScreenshot(
      `scorecard-${idx}.png`,
      {
        animations: 'disabled',
        maxDiffPixelRatio: 0.015,
      }
  )
  }))
}