import {
  executeReportStubs,
  requestReportByNameAndDescription,
  stubBaseTasks,
  startReportRequest,
  checkA11y,
} from '../../../../../../../../cypress-tests/cypressUtils'

context('Viewing a report', () => {
  const path = '/'

  describe('list-section variants', () => {
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
        cy.findByRole('heading', { name: /First: One, Second: A 4 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: One, Second: B 6 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: Two, Second: A 3 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: Two, Second: B 7 results/ })
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
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Descending' })
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
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Descending' })
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
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'First' })
          .check()
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Descending' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

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
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'First' })
          .check()
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Descending' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

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
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Descending' })
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
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Descending' })
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
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'First' })
          .check()
        cy.findByRole('group', { name: /Direction/ })
          .findByRole('radio', { name: 'Descending' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ }).should('be.visible')
        checkA11y()

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
    })
  })
})
