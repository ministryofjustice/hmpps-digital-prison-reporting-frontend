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

export const waitForChartsToFullyRender = async (page: Page, expectedHeights: number[]) => {
  await expect
    .poll(
      async () => {
        const charts = page.getByRole('tabpanel')
        const heights = await Promise.all(
          expectedHeights.map(async (_, i) => {
            const box = await charts.nth(i).boundingBox()
            return Math.round(box?.height ?? 0)
          }),
        )
        console.log('heights', heights)
        return heights
      },
      {
        timeout: 30000,
      },
    )
    .toEqual(expectedHeights)
}

export const takeScreenshotsOfAllCharts = async (page: Page) => {
  const charts = page.getByRole('tabpanel')
  const count = await charts.count()

  for (let i = 0; i < count; i += 1) {
    /* eslint-disable no-await-in-loop */
    const chart = charts.nth(i)
    await expect(chart).toBeVisible()
    await expect(chart.locator('canvas')).toBeVisible() // canvas must be ready before screenshot

    await expect(chart).toHaveScreenshot(`chart-${i}.png`, {
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
