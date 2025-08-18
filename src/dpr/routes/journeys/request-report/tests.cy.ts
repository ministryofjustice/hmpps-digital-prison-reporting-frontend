context('Requesting a report', () => {
  const path = '/embedded/platform/'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  const checkStatuses = () => {
    cy.wait(500)
    cy.findByRole('strong').contains('SUBMITTED')
    cy.wait(1000)
    cy.findByRole('strong').contains('PICKED')
    cy.wait(1000)
    cy.findByRole('strong').contains('STARTED')
    cy.wait(1000)
  }

  describe('Successful request', () => {
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
    let failedRequestUrl: string
    let executionId: string

    it('should show an error page for a failed request', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Fail with Status Error')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
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

      cy.findByRole('button', { name: 'Request report' }).click()
      cy.url().should(
        'match',
        /http:\/\/localhost:3010\/embedded\/platform\/dpr\/request-report\/report\/request-examples\/request-example-fail-code\/(.*)\/status/i,
      )

      cy.wait(500)
      cy.findByRole('strong').contains('SUBMITTED')
      cy.wait(1000)
      cy.findByRole('strong').contains('PICKED')
      cy.wait(1000)
      cy.findAllByRole('strong').eq(0).contains('FAILED')

      cy.findByRole('heading', { name: 'Your report has failed to generate' }).should('be.visible')
      cy.findByRole('button', { name: 'Retry' }).should('be.visible')

      cy.url().then((url) => {
        failedRequestUrl = url
        const urlArr = url.split('/')
        executionId = urlArr[urlArr.length - 2]
      })
    })

    it('should show the full error', () => {
      cy.visit(failedRequestUrl)
      cy.findAllByRole('group').contains('Show full error').should('be.visible')
    })

    it('should show the request details', () => {
      cy.visit(failedRequestUrl)
      cy.findAllByRole('list').contains('Report ID: request-examples').should('be.visible')
      cy.findAllByRole('list').contains(`Execution ID: ${executionId}`).should('be.visible')
      cy.findAllByRole('list').contains('Table ID: tblId_').should('be.visible')
    })

    it('should go to filters page on retry', () => {
      cy.visit(failedRequestUrl)
      cy.findByRole('button', { name: 'Retry' }).click()
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
      cy.findByRole('tab', { name: /Requested/ }).click()

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Fail with Status Error')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Retry' })
          cy.findByRole('link', { name: 'Remove' })
        })
      })
    })

    it('should go to filters page when clicking retry in the user catalogue', () => {
      cy.findByRole('tab', { name: /Requested/ }).click()
      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Fail with Status Error')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Retry' }).click()
        })
      })
      cy.url().should('have.string', failedRequestUrl)
    })

    it('should show the correct status', () => {
      cy.findByRole('tab', { name: /Requested/ }).click()
      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Fail with Status Error')
          },
        }).within(() => {
          cy.findByRole('cell', { name: 'FAILED' })
        })
      })
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
      cy.findByRole('tab', { name: /Requested/ }).click()

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Fail with Status Error')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Remove' }).click()
        })
      })

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Fail with Status Error')
          },
        }).should('not.exist')
      })
    })
  })

  describe('Aborted request', () => {
    const filtersHref =
      'http://localhost:3010/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters?filters.field1=value1.2&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&filters.field7=2005-02-01&filters.field8=value8.2&filters.field8=value8.3&sortColumn=field1&sortedAsc=false'

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
      cy.findByRole('strong').contains('ABORTED')
      cy.findByRole('button', { name: /Return to request page/ }).click()
      cy.url().should(
        'have.string',
        '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters',
      )
    })

    it('should show the correct link in the user reports list', () => {
      cy.findByRole('tab', { name: /Requested/ }).click()

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Retry' })
          cy.findByRole('link', { name: 'Remove' })
        })
      })
    })

    it('should go to filters page when clicking retry in the user catalogue', () => {
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
      cy.url().should('have.string', filtersHref)
    })

    it('should show the correct status', () => {
      cy.findByRole('tab', { name: /Requested/ }).click()
      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Successful Report')
          },
        }).within(() => {
          cy.findByRole('cell', { name: 'ABORTED' })
        })
      })
    })

    it('should remove the item from the list by clicking remove', () => {
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
    const filtersHref =
      'http://localhost:3010/embedded/platform/dpr/request-report/report/request-examples/request-example-expire/filters?filters.field1=value1.1&filters.field3.start=2003-02-01&filters.field3.end=2006-05-04&sortColumn=field1&sortedAsc=false'

    it('should setup an expired report', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Expiring report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('button', { name: 'Request report' }).click()

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
      cy.findByRole('tab', { name: /Viewed/ }).click()
      cy.reload().reload().reload()
      cy.findByLabelText(/Viewed/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Expiring report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Refresh' })
          cy.findByRole('link', { name: 'Remove' })
        })
      })
    })

    it('should go to filters page when clicking refresh in the user catalogue', () => {
      cy.findByRole('tab', { name: /Viewed/ }).click()

      cy.findByLabelText(/Viewed/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Expiring report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Refresh' }).click()
        })
      })
      cy.url().should('have.string', filtersHref)
    })

    it('should show the correct status', () => {
      cy.findByRole('tab', { name: /Viewed/ }).click()

      cy.findByLabelText(/Viewed/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Expiring report')
          },
        }).within(() => {
          cy.findByRole('cell', { name: 'EXPIRED' })
        })
      })
    })

    it('should remove the item from the list by clicking remove', () => {
      cy.findByRole('tab', { name: /Viewed/ }).click()

      cy.findByLabelText(/Viewed/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Expiring report')
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Remove' }).click()
        })
      })

      cy.findByLabelText(/Requested/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Expiring report')
          },
        }).should('not.exist')
      })
    })
  })
})
