class SignInPage {
  private readonly page: import('@playwright/test').Page;
  private readonly userNameBox;
  private readonly passwordBox;
  private readonly signInButton;

  constructor(page: import('@playwright/test').Page) {
    this.page = page;
    this.userNameBox = page.locator('#username');
    this.passwordBox = page.locator('#password');
    this.signInButton = page.locator('#submit');
  }

  /**
   * Navigates to the sign-in page
   * @param env - Choose between 'dev' or 'test'
   */
  async goto(env: 'dev' | 'test' = 'dev'): Promise<void> {
    const urls = {
      dev: 'https://sign-in-dev.hmpps.service.justice.gov.uk/auth/sign-in?redirect_uri=https://digital-prison-reporting-mi-ui-dev.hmpps.service.justice.gov.uk/sign-in/callbackL',
      test: 'INSERT TEST URL HERE',
    };

    await this.page.goto(urls[env]);
  }

  async enterUserName(name: string): Promise<void> {
    await this.userNameBox.fill(name);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordBox.fill(password);
  }

  async clickSignInButton(): Promise<void> {
    await this.signInButton.click();
  }
}

export default SignInPage;