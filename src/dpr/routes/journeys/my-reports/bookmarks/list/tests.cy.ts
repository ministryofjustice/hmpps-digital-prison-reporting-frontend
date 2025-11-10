import { setRedisState } from '../../../../../../../test-app/routes/integrationTests/redisStateTestUtils'
import { ReportType } from '../../../../../types/UserReports'

context('Bookmarks list', () => {
  const path = '/embedded/platform/dpr/my-reports/bookmarks/list'

  before(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubSingleSummaries')
    cy.task('stubDefinitionRequestExamplesSuccess')
  })

  it('is accessible', () => {
    setRedisState({
      requestedReports: [],
      recentlyViewedReports: [],
      bookmarks: [
        {
          reportId: 'request-examples',
          id: 'request-examples',
          variantId: 'request-example-success',
          type: ReportType.REPORT,
        },
      ],
      downloadPermissions: [{ reportId: 'request-examples', id: 'request-example-success' }],
      defaultFilters: [],
    })
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
    cy.findAllByText(/Successful Report/).should('be.visible')
  })
})
