import { executeDashboardStubs } from '../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Scorecards', () => {
  const scorecardPath =
    '/embedded/platform/dpr/request-report/dashboard/dashboard-visualisations/test-scorecard-examples-data-quality/filters'
  let scorecardPathViewUrl = ''

  const scorecardBucketPath =
    '/embedded/platform/dpr/request-report/dashboard/dashboard-visualisations/test-scorecard-bucket-examples-data-quality/filters'
  let scorecardBucketPathViewUrl = ''

  const scorecardsPath =
    '/embedded/platform/dpr/request-report/dashboard/dashboard-visualisations/scorecard-examples-data-quality/filters'
  let scorecardsPathViewUrl = ''

  before(() => {
    executeDashboardStubs()

    cy.task('stubDefinitionScorecardDashboard')
    cy.task('stubDefinitionScorecardBucketDashboard')
    cy.task('stubDefinitionScorecardGroupDashboard')
    cy.task('stubScorecardResults')
    cy.task('stubScorecardBucketResults')
    cy.task('stubScorecardGroupResults')
  })

  describe('scorecard', () => {
    before(() => {
      cy.visit(scorecardPath)
      cy.findByRole('button', { name: /Request/ }).click()
      cy.url().then((url) => {
        scorecardPathViewUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(scorecardPathViewUrl)
    })

    it('is accessible', () => {
      cy.injectAxe()
      cy.checkA11y()
    })

    it('should show the correct information on a scorecard', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(0)
        .should('exist')
        .within(() => {
          // Metric
          cy.findAllByRole('paragraph')
            .eq(0)
            .invoke('text')
            .should('match', /^[0-9]*$/)
          // Colour
          cy.findAllByRole('paragraph').eq(0).invoke('attr', 'style', 'background-color').should('exist')
          // trend
          cy.findAllByRole('paragraph').eq(1).contains('from').should('exist')
          // date
          cy.findAllByRole('paragraph').eq(2).contains('Value for').should('exist')
        })
    })

    it('should show the correct rag score colour using the base colour', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(0)
        .should('exist')
        .within(() => {
          // Colour
          cy.findAllByRole('paragraph')
            .eq(0)
            .invoke('attr', 'style')
            .should('match', /background-color: #1D70B855|background-color: #1D70B8FF|/)
        })
    })

    it('should show the correct rag score colour using RAG colouring', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(1)
        .should('exist')
        .within(() => {
          // Colour
          cy.findAllByRole('paragraph')
            .eq(0)
            .invoke('attr', 'style')
            .should('match', /background-color: #f4cdc6|background-color: #cce2d8|background-color: #fff7bf|/)
        })
    })

    it('should show the correct rag score colour using custom colours', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(1)
        .should('exist')
        .within(() => {
          // Colour
          cy.findAllByRole('paragraph')
            .eq(2)
            .invoke('attr', 'style')
            .should('match', /background-color: #f47738|background-color: #912b88|background-color: #28a197|/)
        })
    })
  })

  describe('scorecard buckets', () => {
    before(() => {
      cy.visit(scorecardBucketPath)
      cy.findByRole('button', { name: /Request/ }).click()
      cy.url().then((url) => {
        scorecardBucketPathViewUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(scorecardBucketPathViewUrl)
    })

    it('is accessible', () => {
      cy.injectAxe()
      cy.checkA11y()
    })

    it('should show the correct information on a scorecard', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(0)
        .should('exist')
        .within(() => {
          // Metric
          cy.findAllByRole('paragraph')
            .eq(0)
            .invoke('text')
            .should('match', /^[0-9]*$/)
          // Colour
          cy.findAllByRole('paragraph').eq(0).invoke('attr', 'style', 'background-color').should('exist')
          // trend
          cy.findAllByRole('paragraph').eq(1).contains('from').should('exist')
          // date
          cy.findAllByRole('paragraph').eq(2).contains('Value for').should('exist')
        })
    })

    it('should show correct colour based in custom boundaries  1', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(0)
        .should('exist')
        .within(() => {
          let value = 0
          cy.findAllByRole('paragraph')
            .eq(0)
            .then((p) => {
              value = Number(p.text())

              let colour = '#f4cdc6'
              if (value <= 300) {
                colour = '#cce2d8'
              } else if (value >= 301 && value <= 800) {
                colour = '#fff7bf'
              }
              cy.findAllByRole('paragraph').eq(0).invoke('attr', 'style').should('equal', `background-color: ${colour}`)
            })
        })
    })

    it('should show the correct colour based in custom boundaries  2', () => {
      cy.findAllByLabelText(/No of prisoners with ethnicity/)
        .eq(0)
        .should('exist')
        .within(() => {
          let value = 0
          cy.findAllByRole('paragraph')
            .eq(0)
            .then((p) => {
              value = Number(p.text())

              let colour = '#f4cdc6'
              if (value <= 200) {
                colour = '#cce2d8'
              } else if (value >= 201 && value <= 700) {
                colour = '#fff7bf'
              }
              cy.findAllByRole('paragraph').eq(0).invoke('attr', 'style').should('equal', `background-color: ${colour}`)
            })
        })
    })

    it('should show the correct colour based in custom boundaries 3', () => {
      cy.findAllByLabelText(/No of prisoners with religion/)
        .eq(0)
        .should('exist')
        .within(() => {
          let value = 0
          cy.findAllByRole('paragraph')
            .eq(0)
            .then((p) => {
              value = Number(p.text())

              let colour = '#f4cdc6'
              if (value <= 500) {
                colour = '#cce2d8'
              } else if (value >= 501 && value <= 600) {
                colour = '#fff7bf'
              }
              cy.findAllByRole('paragraph').eq(0).invoke('attr', 'style').should('equal', `background-color: ${colour}`)
            })
        })
    })
  })

  describe('scorecard-group', () => {
    before(() => {
      cy.visit(scorecardsPath)
      cy.findByRole('button', { name: /Request/ }).click()
      cy.url().then((url) => {
        scorecardsPathViewUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(scorecardsPathViewUrl)
    })
  })
})
