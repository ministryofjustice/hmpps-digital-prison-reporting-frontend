import { Page } from '@playwright/test';

type DatePickerOptions = {
  type?: 'start' | 'end';
  navigate?: string[];
  select?: boolean;
  close?: boolean;
};

/**
 * Controls the date picker UI.
 *
 * @param page - Playwright Page object
 * @param options - Options to control date picker interaction
 */
export async function openDatePicker(
  page: Page,
  {
    type = 'start',
    navigate = [],
    select = true,
    close = false,
  }: DatePickerOptions = {}
): Promise<void> {
  const index = type === 'start' ? 0 : 1;

  // Open the date picker
  const dateButton = page.getByRole('button', { name: 'Choose date' }).nth(index);
  await dateButton.scrollIntoViewIfNeeded();
  await dateButton.hover();
  await dateButton.focus();
  await dateButton.click();

  // Wait for picker to appear (wait for 'Select' button visible)
  const selectButton = page.getByRole('button', { name: 'Select' });
  await selectButton.waitFor({ state: 'visible' });

  // Perform any navigation steps requested
  for (const action of navigate) {
    const navButton = page.getByRole('button', { name: action });
    await navButton.click();
  }

  // Select the date if requested
  if (select) {
    await selectButton.click();
  }

  // Close the picker if requested
  if (close) {
    const closeButton = page.getByRole('button', { name: 'Close' });
    await closeButton.click();
  }
}