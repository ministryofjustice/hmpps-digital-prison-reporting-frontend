import { resetFeatureFlags } from '../../../../../integrationTests/appStateUtils'
import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards', () => {
  const path = '/'

  describe('scorecard group - bad data', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardGroupDashboard')
      cy.task('stubDashboardResultCompleteBadData')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubMockDashboardsStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard Group - Complete data',
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

    it('should show scorecard group using list', () => {
      cy.findAllByLabelText('MetricOne score')
        .first()
        .within(() => {
          cy.findByText(/No values in dataset/).should('exist')
        })

      cy.findAllByLabelText(/Missing MetricOne score/).within(() => {
        cy.findAllByLabelText(/By Establishment ID/)
          .first()
          .should('exist')
          .within(() => {
            cy.findByLabelText('ABC')
              .should('exist')
              .within(() => {
                cy.findAllByRole('paragraph').eq(1).contains(614).should('exist')
                cy.findAllByRole('paragraph').eq(2).contains('Value for').should('exist')
              })
            cy.findByLabelText('GHI').should('exist')
            cy.findByLabelText('DEF').should('exist')
          })
      })

      cy.findAllByLabelText(/MetricTwo score/)
        .first()
        .within(() => {
          cy.findByText(/No values in dataset/).should('exist')
        })
    })

    it('should show scorecard group using columns', () => {
      cy.findByLabelText(/Establishment ID: ABC/)
        .should('exist')
        .within(() => {
          cy.findByLabelText('Has MetricOne').should('not.exist')
          cy.findByLabelText('MetricOne is missing').should('exist')
          cy.findByLabelText('Has MetricTwo').should('not.exist')
          cy.findByLabelText('MetricTwo is missing').should('exist')
          cy.findByLabelText('Has MetricThree').should('exist')
          cy.findByLabelText('MetricThree is missing').should('exist')
        })
    })
  })
})
