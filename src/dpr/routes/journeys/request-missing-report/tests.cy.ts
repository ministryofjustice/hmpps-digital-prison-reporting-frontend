context('Request missing report', () => {
  const path = '/embedded/platform/'

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSubmitMissingRequest')
    cy.task('stubGetDefinition')
    cy.visit(path)
    cy.findByRole('textbox', { name: 'Filter by key word' }).type('Missing report')

    cy.findByLabelText(/Reports catalogue.*/i).within(() => {
      cy.findByRole('row', {
        name: /Missing Report 1/,
      }).within(() => {
        cy.findByRole('link', { name: 'Request report' }).click()
      })
    })
  })

  describe('Request form page', () => {
    it('should show the request form page when a report is missing', () => {
      cy.url().should('have.string', 'dpr/request-missing-report/feature-testing/feature-testing-missing-1/form')
      cy.findByRole('heading', { name: 'This report is not yet available' }).should('exist')
    })

    it('should show the details of the report being requested', () => {
      cy.findByRole('group').contains('Report details').click()
      cy.findAllByRole('cell', { name: 'Name:' }).should('exist')
      cy.findAllByRole('cell', { name: 'Missing Report 1' }).should('exist')
      cy.findAllByRole('cell', { name: 'Product:' }).should('exist')
      cy.findAllByRole('cell', { name: 'Feature testing' }).should('exist')
      cy.findAllByRole('cell', { name: 'Description:' }).should('exist')
      cy.findAllByRole('cell', { name: 'Description for missing report 1' }).should('exist')
    })

    it('should show the request form', () => {
      cy.findByRole('heading', { name: 'Request this report' }).should('be.visible')
      cy.findByRole('textbox', { name: 'Why do you need this report? (Optional)' }).should('be.visible')
    })

    it('should submit the missing report request', () => {
      cy.intercept({
        method: 'POST',
        url: '/embedded/platform/dpr/request-missing-report/**/**/form',
      }).as('requestSubmit')

      cy.findByRole('button', { name: /Submit/ }).click()

      cy.wait('@requestSubmit')
        .its('request')
        .then((request) => {
          cy.wrap(request).its('body').should('include', 'reportId=feature-testing')
          cy.wrap(request).its('body').should('include', 'variantId=feature-testing-missing-1')
          cy.wrap(request).its('body').should('include', 'reportName=Feature+testing')
          cy.wrap(request).its('body').should('include', 'variantName=Missing+Report+1')
          cy.wrap(request).its('body').should('include', 'staffId')
        })
    })

    it('should go to the submitted page when', () => {
      cy.findByRole('button', { name: /Submit/ }).click()
      cy.url().should(
        'have.string',
        'http://localhost:3010/embedded/platform/dpr/request-missing-report/feature-testing/feature-testing-missing-1/submitted?reportName=Feature%20testing&name=Missing%20Report%201&reportId=feature-testing&variantId=feature-testing-missing-1',
      )
    })
  })

  describe('Submitted page', () => {
    it('should show that the details of the request', () => {
      cy.findByRole('button', { name: /Submit/ }).click()
      cy.findByRole('group').contains('Request details').click()
      cy.findAllByRole('cell', { name: 'Name:' }).should('exist')
      cy.findAllByRole('cell', { name: 'Missing Report 1' }).should('exist')
      cy.findAllByRole('cell', { name: 'Product:' }).should('exist')
      cy.findAllByRole('cell', { name: 'Feature testing' }).should('exist')
    })
  })
})
