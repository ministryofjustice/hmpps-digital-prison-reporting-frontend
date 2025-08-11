context('Embedded platform home', () => {
  const path = '/embedded/platform/'
  const successfulRequestUrlSelector =
    '#dpr-reports-catalogue > tbody > tr > td > a[href="dpr/request-report/report/request-examples/request-example-success/filters"]'
  const failedRequestUrlSelector =
    '#dpr-reports-catalogue > tbody > tr > td > a[href="dpr/request-report/report/request-examples/request-example-fail-code/filters"]'
  const expiredRequestUrlSelector =
    '#dpr-reports-catalogue > tbody > tr > td > a[href="dpr/request-report/report/request-examples/request-example-expire/filters"]'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Requesting a report', () => {
    beforeEach(() => {
      cy.visit(path)
    })

    const checkStatuses = () => {
      cy.wait(500)
      cy.get('#async-request-polling-status > p:nth-child(1) > .govuk-tag').contains('SUBMITTED')
      cy.wait(1000)
      cy.get('#async-request-polling-status > p:nth-child(1) > .govuk-tag').contains('PICKED')
      cy.wait(1000)
      cy.get('#async-request-polling-status > p:nth-child(1) > .govuk-tag').contains('STARTED')
      cy.wait(1000)
    }

    describe('Successful request', () => {
      it('should succesfully request and load a report', () => {
        cy.get(successfulRequestUrlSelector).click()
        cy.url().should(
          'have.string',
          '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters',
        )
        cy.location().should((location) => {
          expect(location.search).to.contain(`filters.field1=value1.2`)
          expect(location.search).to.contain(`filters.field3.start=2003-02-0`)
          expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
          expect(location.search).to.contain(`filters.field7=2005-02-01`)
          expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
          expect(location.search).to.contain(`sortColumn=field1&sortedAsc=false`)
        })
        cy.get('#async-request-report-button').click()
        cy.url().should(
          'match',
          /http:\/\/localhost:3010\/embedded\/platform\/dpr\/request-report\/report\/request-examples\/request-example-success\/(.*)\/status/i,
        )
        checkStatuses()
        cy.url().should(
          'match',
          /http:\/\/localhost:3010\/embedded\/platform\/dpr\/view-report\/async\/report\/request-examples\/request-example-success\/(.*)\/report/i,
        )
        cy.location().should((location) => {
          expect(location.search).to.contain(
            `columns=field1&columns=field2&columns=field3&columns=field6&columns=field7`,
          )
        })
      })

      it('should redirect the old request url to the new one', () => {
        const oldPath = '/embedded/platform/async/report/request-examples/request-example-success/request'
        cy.visit(oldPath)
        cy.url().should(
          'have.string',
          '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters',
        )
        cy.location().should((location) => {
          expect(location.search).to.contain(`filters.field1=value1.2`)
          expect(location.search).to.contain(`filters.field3.start=2003-02-0`)
          expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
          expect(location.search).to.contain(`filters.field7=2005-02-01`)
          expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
          expect(location.search).to.contain(`sortColumn=field1&sortedAsc=false`)
        })
      })
    })

    describe('Failed request', () => {
      let failedRequestUrl: string
      let executionId: string

      it('should show an error page for a failed request', () => {
        cy.get(failedRequestUrlSelector).click()
        cy.url().should(
          'have.string',
          '/embedded/platform/dpr/request-report/report/request-examples/request-example-fail-code/filters',
        )
        cy.location().should((location) => {
          expect(location.search).to.contain(`filters.field1=value1.1`)
          expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
          expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
          expect(location.search).to.contain(`sortColumn=field1&sortedAsc=false`)
        })

        cy.get('#async-request-report-button').click()
        cy.url().should(
          'match',
          /http:\/\/localhost:3010\/embedded\/platform\/dpr\/request-report\/report\/request-examples\/request-example-fail-code\/(.*)\/status/i,
        )

        cy.wait(500)
        cy.get('#async-request-polling-status > p:nth-child(1) > .govuk-tag').contains('SUBMITTED')
        cy.wait(1000)
        cy.get('#async-request-polling-status > p:nth-child(1) > .govuk-tag').contains('PICKED')
        cy.wait(1000)
        cy.get('#async-request-polling-status > p:nth-child(1) > .govuk-tag').contains('FAILED')

        cy.get('#async-request-polling-status > div.govuk-error-summary').should('be.visible')
        cy.get('#retry-async-request').should('be.visible')

        cy.url().then((url) => {
          failedRequestUrl = url
          const urlArr = url.split('/')
          executionId = urlArr[urlArr.length - 2]
        })
      })

      it('should show the full error', () => {
        cy.visit(failedRequestUrl)
        cy.get('#request-error_full-error').should('be.visible')
      })

      it('should show the request details', () => {
        cy.visit(failedRequestUrl)
        cy.get('#request-error_request-details > ul > li:nth-child(1)').contains('Report ID: request-examples')
        cy.get('#request-error_request-details > ul > li:nth-child(2)').contains(`Execution ID: ${executionId}`)
        cy.get('#request-error_request-details > ul > li:nth-child(3)').contains('Table ID: tblId_')
      })

      it('should go to filters page on retry', () => {
        cy.visit(failedRequestUrl)
        cy.get('#retry-async-request').click()
        cy.url().should(
          'have.string',
          '/embedded/platform/dpr/request-report/report/request-examples/request-example-fail-code/filters',
        )
        cy.location().should((location) => {
          expect(location.search).to.contain(`filters.field1=value1.1`)
          expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
          expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
          expect(location.search).to.contain(`sortColumn=field1&sortedAsc=false`)
        })
      })

      it('should show the correct link in the user reports list', () => {
        cy.get('#tab_requested-reports-tab').click()
        cy.get(`a[href="${failedRequestUrl}"`).contains('Retry')
        cy.get(`a[data-execution-id="${executionId}"]`).contains('Remove')
      })

      it('should go to filters page when clicking retry in the user catalogue', () => {
        cy.get('#tab_requested-reports-tab').click()
        cy.get(`a[href="${failedRequestUrl}"`).click()
        cy.url().should('have.string', failedRequestUrl)
      })

      it('should show the correct status', () => {
        cy.get('#tab_requested-reports-tab').click()
        cy.get(`a[data-execution-id="${executionId}"]`).parents('.govuk-table__row').contains('Fail with Status Error')
        cy.get(`a[data-execution-id="${executionId}"]`).parents('.govuk-table__row').contains('FAILED')
      })

      it('should redirect the old status url to the new one', () => {
        const oldPath = `/embedded/platform/async/report/request-examples/request-example-fail-code/request/${executionId}`
        cy.visit(oldPath)
        cy.url().should(
          'have.string',
          `/embedded/platform/dpr/request-report/report/request-examples/request-example-fail-code/${executionId}/status`,
        )
      })

      it('should remove the item from the list by clicking remove', () => {
        cy.get('#tab_requested-reports-tab').click()
        cy.get(`a[data-execution-id="${executionId}"]`).click()
        cy.get(`a[data-execution-id="${executionId}"]`).should('not.exist')
      })
    })

    describe('Aborted request', () => {
      let executionId: string
      const filtersHref =
        'http://localhost:3010/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters?filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3&sortColumn=field1&sortedAsc=false'

      it('should show the abort the request', () => {
        cy.get(successfulRequestUrlSelector).click()
        cy.url().should(
          'have.string',
          '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters',
        )
        cy.get('#async-request-report-button').click()

        cy.url().should(
          'match',
          /http:\/\/localhost:3010\/embedded\/platform\/dpr\/request-report\/report\/request-examples\/request-example-success\/(.*)\/status/i,
        )

        cy.url().then((url) => {
          const urlArr = url.split('/')
          executionId = urlArr[urlArr.length - 2]
        })

        cy.get('#cancel-async-request').click()
        cy.get('#async-request-polling-status > p:nth-child(1) > .govuk-tag').contains('ABORTED')
        cy.get('#retry-async-request').contains('Return to request page')

        cy.get('#retry-async-request').click()
        cy.url().should(
          'have.string',
          '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters',
        )
      })

      it('should show the correct link in the user reports list', () => {
        cy.get('#tab_requested-reports-tab').click()
        cy.get(`a[href="${filtersHref}"]`).contains('Retry')
        cy.get(`a[data-execution-id="${executionId}"]`).contains('Remove')
      })

      it('should go to filters page when clicking retry in the user catalogue', () => {
        cy.get('#tab_requested-reports-tab').click()
        cy.get(`a[href="${filtersHref}"`).click()
        cy.url().should('have.string', filtersHref)
      })

      it('should show the correct status', () => {
        cy.get('#tab_requested-reports-tab').click()
        cy.get(`a[data-execution-id="${executionId}"]`).parents('.govuk-table__row').contains('Successful Report')
        cy.get(`a[data-execution-id="${executionId}"]`).parents('.govuk-table__row').contains('ABORTED')
      })

      it('should remove the item from the list by clicking remove', () => {
        cy.get('#tab_requested-reports-tab').click()
        cy.get(`a[data-execution-id="${executionId}"]`).click()
        cy.get(`a[data-execution-id="${executionId}"]`).should('not.exist')
      })
    })

    describe('Expired request', () => {
      let expiredExecutionId: string
      const filtersHref =
        'http://localhost:3010/embedded/platform/dpr/request-report/report/request-examples/request-example-expire/filters?filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=false'

      it('should setup an expired report', () => {
        cy.get(expiredRequestUrlSelector).click()
        cy.get('#async-request-report-button').click()

        cy.url().should(
          'match',
          /http:\/\/localhost:3010\/embedded\/platform\/dpr\/request-report\/report\/request-examples\/request-example-expire\/(.*)\/status/i,
        )
        cy.url().then((url) => {
          const urlArr = url.split('/')
          expiredExecutionId = urlArr[urlArr.length - 2]
        })

        checkStatuses()
        cy.url().should(
          'match',
          /http:\/\/localhost:3010\/embedded\/platform\/dpr\/view-report\/async\/report\/request-examples\/request-example-expire\/(.*)\/report/i,
        )
      })

      it('should show the correct expired links in the user reports list', () => {
        cy.visit(path)
        cy.get('#tab_recently-viewed-tab').click()

        cy.reload().reload().reload()

        cy.get(`a[href="${filtersHref}"`).contains('Refresh')
        cy.get(`a[data-execution-id="${expiredExecutionId}"]`).contains('Remove')
      })

      it('should go to filters page when clicking retry in the user catalogue', () => {
        cy.get('#tab_recently-viewed-tab').click()
      })

      it('should show the correct status', () => {
        cy.get('#tab_recently-viewed-tab').click()
        cy.get(`a[data-execution-id="${expiredExecutionId}"]`).parents('.govuk-table__row').contains('Expiring report')
        cy.get(`a[data-execution-id="${expiredExecutionId}"]`).parents('.govuk-table__row').contains('EXPIRED')
      })

      it('should remove the item from the list by clicking remove', () => {
        cy.get('#tab_recently-viewed-tab').click()
        cy.get(`a[data-execution-id="${expiredExecutionId}"]`).click()
        cy.get(`a[data-execution-id="${expiredExecutionId}"]`).should('not.exist')
      })
    })
  })
})
