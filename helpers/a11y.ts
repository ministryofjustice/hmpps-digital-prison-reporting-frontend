// helpers/a11y.ts
import { Page } from '@playwright/test';
import { injectAxe, checkA11y } from '@axe-core/playwright';

type A11yOptions = {
  selector?: string | null;
  contextName?: string;
};

export async function runA11yScan(
  page: Page,
  { selector = null, contextName = 'Full Page' }: A11yOptions = {}
) {
  await injectAxe(page);
  await checkA11y(page, selector, {
    detailedReport: true,
    detailedReportOptions: { html: true },
    axeOptions: {
      // Optional: Limit to WCAG2AA, skip rules, etc.
      runOnly: ['wcag2aa'],
    },
  });
  console.log(`✅ Accessibility scan passed for: ${contextName}`);
}