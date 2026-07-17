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
    .click()
}
