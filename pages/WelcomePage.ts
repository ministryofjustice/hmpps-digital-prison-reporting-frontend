import { Page, Locator } from '@playwright/test';

class WelcomePage {
  private readonly page: Page;
  private readonly reportingLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.reportingLink = page.locator(
      '//a[@class="govuk-link govuk-!-font-weight-bold govuk-link--no-visited-state"][normalize-space()="Reporting"]'
    );
  }

  async clickReportingLink(): Promise<void> {
    await this.reportingLink.click();
  }
}

export default WelcomePage;