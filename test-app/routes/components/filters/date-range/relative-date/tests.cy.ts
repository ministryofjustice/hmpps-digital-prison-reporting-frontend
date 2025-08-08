context('Inputs: Relative date range', () => {
  const path = '/components/filters/date-range/relative-date-range#relative-date-range-relative-range'
  const platformPath = '/embedded/platform/dpr/request-report/report/filter-inputs/variantId-15/filters'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Setting the relative date range', () => {
    beforeEach(() => {
      cy.visit(path)
    })

    const expectDatePickerValues = () => {
      cy.get('#tab_relative-date-range-min-max-date-picker').click()
      cy.get('input[id="filters.relative-date-range.start"]').should('not.have.value', '')
      cy.get('input[id="filters.relative-date-range.end"]').should('not.have.value', '')
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Relative Date-range start')
            break
          case 1:
            cy.wrap(filter).contains('Relative Date-range end')
            break
          default:
            break
        }
      })
    }

    it('should set the relative date to none', () => {
      cy.get('#tab_relative-date-range-min-max-relative-range').click()
      cy.get('input[id="filters.relative-date-range.relative-duration"]').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=none`)
        expect(location.search).not.to.contain(`filters.relative-date-range.start=`)
        expect(location.search).not.to.contain(`filters.relative-date-range.end=`)
      })
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Preset date range')
            cy.wrap(filter).contains('None')
            break
          default:
            break
        }
      })

      cy.get('#tab_date-picker').click()
      cy.get('input[id="filters.relative-date-range.start"]').should('have.value', '')
      cy.get('input[id="filters.relative-date-range.end"]').should('have.value', '')
    })

    it('should set the relative date to yesterday', () => {
      cy.get('#tab_relative-date-range-min-max-relative-range').click()
      cy.get('input[id="filters.relative-date-range.relative-duration-2"]').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=yesterday`)
        expect(location.search).to.contain(`filters.relative-date-range.start=`)
        expect(location.search).to.contain(`filters.relative-date-range.end=`)
      })
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Preset date range')
            cy.wrap(filter).contains('Yesterday')
            break
          default:
            break
        }
      })

      expectDatePickerValues()
    })

    it('should set the relative date to tommorrow', () => {
      cy.get('#tab_relative-date-range-min-max-relative-range').click()
      cy.get('input[id="filters.relative-date-range.relative-duration-3"]').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=tomorrow`)
        expect(location.search).to.contain(`filters.relative-date-range.start=`)
        expect(location.search).to.contain(`filters.relative-date-range.end=`)
      })
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Preset date range')
            cy.wrap(filter).contains('Tomorrow')
            break
          default:
            break
        }
      })

      expectDatePickerValues()
    })

    it('should set the relative date to last week', () => {
      cy.get('#tab_relative-date-range-min-max-relative-range').click()
      cy.get('input[id="filters.relative-date-range.relative-duration-4"]').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=last-week`)
        expect(location.search).to.contain(`filters.relative-date-range.start=`)
        expect(location.search).to.contain(`filters.relative-date-range.end=`)
      })
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Preset date range')
            cy.wrap(filter).contains('Last week')
            break
          default:
            break
        }
      })

      expectDatePickerValues()
    })

    it('should set the relative date to next week', () => {
      cy.get('#tab_relative-date-range-min-max-relative-range').click()
      cy.get('input[id="filters.relative-date-range.relative-duration-5"]').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=next-week`)
        expect(location.search).to.contain(`filters.relative-date-range.start=`)
        expect(location.search).to.contain(`filters.relative-date-range.end=`)
      })
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Preset date range')
            cy.wrap(filter).contains('Next week')
            break
          default:
            break
        }
      })

      expectDatePickerValues()
    })

    it('should set the relative date to last month', () => {
      cy.get('#tab_relative-date-range-min-max-relative-range').click()
      cy.get('input[id="filters.relative-date-range.relative-duration-6"]').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=last-month`)
        expect(location.search).to.contain(`filters.relative-date-range.start=`)
        expect(location.search).to.contain(`filters.relative-date-range.end=`)
      })
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Preset date range')
            cy.wrap(filter).contains('Last month')
            break
          default:
            break
        }
      })

      expectDatePickerValues()
    })

    it('should set the relative date to next month', () => {
      cy.get('#tab_relative-date-range-min-max-relative-range').click()
      cy.get('input[id="filters.relative-date-range.relative-duration-7"]').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=next-month`)
        expect(location.search).to.contain(`filters.relative-date-range.start=`)
        expect(location.search).to.contain(`filters.relative-date-range.end=`)
      })
      const selectedFilters = cy.get('#dpr-selected-filters').children()
      selectedFilters.each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Preset date range')
            cy.wrap(filter).contains('Next month')
            break
          default:
            break
        }
      })

      expectDatePickerValues()
    })
  })
})
