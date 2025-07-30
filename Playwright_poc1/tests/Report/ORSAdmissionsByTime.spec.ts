import { test, expect } from '@playwright/test';
import DigitalPrisonReportingPage from '../../pages/DigitalPrisonReporting';
import { loginAndNavigateToReporting } from '../../helpers/navigation';
import { clickResetFilters } from '../../helpers/UI-actions';
import { openDatePicker } from '../../helpers/datePicker';
import {
  validateSortOptionsVisible,
  cycleThroughSortOptions,
  resetToDefaultSort,
} from '../../helpers/sort-options';
import { submitReportAndVerify } from '../../helpers/report-actions';
import { selectEstablishment } from '../../helpers/selectEstablishment';

test('ORS Admissions Report by Time - End-to-End Tests', async ({ page }) => {
    await loginAndNavigateToReporting(page, {
        username: 'RWILLIAMS4_GEN',    //need updating
        password: 'Windmill1',    //need updating
    });

    const digitalPrisonReportingPage = new DigitalPrisonReportingPage(page);
    await digitalPrisonReportingPage.enterSearchTerm('ORS Admissions');
    await page.keyboard.press('Enter');
    await page.getByRole('link', { name: 'Request report' }).nth(1).click();

    await test.step('Verify report headings and description', async () => {
      await page.getByText('Details for "ORS Admissions:').click();
      await expect(page.getByRole('heading', { name: 'By Admission Time' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'ORS Admissions' })).toBeVisible();
      await expect(page.getByText(/A list of active prisoners on a prison roll/i)).toBeVisible();
    });

    await test.step('Reset filters', async () => {
      await clickResetFilters(page);
    });

    await test.step('Select establishment', async () => {
      await selectEstablishment(page, 'Lin', 'LINCOLN (HMP)');
    });

    await test.step('START DATE - manual entry and calendar select', async () => {
      await page.getByRole('textbox', { name: 'Admission Start Date' }).fill('18/05/2025');
      await openDatePicker(page, { type: 'start' });
      await expect(page.getByRole('textbox', { name: 'Admission Start Date' })).toHaveValue('18/5/2025');
    });

    await test.step('START DATE - calendar picker only', async () => {
      await clickResetFilters(page);
      await openDatePicker(page, { type: 'start', navigate: ['Previous month'], select: false });
      await page.getByTestId('16/6/2025').click();
      await expect(page.getByRole('textbox', { name: 'Admission Start Date' })).toHaveValue('16/6/2025');
    });

    await test.step('START DATE - manual entry overridden by calendar picker', async () => {
      await clickResetFilters(page);
      await page.getByRole('textbox', { name: 'Admission Start Date' }).fill('14/05/2025');
      await expect(page.getByRole('textbox', { name: 'Admission Start Date' })).toHaveValue('14/05/2025');
      await openDatePicker(page, { type: 'start', select: false });
      await page.getByTestId('21/5/2025').click();
      await expect(page.getByRole('textbox', { name: 'Admission Start Date' })).toHaveValue('21/5/2025');
    });

    await test.step('END DATE - manual entry and calendar select', async () => {
      await clickResetFilters(page);
      await page.getByRole('textbox', { name: 'Admission End Date' }).fill('15/6/2025');
      await openDatePicker(page, { type: 'end' });
      await expect(page.getByRole('textbox', { name: 'Admission End Date' })).toHaveValue('15/6/2025');
    });

    await test.step('END DATE - calendar picker only', async () => {
      await clickResetFilters(page);
      await openDatePicker(page, { type: 'end', navigate: ['Previous month'], select: false });
      await page.getByTestId('16/6/2025').click();
      await expect(page.getByRole('textbox', { name: 'Admission End Date' })).toHaveValue('16/6/2025');
    });

    await test.step('END DATE - manual entry overridden by calendar picker', async () => {
      await clickResetFilters(page);
      await page.getByRole('textbox', { name: 'Admission End Date' }).fill('14/6/2025');
      await expect(page.getByRole('textbox', { name: 'Admission End Date' })).toHaveValue('14/6/2025');
      await openDatePicker(page, { type: 'end', select: false });
      await page.getByTestId('21/6/2025').click();
      await expect(page.getByRole('textbox', { name: 'Admission End Date' })).toHaveValue('21/6/2025');
    });

    await test.step('Confirm all sort option radios are visible', async () => {
      await validateSortOptionsVisible(page);
    });

    await test.step('Click each sort option to ensure all work', async () => {
      await cycleThroughSortOptions(page);
    });

    await test.step('Return to first option: Admission Time', async () => {
      await resetToDefaultSort(page);
    });

    await test.step('Valid establishment & date range with possibly no data', async () => {
      await clickResetFilters(page);
      await selectEstablishment(page, 'Lin', 'LINCOLN (HMP)');

      await page.getByRole('textbox', { name: 'Admission Start Date' }).fill('01/01/2009');
      await openDatePicker(page, { type: 'start' });
      await expect(page.getByRole('textbox', { name: 'Admission Start Date' })).toHaveValue('1/1/2009');

      await page.getByRole('textbox', { name: 'Admission End Date' }).fill('15/01/2009');
      await expect(page.getByRole('textbox', { name: 'Admission End Date' })).toHaveValue('15/01/2009');

      await submitReportAndVerify(page, {
        expectOutcome: 'success',
        takeScreenshotOnSuccess: true,
        screenshotPath: 'screenshots/successful-report.png',
        reportHeading: 'ORS Admissions',
        assertPostRender: async () => {
          await page.locator('span', { hasText: 'ORS Admissions' }).click();
          await page.getByRole('heading', { name: 'By Admission Time' }).click();
          await page.getByText('Report details').click();
          await expect(page.getByRole('row', { name: /Name: By Admission Time/i })).toContainText('By Admission Time');
          await expect(page.getByRole('heading', { name: 'ORS Admissions' })).toBeVisible();

          const noDataMessage = page.getByText('No data to display');
          if (await noDataMessage.isVisible()) {
            console.log('Report returned no data');
          } else {
            await expect(page.getByRole('table')).toBeVisible();
          }
        },
      });
    });
  });