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
        const catalogueTotal = 40
        const productTotal = 2
        const expectedVariantCount = 39

        searchBox.type(productName)

        validateProductCount(productTotal)
        validateCatalogueTotals(catalogueTotal)

        getProductRow(productName).should('exist')
        getProductRow(productName).contains(`(${expectedVariantCount} reports)`)
        getProductRow(productName).within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount)
        })
      })

      it('should match a single variant name and show the variant and the product row', () => {
        const productName = 'Feature testing'
        const variantName = 'Long column names'
        const catalogueTotal = 1
        const productTotal = 1
        const expectedVariantCount = 1

        searchBox.type(variantName)

        validateProductCount(productTotal)
        validateCatalogueTotals(catalogueTotal)

        getProductRow(productName).should('exist')
        getProductRow(productName).contains(`(${expectedVariantCount} report)`)
        getProductRow(productName).within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount)
          cy.findAllByRole('heading', { name: variantName, level: 4 }).should('be.visible')
        })
      })

      it('should match the product and the variant and show the correct rows', () => {
        const productName = 'Dashboard visualisations'
        const variantName = 'Bar - Invalid visualisation'
        const catalogueTotal = 1
        const productTotal = 1
        const expectedVariantCount = 1

        searchBox.type(`${productName} ${variantName}`)

        validateProductCount(productTotal)
        validateCatalogueTotals(catalogueTotal)

        getProductRow(productName).should('exist')
        getProductRow(productName).contains(`(${expectedVariantCount} report)`)
        getProductRow(productName).within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount)
          cy.findAllByRole('heading', { name: variantName, level: 4 }).should('be.visible')
        })
      })

      it('should match mulitple products and variants and show the correct rows', () => {
        const catalogueTotal = 5
        const productTotal = 2
        const expectedVariantCount1 = 3
        const expectedVariantCount2 = 2

        searchBox.type('variant')

        validateProductCount(productTotal)
        validateCatalogueTotals(catalogueTotal)

        getProductRow('Feature testing').should('exist')
        getProductRow('Feature testing').contains(`(${expectedVariantCount1} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount1)
          cy.findAllByRole('heading', { name: 'Filter Order', level: 4 }).should('be.visible')
          cy.findAllByRole('heading', { name: 'Missing variant description', level: 4 }).should('be.visible')
          cy.findAllByRole('heading', { name: 'Unprintable', level: 4 }).should('be.visible')
        })

        getProductRow('Filter input testing').should('exist')
        getProductRow('Filter input testing').contains(`(${expectedVariantCount2} reports)`)
        getProductRow('Filter input testing').within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount2)
          cy.findAllByRole('heading', { name: 'Granular Daterange', level: 4 }).should('be.visible')
          cy.findAllByRole('heading', { name: 'Relative Daterange', level: 4 }).should('be.visible')
        })
      })

      it('should match products and variants and show the correct rows when search order is mixed', () => {
        const catalogueTotal = 2
        const productTotal = 1
        const expectedVariantCount = 2

        searchBox.type('variant input daterange')
        validateProductCount(productTotal)
        validateCatalogueTotals(catalogueTotal)

        getProductRow('Filter input testing').should('exist')
        getProductRow('Filter input testing').contains(`(${expectedVariantCount} reports)`)
        getProductRow('Filter input testing').within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount)
          cy.findAllByRole('heading', { name: 'Granular Daterange', level: 4 }).should('be.visible')
          cy.findAllByRole('heading', { name: 'Relative Daterange', level: 4 }).should('be.visible')
        })
      })
    })

    describe('Type', () => {
      it('should show both dashboards and reports when all is ticked', () => {
        const catalogueTotal = 102
        const productTotal = 6
        const expectedVariantCount = 32

        cy.findByRole('radio', { name: 'All' }).check()

        validateCatalogueTotals(catalogueTotal)
        validateProductCount(productTotal)
        getProductRow('Feature testing').contains(`(${expectedVariantCount} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount)
        })
      })

      it('should show just dashboards when "Dashboards" is ticked', () => {
        const catalogueTotal = 58
        const productTotal = 3
        const expectedVariantCount = 13

        cy.findByRole('radio', { name: 'Dashboard' }).check()

        validateCatalogueTotals(catalogueTotal)
        validateProductCount(productTotal)

        getProductRow('Feature testing').contains(`(${expectedVariantCount} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount)
        })
      })

      it('should show just reports when "Reports" is ticked', () => {
        const catalogueTotal = 44
        const productTotal = 5
        const expectedVariantCount = 19

        cy.findByRole('radio', { name: 'Report' }).check()

        validateCatalogueTotals(catalogueTotal)
        validateProductCount(productTotal)

        getProductRow('Feature testing').contains(`(${expectedVariantCount} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount)
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
        const catalogueTotal = 100
        const productTotal = 6
        const expectedCurrentCount = 32
        const expectedVariantCount = 30

        validateProductCount(productTotal)
        getProductRow('Feature testing').contains(`(${expectedCurrentCount} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedCurrentCount)
        })

        cy.findByRole('checkbox', { name: 'Hide missing reports' }).check()

        validateCatalogueTotals(catalogueTotal)
        validateProductCount(productTotal)

        getProductRow('Feature testing').contains(`(${expectedVariantCount} reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', expectedVariantCount)
        })
      })
    })

    describe('Hide live', () => {
      it('should show the live variant rows when unchecked', () => {
        const catalogueTotal = 2
        const productTotal = 1

        cy.findByRole('checkbox', { name: 'Hide live reports' }).check()

        validateCatalogueTotals(catalogueTotal)
        validateProductCount(productTotal)

        getProductRow('Feature testing').contains(`(2 reports)`)
        getProductRow('Feature testing').within(() => {
          cy.findAllByRole('heading', { level: 4 }).should('have.length', 2)
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
