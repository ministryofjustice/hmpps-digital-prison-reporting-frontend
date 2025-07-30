import { Page, Locator } from '@playwright/test';

class SelectServicePage {
  private readonly page: Page;
  private readonly digitalPrisonServiceLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.digitalPrisonServiceLink = page.locator('#hmpps-digital-prison-services-ui');
  }

  async clickDigitalPrisonServiceLink(): Promise<void> {
    await this.digitalPrisonServiceLink.click();
  }
}

export default SelectServicePage;