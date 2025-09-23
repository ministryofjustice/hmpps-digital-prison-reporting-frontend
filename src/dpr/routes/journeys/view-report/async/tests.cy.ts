import DateMapper from '../../../../utils/DateMapper/DateMapper'
import { checkA11y } from '../../../../../../cypress-tests/cypressUtils'

context('Viewing a report', () => {
  const path = '/embedded/platform/'
  let viewReportUrl: string

  describe('Interactive filters', () => {
    before(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('stubReportStatusMock')
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
