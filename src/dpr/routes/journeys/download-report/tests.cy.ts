context('Download report', () => {
  const path =
    '/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/tblId_1729766362362/report'
  let downloadRequestFormPage: string
  let downloadRequestSubmittedPage: string

  beforeEach(() => {
    cy.visit(path)
  })

  describe('Enabling download', () => {
    it('should show the enable download button', () => {
      cy.get('#dpr-button-downloadable').contains('Enable download')
      cy.get('#dpr-download-message > article > section').should('not.be.visible')
    })

    it('should show the download disabled message with link to form', () => {
      cy.get('#dpr-button-downloadable').contains('Enable download').click()
      cy.url().should('have.string', '/report/download-disabled')
      cy.get('#dpr-download-message > article > section').should('be.visible')
      cy.get('#dpr-download-message > article > section > p:nth-child(2) > a').should('be.visible')
    })

    it('should go to the request download form', () => {
      cy.get('#dpr-button-downloadable').click()
      cy.get('#dpr-download-message > article > section > p:nth-child(2) > a').click()

      cy.url().then((url) => {
        downloadRequestFormPage = url
      })

      cy.url().should(
        'have.string',
        '/embedded/platform/dpr/download-report/request-download/request-examples/request-example-success/tableId/tblId_1729766362362/form',
      )
      cy.location().should((location) => {
        expect(location.search).to.contain(
          `reportUrl=/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/tblId_1729766362362/report`,
        )
      })
    })
  })

  describe('Requesting download', () => {
    it('should prefill the user data in the request form', () => {
      cy.visit(downloadRequestFormPage)
      cy.get('#name').should('have.value', 'Test User')
      cy.get('#email').should('have.value', 'test@user.com')
    })

    it('should validate the required fields', () => {
      cy.visit(downloadRequestFormPage)
      cy.get('#more-detail-error').should('not.be.visible')
      cy.get('#role-error').should('not.be.visible')
      cy.get('#dpr-form-summary--error-summary > div').should('not.be.visible')

      cy.get('#dpr-form-summary--form-submit').click()

      cy.get('#dpr-form-summary--error-summary > div').should('be.visible')
      cy.get('#more-detail-error').should('be.visible')
      cy.get('#role-error').should('be.visible')
    })

    it('should submit the download request', () => {
      cy.visit(downloadRequestFormPage)
      cy.get('#role').type('Software engineer')
      cy.get('#more-detail').type('I like this report')

      cy.intercept({
        method: 'POST',
        url: '/embedded/platform/dpr/download-report/request-download/**/**/tableId/**',
      }).as('requestDownload')

      cy.get('#dpr-form-summary--form-submit').click()

      cy.wait('@requestDownload')
        .its('request')
        .then((request) => {
          cy.wrap(request).its('body').should('have.string', '_csrf=csrfToken')
          cy.wrap(request).its('body').should('have.string', 'reportId=request-examples')
          cy.wrap(request).its('body').should('have.string', 'reportName=Request+examples')
          cy.wrap(request).its('body').should('have.string', 'variantName=Successful+Report')
          cy.wrap(request).its('body').should('have.string', 'tableId=tblId_1729766362362')
          cy.wrap(request).its('body').should('have.string', 'variantId=request-example-success')
          cy.wrap(request).its('body').should('have.string', 'activeCaseLoadId=KMI')
          cy.wrap(request).its('body').should('have.string', 'role=Software+engineer')
          cy.wrap(request).its('body').should('have.string', 'moreDetail=I+like+this+report')
        })

      cy.url().then((url) => {
        downloadRequestSubmittedPage = url
      })

      cy.url().should(
        'have.string',
        '/dpr/download-report/request-download/request-examples/request-example-success/tableId/tblId_1729766362362/form/submitted',
      )
    })
  })

  describe('Request download submitted', () => {
    it('should show the report details', () => {
      cy.visit(downloadRequestSubmittedPage)
      cy.get('.download-success-panel > :nth-child(3)').contains('Request examples - Successful Report')
    })
  })

  describe('Download', () => {
    it('should show the enabled download button', () => {
      cy.get('#dpr-button-downloadable').contains('Download')
    })

    it('should post the correct data to prepare the download', () => {
      cy.intercept({
        method: 'POST',
        url: '/embedded/platform/dpr/download-report/',
      }).as('downloadReport')

      cy.get('#dpr-button-downloadable').click()

      cy.wait('@downloadReport')
        .its('request')
        .then((request) => {
          cy.wrap(request).its('body').should('have.string', '_csrf=csrfToken')
          cy.wrap(request).its('body').should('have.string', 'reportId=request-examples')
          cy.wrap(request).its('body').should('have.string', 'id=request-example-success')
          cy.wrap(request).its('body').should('have.string', 'tableId=tblId_1729766362362')
          cy.wrap(request).its('body').should('have.string', 'reportName=Request+examples')
          cy.wrap(request).its('body').should('have.string', 'cols=')
          cy.wrap(request).its('body').should('have.string', 'field1')
          cy.wrap(request).its('body').should('have.string', 'field2')
          cy.wrap(request).its('body').should('have.string', 'field3')
          cy.wrap(request).its('body').should('have.string', 'field6')
          cy.wrap(request).its('body').should('have.string', 'field7')
        })
    })
  })
})
