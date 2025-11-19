import { executeDashboardStubs, executeReportStubs, stubBaseTasks, stubDefinitionsTasks } from "cypress-tests/cypressUtils"

context('Try to run the app with failing and broken api endpoints', () => {
  const path = '/embedded/platform/'

  beforeEach(() => {
    stubBaseTasks()
  })

  describe('erroring endpoints - reports', () => {
    it('should cope with definitions list failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getDefinitionSummariesFailure')

      cy.visit(path)

      cy.findByRole('heading', { name: /Sorry, there is a problem with the service/ }).should('be.visible')
    })

    it('should cope with definitions list being unauthd', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getDefinitionSummariesUnauthenticatedFailure')

      cy.visit(path)

      cy.findByRole('heading', { name: /Sorry, there is a problem with authenticating your request/ }).should('be.visible')
    })

    it('should cope with single definition endpoint failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getSingleDefinitionFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with single definition failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getSingleDefinitionFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with single definition variant failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getSingleDefinitionVariantFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with count failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getAsyncCountFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with requestAsyncReport failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('requestAsyncReportFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with cancelAsyncRequest failing', () => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.task('stubViewAsyncReportingResults')
      cy.task('stubRequestSuccessReportTablesCount')
      cy.task('stubAsyncRequestSuccessReportTablesCount')
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('cancelAsyncRequestFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('button', { name: /Cancel request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with getAsyncReport failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getAsyncReportFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with getAsyncSummaryReport failing', () => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.task('stubViewAsyncReportingResults')
      cy.task('getAsyncSummaryReportFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with getAsyncReportStatus failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getAsyncReportStatusFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element?.textContent?.includes('Successful Report')) && Boolean(element?.textContent?.includes('this will succeed'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })
  })

  describe('erroring endpoints - dashboards', () => {
    it('should cope with single definition endpoint failing', () => {
      executeDashboardStubs()
      cy.task('stubDataQualityDashboardsResultMock')
      cy.task('stubListExampleDashboard')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('getSingleDashboardFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element.textContent?.includes('Data quality data set'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request dashboard' }).click()
        })
      })

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with requestAsyncDashboard failing', () => {
      executeDashboardStubs()
      cy.task('stubDataQualityDashboardsResultMock')
      cy.task('stubListExampleDashboard')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('requestAsyncDashboardFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element.textContent?.includes('Data quality data set'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request dashboard' }).click()
        })
      })
      cy.findByRole('button', { name: 'Request dashboard' }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })


    it('should cope with getAsyncReport failing', () => {
      executeDashboardStubs()
      cy.task('stubDataQualityDashboardsResultMock')
      cy.task('stubListExampleDashboard')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('getAsyncDashboardFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element.textContent?.includes('Data quality data set'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request dashboard' }).click()
        })
      })
      cy.findByRole('button', { name: 'Request dashboard' }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })


    it('should cope with getAsyncReportStatus failing', () => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.task('stubViewAsyncResults')
      cy.task('stubDataQualityDashboardsResultMock')
      cy.task('stubListExampleDashboard')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('getAsyncDashboardStatusFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element.textContent?.includes('Data quality data set'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request dashboard' }).click()
        })
      })
      cy.findByRole('button', { name: 'Request dashboard' }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with cancelAsyncRequest failing', () => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.task('stubViewAsyncResults')
      cy.task('stubDataQualityDashboardsResultMock')
      cy.task('stubListExampleDashboard')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('cancelAsyncRequestDashboardFailure')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element.textContent?.includes('Data quality data set'))
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request dashboard' }).click()
        })
      })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('button', { name: /Cancel request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

  })
})