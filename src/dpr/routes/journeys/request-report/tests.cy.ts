context('Requesting a report', () => {
  const path = '/embedded/platform/'

  const checkStatuses = () => {
    cy.task('stubReportsSubmittedStatus')
    cy.findByRole('strong').contains('SUBMITTED')
    cy.task('stubReportsPickedStatus')
    cy.findByRole('strong').contains('PICKED')
    cy.task('stubReportsStartedStatus')
    cy.findByRole('strong').contains('STARTED')
    cy.task('stubReportsFinishedStatus')
  }

  describe('Successful request', () => {
    beforeEach(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubViewAsyncReportingResults')
      cy.task('stubReportsFinishedStatus')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubRequestSuccessReportTablesCount')
      cy.visit(path)
    })

    it('should succesfully request and load a report', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              element.textContent.includes('Successful Report') && element.textContent.includes('this will succeed')
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
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

      cy.findByRole('button', { name: 'Request report' }).click()
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
        expect(location.search).to.contain(`columns=field1&columns=field2&columns=field3&columns=field6&columns=field7`)
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
    beforeEach(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubViewAsyncReportingResults')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubRequestSuccessReportTablesCount')
      cy.visit(path)
    })

    const testFilterPersistence = () => {
      cy.task('stubReportsFailedStatus')
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              element.textContent.includes('Successful Report') && element.textContent.includes('this will succeed')
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('group', { name: /Field 1/ })
        .findByRole('radio', { checked: true })
        .invoke('val')
        .as('field1')
      cy.findByRole('combobox', { name: /Field 2/ })
        .invoke('val')
        .as('field2')
      cy.findByRole('group', { name: /Field 3/ }).within(() => {
        cy.findByRole('textbox', { name: /From/ }).invoke('val').as('field3From')
        cy.findByRole('textbox', { name: /To/ }).invoke('val').as('field3To')
      })
      cy.findByRole('combobox', { name: /Field 4/ })
        .invoke('val')
        .as('field4')
      cy.findByRole('combobox', { name: /Field 5/ })
        .invoke('val')
        .as('field5')
      cy.findByRole('textbox', { name: /Field 6/ })
        .invoke('val')
        .as('field6')
      cy.findByRole('textbox', { name: /Field 7/ })
        .invoke('val')
        .as('field7')
      cy.findByRole('group', { name: /Field 8/ }).within(() => {
        cy.findAllByRole('checkbox').each((el, idx) => {
          cy.wrap(el).invoke('val').as(`field8-${idx}`)
        })
      })
      cy.findByRole('button', { name: 'Request report' }).click()
      cy.findByRole('button', { name: 'Retry' }).click()

      cy.findByRole('group', { name: /Field 1/ })
        .findByRole('radio', { checked: true })
        .invoke('val')
        .then((val) => {
          cy.get('@field1').should('equal', val)
        })
      cy.findByRole('combobox', { name: /Field 2/ })
        .invoke('val')
        .then((val) => {
          cy.get('@field2').should('equal', val)
        })
      cy.findByRole('group', { name: /Field 3/ }).within(() => {
        cy.findByRole('textbox', { name: /From/ })
          .invoke('val')
          .then((val) => {
            cy.get('@field3From').should('equal', val)
          })
        cy.findByRole('textbox', { name: /To/ })
          .invoke('val')
          .then((val) => {
            cy.get('@field3To').should('equal', val)
          })
      })
      cy.findByRole('combobox', { name: /Field 4/ })
        .invoke('val')
        .then((val) => {
          cy.get('@field4').should('equal', val)
        })
      cy.findByRole('combobox', { name: /Field 5/ })
        .invoke('val')
        .then((val) => {
          cy.get('@field5').should('equal', val)
        })
      cy.findByRole('textbox', { name: /Field 6/ })
        .invoke('val')
        .then((val) => {
          cy.get('@field6').should('equal', val)
        })
      cy.findByRole('textbox', { name: /Field 7/ })
        .invoke('val')
        .then((val) => {
          cy.get('@field7').should('equal', val)
        })
      cy.findByRole('group', { name: /Field 8/ }).within(() => {
        cy.findAllByRole('checkbox').each((el, idx) => {
          cy.wrap(el)
            .invoke('val')
            .then((val) => {
              cy.get(`@field8-${idx}`).should('equal', val)
            })
        })
      })
    }

    const testCorrectLinksRetryFailure = () => {
      cy.visit(path)
      cy.findByRole('tab', { name: /Requested/ }).click()

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Retry' }).should('be.visible')
          cy.findByRole('link', { name: 'Remove' }).should('be.visible')
          cy.findByRole('cell', { name: 'FAILED' }).should('be.visible')
        })
      })
      cy.findByRole('link', { name: 'Retry' }).click()
      cy.findByText(/Your report has failed to generate/).should('be.visible')
      cy.findByText(/Successful Report/).should('be.visible')

      cy.visit(path)
      cy.findByRole('tab', { name: /Requested/ }).click()
      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Retry' }).click()
        })
      })
      cy.findByText(/Your report has failed to generate/).should('be.visible')
      cy.findByText(/Successful Report/).should('be.visible')
    }
    const testRedirectsOldStatusUrl = () => {
      cy.url().then((url) => {
        const splitUrl = url.split('/')
        const prevExId = splitUrl[splitUrl.length - 2]
        const oldPath = `/embedded/platform/async/report/request-examples/request-example-success/request/${prevExId}`
        cy.visit(oldPath)
        cy.url().should(
          'have.string',
          `/embedded/platform/dpr/request-report/report/request-examples/request-example-success/${prevExId}/status`,
        )
      })
    }
    const testRemoveItem = () => {
      cy.visit(path)
      cy.findByRole('tab', { name: /Requested/ }).click()

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Remove' }).click()
        })
      })

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).should('not.exist')
      })
    }
    it('should test out filters, retry/remove and old status url redirects', () => {
      testFilterPersistence()
      testCorrectLinksRetryFailure()
      testRedirectsOldStatusUrl()
      testRemoveItem()
    })
  })

  describe('Aborted request', () => {
    const filtersHref =
      'http://localhost:3010/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters?filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3&sortColumn=field1&sortedAsc=false'

    beforeEach(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubViewAsyncReportingResults')
      cy.task('stubReportsFinishedStatus')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubRequestSuccessReportTablesCount')
      cy.task('stubCancelAsyncRequest')
      cy.visit(path)
    })

    it('should be able to abort the request', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              element.textContent.includes('Successful Report') && element.textContent.includes('this will succeed')
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.url().should(
        'have.string',
        '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters',
      )
      cy.findByRole('button', { name: 'Request report' }).click()

      cy.url().should(
        'match',
        /http:\/\/localhost:3010\/embedded\/platform\/dpr\/request-report\/report\/request-examples\/request-example-success\/(.*)\/status/i,
      )

      cy.findByRole('button', { name: /Cancel/ }).click()
      cy.task('stubReportsAbortedStatus')
      cy.findByRole('strong').contains('ABORTED')
      cy.findByRole('button', { name: /Return to request page/ }).click()
      cy.url().should(
        'have.string',
        '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters',
      )

      cy.visit(path)
      cy.findByRole('tab', { name: /Requested/ }).click()

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Retry' }).should('be.visible')
          cy.findByRole('link', { name: 'Remove' }).should('be.visible')
          cy.findByRole('cell', { name: 'ABORTED' }).should('be.visible')
        })
      })

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Retry' }).click()
        })
      })
      cy.url().should('have.string', filtersHref)

      cy.visit(path)
      cy.findByRole('tab', { name: /Requested/ }).click()

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Remove' }).click()
        })
      })

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).should('not.exist')
      })
    })
  })

  describe('Expired request', () => {
    beforeEach(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubViewAsyncReportingResults')
      cy.task('stubReportsFinishedStatus')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubRequestSuccessReportTablesCount')
      cy.visit(path)
    })

    it('should behave correctly for an expired request', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              element.textContent.includes('Successful Report') && element.textContent.includes('this will succeed')
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.url().should(
        'have.string',
        '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters',
      )
      cy.findByRole('button', { name: 'Request report' }).click()
      checkStatuses()
      cy.findByRole('button', { name: /Enable download/ }).should('be.visible')

      cy.task('stubReportsExpiredStatus')
      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      cy.reload().reload().reload()
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Remove' }).should('be.visible')
          cy.findByRole('cell', { name: 'EXPIRED' }).should('be.visible')
          cy.findByRole('link', { name: 'Refresh' }).click()
        })
      })
      const filtersHref =
        'http://localhost:3010/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters'
      cy.url().should('have.string', filtersHref)

      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Remove' }).click()
        })
      })

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).should('not.exist')
      })
    })
  })
})
