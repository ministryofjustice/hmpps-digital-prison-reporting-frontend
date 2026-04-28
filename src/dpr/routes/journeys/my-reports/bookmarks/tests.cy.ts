import { featureTestingUnprintable } from '@networkMocks/report/mockVariants/feature-testing/unprintable'
import { featureTestingEmptyQuery } from '@networkMocks/report/mockVariants/feature-testing/emptyQuery'
import {
  expectMyReportRowCountInTab,
  getMyReportRow,
  getMyReportRowCell,
  stubBaseTasks,
  stubDefinitionsTasks,
} from '../../../../../../cypress-tests/cypressUtils'

context('Bookmarks list', () => {
  const paths = ['/', '/embedded/platform', '/embedded/platform/dpr']

  const sharedTests = (path: string) => {
    describe(`Bookmarks list from ${path}`, () => {
      describe('check the default starting state', () => {
        it('should have the default bookmarks from the caseload bookmark config', () => {
          stubBaseTasks()
          stubDefinitionsTasks()
          cy.visit(path)

          cy.findByRole('tab', { name: /Bookmarks/ }).click()

          expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 2 })
          cy.findByLabelText(/Bookmarks.*/i).within(() => {
            getMyReportRow({ name: featureTestingUnprintable.name })
            getMyReportRow({ name: featureTestingEmptyQuery.name })
          })
        })
      })

      describe('check other interactions', () => {
        before(() => {
          stubBaseTasks()
          stubDefinitionsTasks()
          cy.task('stubDefinitionRequestExamplesSuccess')
          cy.task('stubDefinitionMockReportVariant35')
          cy.task('stubTestDashboard8')
          cy.task('stubDefinitionFeatureTestingInteractive')
          cy.task('stubDashboardResultCompleteData')
          cy.task('stubRequestSuccessResult20')
          cy.task('stubPollingReportEndpoint')
        })

        beforeEach(() => {
          cy.visit(path)
        })

        describe('Bookmarking via the catalogue', () => {
          describe('report', () => {
            it('should add a bookmark to the bookmarks list', () => {
              cy.findByRole('tab', { name: /Bookmarks/ }).click()

              expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 2 })

              cy.findByLabelText(/Reports catalogue.*/i).within(() => {
                cy.findByRole('row', {
                  name: (_, element) => {
                    return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                  },
                }).within(() => {
                  cy.findByRole('link', { name: /Add bookmark/ }).click()
                })
              })

              expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })

              cy.findByLabelText(/Reports catalogue.*/i).within(() => {
                cy.findByRole('row', {
                  name: (_, element) => {
                    return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                  },
                }).within(() => {
                  cy.findByRole('link', { name: /Remove bookmark/ }).should('exist')
                })
              })
            })

            it('should remove a bookmark to the bookmarks list', () => {
              cy.findByRole('tab', { name: /Bookmarks/ }).click()

              expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })

              cy.findByLabelText(/Reports catalogue.*/i).within(() => {
                cy.findByRole('row', {
                  name: (_, element) => {
                    return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                  },
                }).within(() => {
                  cy.findByRole('link', { name: /Remove bookmark/ }).click()
                })
              })

              expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 2 })

              cy.findByLabelText(/Reports catalogue.*/i).within(() => {
                cy.findByRole('row', {
                  name: (_, element) => {
                    return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                  },
                }).within(() => {
                  cy.findByRole('link', { name: /Add bookmark/ }).should('exist')
                })
              })
            })
          })

          describe('dashboard', () => {
            it('should add a bookmark to the bookmarks list', () => {
              cy.findByRole('tab', { name: /Bookmarks/ }).click()

              expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 2 })

              cy.findByLabelText(/Reports catalogue.*/i).within(() => {
                cy.findByRole('row', {
                  name: (_, element) => {
                    return Boolean(element.textContent?.includes('Dashboard used for testing testing'))
                  },
                }).within(() => {
                  cy.findByRole('link', { name: /Add bookmark/ }).click()
                })
              })

              expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })
              cy.findByLabelText(/Bookmarks.*/i).within(() => {
                getMyReportRow({ name: 'Test Dashboard' })
              })

              cy.findByLabelText(/Reports catalogue.*/i).within(() => {
                cy.findByRole('row', {
                  name: (_, element) => {
                    return Boolean(element.textContent?.includes('Dashboard used for testing testing'))
                  },
                }).within(() => {
                  cy.findByRole('link', { name: /Remove bookmark/ }).should('exist')
                })
              })
            })

            it('should remove a bookmark from the bookmarks list', () => {
              cy.findByRole('tab', { name: /Bookmarks/ }).click()

              expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })

              cy.findByLabelText(/Bookmarks.*/i).within(() => {
                getMyReportRowCell({ name: 'Test Dashboard', cell: 'actions' }).within(() => {
                  cy.findByRole('button', { name: /Remove bookmark/ })
                    .should('be.visible')
                    .click()
                })
              })

              cy.findByLabelText(/Reports catalogue.*/i).within(() => {
                cy.findByRole('row', {
                  name: (_, element) => {
                    return Boolean(element.textContent?.includes('Dashboard used for testing testing'))
                  },
                }).within(() => {
                  cy.findByRole('link', { name: /Remove bookmark/ }).click()
                })
              })

              expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })

              cy.findByLabelText(/Reports catalogue.*/i).within(() => {
                cy.findByRole('row', {
                  name: (_, element) => {
                    return Boolean(element.textContent?.includes('Dashboard used for testing testing'))
                  },
                }).within(() => {
                  cy.findByRole('link', { name: /Add bookmark/ }).should('exist')
                })
              })
            })
          })

          describe('missing report', () => {
            it('should not be able to be bookmarked', () => {
              cy.findByRole('tab', { name: /Bookmarks/ }).click()
              cy.findByLabelText(/Reports catalogue.*/i).within(() => {
                cy.findByRole('row', {
                  name: (_, element) => {
                    return Boolean(element.textContent?.includes('Description for missing report 1'))
                  },
                }).within(() => {
                  cy.findByRole('link', { name: /Add bookmark/ }).should('not.exist')
                  cy.findByRole('link', { name: /Request report/ }).should('be.visible')
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
                  return Boolean(element.textContent?.includes('Dashboard used for testing testing'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Add bookmark/ }).click()
              })
            })

            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })

            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Dashboard used for testing testing'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Remove bookmark/ }).click()
              })
            })

            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 2 })
          })

          it('should remove a report bookmark', () => {
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Add bookmark/ }).click()
              })
            })

            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })

            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Remove bookmark/ }).click()
              })
            })

            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 2 })
          })
        })

        describe('Bookmarking via the report', () => {
          let viewReportUrl: string

          before(() => {
            cy.task('stubDefinitionFeatureTestingMissingDesc')
            cy.task('stubReportsFinishedStatus')
            cy.task('stubViewAsyncReportingResults')
            cy.task('stubRequestSuccessReportTablesCount')

            cy.visit(path)
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return (
                    Boolean(element.textContent?.includes('Feature testing')) &&
                    Boolean(element.textContent?.includes('Missing variant description')) &&
                    Boolean(element.textContent?.includes('Example variants used for feature testing'))
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
            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 2 })

            cy.visit(viewReportUrl)
            cy.findByRole('link', { name: /Add bookmark/ }).click()
            cy.findByRole('link', { name: /Remove bookmark/ }).should('be.visible')

            cy.visit(path)

            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })
          })

          it('should remove a bookmark', () => {
            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })

            cy.visit(viewReportUrl)

            cy.findByRole('link', { name: /Remove bookmark/ }).click()
            cy.findByRole('link', { name: /Add bookmark/ })

            cy.visit(path)

            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 2 })
          })
        })

        describe('Bookmarking via the dashboard', () => {
          let viewReportUrl: string

          before(() => {
            cy.task('stubTestDashboard8')
            cy.task('stubMockDashboardsStatusFinished')
            cy.task('stubViewAsyncResults')
            cy.task('stubDashboardResultCompleteData')

            cy.visit(path)
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return (
                    Boolean(element.textContent?.includes('Test Dashboard')) &&
                    Boolean(element.textContent?.includes('Dashboard used for testing testing'))
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

          it('should add a bookmark', () => {
            cy.visit(viewReportUrl)
            cy.findByRole('link', { name: /Add bookmark/ })
              .click()
              .contains('Remove bookmark')
            cy.visit(path)

            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })
          })

          it('should remove a bookmark', () => {
            cy.visit(path)

            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 3 })

            cy.visit(viewReportUrl)
            cy.findByRole('link', { name: /Remove bookmark/ })
              .click()
              .contains('Add bookmark')
            cy.visit(path)

            expectMyReportRowCountInTab({ tabName: /Bookmarks.*/i, count: 2 })
          })
        })

        describe('bookmarking should be idempotent', () => {
          it('should not change the bookmark status of an already bookmarked item', () => {
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Add bookmark/ }).click()
              })
            })
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Remove bookmark/ }).click()
              })
            })
            cy.reload()
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Add bookmark/ }).should('exist')
              })
            })
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Add bookmark/ }).click()
              })
            })
          })

          it('should not change the bookmark status of an unbookmarked item', () => {
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Remove bookmark/ }).click()
              })
            })
            cy.reload()
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Add bookmark/ }).should('exist')
              })
            })
          })
        })

        describe('Bookmarking via the keyboard', () => {
          it('should toggle bookmark using keypress', () => {
            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Add bookmark/ })
                  .focus()
                  .type('{enter}')
              })
            })

            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Remove bookmark/ }).should('exist')
              })
            })

            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Remove bookmark/ })
                  .focus()
                  .type('{enter}')
              })
            })

            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Add bookmark/ }).should('exist')
              })
            })

            cy.reload()

            cy.findByLabelText(/Reports catalogue.*/i).within(() => {
              cy.findByRole('row', {
                name: (_, element) => {
                  return Boolean(element.textContent?.includes('Interactive Report with async filters'))
                },
              }).within(() => {
                cy.findByRole('link', { name: /Add bookmark/ }).should('exist')
              })
            })
          })
        })
      })
    })
  }

  paths.forEach((route) => sharedTests(route))
})
