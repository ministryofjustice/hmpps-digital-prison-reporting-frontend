import {
  getProductRow,
  productShouldNotExist,
  stubBaseTasks,
  stubDefinitionsTasks,
  validateCatalogueTotals,
  validateProductCount,
} from 'cypress-tests/cypressUtils'

describe('Reports Catalogue', () => {
  before(() => {
    stubBaseTasks()
    stubDefinitionsTasks()
  })

  describe('Filters', () => {
    beforeEach(() => {
      cy.visit('/')

      cy.findAllByRole('group').contains('Show more filters').should('be.visible').click()
    })

    describe('Search', () => {
      let searchBox: Cypress.Chainable<JQuery<HTMLElement>>

      beforeEach(() => {
        searchBox = cy.findByRole('textbox', { name: 'Filter by key word' })
        searchBox.clear()
      })

      it('should match the product name and show all variants', () => {
        const productName = 'Dashboard visualisations'

        searchBox.type(productName)

        validateProductCount(2)
        validateCatalogueTotals(27)

        const expectedCount = 26

        getProductRow(productName).should('exist')
        getProductRow(productName).contains(`(${expectedCount} reports)`)
        getProductRow(productName).within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', expectedCount)
        })
      })

      it('should match a single variant name and show the variant and the product row', () => {
        const productName = 'Feature testing'
        const variantName = 'Long column names'

        searchBox.type(variantName)

        validateProductCount(1)
        validateCatalogueTotals(1)

        const expectedCount = 1

        getProductRow(productName).should('exist')
        getProductRow(productName).contains(`(${expectedCount} report)`)
        getProductRow(productName).within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', expectedCount)
          cy.findAllByRole('heading', { name: variantName, level: 2 }).should('be.visible')
        })
      })

      it('should match the product and the variant and show the correct rows', () => {
        const productName = 'Dashboard visualisations'
        const variantName = 'Bar - Invalid visualisation'

        searchBox.type(`${productName} ${variantName}`)

        validateProductCount(1)
        validateCatalogueTotals(1)

        const expectedCount = 1

        getProductRow(productName).should('exist')
        getProductRow(productName).contains(`(${expectedCount} report)`)
        getProductRow(productName).within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', expectedCount)
          cy.findAllByRole('heading', { name: variantName, level: 2 }).should('be.visible')
        })
      })

      it('should match mulitple products and variants and show the correct rows', () => {
        searchBox.type('variant')

        validateProductCount(2)
        validateCatalogueTotals(5)

        const expectedCount1 = 3

        getProductRow('Feature testing').should('exist')
        getProductRow('Feature testing').contains(`(${expectedCount1} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', expectedCount1)
          cy.findAllByRole('heading', { name: 'Filter Order', level: 2 }).should('be.visible')
          cy.findAllByRole('heading', { name: 'Missing variant description', level: 2 }).should('be.visible')
          cy.findAllByRole('heading', { name: 'Unprintable', level: 2 }).should('be.visible')
        })

        const expectedCount2 = 2

        getProductRow('Filter input testing').should('exist')
        getProductRow('Filter input testing').contains(`(${expectedCount2} reports)`)
        getProductRow('Filter input testing').within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', expectedCount2)
          cy.findAllByRole('heading', { name: 'Granular Daterange', level: 2 }).should('be.visible')
          cy.findAllByRole('heading', { name: 'Relative Daterange', level: 2 }).should('be.visible')
        })
      })

      it('should match products and variants and show the correct rows when search order is mixed', () => {
        searchBox.type('variant input daterange')
        validateProductCount(1)
        validateCatalogueTotals(2)

        const expectedCount = 2

        getProductRow('Filter input testing').should('exist')
        getProductRow('Filter input testing').contains(`(${expectedCount} reports)`)
        getProductRow('Filter input testing').within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', expectedCount)
          cy.findAllByRole('heading', { name: 'Granular Daterange', level: 2 }).should('be.visible')
          cy.findAllByRole('heading', { name: 'Relative Daterange', level: 2 }).should('be.visible')
        })
      })
    })

    describe('Type', () => {
      it('should show both dashboards and reports when all is ticked', () => {
        cy.findByRole('radio', { name: 'All' }).check()

        validateCatalogueTotals(82)
        validateProductCount(6)
        const expectedCount = 25
        getProductRow('Feature testing').contains(`(${expectedCount} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', expectedCount)
        })
      })

      it('should show just dashboards when "Dashboards" is ticked', () => {
        cy.findByRole('radio', { name: 'Dashboard' }).check()

        validateCatalogueTotals(38)
        validateProductCount(3)
        const expectedCount = 6
        getProductRow('Feature testing').contains(`(${expectedCount} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', expectedCount)
        })
      })

      it('should show just reports when "Reports" is ticked', () => {
        cy.findByRole('radio', { name: 'Report' }).check()

        validateCatalogueTotals(44)
        validateProductCount(5)
        const expectedCount = 19
        getProductRow('Feature testing').contains(`(${expectedCount} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', expectedCount)
        })
      })
    })

    describe('Show unauthorised', () => {
      it('should show the unauthorised products when checked', () => {
        validateProductCount(6)
        productShouldNotExist('Unauthorised report')
        cy.findByRole('checkbox', { name: 'Show unauthorised reports' }).check()
        validateProductCount(7)
        getProductRow('Unauthorised report').should('exist')
      })
    })

    describe('Hide missing', () => {
      it('should show the missing rows when unchecked', () => {
        validateProductCount(6)
        getProductRow('Feature testing').contains(`(25 reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', 25)
        })

        cy.findByRole('checkbox', { name: 'Hide missing reports' }).check()

        validateCatalogueTotals(80)
        validateProductCount(6)
        getProductRow('Feature testing').contains(`(23 reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', 23)
        })
      })
    })

    describe('Hide live', () => {
      it('should show the live variant rows when unchecked', () => {
        cy.findByRole('checkbox', { name: 'Hide live reports' }).check()

        validateCatalogueTotals(2)
        validateProductCount(1)

        getProductRow('Feature testing').contains(`(2 reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 2 }).should('have.length', 2)
        })
      })
    })
  })

  describe('Listing', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    describe('Navigation', () => {
      it('should not show the previous link on the first item', () => {
        getProductRow('Dashboard visualisations').within(() => {
          cy.findByRole('link', { name: 'Next product' }).should('exist')
          cy.findByRole('link', { name: 'Previous product' }).should('not.exist')
        })
      })

      it('should not show the next link on the last item', () => {
        getProductRow('Request examples').within(() => {
          cy.findByRole('link', { name: 'Next product' }).should('not.exist')
          cy.findByRole('link', { name: 'Previous product' }).should('exist')
        })
      })
    })
  })
})
