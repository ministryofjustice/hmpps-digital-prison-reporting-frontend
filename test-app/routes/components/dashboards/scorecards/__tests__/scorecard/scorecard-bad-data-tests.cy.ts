import { resetFeatureFlags } from '../../../../../integrationTests/appStateUtils'
import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards', () => {
  const path = '/'

  describe('scorecard - bad data', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardDashboardBadData')
      cy.task('stubDashboardResultCompleteBadData')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubMockDashboardsStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard - Complete data - missing or bad data',
        description: 'Scorecard examples',
      })

      cy.findByRole('heading', { level: 1, name: /Scorecard/ }).should('be.visible')

      cy.url().then(url => {
        completeDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeDashboardUrl)
    })

    it('is accessible', () => {
      checkA11y()
    })

    it('should show the correct information on a scorecard when the value is a string', () => {
      cy.findAllByLabelText(/No of prisoners with MetricThree/)
        .first()
        .should('be.visible')
        .within(() => {
          // Metric
          cy.findAllByRole('paragraph').eq(1).contains(680).should('exist')

          // Colour
          cy.findAllByRole('paragraph').eq(1).should('have.css', 'background-color').should('exist')

          // date
          cy.findAllByRole('paragraph').eq(2).contains('Value for').should('exist')
        })
    })

    it('should not show the scorecard when the value is undefined', () => {
      cy.findAllByLabelText(/No of prisoners with MetricOne/).should('not.exist')
    })

    it('should not show the scorecard when raw is undefined', () => {
      cy.findAllByLabelText(/No of prisoners with MetricTwo/).should('not.exist')
    })
  })

  describe('scorecard - bad data - duplicates', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardDashboardBadData')
      cy.task('stubDashboardResultCompleteBadDataDuplicates')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubMockDashboardsStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard - Complete data - missing or bad data',
        description: 'Scorecard examples',
      })

      cy.findByRole('heading', { level: 1, name: /Scorecard/ }).should('be.visible')

      cy.url().then(url => {
        completeDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeDashboardUrl)
    })

    it('is accessible', () => {
      checkA11y()
    })

    it('should use the first duplicate row as the data point', () => {
      cy.findAllByLabelText(/Full row of scorecards - duplicates/).within(() => {
        cy.findAllByLabelText(/No of prisoners with MetricThree/)
          .first()
          .should('be.visible')
          .within(() => {
            cy.findAllByRole('paragraph').eq(1).contains(680).should('exist')
          })

        cy.findAllByLabelText(/No of prisoners with MetricOne/)
          .first()
          .should('be.visible')
          .within(() => {
            cy.findAllByRole('paragraph').eq(1).contains(533).should('exist')
          })

        cy.findAllByLabelText(/No of prisoners with MetricTwo/).should('not.exist')
      })
    })
  })
})
