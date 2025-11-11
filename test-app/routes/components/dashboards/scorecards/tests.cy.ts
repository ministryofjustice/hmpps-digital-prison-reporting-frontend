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
            .eq(1)
            .invoke('text')
            .should('match', /^[0-9]*$/)
          // Colour
          cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style', 'background-color').should('exist')
          // trend
          cy.findAllByRole('paragraph').eq(2).contains('from').should('exist')
          // date
          cy.findAllByRole('paragraph').eq(3).contains('Value for').should('exist')
        })
    })

    it('should show no rag colour', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(0)
        .should('exist')
        .within(() => {
          // Colour
          cy.findAllByRole('paragraph')
            .eq(1)
            .invoke('attr', 'style')
            .should('not.match', /background-color: /)
        })
    })

    it('should show the correct rag score colour using RAG colouring', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(1)
        .should('exist')
        .within(() => {
          // Colour
          cy.findAllByRole('paragraph')
            .eq(1)
            .invoke('attr', 'style')
            .should('match', /background-color: (#f4cdc6|#cce2d8|#fff7bf)/)
        })
    })

    it('should show the correct rag score colour using custom colours', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(2)
        .should('exist')
        .within(() => {
          // Colour
          cy.findAllByRole('paragraph')
            .eq(1)
            .invoke('attr', 'style')
            .should('match', /background-color: (#f47738|#912b88|#28a197)/)
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
            .eq(1)
            .invoke('text')
            .should('match', /^[0-9]*$/)
          // Colour
          cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style', 'background-color').should('exist')
          // trend
          cy.findAllByRole('paragraph').eq(2).contains('from').should('exist')
          // date
          cy.findAllByRole('paragraph').eq(3).contains('Value for').should('exist')
        })
    })

    it('should show correct colour based in custom boundaries  1', () => {
      cy.findAllByLabelText(/No of prisoners with nationality/)
        .eq(0)
        .should('exist')
        .within(() => {
          let value = 0
          cy.findAllByRole('paragraph')
            .eq(1)
            .then((p) => {
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

    it('should show the correct colour based in custom boundaries  2', () => {
      cy.findAllByLabelText(/No of prisoners with ethnicity/)
        .eq(0)
        .should('exist')
        .within(() => {
          let value = 0
          cy.findAllByRole('paragraph')
            .eq(1)
            .then((p) => {
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
      cy.findAllByLabelText(/No of prisoners with religion/)
        .eq(0)
        .should('exist')
        .within(() => {
          let value = 0
          cy.findAllByRole('paragraph')
            .eq(1)
            .then((p) => {
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

    it('Should show scorecard group using list', () => {
      cy.findAllByLabelText(/By Establishment ID/)
        .eq(0)
        .should('exist')
        .within(() => {
          cy.findByLabelText('MDI')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', 'background-color')
            })
          cy.findByLabelText('SLI')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', `background-color`)
            })
          cy.findByLabelText('DAI')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', `background-color`)
            })
          cy.findByLabelText('LTI')
            .should('exist')
            .within(() => {
              cy.findAllByRole('paragraph').eq(1).invoke('attr', 'style').should('contain', `background-color`)
            })
        })

      cy.findAllByLabelText(/By Establishment ID/)
        .eq(3)
        .should('exist')
        .within(() => {
          cy.findByLabelText('MDI').should('exist')
          cy.findByLabelText('SLI').should('exist')
          cy.findByLabelText('DAI').should('exist')
          cy.findByLabelText('LTI').should('exist')
        })
    })

    it('should show scorecard group using columns', () => {
      cy.findByLabelText(/Establishment ID: MDI/)
        .should('exist')
        .within(() => {
          cy.findByLabelText('Has ethnicity').should('exist')
          cy.findByLabelText('Ethnicity is missing').should('exist')
          cy.findByLabelText('Has nationality').should('exist')
          cy.findByLabelText('Nationality is missing').should('exist')
          cy.findByLabelText('Has religion').should('exist')
          cy.findByLabelText('Religion is missing').should('exist')
        })
    })
  })
})
