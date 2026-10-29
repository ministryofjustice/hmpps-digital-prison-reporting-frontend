import { resetFeatureFlags } from '../../../../../integrationTests/appStateUtils'
import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecard Group: No ts data', () => {
  const path = '/'

  describe('scorecard group tests with not timestamp in dataset', () => {
    let dashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubScorecardGroupDashboardDefinitionNoTs')
      cy.task('stubDashboardResultNoTs')
      cy.task('stubMockDashboardStatusStarted')
      cy.task('stubMockDashboardStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard Group - No TS in dataset',
        description: 'Scorecard examples',
      })

      cy.findByRole('heading', { level: 1, name: /Scorecard/ }).should('be.visible')

      cy.url().then(url => {
        dashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(dashboardUrl)
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
