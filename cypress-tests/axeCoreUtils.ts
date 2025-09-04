import { Result } from 'axe-core'

export const logAccessibilityViolations = (violations: Result[]) => {
  cy.task('logAccessibilityViolationsSummary', `Accessibility violations detected: ${violations.length}`)

  const violationData = violations.map((violation) => ({
    ...violation,
    nodes: violation.nodes.length,
    nodeTargets: violation.nodes.map((node) => node.target).join(' - '),
  }))

  cy.task('logAccessibilityViolationsTable', violationData)
}
