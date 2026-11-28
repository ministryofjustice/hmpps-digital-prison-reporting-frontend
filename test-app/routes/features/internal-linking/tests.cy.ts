import { executeReportStubs } from 'cypress-tests/cypressUtils'
import { setReportToExpired } from 'test-app/routes/integrationTests/appStateUtils'

context('Internal linking feature', () => {
  const path = '/features/internal-linking'

  before(() => {
    executeReportStubs()
    cy.task('stubDefinitionRequestExamplesSuccess')
    cy.task('stubRequestSuccessResult20')
  })

  beforeEach(() => {
    cy.visit(path)
  })

  describe('linking to a report with no filters applied', () => {
    it('should request and show the report', () => {
      cy.findByRole('link', { name: 'No filters applied' }).click()

      cy.findByRole('heading', { level: 1, name: 'Report request status' }).should('be.visible')

      cy.findByRole('heading', { level: 1, name: 'Successful Report Successful Report' }).should('be.visible')
    })

    it('should not request and go straight to the report', () => {
      cy.findByRole('link', { name: 'No filters applied' }).click()

      cy.findByRole('heading', { level: 1, name: 'Report request status' }).should('not.exist')

      cy.findByRole('heading', { level: 1, name: 'Successful Report Successful Report' }).should('be.visible')
    })

    it('should request the report if it has expired', () => {
      setReportToExpired({ internalRequestId: 'uniqueInternalRequestId1' })

      cy.findByRole('link', { name: 'No filters applied' }).click()

      cy.findByRole('heading', { level: 1, name: 'Report request status' }).should('not.exist')

      cy.findByRole('heading', { level: 1, name: 'Successful Report Successful Report' }).should('be.visible')
    })
  })

  describe('linking to a report with pre-request filters applied', () => {
    it('request and show the report', () => {
      cy.findByRole('link', { name: 'Pre-request filters applied' }).click()

      cy.findByRole('heading', { level: 1, name: 'Successful Report Successful Report' }).should('be.visible')

      cy.findAllByRole('group').contains('Report details').should('be.visible').click()

      cy.findAllByRole('cell', { name: 'Applied Filters:' }).should('exist')

      cy.findAllByRole('listitem').each((item, i) => {
        switch (i) {
          case 0:
            cy.wrap(item).contains('Field 1: Value 1.1')
            break
          case 1:
            cy.wrap(item).contains('Field 3: 01/02/2004 - 04/05/2005')
            break
          case 2:
            cy.wrap(item).contains('Field 7: 02/02/2005')
            break
          case 3:
            cy.wrap(item).contains('Field 8: Value 8.1, Value 8.4')
            break
          case 4:
            cy.wrap(item).contains('Sort column: Field 2')
            break
          case 5:
            cy.wrap(item).contains('Sort direction: Descending')
            break
          default:
            break
        }
      })
    })
  })
})
