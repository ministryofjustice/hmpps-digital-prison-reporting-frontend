import { setupInteractiveReportStubs, requestInteractiveReport } from './interactive-test-helpers'

context('Interactive report – weird data', () => {
  beforeEach(() => {
    setupInteractiveReportStubs()
    cy.task('stubRequestSuccessResult20WithWeirdData')
    requestInteractiveReport()
  })

  it('shows results correctly with strange input data', () => {
    cy.findAllByRole('table')
      .eq(1)
      .within(() => {
        cy.findAllByRole('row').eq(1).findAllByRole('cell').eq(2).should('have.text', '01/02/03 01:00')

        cy.findAllByRole('row').eq(1).findAllByRole('cell').eq(4).invoke('text').should('equal', '')

        cy.findAllByRole('row')
          .eq(0)
          .within(() => {
            cy.findByRole('link', { name: /Field 1/, hidden: true }).should('exist')
            cy.findByRole('link', { name: /Field 2/, hidden: true }).should('exist')
          })
      })
  })
})
