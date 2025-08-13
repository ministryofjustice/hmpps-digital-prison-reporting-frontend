context('Viewing a report', () => {
  const path = '/embedded/platform/'
  const listUrlSelector =
    '#dpr-reports-catalogue > tbody > tr > td > a[href="dpr/request-report/report/request-examples/request-example-success/filters"]'

  let viewReportUrl: string

  let tableId: string

  describe('List report page', () => {
    before(() => {
      cy.visit(path)
      cy.get(listUrlSelector).click()
      cy.get('#async-request-report-button').click().wait(4000)
      cy.url().then((url) => {
        viewReportUrl = url
        const urlArr = url.split('/')
        tableId = urlArr[urlArr.length - 2]
      })
    })

    beforeEach(() => {
      cy.visit(viewReportUrl)
    })

    it('is accessible', () => {
      cy.injectAxe()
      cy.checkA11y()
    })

    describe('Report details', () => {
      it('should show the product name', () => {
        cy.get('.govuk-caption-l').should('not.be.empty').contains('Request examples')
        cy.get('.govuk-heading-l').should('not.be.empty').contains('Successful Report')
      })

      it('should show the report details', () => {
        cy.get('.dpr-meta-data-details > .govuk-details__summary').click()
        cy.get('#dpr-request-details-table > tbody > tr').each((row, index) => {
          switch (index) {
            case 0:
              cy.wrap(row).find('td:nth-child(1) > p').contains('Name')
              cy.wrap(row).find('td:nth-child(2)').contains('Successful Report')
              break
            case 1:
              cy.wrap(row).find('td:nth-child(1) > p').contains('Product')
              cy.wrap(row).find('td:nth-child(2)').contains('Request examples')
              break
            case 2:
              cy.wrap(row).find('td:nth-child(1) > p').contains('Description')
              cy.wrap(row).find('td:nth-child(2)').contains('this will succeed')
              break
            case 3:
              cy.wrap(row).find('td:nth-child(1) > p').contains('Classification')
              cy.wrap(row).find('td:nth-child(2)').contains('OFFICIAL')
              break
            case 4:
              cy.wrap(row).find('td:nth-child(1) > p').contains('Requested at')
              cy.wrap(row)
                .find('td:nth-child(2)')
                .contains(/\d{1,2}\/\d{1,2}\/\d{2,4}/)
              break
            case 5:
              cy.wrap(row).find('td:nth-child(1) > p').contains('Applied Filters')
              cy.wrap(row)
                .find('td:nth-child(2) > ul > li')
                .each((li, liIndex) => {
                  switch (liIndex) {
                    case 0:
                      cy.wrap(li).contains('Field 1: value1.2')
                      break
                    case 1:
                      cy.wrap(li).contains('Field 3 start: 01/02/2003')
                      break
                    case 2:
                      cy.wrap(li).contains('Field 3 end: 04/05/2006')
                      break
                    case 3:
                      cy.wrap(li).contains('Field 7: 01/02/2005')
                      break
                    case 4:
                      cy.wrap(li).contains('Field 8: value8.2,value8.3')
                      break
                    case 5:
                      cy.wrap(li).contains('Sort column: Field 1')
                      break
                    case 6:
                      cy.wrap(li).contains('Sort direction: Descending')
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

    describe('Actions', () => {
      it('should show the refresh action', () => {
        cy.get('#dpr-button-refresh').should('be.visible')
      })

      it('should go to the filters page when refresh action is clicked', () => {
        cy.get('#dpr-button-refresh').click()

        cy.url().should(
          'match',
          /http:\/\/localhost:3010\/embedded\/platform\/dpr\/request-report\/report\/request-examples\/request-example-success\/filters/i,
        )

        cy.location().should((location) => {
          expect(location.search).to.contain(`filters.field1=value1.2`)
          expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
          expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
          expect(location.search).to.contain(`filters.field7=2005-02-01`)
          expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
        })
      })

      it('should show the print action', () => {
        cy.get('#dpr-button-printable').should('be.visible').should('be.disabled')
      })

      it('should show the download action', () => {
        cy.get('#dpr-button-downloadable').should('be.visible')
      })

      it('should show the copy action', () => {
        cy.get('#dpr-button-copy').should('be.visible')
      })

      it('should show the bookmark toggle', () => {
        cy.get('#request-example-success-request-examples-report-bookmark-label').should('be.visible')
      })
    })

    describe('Column interactions', () => {
      const expectInitialisedColumns = () => {
        cy.get('#columns').should('be.checked')
        cy.get('#columns-2').should('be.checked').should('be.disabled')
        cy.get('#columns-3').should('be.checked')
        cy.get('#columns-4').should('not.be.checked')
        cy.get('#columns-5').should('not.be.checked')
        cy.get('#columns-6').should('be.checked').should('be.disabled')
        cy.get('#columns-7').should('be.checked')
        cy.get('#columns-8').should('not.be.checked')

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
        cy.get('#columns').should('not.be.checked')
        cy.get('#columns-2').should('be.checked').should('be.disabled')
        cy.get('#columns-3').should('not.be.checked')
        cy.get('#columns-4').should('not.be.checked')
        cy.get('#columns-5').should('be.checked')
        cy.get('#columns-6').should('be.checked').should('be.disabled')
        cy.get('#columns-7').should('not.be.checked')
        cy.get('#columns-8').should('be.checked')

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
        cy.get('#columns').uncheck()
        cy.get('#columns-3').uncheck()
        cy.get('#columns-5').check()
        cy.get('#columns-7').uncheck()
        cy.get('#columns-8').check()
      }

      it('should initialise the column filter values', () => {
        cy.get('.columns-section-button > .govuk-details > .govuk-details__summary').click()
        expectInitialisedColumns()
      })

      it('should show the columns count', () => {
        cy.get('.columns-section-button > .govuk-details > .govuk-details__summary').contains(
          'Show columns (5 of 8 shown)',
        )
      })

      it('should initialise the correct columns in the list table', () => {
        cy.get('#dpr-data-table > thead > tr.govuk-table__row > th').each((th, index) => {
          switch (index) {
            case 0:
              cy.wrap(th).contains('Field 1')
              break
            case 1:
              cy.wrap(th).contains('Field 2')
              break
            case 2:
              cy.wrap(th).contains('Field 3')
              break
            case 3:
              cy.wrap(th).contains('Field 6')
              break
            case 4:
              cy.wrap(th).contains('Field 7')
              break
            default:
              break
          }
        })
      })

      it('should apply the columns', () => {
        cy.get('.columns-section-button > .govuk-details > .govuk-details__summary').click()

        setColumnValues()
        expectUpdatedColumns()

        cy.get('.govuk-button-group > .govuk-button').click()

        expectUpdatedColumns()

        cy.get('#dpr-data-table > thead > tr.govuk-table__row > th').each((th, index) => {
          switch (index) {
            case 0:
              cy.wrap(th).contains('Field 2')
              break
            case 1:
              cy.wrap(th).contains('Field 5')
              break
            case 2:
              cy.wrap(th).contains('Field 6')
              break
            case 3:
              cy.wrap(th).contains('Field 8')
              break
            default:
              break
          }
        })
      })

      it('should reset the columns to their DPD defaults', () => {
        cy.get('.columns-section-button > .govuk-details > .govuk-details__summary').click()

        setColumnValues()
        expectUpdatedColumns()

        cy.get('.govuk-button-group > .govuk-button').click()

        expectUpdatedColumns()

        cy.get('.columns-section-button > .govuk-details > .govuk-details__summary').click()
        cy.get('.govuk-button-group > .govuk-link').click()

        expectInitialisedColumns()
      })

      it('should apply the columns from the URL', () => {
        cy.visit(
          `/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/${tableId}/report?columns=field1&columns=field5&columns=field8`,
        )

        cy.get('#columns').should('be.checked')
        cy.get('#columns-2').should('be.checked').should('be.disabled')
        cy.get('#columns-3').should('not.be.checked')
        cy.get('#columns-4').should('not.be.checked')
        cy.get('#columns-5').should('be.checked')
        cy.get('#columns-6').should('be.checked').should('be.disabled')
        cy.get('#columns-7').should('not.be.checked')
        cy.get('#columns-8').should('be.checked')

        cy.get('#dpr-data-table > thead > tr.govuk-table__row > th').each((th, index) => {
          switch (index) {
            case 0:
              cy.wrap(th).contains('Field 1')
              break
            case 1:
              cy.wrap(th).contains('Field 2')
              break
            case 2:
              cy.wrap(th).contains('Field 5')
              break
            case 3:
              cy.wrap(th).contains('Field 6')
              break
            case 4:
              cy.wrap(th).contains('Field 8')
              break
            default:
              break
          }
        })
      })
    })

    describe('Paging interaction', () => {
      it('should show the table totals', () => {
        cy.get('div.dpr-report-totals').contains('Showing 1 to 20 of 100 results')
        cy.get('#dpr-data-table > tbody > tr').should('have.length', 20)
      })

      it('should change the page size', () => {
        cy.get('#page-size-select').select('10')
        cy.get('div.dpr-report-totals').contains('Showing 1 to 10 of 100 results')
        cy.get('#dpr-data-table > tbody > tr').should('have.length', 10)
      })

      it('should change the page size via the URL', () => {
        cy.visit(
          `/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/${tableId}/report?pageSize=100`,
        )
        cy.get('div.dpr-report-totals').contains('100 total results')
        cy.get('#dpr-data-table > tbody > tr').should('have.length', 100)
      })

      it('should change the page', () => {
        cy.get(':nth-child(4) > .govuk-link').click()
        cy.location().should((location) => {
          expect(location.search).to.contain(`selectedPage=5`)
        })
      })

      it('should change the page via the URL', () => {
        cy.visit(
          `/embedded/platform/dpr/view-report/async/report/request-examples/request-example-success/${tableId}/report?selectedPage=3`,
        )
        cy.get('.govuk-pagination__item--current > .govuk-link').contains('3')
      })
    })
  })
})
