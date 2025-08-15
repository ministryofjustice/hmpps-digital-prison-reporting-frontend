context('Inputs: date range with min and max', () => {
  const path = '/components/filters/date-range/min-max-date-range'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  const expectMinValues = () => {
    cy.get('input[name="filters.date-range-min-max.start"]').should('have.value', '01/02/2003')
    cy.location().should((location) => {
      expect(location.search).to.contain(`filters.date-range-min-max.start=2003-02-01`)
    })
    const selectedFilters = cy.get('#dpr-selected-filters').children()
    selectedFilters.each((filter, index) => {
      switch (index) {
        case 0:
          cy.wrap(filter).contains('Date-range, with min and max start')
          cy.wrap(filter).contains('01/02/2003')
          break
        default:
          break
      }
    })
  }

  const expectMaxValues = () => {
    cy.get('input[name="filters.date-range-min-max.end"]').should('have.value', '04/05/2007')
    cy.location().should((location) => {
      expect(location.search).to.contain(`filters.date-range-min-max.end=2007-05-04`)
    })
    const selectedFilters = cy.get('#dpr-selected-filters').children()
    selectedFilters.each((filter, index) => {
      switch (index) {
        case 0:
          cy.wrap(filter).contains('Date-range, with min and max end')
          cy.wrap(filter).contains('04/05/2007')
          break
        default:
          break
      }
    })
  }

  describe('Setting the value via the input', () => {
    beforeEach(() => {
      cy.visit(path)
      for (let index = 0; index < 2; index += 1) {
        const selectedFilter = cy.get('#dpr-selected-filters > a:nth-child(1)')
        selectedFilter.click(1, 1)
      }
    })

    it('should set the start value to the min value if date is before min value', () => {
      cy.get('input[name="filters.date-range-min-max.start"]').clear().type('02/05/2000').blur()
      expectMinValues()
    })

    it('should set the end value to the max value if date is after max value', () => {
      cy.get('input[name="filters.date-range-min-max.end"]').clear().type('05/07/2025').blur()
      expectMaxValues()
    })

    it('should set the start value correctly is value is after the min date', () => {
      cy.get('input[name="filters.date-range-min-max.start"]').clear().type('03/06/2004').blur()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.date-range-min-max.start=2004-06-03`)
      })
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Date-range, with min and max start')
            cy.wrap(filter).contains('03/06/2004')
            break
          default:
            break
        }
      })
    })

    it('should set the end value correctly is value is before the max date', () => {
      cy.get('input[name="filters.date-range-min-max.end"]').clear().type('06/11/2005').blur()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.date-range-min-max.end=2005-11-06`)
      })
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Date-range, with min and max end')
            cy.wrap(filter).contains('06/11/2005')
            break
          default:
            break
        }
      })
    })
  })

  describe('Setting the value via the URL', () => {
    it('should set the start value correctly is value is after the min date', () => {
      cy.visit(`${path}?filters.date-range-min-max.start=2002-02-01`)
      expectMinValues()
    })

    it('should set the end value correctly is value is before the max date', () => {
      cy.visit(`${path}?filters.date-range-min-max.end=2008-02-01`)
      expectMaxValues()
    })
  })

  describe('Min max helper buttons', () => {
    beforeEach(() => {
      cy.visit(path)
      for (let index = 0; index < 2; index += 1) {
        const selectedFilter = cy.get('#dpr-selected-filters > a:nth-child(1)')
        selectedFilter.click(1, 1)
      }
    })

    it('should set the min value when the min helper button is clicked', () => {
      cy.get('#date-range-min-max-min-helper').click()
      expectMinValues()
    })

    it('should set the max value when the max helper button is clicked', () => {
      cy.get('#date-range-min-max-max-helper').click()
      expectMaxValues()
    })
  })
})
