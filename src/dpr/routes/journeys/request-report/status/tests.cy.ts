context('Request status', () => {
  const path = '/embedded/platform/'
  const successfulRequestUrlSelector =
    '#dpr-reports-catalogue > tbody > tr > td > a[href="dpr/request-report/report/request-examples/request-example-success/filters"]'

  beforeEach(() => {
    cy.visit(path)
    cy.get(successfulRequestUrlSelector).click()
  })

  it('is accessible', () => {
    cy.get('#async-request-report-button').click()
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('post request', () => {
    let executionId = ''

    it('should post to the status endpoint with the correct params', () => {
      let requestStatusCall = 0
      cy.intercept('POST', '/embedded/platform/dpr/request-report/report/**/**/**/status', (req) => {
        requestStatusCall += 1
        req.alias = `requestStatus${requestStatusCall}`
        req.continue()
      })

      cy.get('#async-request-report-button').click()

      cy.url().then((url) => {
        const urlArr = url.split('/')
        executionId = urlArr[urlArr.length - 2]
      })

      cy.wait('@requestStatus1')
        .its('request')
        .then((request) => {
          expect(request.body).to.have.property('id', 'request-example-success')
          expect(request.body).to.have.property('reportId', 'request-examples')
          expect(request.body).to.have.property('executionId', executionId)
          expect(request.body).to.have.property('type', 'report')
          expect(request.body).to.have.property('tableId')
          expect(request.body).to.have.property('status', 'SUBMITTED')
        })

      cy.wait('@requestStatus2')
        .its('request')
        .then((request) => {
          expect(request.body).to.have.property('id', 'request-example-success')
          expect(request.body).to.have.property('reportId', 'request-examples')
          expect(request.body).to.have.property('executionId', executionId)
          expect(request.body).to.have.property('type', 'report')
          expect(request.body).to.have.property('tableId')
          expect(request.body).to.have.property('status', 'PICKED')
        })

      cy.wait('@requestStatus3')
        .its('request')
        .then((request) => {
          expect(request.body).to.have.property('id', 'request-example-success')
          expect(request.body).to.have.property('reportId', 'request-examples')
          expect(request.body).to.have.property('executionId', executionId)
          expect(request.body).to.have.property('type', 'report')
          expect(request.body).to.have.property('tableId')
          expect(request.body).to.have.property('status', 'STARTED')
        })
    })
  })
})
