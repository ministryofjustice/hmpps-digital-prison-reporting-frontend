context('Request missing report', () => {
  const path = '/embedded/platform/'

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSubmitMissingRequest')
    cy.task('stubGetDefinition')
    cy.visit(path)
    cy.findByRole('textbox', { name: 'Filter by key word' }).type('Missing report')
    cy.get('#dpr-reports-catalogue > tbody > tr:nth-child(19) > td:nth-child(4) > a').click()
  })

  describe('Request form page', () => {
    it('should show the request form page when a report is missing', () => {
      cy.url().should('have.string', 'dpr/request-missing-report/feature-testing/feature-testing-missing-1/form')
      cy.findByRole('heading', { name: 'This report is not yet available' }).should('exist')
    })

    it('should show the details of the report being requested', () => {
      cy.findByRole('group').contains('Report details').click()
      cy.get('#main-content > details > div > div > table > tbody > tr').each((row, index) => {
        const td1 = 'td:nth-child(1) > p'
        const td2 = 'td:nth-child(2)'
        switch (index) {
          case 0:
            cy.wrap(row).find(td1).contains('Name')
            cy.wrap(row).find(td2).contains('Missing Report 1')
            break
          case 1:
            cy.wrap(row).find(td1).contains('Product')
            cy.wrap(row).find(td2).contains('Feature testing')
            break
          case 2:
            cy.wrap(row).find(td1).contains('Description')
            cy.wrap(row).find(td2).contains('Description for missing report 1')
            break
          default:
            break
        }
      })
    })

    it('should show the request form', () => {
      cy.findByRole('heading', { name: 'Request this report' }).should('be.visible')
      cy.findByRole('textbox', { name: 'Why do you need this report? (Optional)' }).should('be.visible')
    })

    it('should have the report data in the form', () => {
      cy.get('#dpr-form > input[name="reportId"]').should('exist').should('have.value', 'feature-testing')
      cy.get('#dpr-form > input[name="reportName"]').should('exist').should('have.value', 'Feature testing')
      cy.get('#dpr-form > input[name="variantId"]').should('exist').should('have.value', 'feature-testing-missing-1')
      cy.get('#dpr-form > input[name="variantName"]').should('exist').should('have.value', 'Missing Report 1')
    })

    it('should have the staff ID in the form', () => {
      cy.get('#dpr-form > input[name="staffId"]').should('exist')
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
          cy.wrap(request).its('body').should('include', 'reportId')
          cy.wrap(request).its('body').should('include', 'variantId')
          cy.wrap(request).its('body').should('include', 'reportName')
          cy.wrap(request).its('body').should('include', 'variantName')
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
      cy.get('#main-content > details > summary').click()
      cy.get('#main-content > details > div > div > table > tbody > tr').each((row, index) => {
        const td1 = 'td:nth-child(1) > p'
        const td2 = 'td:nth-child(2)'
        switch (index) {
          case 0:
            cy.wrap(row).find(td1).contains('Name')
            cy.wrap(row).find(td2).contains('Missing Report 1')
            break
          case 1:
            cy.wrap(row).find(td1).contains('Product')
            cy.wrap(row).find(td2).contains('Feature testing')
            break
          default:
            break
        }
      })
    })
  })
})
