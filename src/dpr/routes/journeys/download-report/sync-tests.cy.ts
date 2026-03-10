import { resetFeatureFlags, updateRedisState } from 'test-app/routes/integrationTests/appStateUtils'
import { executeReportStubs } from '../../../../../cypress-tests/cypressUtils'

context('Platform sync download tests', () => {
  const path = '/embedded/platform'
  let downloadRequestFormPage: string
  let viewReportUrl: string

  before(() => {
    executeReportStubs()
    cy.task('stubDefinitionSyncReport')
    cy.task('stubSyncRequestDataSuccess')
    cy.task('stubSyncRequestDataSuccessCount')
    cy.visit(path)
    cy.findByLabelText(/Reports catalogue.*/i).within(() => {
      cy.findByRole('row', {
        name: (_, element) => {
          return Boolean(element.textContent?.includes('This is an sync report'))
        },
      }).within(() => {
        cy.findByRole('link', { name: /Load report/ }).click()
      })
    })
    cy.findByRole('heading', { name: /Sync report/, level: 1 }).should('be.visible')
    cy.url().then((url) => {
      viewReportUrl = url.replace('load-', '')
    })
  })

  beforeEach(() => {
    cy.visit(viewReportUrl)
  })

  describe('Enabling download', () => {
    it('should show the enable download button', () => {
      cy.findByLabelText(/Enable download/)
        .should('exist')
        .should('be.visible')
      cy.findByRole('heading', { name: 'To download this report' }).should('not.exist')
    })

    it('should show the download disabled message with link to form', () => {
      cy.findByLabelText(/Enable download/).click()
      cy.url().should('have.string', '/report/download-disabled')
      cy.findByRole('heading', { name: 'To download this report' }).should('be.visible')
      cy.findByRole('link', { name: 'Fill out a form' })
    })

    it('should go to the request download form', () => {
      cy.findByLabelText(/Enable download/).click()
      cy.findByRole('link', { name: 'Fill out a form' }).click()

      cy.url().then((url) => {
        downloadRequestFormPage = url
      })
      cy.url().should(
        'match',
        /\/embedded\/platform\/dpr\/download-report\/request-download\/feature-testing\/feature-testing-sync\/form/,
      )
      cy.location().should((location) => {
        expect(location.search).to.match(
          /.*reportUrl=\/embedded\/platform\/dpr\/view-report\/sync\/report\/feature-testing\/feature-testing-sync\/report/,
        )
      })
    })
  })

  describe('Requesting download', () => {
    it('should validate the required fields', () => {
      cy.visit(downloadRequestFormPage)
      cy.findByRole('alert').should('not.exist')

      cy.findAllByRole('paragraph').contains('Enter your Job title').should('not.exist')
      cy.findAllByRole('paragraph').contains('provide information on how you will use this data').should('not.exist')
      cy.get('#more-detail-error').should('not.be.visible')

      cy.findByRole('button', { name: /Submit request/ }).click()

      cy.findByRole('alert').should('exist')
      cy.findAllByRole('paragraph').contains('Enter your Job title').should('exist')
      cy.findAllByRole('paragraph').contains('provide information on how you will use this data').should('exist')
    })

    it('should submit the download request', () => {
      cy.findAllByRole('heading').contains('Sync report').should('exist')
      cy.task('stubFeatureFlagsDisabled')
      resetFeatureFlags()
      cy.visit(downloadRequestFormPage)
      cy.findByRole('textbox', { name: 'What is your Job title?' }).type('Software engineer')
      cy.findByRole('textbox', { name: 'Can you provide more detail' }).type('I like this report')

      cy.findByRole('button', { name: 'Submit request' }).click()
      cy.findByText(/You have been granted permission/).should('be.visible')

      cy.url().and(
        'match',
        /dpr\/download-report\/request-download\/feature-testing\/feature-testing-sync\/form\/submitted/,
      )
      cy.findByRole('link', { name: /Return to report to download/ }).click()
      cy.findAllByRole('heading').contains('Sync report').should('exist')
      cy.findByRole('button', { name: /download/ }).should('be.visible')

      cy.task('stubSyncReportDownload')
      cy.findByRole('button', { name: /download/ }).click()
      cy.task('checkCsvDownload4RowsValid').should('equal', true)
    })

    it('should redirect on trying to download after having the permission to download removed', () => {
      updateRedisState('downloadPermissions', [])
      cy.findByRole('heading', { name: /To download this report/ }).should('not.exist')
      cy.findByRole('button', { name: /download/ }).click()
      cy.findByRole('heading', { name: /To download this report/ }).should('be.visible')
    })
  })
})
