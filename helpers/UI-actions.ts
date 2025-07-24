import { expect, Page } from'@playwright/test';

/**
 * Clicks the "Reset filters" link reliably
 * - Scrolls into view
 * - Waits for visibility
 * - Clicks the link
 * 
 *  @param page - Playwright page instance
 */

export async function clickResetFilters(page: Page): Promise<void> {
  const resetFilters = page.getByRole('link', { name: 'Reset filters' });
  
  await resetFilters.scrollIntoViewIfNeeded();
  await expect(resetFilters).toBeVisible();
  await resetFilters.click();
}