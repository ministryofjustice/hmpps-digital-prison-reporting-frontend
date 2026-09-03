import { resetFeatureFlags } from '../../../../../integrationTests/appStateUtils'
import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards - not ts data', () => {
  const path = '/'

  describe('scorecard', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardGroupDashboard')
      cy.task('stubDashboardResultCompleteDataNoTs')
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
      cy.findAllByLabelText(/By Establishment ID/)
        .first()
        .should('exist')
        .within(() => {
          cy.findByLabelText('ABC')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).contains(424).should('exist')
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', 'background-color')
              cy.findAllByRole('paragraph').eq(2).should('not.exist')
              cy.findAllByRole('paragraph').eq(3).should('not.exist')
            })
          cy.findByLabelText('GHI')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).contains(761).should('exist')
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', `background-color`)
              cy.findAllByRole('paragraph').eq(2).should('not.exist')
              cy.findAllByRole('paragraph').eq(3).should('not.exist')
            })
          cy.findByLabelText('DEF')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).contains(401).should('exist')
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', `background-color`)
              cy.findAllByRole('paragraph').eq(2).should('not.exist')
              cy.findAllByRole('paragraph').eq(3).should('not.exist')
            })
        })
    })
  })
})
