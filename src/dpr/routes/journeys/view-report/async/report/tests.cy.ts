import { checkA11y } from '../../../../../../../cypress-tests/cypressUtils'
import DateMapper from '../../../../../utils/DateMapper/DateMapper'

context('Viewing a report', () => {
  const path = '/embedded/platform/'
  let viewReportUrl: string
  let tableId: string

  describe('List report page', () => {
    before(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubMockReportVariant35')
      cy.task('stubFeatureTestingInteractive')
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestExamplesSuccessStatus')
      cy.task('stubTestDashboard8')
      cy.task('stubMockDashboardsStatus')
      cy.task('stubTestDashboard8Status')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubRequestSuccessResult10')
      cy.task('stubRequestSuccessReportTablesCount')
      cy.task('stubRequestSuccessResult100')
      cy.task('stubViewAsyncReportingResults')

      // Request and run a report so we can go back to it for each test
      cy.visit(path)
      checkA11y()
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
      checkA11y()
      cy.findByRole('button', { name: /Request/ }).click()
      checkA11y()
      cy.findByRole('heading', { level: 1, name: /Successful Report/ }).should('be.visible')
      cy.url().then((url) => {
        viewReportUrl = url
        const urlArr = url.split('/')
        tableId = urlArr[urlArr.length - 2]
      })
    })

    beforeEach(() => {
      cy.visit(viewReportUrl)
    })

    describe('Report details', () => {
      it('should show the report details', () => {
        cy.findAllByRole('group').contains('Report details').should('be.visible').click()

        cy.findAllByRole('group')
          .contains('Report details')
          .parent()
          .parent()
          .within(() => {
            cy.findAllByRole('row').each((row, index) => {
              cy.wrap(row).within(() => {
                switch (index) {
                  case 0:
                    cy.findAllByRole('cell', { name: 'Name:' }).should('exist')
                    cy.findAllByRole('cell', { name: 'Successful Report' }).should('exist')
                    break
                  case 1:
                    cy.findAllByRole('cell', { name: 'Product:' }).should('exist')
                    cy.findAllByRole('cell', { name: 'Request examples' }).should('exist')
                    break
                  case 2:
                    cy.findAllByRole('cell', { name: 'Description:' }).should('exist')
                    cy.findAllByRole('cell', { name: 'this will succeed' }).should('exist')
                    break
                  case 3:
                    cy.findAllByRole('cell', { name: 'Classification:' }).should('exist')
                    cy.findAllByRole('cell', { name: 'OFFICIAL' }).should('exist')
                    break
                  case 4:
                    cy.findAllByRole('cell', { name: 'Requested at:' }).should('exist')
                    cy.findAllByRole('cell', { name: /\d{1,2}\/\d{1,2}\/\d{2,4}/ }).should('exist')
                    break
                  case 5:
                    cy.findAllByRole('cell', { name: 'Applied Filters:' }).should('exist')
                    cy.findAllByRole('listitem').each((item, i) => {
                      switch (i) {
                        case 0:
                          cy.wrap(item).contains('Field 1: value1.2')
                          break
                        case 1:
                          cy.wrap(item).contains('Field 3 start: 01/02/2003')
                          break
                        case 2:
                          cy.wrap(item).contains('Field 3 end: 04/05/2006')
                          break
                        case 3:
                          cy.wrap(item).contains('Field 7: 01/02/2005')
                          break
                        case 4:
                          cy.wrap(item).contains('Field 8: value8.2,value8.3')
                          break
                        case 5:
                          cy.wrap(item).contains('Sort column: Field 1')
                          break
                        case 6:
                          cy.wrap(item).contains('Sort direction: Descending')
                          break
                        default:
                          break
                      }
                    })
                    break
                  default:
                    break
                }
              })
            })
          })
      })
    })

    describe('Actions', () => {
      it('should show the actions and go to the filters page when refresh action is clicked', () => {
        cy.findByLabelText('Refresh report').should('be.visible')
        cy.findByLabelText(/Print screen/)
          .should('be.visible')
          .should('be.disabled')
        cy.findByLabelText(/download/).should('be.visible')
        cy.findByLabelText(/Copy report link/).should('be.visible')
        cy.findByLabelText('bookmark toggle').should('be.visible')

        cy.findByLabelText('Refresh report').should('be.visible').click()
        cy.url().should(
          'match',
          /.*\/embedded\/platform\/dpr\/request-report\/report\/request-examples\/request-example-success\/filters/i,
        )

        cy.location().should((location) => {
          expect(location.search).to.contain(`filters.field1=value1.2`)
          expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
          expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
          expect(location.search).to.contain(`filters.field7=2005-02-01`)
          expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
        })
      })
    })

    describe('Column interactions', () => {
      const expectInitialisedColumns = () => {
        cy.findByRole('checkbox', { name: 'Field 1' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Field 2' }).should('be.checked').should('be.disabled')
        cy.findByRole('checkbox', { name: 'Field 3' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Field 4' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Field 5' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Field 6' }).should('be.checked').should('be.disabled')
        cy.findByRole('checkbox', { name: 'Field 7' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Field 8' }).should('not.be.checked')

        cy.location().should((location) => {
          expect(location.search).to.contain(`columns=field1`)
          expect(location.search).to.contain(`columns=field2`)
          expect(location.search).to.contain(`columns=field3`)
          expect(location.search).not.to.contain(`columns=field4`)
          expect(location.search).not.to.contain(`columns=field5`)
          expect(location.search).to.contain(`columns=field6`)
          expect(location.search).to.contain(`columns=field7`)
          expect(location.search).not.to.contain(`columns=field8`)
        })
      }

      const expectUpdatedColumns = () => {
        cy.findByRole('checkbox', { name: 'Field 1' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Field 2' }).should('be.checked').should('be.disabled')
        cy.findByRole('checkbox', { name: 'Field 3' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Field 4' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Field 5' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Field 6' }).should('be.checked').should('be.disabled')
        cy.findByRole('checkbox', { name: 'Field 7' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Field 8' }).should('be.checked')

        cy.location().should((location) => {
          expect(location.search).not.to.contain(`columns=field1`)
          expect(location.search).to.contain(`columns=field2`)
          expect(location.search).not.to.contain(`columns=field3`)
          expect(location.search).not.to.contain(`columns=field4`)
          expect(location.search).to.contain(`columns=field5`)
          expect(location.search).to.contain(`columns=field6`)
          expect(location.search).not.to.contain(`columns=field7`)
          expect(location.search).to.contain(`columns=field8`)
        })
      }

      const setColumnValues = () => {
        cy.findByRole('checkbox', { name: 'Field 1' }).uncheck()
        cy.findByRole('checkbox', { name: 'Field 3' }).uncheck()
        cy.findByRole('checkbox', { name: 'Field 5' }).check()
        cy.findByRole('checkbox', { name: 'Field 7' }).uncheck()
        cy.findByRole('checkbox', { name: 'Field 8' }).check()
      }

      it('should initialise the column content correctly', () => {
        cy.findAllByRole('group')
          .contains(/Show columns/)
          .should('be.visible')
          .click()
        expectInitialisedColumns()
        cy.findAllByRole('group').contains('Show columns (5 of 8 shown)')
        cy.findByLabelText(/Successful Report/).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(0)
            .within(() => {
              cy.findAllByRole('columnheader').each((head, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(head).contains('Field 1')
                    break
                  case 1:
                    cy.wrap(head).contains('Field 2')
                    break
                  case 2:
                    cy.wrap(head).contains('Field 3')
                    break
                  case 3:
                    cy.wrap(head).contains('Field 6')
                    break
                  case 4:
                    cy.wrap(head).contains('Field 7')
                    break
                  default:
                    break
                }
              })
            })
        })
      })

      it('should apply the columns', () => {
        cy.findAllByRole('group')
          .contains(/Show columns/)
          .click()

        setColumnValues()
        expectUpdatedColumns()

        cy.findByRole('button', { name: 'Apply columns' }).click()

        expectUpdatedColumns()

        cy.findByLabelText(/Successful Report/).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(0)
            .within(() => {
              cy.findAllByRole('columnheader').each((head, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(head).contains('Field 2')
                    break
                  case 1:
                    cy.wrap(head).contains('Field 5')
                    break
                  case 2:
                    cy.wrap(head).contains('Field 6')
                    break
                  case 3:
                    cy.wrap(head).contains('Field 8')
                    break
                  default:
                    break
                }
              })
            })
        })
      })

      it('should reset the columns to their DPD defaults', () => {
        cy.findAllByRole('group')
          .contains(/Show columns/)
          .click()

        setColumnValues()
        expectUpdatedColumns()

        cy.findByRole('button', { name: 'Apply columns' }).click()

        expectUpdatedColumns()

        cy.findAllByRole('group')
          .contains(/Show columns/)
          .click()

        cy.findByRole('link', { name: 'Reset columns' }).click()

        expectInitialisedColumns()
      })

      it('should apply the columns from the URL', () => {
        cy.visit(
          `/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/${tableId}/report?columns=field1&columns=field5&columns=field8`,
        )

        cy.findByRole('checkbox', { name: 'Field 1' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Field 2' }).should('be.checked').should('be.disabled')
        cy.findByRole('checkbox', { name: 'Field 3' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Field 4' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Field 5' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Field 6' }).should('be.checked').should('be.disabled')
        cy.findByRole('checkbox', { name: 'Field 7' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Field 8' }).should('be.checked')

        cy.findByLabelText(/Successful Report/).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(0)
            .within(() => {
              cy.findAllByRole('columnheader').each((head, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(head).contains('Field 1')
                    break
                  case 1:
                    cy.wrap(head).contains('Field 2')
                    break
                  case 2:
                    cy.wrap(head).contains('Field 5')
                    break
                  case 3:
                    cy.wrap(head).contains('Field 6')
                    break
                  case 4:
                    cy.wrap(head).contains('Field 8')
                    break
                  default:
                    break
                }
              })
            })
        })
      })
    })

    describe('Paging interaction', () => {
      it('should show the table totals', () => {
        cy.findAllByRole('paragraph')
          .contains(/Showing \d{1,4} to \d{1,4} of \d{1,4} results/)
          .should('exist')
        cy.findByLabelText(/Successful Report/).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 20)
            })
        })
      })

      it('should change the page size', () => {
        cy.get('#page-size-select').select('10')
        cy.findAllByRole('paragraph')
          .contains(/Showing 1 to 10 of 100 results/)
          .should('exist')
        cy.findByLabelText(/Successful Report/).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 10)
            })
        })
      })

      it('should change the page size via the URL', () => {
        cy.visit(
          `/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/${tableId}/report?pageSize=100`,
        )
        cy.findAllByRole('paragraph')
          .contains(/100 total results/)
          .should('exist')
        cy.findByLabelText(/Successful Report/).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 100)
            })
        })
      })

      it('should change the page', () => {
        cy.findByLabelText('Page 5').click()
        cy.location().should((location) => {
          expect(location.search).to.contain(`selectedPage=5`)
        })
      })

      it('should change the page via the URL', () => {
        cy.visit(
          `/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/${tableId}/report?selectedPage=3`,
        )
        cy.findByRole('link', { current: 'page' }).contains('3')
      })
    })
  })

  describe('Interactive report', () => {
    before(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('stubFeatureTestingInteractiveStatus')
      cy.task('stubAsyncRequestSuccessReportTablesCount')
      cy.task('stubViewAsyncReportingResults')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubRequestSuccessResult100')

      cy.visit(path)
      checkA11y()
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              element.textContent.includes('Interactive Report') &&
              element.textContent.includes('this is an interactive report')
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      checkA11y()
      cy.findByRole('button', { name: /Request/ }).click()
      checkA11y()
      cy.findByRole('heading', { level: 1, name: /Interactive Report/ }).should('be.visible')
      cy.url().then((url) => {
        viewReportUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(viewReportUrl)
    })

    describe('Filter types', () => {
      const removeAllFilters = () => {
        for (let index = 0; index < 4; index += 1) {
          const selectedFilter = cy.get('#dpr-selected-filters > a:nth-child(1)')
          selectedFilter.click(1, 1)
        }
      }

      describe('Date range', () => {
        it('should apply the date range', () => {
          cy.findByRole('textbox', { name: 'From' }).should('have.value', '01/02/2003')
          cy.findByRole('textbox', { name: 'To' }).should('have.value', '04/05/2006')

          removeAllFilters()

          cy.findAllByRole('group')
            .contains(/Show filters/)
            .click()

          cy.findByRole('textbox', { name: 'From' }).type('02/05/2025')
          cy.findByRole('textbox', { name: 'To' }).type('05/07/2025').blur()

          cy.intercept({
            method: 'POST',
            url: '/embedded/platform/dpr/view-report/async/report/feature-testing/feature-testing-interactive/**/apply-filters',
          }).as('applyFilters')

          cy.findByRole('button', { name: 'Apply filters' }).click()

          cy.wait('@applyFilters')
            .its('request')
            .then((request) => {
              cy.wrap(request).its('body').should('have.string', 'filters.field3.start=02%2F05%2F2025')
              cy.wrap(request).its('body').should('have.string', 'filters.field3.end=05%2F07%2F2025')
            })

          cy.location().should((location) => {
            expect(location.search).to.contain(`filters.field3.start=2025-05-02`)
            expect(location.search).to.contain(`filters.field3.end=2025-07-05`)
          })

          cy.findByLabelText(/Selected filters.*/i).within(() => {
            cy.findAllByRole('link')
              .should('have.length', 2)
              .each((filter, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(filter).contains('Field 3')
                    cy.wrap(filter).contains('02/05/2025 - 05/07/2025')
                    break
                  case 1:
                    cy.wrap(filter).contains('Reset filters')
                    break
                  default:
                    break
                }
              })
          })
        })

        it('should apply the relative daterange', () => {
          removeAllFilters()

          cy.findAllByRole('group')
            .contains(/Show filters/)
            .click()

          cy.findByRole('tab', { name: 'Preset date ranges' }).click()
          cy.findByRole('radio', { name: 'Tomorrow' }).check()

          cy.intercept({
            method: 'POST',
            url: '/embedded/platform/dpr/view-report/async/report/feature-testing/feature-testing-interactive/**/apply-filters',
          }).as('applyFilters')

          cy.findByRole('button', { name: 'Apply filters' }).click()

          cy.wait('@applyFilters')
            .its('request')
            .then((request) => {
              cy.wrap(request).its('body').should('have.string', 'filters.field3.start=')
              cy.wrap(request).its('body').should('have.string', 'filters.field3.end=')
              cy.wrap(request).its('body').should('not.have.string', 'filters.field3.start=&filters.field3.end=')
              cy.wrap(request).its('body').should('have.string', 'filters.field3.relative-duration=tomorrow')
            })

          let startValue: string
          let endValue: string
          cy.findByRole('textbox', { name: 'From' })
            .invoke('val')
            .should('not.be.empty')
            .then((val: string) => {
              startValue = val
            })
          cy.findByRole('textbox', { name: 'To' })
            .invoke('val')
            .should('not.be.empty')
            .then((val: string) => {
              endValue = val
            })

          const dateMapper = new DateMapper()
          cy.location().should((location) => {
            expect(location.search).to.contain(`filters.field3.start=${dateMapper.toDateString(startValue, 'iso')}`)
            expect(location.search).to.contain(`filters.field3.end=${dateMapper.toDateString(endValue, 'iso')}`)
            expect(location.search).to.contain(`filters.field3.relative-duration=tomorrow`)
          })

          cy.findByLabelText(/Selected filters.*/i).within(() => {
            cy.findAllByRole('link')
              .should('have.length', 2)
              .each((filter, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(filter).contains('Field 3')
                    cy.wrap(filter).contains('Tomorrow')
                    break
                  case 1:
                    cy.wrap(filter).contains('Reset filters')
                    break
                  default:
                    break
                }
              })
          })
        })
      })

      describe('Multiselect', () => {
        it('should apply the multiselect values', () => {
          cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')

          removeAllFilters()

          cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

          cy.findAllByRole('group')
            .contains(/Show filters/)
            .click()

          cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
          cy.findByRole('checkbox', { name: 'Value 8.3' }).check()

          cy.intercept({
            method: 'POST',
            url: '/embedded/platform/dpr/view-report/async/report/feature-testing/feature-testing-interactive/**/apply-filters',
          }).as('applyFilters')

          cy.findByRole('button', { name: 'Apply filters' }).click()

          cy.wait('@applyFilters')
            .its('request')
            .then((request) => {
              cy.wrap(request).its('body').should('have.string', 'filters.field8=value8.1&filters.field8=value8.3')
            })

          cy.findByRole('checkbox', { name: 'Value 8.1' }).should('be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

          cy.findByLabelText(/Selected filters.*/i).within(() => {
            cy.findAllByRole('link')
              .should('have.length', 2)
              .each((filter, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(filter).contains('Field 8')
                    cy.wrap(filter).contains('Value 8.1, Value 8.3')
                    break
                  case 1:
                    cy.wrap(filter).contains('Reset filters')
                    break
                  default:
                    break
                }
              })
          })
        })

        it('should set the selected filter values correctly', () => {
          cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')

          removeAllFilters()

          cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

          cy.findAllByRole('group')
            .contains(/Show filters/)
            .click()

          cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
          cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
          cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
          cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

          cy.intercept({
            method: 'POST',
            url: '/embedded/platform/dpr/view-report/async/report/feature-testing/feature-testing-interactive/**/apply-filters',
          }).as('applyFilters')

          cy.findByRole('button', { name: 'Apply filters' }).click()

          cy.wait('@applyFilters')
            .its('request')
            .then((request) => {
              cy.wrap(request)
                .its('body')
                .should(
                  'have.string',
                  'filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4',
                )
            })

          cy.findByRole('checkbox', { name: 'Value 8.1' }).should('be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')
          cy.findByRole('checkbox', { name: 'Value 8.4' }).should('be.checked')

          cy.findByLabelText(/Selected filters.*/i).within(() => {
            cy.findAllByRole('link')
              .should('have.length', 2)
              .each((filter, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(filter).contains('Field 8')
                    cy.wrap(filter).contains('Value 8.1, Value 8.2, Value 8.3 + 1 more')
                    break
                  case 1:
                    cy.wrap(filter).contains('Reset filters')
                    break
                  default:
                    break
                }
              })
          })
        })
      })

      describe('Autocomplete', () => {
        //
      })
    })
  })
})
