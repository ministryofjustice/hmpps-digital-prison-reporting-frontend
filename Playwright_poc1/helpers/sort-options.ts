import { expect, Page } from '@playwright/test';

/**
 * All available sort option labels in the report.
 */
export const sortOptions: string[] = [
  'Admission Time',
  'Last Name',
  'First Name',
  'NOMS Number',
  'Booking No',
  'Location',
  'Date of Birth',
  'Religion',
  'Legal Status',
  'Security Category',
  'From',
  'Reason',
  'Main Offence',
  'PNC ID',
  'Release Date',
];

/**
 * Validates that all sort option radio buttons are visible on the page.
 *
 * @param page - Playwright page instance
 */
export async function validateSortOptionsVisible(page: Page): Promise<void> {
  for (const label of sortOptions) {
    const radio = page.getByRole('radio', { name: label });
    await expect(radio).toBeVisible();
  }
}

/**
 * Cycles through each sort option radio button and selects it.
 *
 * @param page - Playwright page instance
 */
export async function cycleThroughSortOptions(page: Page): Promise<void> {
  for (const label of sortOptions) {
    const radio = page.getByRole('radio', { name: label });
    await radio.scrollIntoViewIfNeeded();
    await radio.check();
    await expect(radio).toBeChecked();
  }
}

/**
 * Resets the selected sort option to the default: 'Admission Time'.
 *
 * @param page - Playwright page instance
 */
export async function resetToDefaultSort(page: Page): Promise<void> {
  const radio = page.getByRole('radio', { name: 'Admission Time' });
  await radio.scrollIntoViewIfNeeded();
  await radio.check();
  await expect(radio).toBeChecked();
}

/**
 * Toggles between ascending and descending sort directions and verifies both.
 *
 * @param page - Playwright page instance
 */
export async function toggleSortDirection(page: Page): Promise<void> {
  const ascending = page.getByRole('radio', { name: 'Ascending' });
  const descending = page.getByRole('radio', { name: 'Descending' });

  await expect(ascending).toBeVisible();
  await expect(descending).toBeVisible();

  // Verify default is ascending
  await expect(ascending).toBeChecked();

  // Switch to descending and verify
  await descending.check();
  await expect(descending).toBeChecked();

  // Switch back to ascending and verify
  await ascending.check();
  await expect(ascending).toBeChecked();
}