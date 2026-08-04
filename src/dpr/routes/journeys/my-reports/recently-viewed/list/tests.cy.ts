import { executeReportStubs, startReportRequest } from '../../../../../../../cypress-tests/cypressUtils'

context('Recently viewed list', () => {
  const path = '/embedded/platform'

  beforeEach(() => {
    executeReportStubs()
    cy.task('stubDefinitionRequestExamplesSuccess')
    cy.task('stubDefinitionFeatureTestingInteractive')
    cy.task('stubRequestSuccessResult20')
    cy.visit(path)
  })

  it('should ensure it most the most recently viewed at the top of the list, even when its a duplicate run', () => {
    startReportRequest({ name: 'Successful Report', description: 'this will succeed' })
    cy.findByRole('button', { name: 'Request report' }).click()
    cy.findByRole('button', { name: /Enable download/ }).should('be.visible')

    cy.visit(path)
    startReportRequest({ name: 'Interactive Report', description: 'this is an interactive report' })
    cy.findByRole('button', { name: 'Request report' }).click()
    cy.findByRole('button', { name: /Enable download/ }).should('be.visible')

    cy.visit(path)
    cy.findByRole('tab', { name: /Viewed/ }).click()
    cy.findByLabelText(/Viewed/i).within(() => {
      cy.findByRole('heading', {
        name: 'Interactive Report',
        level: 2,
      }).should('exist')
    })

    startReportRequest({ name: 'Successful Report', description: 'this will succeed' })
    cy.findByRole('button', { name: 'Request report' }).click()
    cy.findByRole('button', { name: /Enable download/ }).should('be.visible')

    cy.visit(path)
    cy.findByRole('tab', { name: /Viewed/ }).click()
    cy.findByLabelText(/Viewed \(2\)/i).within(() => {
      cy.findByRole('heading', {
        name: 'Successful Report',
        level: 2,
      }).should('exist')
    })
  })
})
