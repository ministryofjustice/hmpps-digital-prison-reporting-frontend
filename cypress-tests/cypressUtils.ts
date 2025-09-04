import { logAccessibilityViolations } from './axeCoreUtils'

export const checkA11y = () => {
  cy.injectAxe()
  cy.checkA11y(undefined, undefined, logAccessibilityViolations)
}
