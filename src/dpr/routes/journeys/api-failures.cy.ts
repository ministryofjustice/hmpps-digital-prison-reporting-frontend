import {
  executeDashboardStubs,
  executeReportStubs,
  startReportRequest,
  stubBaseTasks,
  stubDefinitionsTasks,
} from 'cypress-tests/cypressUtils'
import { resetDefinitionsCheck, setIsProbationService } from 'test-app/routes/integrationTests/appStateUtils'

context('Try to run the app with failing and broken api endpoints', () => {
  const path = '/embedded/platform'
  const homePageLink = 'Go to digital services home page'

  beforeEach(() => {
    stubBaseTasks()
    setIsProbationService()
  })

  describe('erroring endpoints - reports', () => {
    it('should cope with definitions list failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getDefinitionSummariesFailure')
      resetDefinitionsCheck()

      cy.visit(path)

      cy.findByRole('heading', { name: /Sorry, there is a problem with the service/ }).should('be.visible')
      cy.findByRole('link', { name: homePageLink }).should('be.visible')
    })

    it('should hide the digital services home page link on service errors for probation services', () => {
      setIsProbationService(true)
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getDefinitionSummariesFailure')
      resetDefinitionsCheck()

      cy.visit(path)

      cy.findByRole('heading', { name: /Sorry, there is a problem with the service/ }).should('be.visible')
      cy.findByRole('link', { name: homePageLink }).should('not.exist')
    })

    it('should cope with definitions list being unauthd', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getDefinitionSummariesUnauthenticatedFailure')
      resetDefinitionsCheck()

      cy.visit(path)

      cy.findByRole('heading', { name: /Sorry, there is a problem with authenticating your request/ }).should(
        'be.visible',
      )
      cy.findByRole('link', { name: homePageLink }).should('be.visible')
    })

    it('should hide the digital services home page link on auth errors for probation services', () => {
      setIsProbationService(true)
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getDefinitionSummariesUnauthenticatedFailure')
      resetDefinitionsCheck()

      cy.visit(path)

      cy.findByRole('heading', { name: /Sorry, there is a problem with authenticating your request/ }).should(
        'be.visible',
      )
      cy.findByRole('link', { name: homePageLink }).should('not.exist')
    })

    it('should cope with single definition endpoint failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getSingleDefinitionFailure')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with single definition failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getSingleDefinitionFailure')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with single definition variant failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getSingleDefinitionVariantFailure')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
      cy.findByText(
        /Please take note of the following meta data and use in any correspondence with the support team to help speed up your request:/,
      ).should('be.visible')
    })

    it('should cope with single definition variant failing with a 403 error', () => {
      executeReportStubs()
      cy.task('getSingleDefinitionVariantUnauthorizedFailure')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
      cy.findByText(
        /Ensure you have the correct user role to access this report. If you need assistance, please contact the service desk, providing them with the following meta data to help speed up your request:/,
      ).should('be.visible')
    })

    it('should cope with count failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getAsyncCountFailure')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with requestAsyncReport failing with a 500 error', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('requestAsyncReportFailure500')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')

      cy.findByText(
        /Please take note of the following meta data and use in any correspondence with the support team to help speed up your request:/,
      ).should('be.visible')
    })

    it('should cope with requestAsyncReport failing with a 403 error', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('requestAsyncReportFailure403')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
      cy.findByText(
        /Ensure you have the correct user role to access this report. If you need assistance, please contact the service desk, providing them with the following meta data to help speed up your request:/,
      ).should('be.visible')
    })

    it('should cope with cancelAsyncRequest failing', () => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.task('stubViewAsyncReportingResults')
      cy.task('stubRequestSuccessReportTablesCount')
      cy.task('stubAsyncRequestSuccessReportTablesCount')
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('cancelAsyncRequestFailure')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('button', { name: /Cancel request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with getAsyncReport failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubRequestSuccessResult20')
      cy.task('getAsyncReportFailure')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with getAsyncSummaryReport failing', () => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.task('stubViewAsyncReportingResults')
      cy.task('getAsyncSummaryReportFailure')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with getAsyncReportStatus failing', () => {
      executeReportStubs()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('getAsyncReportStatusFailure')

      cy.visit(path)
      startReportRequest({ name: 'Successful Report', description: 'this will succeed' })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })
  })

  describe('erroring endpoints - dashboards', () => {
    it('should cope with single definition endpoint failing', () => {
      executeDashboardStubs()
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubTestDashboard8')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('getSingleDashboardFailure')

      cy.visit(path)
      startReportRequest({ name: 'Test Dashboard', description: 'Test Dashboard used for testing' })

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with requestAsyncDashboard failing', () => {
      executeDashboardStubs()
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubTestDashboard8')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('requestAsyncDashboardFailure')

      cy.visit(path)
      startReportRequest({ name: 'Test Dashboard', description: 'Test Dashboard used for testing' })
      cy.findByRole('button', { name: 'Request dashboard' }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with getAsyncDashboard failing', () => {
      executeDashboardStubs()
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubTestDashboard8')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('getAsyncDashboardFailure')

      cy.visit(path)
      startReportRequest({ name: 'Test Dashboard', description: 'Test Dashboard used for testing' })
      cy.findByRole('button', { name: 'Request dashboard' }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with getAsyncDashboardStatus failing', () => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.task('stubViewAsyncResults')
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubTestDashboard8')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('getAsyncDashboardStatusFailure')

      cy.visit(path)
      startReportRequest({ name: 'Test Dashboard', description: 'Test Dashboard used for testing' })
      cy.findByRole('button', { name: 'Request dashboard' }).click()

      cy.findByRole('heading', { name: /Your report has failed to generate/ }).should('be.visible')
    })

    it('should cope with cancelAsyncRequest failing', () => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.task('stubReportsStartedStatus')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubViewAsyncResults')
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubTestDashboard8')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('cancelAsyncRequestDashboardFailure')

      cy.visit(path)
      startReportRequest({ name: 'Test Dashboard', description: 'Test Dashboard used for testing' })
      cy.findByRole('button', { name: /Request/ }).click()

      cy.findByRole('button', { name: /Cancel request/ }).click()
      cy.task('stubMockDashboardsStatusFinished')
      cy.findByRole('heading', { name: /Failed to abort request/ }).should('be.visible')
    })
  })
})
