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
      cy.findByLabelText(/Enable download/)
        .should('exist')
        .should('be.visible')
      cy.findByRole('heading', { name: 'To download this report' }).should('not.exist')
    })

    it('should show the download disabled message with link to form', () => {
      cy.findByLabelText(/Enable download/).click()
      cy.url().should('have.string', '/report/download-disabled')
      cy.findByRole('heading', { name: 'To download this report' }).should('be.visible')
      cy.findByRole('link', { name: 'Fill out a form' })
    })

    it('should go to the request download form', () => {
      cy.findByLabelText(/Enable download/).click()
      cy.findByRole('link', { name: 'Fill out a form' }).click()

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
      cy.findByRole('textbox', { name: 'What is your Full name?' }).should('have.value', 'Test User')
      cy.findByRole('textbox', { name: 'What is your Email address?' }).should('have.value', 'test@user.com')
    })

    it('should validate the required fields', () => {
      cy.visit(downloadRequestFormPage)
      cy.findByRole('alert').should('not.exist')

      cy.findAllByRole('paragraph').contains('Enter your Job title').should('not.exist')
      cy.findAllByRole('paragraph').contains('provide information on how you will use this data').should('not.exist')
      cy.get('#more-detail-error').should('not.be.visible')

      cy.findByRole('button', { name: /Submit request/ }).click()

      cy.findByRole('alert').should('exist')
      cy.findAllByRole('paragraph').contains('Enter your Job title').should('exist')
      cy.findAllByRole('paragraph').contains('provide information on how you will use this data').should('exist')
    })

    it('should submit the download request', () => {
      cy.visit(downloadRequestFormPage)
      cy.findByRole('textbox', { name: 'What is your Job title?' }).type('Software engineer')
      cy.findByRole('textbox', { name: 'Can you provide more detail' }).type('I like this report')

      cy.intercept({
        method: 'POST',
        url: '/embedded/platform/dpr/download-report/request-download/**/**/tableId/**',
      }).as('requestDownload')

      cy.findByRole('button', { name: 'Submit request' }).click()

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
      cy.findAllByRole('paragraph').contains('Request examples - Successful Report').should('exist')
    })
  })

  describe('Download', () => {
    it('should show the enabled download button', () => {
      cy.findByLabelText(/download/).should('exist')
    })

    it('should post the correct data to prepare the download', () => {
      cy.intercept({
        method: 'POST',
        url: '/embedded/platform/dpr/download-report/',
      }).as('downloadReport')

      cy.findByLabelText(/download/).click()

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
