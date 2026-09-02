import {
  checkA11y,
  executeDashboardStubs,
  requestReportByNameAndDescription,
} from '../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Mixed charts', () => {
  const path = '/'

  describe('Complete data', () => {
    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMixedDashboardCompleteData')
      cy.task('stubDashboardResultCompleteData')
    })

    beforeEach(() => {
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Mixed - Complete dataset',
        description: 'This dashboard represents example Mixed visualisations using a complete dataset',
      })
    })

    it('is accessible', () => {
      cy.findByRole('heading', { level: 1, name: /Mixed - Complete dataset/ }).should('be.visible')
      checkA11y()
    })

    it('should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 6)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Bar charts')
              break
            case 1:
              cy.wrap(section).contains('Doughnut charts')
              break
            case 2:
              cy.wrap(section).contains('Line charts')
              break
            case 3:
              cy.wrap(section).contains('Line-timeseries charts')
              break
            case 4:
              cy.wrap(section).contains('List')
              break
            case 5:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should show the correct data for charts', () => {
      cy.findAllByLabelText(/Bar charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)
      })

      cy.findAllByLabelText(/Doughnut charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)
      })

      cy.findAllByLabelText(/Line charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 2)
      })

      cy.findAllByLabelText(/Line-timeseries charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 2)
      })

      cy.findAllByLabelText(/List/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)
      })
    })
  })

  describe('Partial data', () => {
    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMixedDashboardPartialData')
      cy.task('stubDashboardResultPartialData')
    })

    beforeEach(() => {
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Mixed - Partial dataset',
        description: 'This dashboard represents example mixed visualisations using a partial dataset',
      })
    })

    it('is accessible', () => {
      cy.findByRole('heading', { level: 1, name: /Mixed - Partial dataset/ }).should('be.visible')
      checkA11y()
    })

    it('should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 3)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Bar charts')
              break
            case 1:
              cy.wrap(section).contains('List charts')
              break
            case 2:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should show the correct data for charts', () => {
      cy.findAllByLabelText(/Bar charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)
      })

      cy.findAllByLabelText(/List charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 2)
      })
    })
  })

  describe('Partial Historic data', () => {
    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMixedDashboardPartialDataHistoric')
      cy.task('stubDashboardResultPartialDataHistoric')
    })

    beforeEach(() => {
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Mixed - Historic - Partial dataset',
        description: 'This dashboard represents example mixed visualisations using a partial historic',
      })
    })

    it('is accessible', () => {
      cy.findByRole('heading', { level: 1, name: /Mixed - Historic - Partial dataset/ }).should('be.visible')
      checkA11y()
    })

    it('should have the correct amount of sections', () => {
      cy.findAllByRole('heading', { level: 2 })
        .should('have.length', 3)
        .each((section, index) => {
          switch (index) {
            case 0:
              cy.wrap(section).contains('Line timeseries charts')
              break
            case 1:
              cy.wrap(section).contains('List charts')
              break
            case 2:
              cy.wrap(section).contains('Full Dataset')
              break
            default:
              break
          }
        })
    })

    it('should show the correct data for charts', () => {
      cy.findAllByLabelText(/Line timeseries charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)
      })

      cy.findAllByLabelText(/List charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)
      })
    })
  })
})
