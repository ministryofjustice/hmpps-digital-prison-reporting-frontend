import { resetFeatureFlags } from '../../../../../integrationTests/appStateUtils'
import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards: Buckets', () => {
  const path = '/'

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
      cy.findAllByLabelText(/Custom bucket boundaries - rag colours true/).within(() => {
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
    })

    describe('Custom boundaries - rag colours', () => {
      it('should show the correct colour based in custom boundaries 1', () => {
        cy.findAllByLabelText(/Custom bucket boundaries - rag colours true/).within(() => {
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
                  if (value <= 300) {
                    colour = '#cce2d8'
                  } else if (value >= 301 && value <= 800) {
                    colour = '#fff7bf'
                  }

                  cy.findAllByRole('paragraph')
                    .eq(1)
                    .invoke('attr', 'style')
                    .should('equal', `background-color: ${colour}`)

                  cy.findByText('Status: 2').should('not.be.visible')
                  cy.findAllByRole('paragraph').eq(1).trigger('mouseover')
                  cy.findByText('Status: 2').should('be.visible')
                })
            })
        })
      })

      it('should show correct colour based in custom boundaries 2', () => {
        cy.findAllByLabelText(/Custom bucket boundaries - rag colours true/).within(() => {
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
                  if (value <= 700) {
                    colour = '#cce2d8'
                  } else if (value >= 701 && value <= 800) {
                    colour = '#fff7bf'
                  }

                  cy.findAllByRole('paragraph')
                    .eq(1)
                    .invoke('attr', 'style')
                    .should('equal', `background-color: ${colour}`)

                  cy.findByText('Status: 1').should('not.be.visible')
                  cy.findAllByRole('paragraph').eq(1).trigger('mouseover')
                  cy.findByText('Status: 1').should('be.visible')
                })
            })
        })
      })

      it('should show the correct colour based in custom boundaries 3', () => {
        cy.findAllByLabelText(/Custom bucket boundaries - rag colours true/).within(() => {
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
                  cy.findAllByRole('paragraph')
                    .eq(1)
                    .invoke('attr', 'style')
                    .should('equal', `background-color: ${colour}`)

                  cy.findByText('Status: 3').should('not.be.visible')
                  cy.findAllByRole('paragraph').eq(1).trigger('mouseover')
                  cy.findByText('Status: 3').should('be.visible')
                })
            })
        })
      })
    })

    describe('Custom boundaries - custom colours', () => {
      it('should show the correct colour based in custom boundaries 1', () => {
        cy.findAllByLabelText(/Custom bucket boundaries - custom colors/).within(() => {
          cy.findAllByLabelText(/No of prisoners with MetricOne/)
            .first()
            .should('exist')
            .within(() => {
              let value = 0
              cy.findAllByRole('paragraph')
                .eq(1)
                .then(p => {
                  value = Number(p.text())

                  let colour = '#f47738'
                  if (value <= 600) {
                    colour = '#ddd6ec'
                  } else if (value >= 601 && value <= 700) {
                    colour = '#28a197'
                  }

                  cy.findAllByRole('paragraph')
                    .eq(1)
                    .invoke('attr', 'style')
                    .should('equal', `background-color: ${colour}`)

                  cy.findByText('Status: 1').should('not.be.visible')
                  cy.findAllByRole('paragraph').eq(1).trigger('mouseover')
                  cy.findByText('Status: 1').should('be.visible')
                })
            })
        })
      })

      it('should show correct colour based in custom boundaries 2', () => {
        cy.findAllByLabelText(/Custom bucket boundaries - custom colors/).within(() => {
          cy.findAllByLabelText(/No of prisoners with MetricTwo/)
            .first()
            .should('exist')
            .within(() => {
              let value = 0
              cy.findAllByRole('paragraph')
                .eq(1)
                .then(p => {
                  value = Number(p.text())

                  let colour = '#f47738'
                  if (value <= 200) {
                    colour = '#ddd6ec'
                  } else if (value >= 201 && value <= 500) {
                    colour = '#28a197'
                  }

                  cy.findAllByRole('paragraph')
                    .eq(1)
                    .invoke('attr', 'style')
                    .should('equal', `background-color: ${colour}`)

                  cy.findByText('Status: 3').should('not.be.visible')
                  cy.findAllByRole('paragraph').eq(1).trigger('mouseover')
                  cy.findByText('Status: 3').should('be.visible')
                })
            })
        })
      })

      it('should show the correct colour based in custom boundaries 3', () => {
        cy.findAllByLabelText(/Custom bucket boundaries - custom colors/).within(() => {
          cy.findAllByLabelText(/No of prisoners with MetricThree/)
            .first()
            .should('exist')
            .within(() => {
              let value = 0
              cy.findAllByRole('paragraph')
                .eq(1)
                .then(p => {
                  value = Number(p.text())
                  let colour = '#f47738'
                  if (value <= 600) {
                    colour = '#ddd6ec'
                  } else if (value >= 601 && value <= 700) {
                    colour = '#28a197'
                  }
                  cy.findAllByRole('paragraph')
                    .eq(1)
                    .invoke('attr', 'style')
                    .should('equal', `background-color: ${colour}`)

                  cy.findByText('Status: 2').should('not.be.visible')
                  cy.findAllByRole('paragraph').eq(1).trigger('mouseover')
                  cy.findByText('Status: 2').should('be.visible')
                })
            })
        })
      })
    })
  })
})
