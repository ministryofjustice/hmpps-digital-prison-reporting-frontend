import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: List', () => {
  const path = '/embedded/platform/'

  before(() => {
    executeDashboardStubs()
  })

  describe('complete data', () => {
    beforeEach(() => {
      cy.task('stubListDashboardCompleteData')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List - Complete dataset',
        description: 'This dashboard represents example list visualisations using a complete dataset',
      })
    })

    it('should', () => {
      //
    })
  })

  describe('complete data historic', () => {
    beforeEach(() => {
      cy.task('stubListDashboardCompleteDataHistoric')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List - Complete dataset - Historic',
        description: 'This dashboard represents example list visualidations using a complete dataset of historic data.',
      })
    })

    it('should', () => {
      //
    })
  })

  describe('partial data', () => {
    beforeEach(() => {
      cy.task('stubListDashboardPartialData')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List - Partial dataset',
        description: 'This dashboard represents example list visualisations using a partial dataset',
      })
    })

    it('should', () => {
      //
    })
  })

  describe('partial data historic', () => {
    beforeEach(() => {
      cy.task('stubListDashboardPartialDataHistoric')
      cy.task('stubDashboardResultPartialDataHistoric')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'List - Partial dataset - Historic',
        description: 'This dashboard represents example list visualisations using a partial dataset of historic data',
      })
    })

    it('should', () => {
      //
    })
  })
})
