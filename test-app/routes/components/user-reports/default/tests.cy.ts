import { checkA11y } from "../../../../../cypress-tests/cypressUtils"
import { requestedReady, requestedAborted, requestedExpired, requestedFailed, requestedSubmitted } from "../../../../../cypress-tests/mockApis/mockRequestedUserListData"
import { viewedDashboard, viewedExpired, viewedInteractive, viewedInteractiveAsync, viewedReady, expiredDashboard } from "../../../../../cypress-tests/mockApis/mockViewedUserListData"
import { setRedisState } from "../../../integrationTests/setRedisState"

context('User reports component', () => {
  const path = '/components/user-reports/default'

  describe('Requested reports list', () => {
    beforeEach(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubReportsFinishedStatus')
      cy.task('stubGenericDefinitionRequest')
      setRedisState({
        bookmarks: [],
        recentlyViewedReports: [],
        requestedReports: [requestedReady, requestedAborted, requestedExpired, requestedFailed, requestedSubmitted]
      })
      cy.visit(path)
      cy.findByRole('tab', { name: /Requested/ }).click()
    })
    it('should show the "Requested" tab', () => {
      cy.findByRole('tab', { name: /Requested/ }).should('be.visible')
      checkA11y()
    })

    it('should show the help text', () => {
      cy.findByLabelText(/Requested.*/i).within(() => {
        cy.findAllByRole('group').contains('Help').should('be.visible')
      })
    })

    it('should show the total reports', () => {
      cy.findByLabelText(/Requested.*/i).within(() => {
        cy.findAllByRole('paragraph')
          .contains(/Showing \d{1,4} of \d{1,4} reports/)
          .should('be.visible')
      })
    })

    it('should show the link to view all reports', () => {
      cy.findByLabelText(/Requested.*/i).within(() => {
        cy.findByRole('link', { name: 'Show all' }).should('exist')
      })
    })

    it('should show the correct table headers', () => {
      cy.findByLabelText(/Requested.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(0)
          .within(() => {
            cy.findAllByRole('columnheader').each((head, index) => {
              switch (index) {
                case 0:
                  cy.wrap(head).contains('Product')
                  break
                case 1:
                  cy.wrap(head).contains('Filters')
                  break
                case 2:
                  cy.wrap(head).contains('Status')
                  break
                case 3:
                  cy.wrap(head).contains('Actions')
                  break
                default:
                  break
              }
            })
          })
      })
    })

    it('should show the product and variant information', () => {
      cy.findByLabelText(/Requested*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').each((row) => {
              cy.wrap(row).within(() => {
                let status: string
                cy.findAllByRole('cell').each((cell, index) => {
                  cy.wrap(cell).within(() => {
                    switch (index) {
                      case 0:
                        cy.findByLabelText(/Report name/).should('not.be.empty')
                        cy.findByLabelText(/Product name/).should('not.be.empty')
                        cy.findByLabelText(/Report type/).should('not.be.empty')
                        break
                      case 1:
                        if (cell.find('li').length > 0) {
                          cy.findAllByRole('listitem').each((li) => {
                            cy.wrap(li).should('satisfy', ($el) => {
                              const classList = Array.from($el[0].classList)
                              return (
                                classList.includes('dpr-query-summary') ||
                                classList.includes('dpr-interactive-query-summary')
                              )
                            })
                          })
                        }
                        break
                      case 2:
                        cy.findByRole('strong').then((s) => {
                          status = s.text()
                        })
                        cy.findByRole('strong').contains(/FINISHED|EXPIRED|FAILED|ABORTED/g)
                        break
                      case 3:
                        switch (status) {
                          case 'FINISHED':
                            cy.wrap(cell).contains('Go to report')
                            break
                          case 'EXPIRED':
                            cy.wrap(cell).contains('Refresh')
                            cy.wrap(cell).contains('Remove')
                            break
                          case 'FAILED':
                          case 'ABORTED':
                            cy.wrap(cell).contains('Retry')
                            cy.wrap(cell).contains('Remove')
                            break
                          default:
                            break
                        }
                        break
                      default:
                        break
                    }
                  })
                })
              })
            })
          })
      })
    })
  })

  describe('Viewed reports list', () => {
    beforeEach(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      setRedisState({
        bookmarks: [],
        defaultFilters: [],
        downloadPermissions: [],
        recentlyViewedReports: [
          viewedReady,
          viewedDashboard,
          viewedInteractive,
          viewedExpired,
          expiredDashboard,
          viewedInteractiveAsync
        ],
        requestedReports: []
      })
      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
    })

    it('should show the "Viewed" tab', () => {
      cy.findByRole('tab', { name: /Viewed/ }).should('be.visible')
    })

    it('should show the help text', () => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findAllByRole('group').contains('Help').should('be.visible')
      })
    })

    it('should show the total reports', () => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findAllByRole('paragraph')
          .contains(/Showing \d{1,4} of \d{1,4} reports/)
          .should('be.visible')
      })
    })

    it('should show the link to view all reports', () => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findByRole('link', { name: 'Show all' }).should('exist')
      })
    })

    it('should show the correct table headers', () => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(0)
          .within(() => {
            cy.findAllByRole('columnheader').each((head, index) => {
              switch (index) {
                case 0:
                  cy.wrap(head).contains('Product')
                  break
                case 1:
                  cy.wrap(head).contains('Filters')
                  break
                case 2:
                  cy.wrap(head).contains('Status')
                  break
                case 3:
                  cy.wrap(head).contains('Actions')
                  break
                default:
                  break
              }
            })
          })
      })
    })

    it('should show the product and variant information', () => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').each((row) => {
              cy.wrap(row).within(() => {
                let status: string
                cy.findAllByRole('cell').each((cell, index) => {
                  cy.wrap(cell).within(() => {
                    switch (index) {
                      case 0:
                        cy.findByLabelText(/Report name/).should('not.be.empty')
                        cy.findByLabelText(/Product name/).should('not.be.empty')
                        cy.findByLabelText(/Report type/).should('not.be.empty')
                        break
                      case 1:
                        if (cell.find('li').length > 0) {
                          cy.findAllByRole('listitem').each((li) => {
                            cy.wrap(li).should('satisfy', ($el) => {
                              const classList = Array.from($el[0].classList)
                              return (
                                classList.includes('dpr-query-summary') ||
                                classList.includes('dpr-interactive-query-summary')
                              )
                            })
                          })
                        }
                        break
                      case 2:
                        cy.findByRole('strong').then((s) => {
                          status = s.text()
                        })
                        cy.findByRole('strong').contains(/READY|EXPIRED/g)
                        break
                      case 3:
                        switch (status) {
                          case 'FINISHED':
                            cy.wrap(cell).contains('Go to report')
                            break
                          case 'EXPIRED':
                            cy.wrap(cell).contains('Refresh')
                            cy.wrap(cell).contains('Remove')
                            break
                          default:
                            break
                        }
                        break
                      default:
                        break
                    }
                  })
                })
              })
            })
          })
      })
    })
  })

  describe('Bookmarked reports list', () => {
    beforeEach(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubViewAsyncReportingResults')
      cy.task('stubReportsFinishedStatus')
      cy.task('stubGenericDefinitionRequest')
      setRedisState({
        bookmarks: [{
          reportId: requestedReady.reportId,
          variantId: requestedReady.id,
          automatic: false,
          id: requestedReady.id,
          type: requestedReady.type,
        }, {
          reportId: requestedExpired.reportId,
          variantId: requestedExpired.id,
          automatic: false,
          id: requestedExpired.id,
          type: requestedExpired.type,
        }],
        defaultFilters: [],
        downloadPermissions: [],
        recentlyViewedReports: [viewedReady,
          viewedDashboard,
          viewedInteractive,
          viewedExpired,
          expiredDashboard,
          viewedInteractiveAsync],
        requestedReports: [requestedReady, requestedAborted, requestedExpired, requestedFailed, requestedSubmitted]
      })
      cy.visit(path)
      cy.findByRole('tab', { name: /Bookmarks/ }).click()
    })

    it('should show the "Bookmarks" tab', () => {
      cy.findByRole('tab', { name: /Bookmarks/ }).should('be.visible')
    })

    it('should show the help text', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('group').contains('Help').should('be.visible')
      })
    })

    it('should show the total reports', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('paragraph')
          .contains(/Showing \d{1,4} of \d{1,4} reports/)
          .should('be.visible')
      })
    })

    it('should not show the link to view all reports', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findByRole('link', { name: 'Show all' }).should('not.exist')
      })
    })

    it('should show the correct table headers', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(0)
          .within(() => {
            cy.findAllByRole('columnheader').each((head, index) => {
              switch (index) {
                case 0:
                  cy.wrap(head).contains('Product')
                  break
                case 1:
                  cy.wrap(head).contains('Description')
                  break
                case 3:
                  cy.wrap(head).contains('Actions')
                  break
                default:
                  break
              }
            })
          })
      })
    })

    it('should show the product and variant information', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').each((row) => {
              cy.wrap(row).within(() => {
                cy.findAllByRole('cell').each((cell, index) => {
                  cy.wrap(cell).within(() => {
                    switch (index) {
                      case 0:
                        cy.findByLabelText(/Report name/).should('not.be.empty')
                        cy.findByLabelText(/Product name/).should('not.be.empty')
                        cy.findByLabelText(/Report type/).should('not.be.empty')
                        break

                      case 2:
                        cy.wrap(cell).contains(/Request report|Request dashboard/g)
                        cy.wrap(cell).contains('Remove bookmark')
                        break
                      default:
                        break
                    }
                  })
                })
              })
            })
          })
      })
    })
  })
})
