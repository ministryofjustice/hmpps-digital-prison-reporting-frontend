import { checkA11y, executeReportStubs } from "cypress-tests/cypressUtils"

context('Inputs: granular date range', () => {
  describe('Granular date range filter component', () => {
    const route = '/components/filters/granular-date-range'

    const getQuickFilters = () =>
      cy.findByRole('combobox', { name: /^Quick filters$/i })

    const getGranularity = () =>
      cy.findByRole('combobox', { name: /^Granularity$/i })

    const getFrom = () =>
      cy.findByRole('textbox', {
        name: /^From$/i,
        description: /For example/
      })

    const getTo = () =>
      cy.findByRole('textbox', {
        name: /^To$/i,
        description: /For example/
      })

    const pretestSetup = (query = '') => {
      cy.visit(`${route}?${query}`)
      cy.findByRole('heading', { name: /Granular date range input/i }).should('exist')
    }

    const assertDate = (textbox: Cypress.Chainable<JQuery>, expectedDMY: string) => {
      textbox.should('have.value', expectedDMY)
    }

    beforeEach(() => {
      executeReportStubs()
    })

    it('renders all major controls: quick filters, granularity, from/to', () => {
      pretestSetup()

      checkA11y()

      getQuickFilters().should('exist')
      getGranularity().should('exist')

      getFrom().should('exist')
      getTo().should('exist')
    })

    it('updates the querystring as the user edits dates', () => {
      pretestSetup()

      getFrom().clear()
      getFrom().type('10/03/2021')
      getFrom().blur()
      getTo().clear()
      getTo().type('20/03/2021')
      getTo().blur()

      assertDate(getFrom(), '10/03/2021')
      assertDate(getTo(), '20/03/2021')

      cy.location('search').should(qs => {
        expect(decodeURIComponent(qs)).to.contain('filters.field1.start=10/03/2021')
        expect(decodeURIComponent(qs)).to.contain('filters.field1.end=20/03/2021')
      })
    })

    it('should automatically change quick filters and from/to when granularity is changed', () => {
      cy.clock()

      const assertDate = (textbox: Cypress.Chainable<JQuery>, expectedDMY: string) => {
        textbox.should('have.value', expectedDMY)
      }

      const getQuickFilters = () =>
        cy.findByRole('combobox', { name: /^Quick filters$/i })

      const getGranularity = () =>
        cy.findByRole('combobox', { name: /^Granularity$/i })

      const getFrom = () =>
        cy.findByRole('textbox', {
          name: /^From$/i,
          description: /For example/
        })

      const getTo = () =>
        cy.findByRole('textbox', {
          name: /^To$/i,
          description: /For example/
        })

      cy.visit('/components/filters/granular-date-range')
      cy.findByRole('heading', { name: /Granular date range input/i }).should('exist')

      getQuickFilters().select('Today')
      assertDate(getFrom(), '01/01/1970')
      assertDate(getTo(), '01/01/1970')
      getGranularity().should('have.value', 'daily')
      getGranularity().select('Hourly')
      getGranularity().should('have.value', 'hourly')
      getQuickFilters().should('have.value', 'today')
      assertDate(getFrom(), '01/01/1970')
      assertDate(getTo(), '01/01/1970')

      getGranularity().select('Monthly')
      getQuickFilters().find('option:selected').should('have.value', 'none')
      assertDate(getFrom(), '01/01/1970')
      assertDate(getTo(), '01/01/1970')

      getGranularity().select('Annually')
      getQuickFilters().find('option:selected').should('have.value', 'none')
      assertDate(getFrom(), '01/01/1970')
      assertDate(getTo(), '01/01/1970')

      getQuickFilters().select('Today')
      getQuickFilters().should('have.value', 'today')
      assertDate(getFrom(), '01/01/1970')
      assertDate(getTo(), '01/01/1970')


      getQuickFilters().select('Yesterday')
      getQuickFilters().should('have.value', 'yesterday')
      assertDate(getFrom(), '31/12/1969')
      assertDate(getTo(), '31/12/1969')

      getQuickFilters().select('Last 3 months')
      getQuickFilters().should('have.value', 'last-three-months')
      assertDate(getFrom(), '02/10/1969')
      assertDate(getTo(), '01/01/1970')

      getQuickFilters().select('Last full year')
      getQuickFilters().should('have.value', 'last-full-year')
      assertDate(getFrom(), '01/01/1969')
      assertDate(getTo(), '31/12/1969')
    })
  })
})
