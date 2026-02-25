import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Mixed charts', () => {
  const path = '/embedded/platform/'

  describe('Complete data', () => {
    let completeDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMixedDashboardCompleteData')
      cy.task('stubDashboardResultCompleteData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Mixed - Complete dataset',
        description: 'This dashboard represents example Mixed visualisations using a complete dataset',
      })

      cy.findByRole('heading', { level: 1, name: /Mixed - Complete dataset/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()

      cy.url().then((url) => {
        completeDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(completeDashboardUrl)
    })

    it('should should have the correct amount of sections', () => {
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

    it('should should show the correct data for charts', () => {
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
    let partialDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMixedDashboardPartialData')
      cy.task('stubDashboardResultPartialData')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Mixed - Partial dataset',
        description: 'This dashboard represents example mixed visualisations using a partial dataset',
      })

      cy.findByRole('heading', { level: 1, name: /Mixed - Partial dataset/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()

      cy.url().then((url) => {
        partialDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(partialDashboardUrl)
    })

    it('should should have the correct amount of sections', () => {
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

    it('should should show the correct data for charts', () => {
      cy.findAllByLabelText(/Bar charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)
      })

      cy.findAllByLabelText(/List charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 2)
      })
    })
  })

  describe('Partial Historic data', () => {
    let partialDashboardUrl = ''

    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMixedDashboardPartialDataHistoric')
      cy.task('stubDashboardResultPartialDataHistoric')
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Mixed - Partial dataset - Historic',
        description: 'This dashboard represents example mixed visualisations using a partial historic dataset',
      })

      cy.findByRole('heading', { level: 1, name: /Mixed - Partial dataset - Historic/ }).should('be.visible')
      cy.injectAxe()
      cy.checkA11y()

      cy.url().then((url) => {
        partialDashboardUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(partialDashboardUrl)
    })

    it('should should have the correct amount of sections', () => {
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

    it('should should show the correct data for charts', () => {
      cy.findAllByLabelText(/Line timeseries charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)
      })

      cy.findAllByLabelText(/List charts/).within(() => {
        cy.findAllByRole('heading', { level: 3 }).should('have.length', 3)
      })
    })
  })
})
