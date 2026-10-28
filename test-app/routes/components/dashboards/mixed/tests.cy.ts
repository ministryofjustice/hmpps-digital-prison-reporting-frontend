import { executeDashboardStubs, requestReportByNameAndDescription } from '../../../../../cypress-tests/cypressUtils'

context('Dashboard visualisation: Mixed charts', () => {
  const path = '/'

  describe('Default data', () => {
    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMixedDashboardDefinition')
      cy.task('stubDashboardResult')
    })

    beforeEach(() => {
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Mixed ',
        description: 'This dashboard represents example Mixed visualisations',
      })
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

  describe('Merged data', () => {
    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMixedDashboardDefinitionMergedDataset')
      cy.task('stubDashboardResultMergedData')
    })

    beforeEach(() => {
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Mixed - Merged dataset',
        description: 'This dashboard represents example mixed visualisations using a merged dataset',
      })
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

  describe('Merged Historic data', () => {
    before(() => {
      cy.task('resetStubs')
      executeDashboardStubs()
      cy.task('stubMixedDashboardDefinitionMergedDatasetHistoric')
      cy.task('stubDashboardResultMergedDataHistoric')
    })

    beforeEach(() => {
      cy.visit(path)

      requestReportByNameAndDescription({
        name: 'Mixed - Historic - Merged dataset',
        description: 'This dashboard represents example mixed visualisations using a merged historic',
      })
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
