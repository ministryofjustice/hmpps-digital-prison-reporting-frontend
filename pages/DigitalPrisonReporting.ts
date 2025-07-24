import { Page, Locator } from '@playwright/test';

class DigitalPrisonReportingPage {
  readonly page: Page;
  readonly filterReportsBox: Locator;
  readonly orsAdmissionsByAdmissionsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterReportsBox = page.locator('#search');

    // Locator for the second link in the row with specific text
    this.orsAdmissionsByAdmissionsLink = page.locator(
      'tr:has-text("ORS Admissions By Admission") a:nth-of-type(2)'
    );
  }

  async enterSearchTerm(text: string): Promise<void> {
    await this.filterReportsBox.fill(text);
  }

  async clickOrsAdmissionsByTimeReport(): Promise<void> {
    await this.orsAdmissionsByAdmissionsLink.click();
  }
}

export default DigitalPrisonReportingPage;
