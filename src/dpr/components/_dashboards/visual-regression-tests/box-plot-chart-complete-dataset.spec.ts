import { test, expect } from '@playwright/test'
import { requestCatalogueVariant, takeScreenshotsOfAllCharts } from './helpers/vrtHelpers.spec'

test('Bar chart complete dataset', async ({ page }) => {
  await page.goto('/embedded/platform')

  page.getByLabel(/Reports catalogue.*/i)

  requestCatalogueVariant(page, /Box plot chart Examples/)

  await page.getByRole('button', { name: /Request dashboard/ }).click()

  await expect(page.getByRole('heading', { name: /Box plot chart Examples/ })).toBeVisible()

  const chartCount = await page.getByRole('tabpanel').count()

  await page.waitForFunction(expected => {
    const charts = Object.values(window.debugCharts ?? {})
    return charts.length === expected
  }, chartCount)

  const chartInfo = await page.evaluate(() => {
    return Object.entries(window.debugCharts ?? {}).map(([id, chart]) => ({
      id,
      labels: chart.data.labels,
      datasets: chart.data.datasets,
      metaElements: chart.getDatasetMeta(0).data.length,
      width: chart.width,
      height: chart.height,
    }))
  })

  const preRenderChartData = await page.evaluate(() => {
    return window.chartData
  })

  console.log(JSON.stringify({ chartInfo }, null, 2))
  console.log(JSON.stringify({ preRenderChartData }, null, 2))

  await takeScreenshotsOfAllCharts(page)
})
