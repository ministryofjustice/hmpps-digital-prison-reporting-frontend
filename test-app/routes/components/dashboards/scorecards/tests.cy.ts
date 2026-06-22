import { resetFeatureFlags } from '../../../../routes/integrationTests/appStateUtils'
import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards', () => {
  const path = '/'

  describe('scorecard', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardDashboard')
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubMockDashboardsStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard - Complete data',
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

    it('should show the correct information on a scorecard', () => {
      cy.findAllByLabelText(/No of prisoners with MetricTwo/)
        .first()
        .should('be.visible')
        .within(() => {
          // Metric
          cy.findAllByRole('paragraph').eq(1).contains(684).should('exist')
          // Colour
          cy.findAllByRole('paragraph').eq(1).should('have.css', 'background-color').should('exist')
          // trend
          cy.findAllByRole('paragraph').eq(2).contains('from').should('exist')
          // date
          cy.findAllByRole('paragraph').eq(3).contains('Value for').should('exist')
        })
    })
  })

  describe('scorecard buckets', () => {
    let scorecardBucketsUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      resetFeatureFlags()

      cy.task('stubDefinitionScorecardBucketDashboard')
      cy.task('stubDashboardResultCompleteData')
      cy.task('stubMockDashboardsStatusStarted')
      cy.task('stubMockDashboardsStatusFinished')

      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Scorecard - Buckets - Complete data',
        description: 'Scorecard examples',
      })

      cy.findByRole('heading', { level: 1, name: /Scorecard/ }).should('be.visible')

      cy.url().then(url => {
        scorecardBucketsUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(scorecardBucketsUrl)
    })

    it('is accessible', () => {
      checkA11y()
    })

    it('should show the correct information on a scorecard', () => {
      cy.findAllByLabelText(/No of prisoners with MetricTwo/)
        .first()
        .should('exist')
        .within(() => {
          // Metric
          cy.findAllByRole('paragraph').eq(1).contains(684).should('exist')
          // Colour
          cy.findAllByRole('paragraph').eq(1).should('have.css', 'background-color').should('exist')
          // trend
          cy.findAllByRole('paragraph').eq(2).contains('from').should('exist')
          // date
          cy.findAllByRole('paragraph').eq(3).contains('Value for').should('exist')
        })
    })

    it('should show correct colour based in custom boundaries 1', () => {
      cy.findAllByLabelText(/No of prisoners with MetricTwo/)
        .first()
        .should('exist')
        .within(() => {
          let value = 0
          cy.findAllByRole('paragraph')
            .eq(1)
            .then(p => {
              value = Number(p.text())

              let colour = '#f4cdc6'
              if (value <= 300) {
                colour = '#cce2d8'
              } else if (value >= 301 && value <= 800) {
                colour = '#fff7bf'
              }

              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('equal', `background-color: ${colour}`)
            })
        })
    })

    it('should show the correct colour based in custom boundaries 2', () => {
      cy.findAllByLabelText(/No of prisoners with MetricOne/)
        .first()
        .should('exist')
        .within(() => {
          let value = 0
          cy.findAllByRole('paragraph')
            .eq(1)
            .then(p => {
              value = Number(p.text())

              let colour = '#f4cdc6'
              if (value <= 200) {
                colour = '#cce2d8'
              } else if (value >= 201 && value <= 700) {
                colour = '#fff7bf'
              }
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('equal', `background-color: ${colour}`)
            })
        })
    })

    it('should show the correct colour based in custom boundaries 3', () => {
      cy.findAllByLabelText(/No of prisoners with MetricThree/)
        .first()
        .should('exist')
        .within(() => {
          let value = 0
          cy.findAllByRole('paragraph')
            .eq(1)
            .then(p => {
              value = Number(p.text())
              let colour = '#f4cdc6'
              if (value <= 500) {
                colour = '#cce2d8'
              } else if (value >= 501 && value <= 600) {
                colour = '#fff7bf'
              }
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('equal', `background-color: ${colour}`)
            })
        })
    })
  })

  describe('scorecard group', () => {
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
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', 'background-color')
            })
          cy.findByLabelText('GHI')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', `background-color`)
            })
          cy.findByLabelText('DEF')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', `background-color`)
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
