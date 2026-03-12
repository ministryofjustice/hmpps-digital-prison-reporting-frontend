import {
  executeReportStubs,
  requestReportByNameAndDescription,
  stubBaseTasks,
} from '../../../../../../../../cypress-tests/cypressUtils'

context('Summary Section', () => {
  const path = '/embedded/platform'

  describe('Viewing a report summary-section report', () => {
    before(() => {
      stubBaseTasks()
      executeReportStubs()
    })

    it('should display a summary section variant', () => {
      cy.task('stubSummarySectionDefinitionRequest')
      cy.task('stubAsyncSummaryReport')
      cy.task('stubResultSuccessResultDifferentValues')

      cy.visit(path)
      requestReportByNameAndDescription({ name: 'Summary-section', description: 'Summary-section template' })
      cy.findByRole('heading', { level: 1, name: /Summary-section/ }).should('be.visible')

      cy.findAllByLabelText(/First: One, Second: A/)
        .eq(0)
        .within(() => {
          cy.findAllByRole('table')
            .should('have.length', 2)
            .each((table) => {
              cy.wrap(table).within(() => {
                cy.findAllByRole('row').should('have.length', 5)
              })
            })
        })

      cy.findAllByLabelText(/First: One, Second: B/)
        .eq(0)
        .within(() => {
          cy.findAllByRole('table')
            .should('have.length', 2)
            .each((table) => {
              cy.wrap(table).within(() => {
                cy.findAllByRole('row').should('have.length', 7)
              })
            })
        })

      cy.findAllByLabelText(/First: Two, Second: A/)
        .eq(0)
        .within(() => {
          cy.findAllByRole('table')
            .should('have.length', 2)
            .each((table) => {
              cy.wrap(table).within(() => {
                cy.findAllByRole('row').should('have.length', 4)
              })
            })
        })

      cy.findAllByLabelText(/First: Two, Second: B/)
        .eq(0)
        .within(() => {
          cy.findAllByRole('table')
            .should('have.length', 2)
            .each((table) => {
              cy.wrap(table).within(() => {
                cy.findAllByRole('row').should('have.length', 8)
              })
            })
        })
    })
  })
})
