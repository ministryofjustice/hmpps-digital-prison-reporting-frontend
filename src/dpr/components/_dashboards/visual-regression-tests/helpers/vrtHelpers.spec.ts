import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

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

export const verifyChartHeights = async (page: Page, expectedHeights: number[]) => {
  const charts = page.getByRole('tabpanel')
  for (let i = 0; i < expectedHeights.length; i += 1) {
    const chart = charts.nth(i)
    // eslint-disable-next-line no-await-in-loop
    await expect
      .poll(async () => {
        const box = await chart.boundingBox()
        return Math.round(box?.height ?? 0)
      })
      .toBe(expectedHeights[i])
  }
}

export const takeScreenshotsOfAllCharts = async (page: Page) => {
  const charts = page.getByRole('tabpanel')
  const count = await charts.count()

  for (let i = 0; i < count; i += 1) {
    /* eslint-disable no-await-in-loop */
    await charts.nth(i).isVisible()
    await expect(charts.nth(i).locator('canvas')).toBeVisible() // canvas must be ready before screenshot
    await expect(charts.nth(i)).toHaveScreenshot(`chart-${i}.png`, {
      animations: 'disabled',
      maxDiffPixelRatio: 0.015,
    })
    /* eslint-enable no-await-in-loop */
  }
}

export const takeScreenshotsOfAllScorecards = async (page: Page) => {
  const charts = await page.locator('.dpr-scorecard').all()
  await Promise.all(
    charts.map(async (chart, idx) => {
      await expect(chart).toHaveScreenshot(`scorecard-${idx}.png`, {
        animations: 'disabled',
        maxDiffPixelRatio: 0.015,
      })
    }),
  )
}
