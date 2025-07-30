import { Page, expect } from '@playwright/test';

const defaultFailurePath = 'screenshots/failed-report-error.png';
const defaultSuccessPath = 'screenshots/successful-report.png';

type VerifyReportUIControlsOptions = {
  clickRefresh?: boolean;
};

type SubmitReportOptions = {
  expectOutcome?: 'success' | 'failure';
  takeScreenshotOnSuccess?: boolean;
  takeScreenshotOnFailure?: boolean;
  screenshotPath?: string;
  reportHeading?: string;
  assertPostRender?:() => Promise<void>;
};

/**
 * Verifies that report UI controls exist and handles popups.
 */
export async function verifyReportUIControls(
  page: Page,
  { clickRefresh = true }: VerifyReportUIControlsOptions = {}
): Promise<void> {
  // Wait until the final report UI is present
  await page.waitForSelector('#dpr-button-refresh', { state: 'visible', timeout: 600_000 });

  // Confirm all expected controls are visible
  await expect(page.locator('#dpr-button-copy')).toBeVisible();
  await expect(page.locator('#dpr-button-printable')).toBeVisible();
  await expect(page.locator('#dpr-button-refresh')).toBeVisible();

  // This may be disabled if no data, so we check for existence not visibility
  await expect(page.locator('#dpr-button-downloadable')).toBeAttached();

  // Optional: check the final heading appears
  const reportDetailsLink = page.getByText('Report details');
  if (await reportDetailsLink.isVisible()) {
    await reportDetailsLink.click();
  }

  await expect(page.getByRole('heading', { name: 'ORS Admissions' })).toBeVisible();
}

/**
 * Submits a report and handles success/failure, without relying on FINISHED text.
 */
export async function submitReportAndVerify(
  page: Page,
  {
    expectOutcome = 'failure',
    takeScreenshotOnSuccess = false,
    takeScreenshotOnFailure = true,
    screenshotPath,
    reportHeading = 'ORS Admissions',
    assertPostRender,
  }: SubmitReportOptions = {}
): Promise<void> {
  const requestButton = page.getByRole('button', { name: 'Request report' });

  await requestButton.scrollIntoViewIfNeeded();
  await expect(requestButton).toBeVisible();
  await requestButton.click();
  await requestButton.click();

  await expect(page.getByRole('heading', { name: 'Report request status' })).toBeVisible();
  await expect(page.getByText('SUBMITTED', { exact: true })).toBeVisible();

  if (expectOutcome === 'failure') {
    const failedElement = page.locator('strong.govuk-tag.govuk-tag--red', { hasText: 'FAILED' });
    await expect(failedElement).toBeVisible();

    const showError = page.getByText('Show full error');
    if (await showError.isVisible()) await showError.click();

    if (takeScreenshotOnFailure) {
      await page.screenshot({
        path: screenshotPath || defaultFailurePath,
        fullPage: true,
      });
    }

    const retryButton = page.getByRole('button', { name: 'Retry' });
    await expect(retryButton).toBeVisible();
    await retryButton.click();

  } else if (expectOutcome === 'success') {
    const reportUIHeading = page.getByRole('heading', { name: reportHeading });
    const failedElement = page.locator('strong.govuk-tag.govuk-tag--red', { hasText: 'FAILED' });

    const result = await Promise.race([
      reportUIHeading.waitFor({ timeout: 60_000 }).then(() => 'FINISHED'),
      failedElement.waitFor({ timeout: 60_000 }).then(() => 'FAILED'),
    ]);

    if (result === 'FAILED') {
      const showError = page.getByText('Show full error');
      if (await showError.isVisible()) await showError.click();

      if (takeScreenshotOnFailure) {
        await page.screenshot({
          path: screenshotPath || defaultFailurePath,
          fullPage: true,
        });
      }

      throw new Error('Report processing unexpectedly failed.');
    }

    await expect(reportUIHeading).toBeVisible();

    if (takeScreenshotOnSuccess) {
      await page.screenshot({
        path: screenshotPath || defaultSuccessPath,
        fullPage: true,
      });
    }

    await verifyReportUIControls(page);
    if (assertPostRender) {
      await assertPostRender();
    }
  } else {
    throw new Error(`Invalid expectOutcome: ${expectOutcome}. Use 'success' or 'failure'.`);
  }
}