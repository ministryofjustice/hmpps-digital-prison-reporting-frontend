import { resetFeatureFlags } from '../../../../../../routes/integrationTests/appStateUtils'
import {
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecard Group: Valid data', () => {
  const path = '/'

  describe('scorecard group with valid data', () => {
    let scorecardGroupUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardGroupDashboard')
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubMockDashboardsStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard Group - Complete data',
        description: 'Scorecard examples',
      })

      cy.findByRole('heading', { level: 1, name: /Scorecard/ }).should('be.visible')

      cy.url().then(url => {
        scorecardGroupUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(scorecardGroupUrl)
    })

    it('should show scorecard group using list', () => {
      cy.findAllByLabelText(/By Establishment ID/)
        .first()
        .should('exist')
        .within(() => {
          cy.findByLabelText('ABC')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).contains(533).should('exist')
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', 'background-color')
              cy.findAllByRole('paragraph').eq(2).contains('from').should('exist')
              cy.findAllByRole('paragraph').eq(3).contains('Value for').should('exist')
            })
          cy.findByLabelText('GHI')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).contains(484).should('exist')
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', `background-color`)
              cy.findAllByRole('paragraph').eq(2).contains('from').should('exist')
              cy.findAllByRole('paragraph').eq(3).contains('Value for').should('exist')
            })
          cy.findByLabelText('DEF')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).contains(406).should('exist')
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', `background-color`)
              cy.findAllByRole('paragraph').eq(2).contains('from').should('exist')
              cy.findAllByRole('paragraph').eq(3).contains('Value for').should('exist')
            })
        })

      cy.findAllByLabelText(/By Establishment ID/)
        .eq(3)
        .should('exist')
        .within(() => {
          cy.findByLabelText('ABC').should('exist')
          cy.findByLabelText('GHI').should('exist')
          cy.findByLabelText('DEF').should('exist')
        })
    })

    it('should show scorecard group using columns', () => {
      cy.findByLabelText(/Establishment ID: ABC/)
        .should('exist')
        .within(() => {
          cy.findByLabelText('Has MetricOne').should('exist')
          cy.findByLabelText('MetricOne is missing').should('exist')
          cy.findByLabelText('Has MetricTwo').should('exist')
          cy.findByLabelText('MetricTwo is missing').should('exist')
          cy.findByLabelText('Has MetricThree').should('exist')
          cy.findByLabelText('MetricThree is missing').should('exist')
        })
    })
  })
})
