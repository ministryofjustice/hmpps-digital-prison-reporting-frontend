import {
  executeReportStubs,
  requestReportByNameAndDescription,
  stubBaseTasks,
  startReportRequest,
} from 'cypress-tests/cypressUtils'

context('Viewing a report', () => {
  const path = '/embedded/platform/'

  describe('report variants', () => {
    before(() => {
      stubBaseTasks()
      executeReportStubs()
    })

    describe('list-section', () => {
      const listSectionReport = {
        name: 'List-section',
        description: 'list-section template',
      }

      beforeEach(() => {
        cy.task('stubListSectionDefinitionRequest')
        cy.task('stubResultSuccessResult')
      })

      it('should display a list-section variant', () => {
        cy.visit(path)
        requestReportByNameAndDescription(listSectionReport)
        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ }).should('have.length', 4)

        // Test headings exist
        cy.findByRole('heading', { name: /First: Two, Second: B 7 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: Two, Second: A 3 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: One, Second: B 6 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: One, Second: A 4 results/ })
          .should('be.visible')
          .scrollIntoView()

        // Test they only include 1 table per section
        cy.findAllByLabelText(/First: One, Second: A 4 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: One, Second: B 6 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: Two, Second: A 3 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: Two, Second: B 7 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
      })

      it('should sort the sections correctly - First/Desc', () => {
        cy.visit(path)
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'First' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ })
          .should('have.length', 4)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('First: Two, Second: B 7 results')
                break
              case 1:
                cy.wrap(heading).contains('First: Two, Second: A 3 results')
                break
              case 2:
                cy.wrap(heading).contains('First: One, Second: B 6 results')
                break
              case 3:
                cy.wrap(heading).contains('First: One, Second: A 4 results')
                break
              default:
                break
            }
          })
      })

      it('should sort the sections correctly - First/Asc', () => {
        cy.visit(path)
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'First' })
          .check()
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Ascending' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ })
          .should('have.length', 4)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('First: One, Second: A 4 results')
                break
              case 1:
                cy.wrap(heading).contains('First: One, Second: B 6 results')
                break
              case 2:
                cy.wrap(heading).contains('First: Two, Second: A 3 results')
                break
              case 3:
                cy.wrap(heading).contains('First: Two, Second: B 7 results')
                break
              default:
                break
            }
          })
      })

      it('should sort the sections correctly - Second/Desc', () => {
        cy.visit(path)
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'Second' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ })
          .should('have.length', 4)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('First: Two, Second: B 7 results')
                break
              case 1:
                cy.wrap(heading).contains('First: One, Second: B 6 results')
                break
              case 2:
                cy.wrap(heading).contains('First: Two, Second: A 3 results')
                break
              case 3:
                cy.wrap(heading).contains('First: One, Second: A 4 results')
                break
              default:
                break
            }
          })
      })

      it('should sort the sections correctly - Second/Asc', () => {
        cy.visit(path)
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'Second' })
          .check()
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Ascending' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ })
          .should('have.length', 4)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('First: One, Second: A 4 results')
                break
              case 1:
                cy.wrap(heading).contains('First: Two, Second: A 3 results')
                break
              case 2:
                cy.wrap(heading).contains('First: One, Second: B 6 results')
                break
              case 3:
                cy.wrap(heading).contains('First: Two, Second: B 7 results')
                break
              default:
                break
            }
          })
      })

      it('should navigate the report using the section anchors', () => {
        cy.visit(path)
        requestReportByNameAndDescription(listSectionReport)

        cy.findAllByLabelText(/First: Two, Second: B 7 results/)
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.findAllByRole('link', { name: /Next/ }).click()
          })

        cy.findByRole('heading', { name: /First: Two, Second: B 7 results/ }).should('not.be.visible')
        cy.findByRole('heading', { name: /First: Two, Second: A 3 results/ }).should('be.visible')

        cy.findAllByLabelText(/First: Two, Second: A 3 results/)
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.findAllByRole('link', { name: /Next/ }).click()
          })

        cy.findByRole('heading', { name: /First: Two, Second: A 3 results/ }).should('not.be.visible')
        cy.findByRole('heading', { name: /First: One, Second: B 6 results/ }).should('be.visible')

        cy.findAllByLabelText(/First: One, Second: B 6 results/)
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.findAllByRole('link', { name: /Prev/ }).click()
          })

        cy.findByRole('heading', { name: /First: Two, Second: A 3 results/ }).should('be.visible')

        cy.findAllByLabelText(/First: Two, Second: A 3 results/)
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.findAllByRole('link', { name: /Prev/ }).click()
          })

        cy.findByRole('heading', { name: /First: Two, Second: B 7 results/ }).should('be.visible')

        cy.findAllByLabelText(/First: Two, Second: B 7 results/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('link', { name: /Go to End/ }).click()
          })

        cy.findByRole('heading', { name: /First: One, Second: A 4 results/ }).should('be.visible')

        cy.findAllByLabelText(/First: Two, Second: B 7 results/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('link', { name: /Return to Top/ }).click()
          })

        cy.findByRole('heading', { name: /First: Two, Second: B 7 results/ }).should('be.visible')
        cy.findByRole('heading', { name: /First: One, Second: A 4 results/ }).should('not.be.visible')
      })
    })

    describe('list-section - with dates', () => {
      const listSectionReport = {
        name: 'List-section - with dates',
        description: 'list-section template',
      }

      beforeEach(() => {
        cy.task('stubListSectionDefinitionRequest')
        cy.task('stubListSectionResultWithDates')
      })

      it('should display a list-section variant', () => {
        cy.visit(path)
        requestReportByNameAndDescription(listSectionReport)
        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ }).should('have.length', 6)

        // Test headings exist
        cy.findByRole('heading', { name: /First: 01\/03\/26, Second: B 4 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: 01\/03\/26, Second: A 3 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: 02\/02\/26, Second: B 3 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: 02\/02\/26, Second: A 2 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: 03\/01\/26, Second: B 3 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: 03\/01\/26, Second: A 2 results/ })
          .should('be.visible')
          .scrollIntoView()

        // Test they only include 1 table per section
        cy.findAllByLabelText(/First: 01\/03\/26, Second: B 4 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: 01\/03\/26, Second: A 3 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: 02\/02\/26, Second: B 3 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: 02\/02\/26, Second: A 2 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: 03\/01\/26, Second: B 3 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: 03\/01\/26, Second: A 2 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
      })

      it('should sort the sections correctly - First/Desc', () => {
        cy.visit(path)
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'First' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ })
          .should('have.length', 6)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('First: 01/03/26, Second: B 4 results')
                break
              case 1:
                cy.wrap(heading).contains('First: 01/03/26, Second: A 3 results')
                break
              case 2:
                cy.wrap(heading).contains('First: 02/02/26, Second: B 3 results')
                break
              case 3:
                cy.wrap(heading).contains('First: 02/02/26, Second: A 2 results')
                break
              case 4:
                cy.wrap(heading).contains('First: 03/01/26, Second: B 3 results')
                break
              case 5:
                cy.wrap(heading).contains('First: 03/01/26, Second: A 2 results')
                break
              default:
                break
            }
          })
      })

      it('should sort the sections correctly - First/Asc', () => {
        cy.visit(path)
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'First' })
          .check()
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Ascending' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ })
          .should('have.length', 6)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('First: 03/01/26, Second: A 2 results')
                break
              case 1:
                cy.wrap(heading).contains('First: 03/01/26, Second: B 3 results')
                break
              case 2:
                cy.wrap(heading).contains('First: 02/02/26, Second: A 2 results')
                break
              case 3:
                cy.wrap(heading).contains('First: 02/02/26, Second: B 3 results')
                break
              case 4:
                cy.wrap(heading).contains('First: 01/03/26, Second: A 3 results')
                break
              case 5:
                cy.wrap(heading).contains('First: 01/03/26, Second: B 4 results')
                break
              default:
                break
            }
          })
      })

      it('should sort the sections correctly - Second/Desc', () => {
        cy.visit(path)
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'Second' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ })
          .should('have.length', 6)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('First: 01/03/26, Second: B 4 results')
                break
              case 1:
                cy.wrap(heading).contains('First: 02/02/26, Second: B 3 results')
                break
              case 2:
                cy.wrap(heading).contains('First: 03/01/26, Second: B 3 results')
                break
              case 3:
                cy.wrap(heading).contains('First: 01/03/26, Second: A 3 results')
                break
              case 4:
                cy.wrap(heading).contains('First: 02/02/26, Second: A 2 results')
                break
              case 5:
                cy.wrap(heading).contains('First: 03/01/26, Second: A 2 results')
                break
              default:
                break
            }
          })
      })

      it('should sort the sections correctly - Second/Asc', () => {
        cy.visit(path)
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'Second' })
          .check()
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Ascending' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ })
          .should('have.length', 6)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('First: 03/01/26, Second: A 2 results')
                break
              case 1:
                cy.wrap(heading).contains('First: 02/02/26, Second: A 2 results')
                break
              case 2:
                cy.wrap(heading).contains('First: 01/03/26, Second: A 3 results')
                break
              case 3:
                cy.wrap(heading).contains('First: 03/01/26, Second: B 3 results')
                break
              case 4:
                cy.wrap(heading).contains('First: 02/02/26, Second: B 3 results')
                break
              case 5:
                cy.wrap(heading).contains('First: 01/03/26, Second: B 4 results')
                break
              default:
                break
            }
          })
      })
    })

    describe('List-section - with visible section columns', () => {
      let listSectionReportUrl = ''

      const listSectionReport = {
        name: 'List-section',
        description: 'list-section template',
      }

      before(() => {
        cy.task('stubListSectionDefinitionRequest')
        cy.task('stubResultSuccessResult')

        cy.visit(path)
        requestReportByNameAndDescription(listSectionReport)

        cy.findByRole('heading', { level: 1, name: /List-section/ }).should('be.visible')
        cy.injectAxe()
        cy.checkA11y()

        cy.url().then((url) => {
          listSectionReportUrl = url
        })
      })

      beforeEach(() => {
        cy.visit(listSectionReportUrl)
      })

      it('should show the correct section headers when the columns are toggled off', () => {
        cy.findAllByLabelText(/First: Two, Second: B/)
          .eq(1)
          .within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('columnheader').should('have.length', 4)
              cy.findAllByRole('columnheader').eq(0).contains('Field 1')
              cy.findAllByRole('columnheader').eq(1).contains('Field 2')
              cy.findAllByRole('columnheader').eq(2).contains('Field 3')
              cy.findAllByRole('columnheader').eq(3).contains('Field 4')
            })
          })

        // Update the columns
        cy.findAllByRole('group')
          .contains(/Show columns/)
          .should('be.visible')
          .click()

        cy.findByRole('checkbox', { name: 'Field 2' }).uncheck()
        cy.findByRole('checkbox', { name: 'First' }).check()
        cy.findByRole('checkbox', { name: 'Second' }).check()

        cy.findByRole('button', { name: 'Apply columns' }).click()

        // Validate the section heading hasn't changed and check visible cols
        cy.findAllByLabelText(/First: Two, Second: B/)
          .eq(1)
          .within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('columnheader').should('have.length', 5)
              cy.findAllByRole('columnheader').eq(0).contains('Field 1')
              cy.findAllByRole('columnheader').eq(1).contains('Field 3')
              cy.findAllByRole('columnheader').eq(2).contains('Field 4')
              cy.findAllByRole('columnheader').eq(3).contains('First')
              cy.findAllByRole('columnheader').eq(4).contains('Second')
            })
          })

        // Remove both section columns
        cy.findAllByRole('group')
          .contains(/Show columns/)
          .should('be.visible')
          .click()

        cy.findByRole('checkbox', { name: 'First' }).uncheck()
        cy.findByRole('checkbox', { name: 'Second' }).uncheck()

        cy.findByRole('button', { name: 'Apply columns' }).click()

        // Re-validate the section heading hasn't changed and check visible cols
        cy.findAllByLabelText(/First: Two, Second: B/)
          .eq(1)
          .within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('columnheader').should('have.length', 3)
              cy.findAllByRole('columnheader').eq(0).contains('Field 1')
              cy.findAllByRole('columnheader').eq(1).contains('Field 3')
              cy.findAllByRole('columnheader').eq(2).contains('Field 4')
            })
          })
      })

      it('should enforce section columns are always part of downloaded data', () => {
        // Validate visible columns
        cy.findAllByLabelText(/First: Two, Second: B/)
          .eq(1)
          .within(() => {
            cy.findByRole('table').within(() => {
              cy.findAllByRole('columnheader').should('have.length', 4)
              cy.findAllByRole('columnheader').eq(0).contains('Field 1')
              cy.findAllByRole('columnheader').eq(1).contains('Field 2')
              cy.findAllByRole('columnheader').eq(2).contains('Field 3')
              cy.findAllByRole('columnheader').eq(3).contains('Field 4')
            })
          })

        // Validate state of checkboxes
        cy.findAllByRole('group')
          .contains(/Show columns/)
          .should('be.visible')
          .click()

        cy.findByRole('checkbox', { name: 'First' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Second' }).should('not.be.checked')

        // Check download form contents and validate it contains the section columns, even though they are not visible
        cy.get('#download-report-form').within(() => {
          cy.get('input[name="cols"]')
            .invoke('val')
            .then((value) => {
              const parsed = JSON.parse(<string>value)
              expect(parsed).to.be.an('array')
              expect(parsed).to.include.members(['field1', 'field2', 'field3', 'field4', 'section1', 'section2'])
            })
        })

        cy.findByRole('checkbox', { name: 'First' }).check()
        cy.findByRole('checkbox', { name: 'Second' }).check()

        cy.findByRole('button', { name: 'Apply columns' }).click()

        // Check again that download form contents and validate it contains the section columns, even though they are not visible
        cy.get('#download-report-form').within(() => {
          cy.get('input[name="cols"]')
            .invoke('val')
            .then((value) => {
              const parsed = JSON.parse(<string>value)
              expect(parsed).to.be.an('array')
              expect(parsed).to.include.members(['field1', 'field2', 'field3', 'field4', 'section1', 'section2'])
            })
        })

        // Update columns again
        cy.findAllByRole('group')
          .contains(/Show columns/)
          .should('be.visible')
          .click()

        cy.findByRole('checkbox', { name: 'First' }).uncheck()
        cy.findByRole('checkbox', { name: 'Second' }).uncheck()
        cy.findByRole('checkbox', { name: 'Field 4' }).uncheck()

        cy.findByRole('button', { name: 'Apply columns' }).click()

        // Check again that download form contents and validate it contains the section columns, even though they are not visible
        cy.get('#download-report-form').within(() => {
          cy.get('input[name="cols"]')
            .invoke('val')
            .then((value) => {
              const parsed = JSON.parse(<string>value)
              expect(parsed).to.be.an('array')
              expect(parsed).to.include.members(['field1', 'field2', 'field3', 'section1', 'section2'])
            })
        })
      })
    })

    describe('summary-section', () => {
      it('should display a summary section variant', () => {
        cy.task('stubSummarySectionDefinitionRequest')
        cy.task('stubAsyncSummaryReport')
        cy.task('stubResultSuccessResultDifferentValues')

        cy.visit(path)
        requestReportByNameAndDescription({ name: 'Summary-section', description: 'Summary-section template' })
        cy.findByRole('heading', { level: 1, name: /Summary-section/ }).should('be.visible')

        cy.findAllByLabelText(/First: One, Second: A/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('table')
              .should('have.length', 2)
              .each((table) => {
                cy.wrap(table).within(() => {
                  cy.findAllByRole('row').should('have.length', 5)
                })
              })
          })

        cy.findAllByLabelText(/First: One, Second: B/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('table')
              .should('have.length', 2)
              .each((table) => {
                cy.wrap(table).within(() => {
                  cy.findAllByRole('row').should('have.length', 7)
                })
              })
          })

        cy.findAllByLabelText(/First: Two, Second: A/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('table')
              .should('have.length', 2)
              .each((table) => {
                cy.wrap(table).within(() => {
                  cy.findAllByRole('row').should('have.length', 4)
                })
              })
          })

        cy.findAllByLabelText(/First: Two, Second: B/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('table')
              .should('have.length', 2)
              .each((table) => {
                cy.wrap(table).within(() => {
                  cy.findAllByRole('row').should('have.length', 8)
                })
              })
          })
      })
    })

    describe('parent-child-section', () => {
      const ParentChildSectionReport = {
        name: 'Parent-child-section',
        description: 'Parent-child-section template',
      }

      beforeEach(() => {
        cy.task('stubParentChildSectionDefinitionRequest')
        cy.task('stubResultSuccessResultDifferentValues')
      })

      it('should display a parent child section variant', () => {
        cy.visit(path)
        requestReportByNameAndDescription(ParentChildSectionReport)
        cy.findByRole('heading', { level: 1, name: /Parent-child-section/ }).should('be.visible')

        cy.findByRole('heading', { name: /Section 1: One, Section 2: A 5 results/ })
          .scrollIntoView()
          .should('be.visible')
        cy.findByRole('heading', { name: /Section 1: One, Section 2: B 2 results/ })
          .scrollIntoView()
          .should('be.visible')
        cy.findByRole('heading', { name: /Section 1: Two, Section 2: A 8 results/ })
          .scrollIntoView()
          .should('be.visible')
        cy.findByRole('heading', { name: /Section 1: Two, Section 2: B 5 results/ })
          .scrollIntoView()
          .should('be.visible')

        cy.findAllByLabelText('Section 1: One, Section 2: A 5 results')
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 10)

            cy.findAllByLabelText('Parent 1')
              .eq(0)
              .within(() => {
                cy.findAllByRole('table').should('have.length', 2)

                // parent
                cy.findAllByLabelText('Parent 1')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 2)
                    })
                  })

                // Child
                cy.findAllByLabelText('Child Report')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 21)
                    })
                  })
              })
          })

        cy.findAllByLabelText('Section 1: Two, Section 2: A 8 results')
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 16)

            cy.findAllByLabelText('Parent 1')
              .eq(0)
              .within(() => {
                cy.findAllByRole('table').should('have.length', 2)

                // parent
                cy.findAllByLabelText('Parent 1')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 2)
                    })
                  })

                // Child
                cy.findAllByLabelText('Child Report')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 21)
                    })
                  })
              })
          })
      })

      it('should sort the sections correctly', () => {
        cy.visit(path)
        startReportRequest(ParentChildSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'Section 2' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /Parent-child-section/ }).should('be.visible')

        cy.findAllByRole('heading', { name: /Section 1.*Section 2/ })
          .should('have.length', 4)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('Section 1: Two, Section 2: B 5 results')
                break
              case 1:
                cy.wrap(heading).contains('Section 1: One, Section 2: B 2 results')
                break
              case 2:
                cy.wrap(heading).contains('Section 1: Two, Section 2: A 8 results')
                break
              case 3:
                cy.wrap(heading).contains('Section 1: One, Section 2: A 5 results')
                break
              default:
                break
            }
          })
      })
    })

    describe('parent-child', () => {
      it('should display a parent-child variant', () => {
        cy.task('stubParentChildDefinitionRequest')
        cy.task('stubResultSuccessResultDifferentValues')

        cy.visit(path)
        requestReportByNameAndDescription({ name: 'Parent-child', description: 'Parent-child template' })
        cy.findByRole('heading', { level: 1, name: /Parent-child/ }).should('be.visible')

        // Parent child group
        cy.findAllByLabelText('Parent 1')
          .eq(0)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 3)

            // parent
            cy.findAllByLabelText('Parent 1')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 2)
                })
              })

            // child
            cy.findAllByLabelText('Child Report')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 8)
                })
              })

            // child 2
            cy.findAllByLabelText('Child Report 2')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 8)
                })
              })
          })

        // Parent child group
        cy.findAllByLabelText('Parent 8')
          .eq(0)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 3)

            // parent
            cy.findAllByLabelText('Parent 8')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 2)
                })
              })

            // child
            cy.findAllByLabelText('Child Report')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 14)
                })
              })

            // child 2
            cy.findAllByLabelText('Child Report 2')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 14)
                })
              })
          })
      })
    })
  })
})
