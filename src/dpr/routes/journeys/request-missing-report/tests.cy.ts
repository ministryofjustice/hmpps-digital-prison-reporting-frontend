context('Request missing report', () => {
  const path = '/embedded/platform/'

  beforeEach(() => {
    cy.visit(path)
    cy.get('#dpr-reports-catalogue_search_input').type('Missing report')
    cy.get('#dpr-reports-catalogue > tbody > tr:nth-child(19) > td:nth-child(4) > a').click()
  })

  describe('Request form page', () => {
    it('should show the request form page when a report is missing', () => {
      cy.url().should('have.string', 'dpr/request-missing-report/feature-testing/feature-testing-missing-1/form')
      cy.get('#main-content > h1').contains('This report is not yet available')
    })

    it('should show the details of the report being requested', () => {
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
      cy.get('#dpr-form').should('be.visible')
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

    it('should have a text area to add description of usage', () => {
      cy.get('#more-detail').should('exist')
    })

    it('should submit the missing report request', () => {
      cy.intercept({
        method: 'POST',
        url: '/embedded/platform/dpr/request-missing-report/**/**/form',
      }).as('requestSubmit')

      cy.get('#dpr-form-summary--form-submit').click()

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
      cy.get('#dpr-form-summary--form-submit').click()
      cy.url().should(
        'have.string',
        'http://localhost:3010/embedded/platform/dpr/request-missing-report/feature-testing/feature-testing-missing-1/submitted?reportName=Feature%20testing&name=Missing%20Report%201&reportId=feature-testing&variantId=feature-testing-missing-1',
      )
    })
  })

  describe('Submitted page', () => {
    it('should show that the details of the request', () => {
      cy.get('#dpr-form-summary--form-submit').click()
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
