import { enableDownload, executeReportStubs, requestReport } from '../../../../../cypress-tests/cypressUtils'

context('Download Interactive report', () => {
  const paths = ['/', '/embedded/platform', '/embedded/platform/dpr']
  let viewReportUrl: string = ''

  const tests = (path: string) => {
    describe(`Download report from ${path}`, () => {
      before(() => {
        executeReportStubs()
        cy.task('stubDefinitionFeatureTestingInteractiveDownload')
        cy.task('stubAsyncRequestSuccessReportTablesCount')
        cy.task('stubRequestSuccessResult20')
        cy.task('stubRequestSuccessResult100')
        cy.task('stubAsyncInteractiveReportDownload')

        requestReport({
          name: 'Interactive Download Report',
          description: 'This is an interactive report for download testing',
          path,
        })

        cy.url().then((url) => {
          viewReportUrl = url
        })

        enableDownload()
      })

      beforeEach(() => {
        cy.visit(viewReportUrl)
      })

      // Passes if matches the mock - if not the test will fail
      it('should send the correct query to the download endpoint', () => {
        cy.findByRole('button', { name: /Download/ }).click()
        cy.contains(/Request was not matched/i).should('not.exist')
      })
    })
  }

  paths.forEach((route) => tests(route))
})
