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
      requestReportByNameAndDescription({
        name: 'List-section',
        description: 'list-section template',
      })
      cy.findByRole('heading', { level: 1, name: /List-section/ })
      cy.findAllByRole('heading', { name: /First.*Second/ }).should('have.length', 4)
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
    })

    it('should display a parent-child variant', () => {
      cy.task('stubParentChildDefinitionRequest')
      cy.task('stubResultSuccessResultDifferentValues')

      cy.visit(path)
      requestReportByNameAndDescription({ name: 'Parent-child', description: 'Parent-child template' })
      cy.findByRole('heading', { level: 1, name: /Parent-child/ }).should('be.visible')

      // TODO: this test
    })

    it('should display a summary section variant', () => {
      cy.task('stubSummarySectionDefinitionRequest')
      cy.task('stubAsyncSummaryReport')
      cy.task('stubResultSuccessResultDifferentValues')

      cy.visit(path)
      requestReportByNameAndDescription({ name: 'Summary-section', description: 'Summary-section template' })
      cy.findByRole('heading', { level: 1, name: /Summary-section/ }).should('be.visible')

      // TODO: this test
    })

    it('should display a parent child section variant', () => {
      cy.task('stubParentChildSectionDefinitionRequest')
      cy.task('stubResultSuccessResultDifferentValues')

      cy.visit(path)
      requestReportByNameAndDescription({ name: 'Parent-child-section', description: 'Parent-child-section template' })
      cy.findByRole('heading', { level: 1, name: /Parent-child-section/ }).should('be.visible')

      // First child table
      cy.findByRole('heading', { name: /Section 1: One, Section 2: A 5 results/ })
        .should('be.visible')
        .scrollIntoView()
      cy.findByRole('heading', { name: /Section 1: One, Section 2: B 2 results/ })
        .should('be.visible')
        .scrollIntoView()
      cy.findByRole('heading', { name: /Section 1: Two, Section 2: A 8 results/ })
        .should('be.visible')
        .scrollIntoView()
      cy.findByRole('heading', { name: /Section 1: Two, Section 2: B 5 results/ })
        .should('be.visible')
        .scrollIntoView()

      // TODO: more tests
    })
  })
})
