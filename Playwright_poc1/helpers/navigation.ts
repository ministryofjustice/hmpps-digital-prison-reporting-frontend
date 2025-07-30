import SignInPage from '../pages/SignInPage';
import WelcomePage from '../pages/WelcomePage';
import SelectServicePage from '../pages/SelectService';

export async function loginAndNavigateToReporting(page,
  {
    username = 'default-username',
    password = 'default-password',
  }: { username?: string; password?: string } = {}
) {
  const signInPage = new SignInPage(page);
  await signInPage.goto('dev');
  await signInPage.enterUserName(username);
  await signInPage.enterPassword(password);
  await signInPage.clickSignInButton();

  const selectServicePage = new SelectServicePage(page);
  await selectServicePage.clickDigitalPrisonServiceLink();

  const welcomePage = new WelcomePage(page);
  await welcomePage.clickReportingLink();
}
