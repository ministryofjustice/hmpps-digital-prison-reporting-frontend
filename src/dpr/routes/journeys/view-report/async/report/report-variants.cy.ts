import { executeReportStubs, requestReportByNameAndDescription, stubBaseTasks } from 'cypress-tests/cypressUtils'

context('Viewing a report', () => {
  const path = '/embedded/platform/'

  describe('report variants', () => {
    before(() => {
      stubBaseTasks()
      executeReportStubs()
    })

    it('should display a list-section variant', () => {
      cy.task('stubListSectionDefinitionRequest')
      cy.task('stubResultSuccessResult')

      cy.visit(path)
      requestReportByNameAndDescription({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('heading', { level: 1, name: /Sectioned/ }).should('be.visible')

      cy.findAllByRole('heading', { name: /First.*Second/ }).should('have.length', 4)
      cy.findByRole('heading', { name: /First: One, Second: A 4 results/ }).should('be.visible')
      cy.findByRole('heading', { name: /First: One, Second: B 6 results/ }).should('be.visible')
      cy.findByRole('heading', { name: /First: Two, Second: A 3 results/ }).should('be.visible')
      cy.findByRole('heading', { name: /First: Two, Second: B 7 results/ }).should('be.visible')
    })

    it('should display a parent-child variant', () => {
      cy.task('stubParentChildDefinitionRequest')
      cy.task('stubResultSuccessResultDifferentValues')

      cy.visit(path)
      requestReportByNameAndDescription({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('heading', { level: 1, name: /Parent Child Template/ }).should('be.visible')

      cy.contains('table', 'val40').within(() => {
        cy.findAllByRole('row').should('have.length', 8)
        ;[40, 41, 42, 43, 44, 45, 46].forEach((num) => {
          cy.findByRole('row', { name: new RegExp(`val${num}$`) }).should('be.visible')
        })
      })

      cy.contains('table', 'val30').within(() => {
        cy.findAllByRole('row').should('have.length', 14)
        ;[...Array(10).keys()]
          .map((i) => i + 30)
          .forEach((num) => {
            cy.findByRole('row', { name: new RegExp(`val${num}$`) }).should('be.visible')
          })
        cy.findByRole('row', { name: /val330/ }).should('be.visible')
        cy.findByRole('row', { name: /val331/ }).should('be.visible')
        cy.findByRole('row', { name: /val332/ }).should('be.visible')
      })
    })

    it('should display a summary section variant', () => {
      cy.task('stubSummarySectionDefinitionRequest')
      cy.task('stubAsyncSummaryReport')
      cy.task('stubResultSuccessResultDifferentValues')

      cy.visit(path)
      requestReportByNameAndDescription({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('heading', { level: 1, name: /Sectioned Summaries template/ }).should('be.visible')

      cy.findAllByRole('columnheader').should('have.length', 8 * 4)
      cy.get('.report-template-container').within(() => {
        cy.findAllByRole('row').should('have.length', 48)
      })
    })

    it('should display a parent child section variant', () => {
      cy.task('stubParentChildSectionDefinitionRequest')
      cy.task('stubResultSuccessResultDifferentValues')

      cy.visit(path)
      requestReportByNameAndDescription({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('heading', { level: 1, name: /Parent Child Section Template/ }).should('be.visible')

      // First child table
      cy.contains('table', 'val30').within(() => {
        cy.findAllByRole('row').should('have.length', 21)
      })
      cy.findByRole('heading', { name: /Section 1: One, Section 2: A 5 results/ }).should('be.visible')
      cy.findByRole('heading', { name: /Section 1: One, Section 2: B 2 results/ }).should('be.visible')
      cy.findByRole('heading', { name: /Section 1: Two, Section 2: A 8 results/ }).should('be.visible')
      cy.findByRole('heading', { name: /Section 1: Two, Section 2: B 5 results/ }).should('be.visible')
      // This is the best we can do for now until this report type gets refactored
      cy.findAllByRole('row', {
        name: (textContent) => {
          return textContent.includes('val')
        },
      })
        .filter((_idx, el) => [...el.querySelectorAll('td')].length === 2)
        .should('have.length', 100)
    })
  })
})
