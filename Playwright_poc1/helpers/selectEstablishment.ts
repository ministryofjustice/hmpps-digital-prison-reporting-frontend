import { expect, Page } from '@playwright/test';

/**
 * Selects an establishment from a combobox using partial typing and exact matching.
 *
 * @param page - The Playwright page instance.
 * @param partialName - Text to type into the combobox to trigger suggestions (e.g. "Lin").
 * @param fullName - Full button label of the suggestion to click (e.g. "LINCOLN (HMP)").
 */
export async function selectEstablishment(
  page: Page,
  partialName: string,
  fullName: string
): Promise<void> {
  // Click the Establishment combobox
  const combo = page.getByRole('combobox', { name: 'Establishment' });
  await combo.click();

  // Type part of the name to trigger suggestions
  await combo.type(partialName);

  // Locate the full match suggestion
  const suggestion = page.getByRole('button', { name: fullName });

  // Ensure the suggestion is visible (waits briefly then continues)
  const isVisible = await suggestion.isVisible().catch(() => false);
  if (!isVisible) {
    throw new Error(
      `Dropdown suggestion "${fullName}" not visible.\n` +
      `Check if the backend service or port forwarder is running correctly.`
    );
  }

  // Click to select the suggestion
  await suggestion.click();

  // Confirm selection is reflected in the UI
  await expect(page.getByText(`Establishment: ${fullName}`)).toBeVisible();
}