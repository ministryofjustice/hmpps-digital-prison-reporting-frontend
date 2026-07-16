import type { Page } from '@playwright/test'

export const getCatalogueVariant = (page: Page, name: string | RegExp) => {
  return page
    .getByLabel(/Reports catalogue.*/i)
    .getByRole('listitem')
    .filter({
      has: page.getByRole('heading', { name }),
    })
}
