import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: List', () => {
  const path = '/'

  describe('invalid definitions', () => {
    describe('Invalid vis definition', () => {
      beforeEach(() => {
        cy.task('resetStubs')
        executeDashboardStubs()

        cy.task('stubListDashboardDefinitionInvalidVisDefinitions')
        cy.task('stubDashboardResult')

        cy.visit(path)

        requestReportByNameAndDescription({
          name: 'List - Invalid vis definition',
          description: 'Invalid vis definition',
        })
      })

      it('should show an appropriate error message', () => {
        cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
        cy.findAllByRole('paragraph').eq(1).contains('Schema validation error: measures is required')
      })
    })

    describe('Invalid definition', () => {
      beforeEach(() => {
        cy.task('resetStubs')
        executeDashboardStubs()
        cy.task('stubListDashboardDefinitionInvalid')
        cy.task('stubDashboardResult')
        cy.visit(path)

        requestReportByNameAndDescription({
          name: 'Invalid definition',
          description: 'Missing sections array',
        })
      })

      it('should show an appropriate error message', () => {
        cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
        cy.findAllByRole('paragraph')
          .eq(1)
          .contains('Schema validation error: Dashboard definition: Sections is required')
      })
    })
  })
})
