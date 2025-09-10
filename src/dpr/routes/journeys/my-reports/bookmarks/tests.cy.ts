import { setRedisState } from '../../../../../../test-app/routes/integrationTests/setRedisState'
import { ReportType } from '../../../../types/UserReports'

context('Bookmarks list', () => {
  const path = '/embedded/platform/'

  before(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubDefinitionRequestExamplesSuccess')
    cy.task('stubListExampleDashboard')
    cy.task('stubDefinitionMockReportVariant35')
    cy.task('stubTestDashboard8')
    cy.task('stubDefinitionFeatureTestingInteractive')
    cy.task('stubDashboardSuccessResult20')
    cy.task('stubRequestSuccessResult20')
    cy.task('stubPollingReportEndpoint')

    setRedisState({
      requestedReports: [],
      recentlyViewedReports: [],
      bookmarks: [
        {
          reportId: 'feature-testing',
          id: 'request-examples',
          variantId: 'feature-testing-interactive',
          type: ReportType.REPORT,
        },
        {
          reportId: 'mock-dashboards',
          id: 'mock-dashboards',
          variantId: 'test-dashboard-8',
          type: ReportType.DASHBOARD,
        },
      ],
      downloadPermissions: [],
      defaultFilters: [],
    })
  })

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Bookmarking via the catalogue', () => {
    describe('report', () => {
      it('should add a bookmark to the bookmarks list', () => {
        cy.findByRole('tab', { name: /Bookmarks/ }).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 2)
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Interactive Report with async filters')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
          })
        })

        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
              cy.findAllByRole('row').contains('Interactive Report with async filters').should('exist')
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Interactive Report with async filters')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark')
          })
        })
      })

      it('should remove a bookmark to the bookmarks list', () => {
        cy.findByRole('tab', { name: /Bookmarks/ }).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Interactive Report with async filters')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark').click()
          })
        })

        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 2)
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Interactive Report with async filters')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').should('exist')
          })
        })
      })
    })

    describe('dashboard', () => {
      it('should add a bookmark to the bookmarks list', () => {
        cy.findByRole('tab', { name: /Bookmarks/ }).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 2)
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Data quality data set')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
          })
        })

        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
              cy.findAllByRole('row').contains('Data quality data set').should('exist')
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Data quality data set')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark')
          })
        })
      })

      it('should remove a bookmark from the bookmarks list', () => {
        cy.findByRole('tab', { name: /Bookmarks/ }).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Data quality data set')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark').click()
          })
        })

        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 2)
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Data quality data set')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark')
          })
        })
      })
    })
  })

  describe('Removing via the user reports list', () => {
    it('should remove a dashboard bookmark', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Data quality data set')
          },
        }).within(() => {
          cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
        })
      })

      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Data quality data set')
          },
        }).within(() => {
          cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark').click()
        })
      })

      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
    })

    it('should remove a report bookmark', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Interactive Report with async filters')
          },
        }).within(() => {
          cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
        })
      })

      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Interactive Report with async filters')
          },
        }).within(() => {
          cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark').click()
        })
      })

      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
    })
  })

  describe('Bookmarking via the report', () => {
    let viewReportUrl: string

    before(() => {
      cy.task('stubDefinitionFeatureTestingMissingDesc')
      cy.task('stubFeatureTestingMissingDesc')
      cy.task('stubViewAsyncReportingResults')
      cy.task('stubRequestSuccessReportTablesCount')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              element.textContent.includes('Feature testing') &&
              element.textContent.includes('Missing variant description') &&
              element.textContent.includes('Example variants used for feature testing')
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('combobox', { name: /Field 2/ }).select('Value 2.1')
      cy.findByRole('button', { name: /Request report/ }).click()

      cy.findByRole('button', { name: /Enable download/ }).should('be.visible')
      cy.url().then((url) => {
        viewReportUrl = url
      })
    })

    it('should add a bookmark', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })

      cy.visit(viewReportUrl)
      cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
      cy.findByLabelText('bookmark toggle').should('exist').contains('Bookmarked')

      cy.visit(path)
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })
    })

    it('should remove a bookmark', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })
      cy.visit(viewReportUrl)

      cy.findByLabelText('bookmark toggle').contains('Remove bookmark').should('exist').click()
      cy.findByLabelText('bookmark toggle').should('exist').contains('Bookmark removed')

      cy.visit(path)
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
    })
  })

  describe('Bookmarking via the dashboard', () => {
    let viewReportUrl: string

    before(() => {
      cy.task('stubTestDashboard8')
      cy.task('stubTestDashboard8Status')
      cy.task('stubViewAsyncResults')
      cy.task('stubDashboardSuccessResult20')

      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              element.textContent.includes('Test Dashboard') &&
              element.textContent.includes('Dashboard used for testing testing')
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request dashboard' }).click()
        })
      })
      cy.findByRole('button', { name: /Request dashboard/ }).click()

      cy.url().then((url) => {
        viewReportUrl = url
      })
    })

    it('should remove a bookmark', () => {
      cy.visit(path)
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
      cy.visit(viewReportUrl)
      cy.findByLabelText('bookmark toggle')
        .contains('Remove bookmark')
        .should('exist')
        .click()
        .contains('Bookmark removed')
      cy.visit(path)
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 1)
          })
      })
    })
  })
})
