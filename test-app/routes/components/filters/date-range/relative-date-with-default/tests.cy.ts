context('Inputs: Relative date range', () => {
  const path = '/components/filters/date-range/relative-date-range-with-default'
  const platformPath =
    '/embedded/platform/dpr/request-report/report/filter-inputs/relative-daterange-with-default/filters'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Setting the relative date range', () => {
    beforeEach(() => {
      cy.visit(path)
    })
    it('should initialise the start and end values', () => {
      cy.get('input[id="filters.relative-date-range-with-default.start"]').should('not.have.value', '')
      cy.get('input[id="filters.relative-date-range-with-default.end"]').should('not.have.value', '')
    })

    it('should initialise the relative date', () => {
      cy.get('#tab_relative-date-range-with-default-relative-range').click()
      cy.get('input[id="filters.relative-date-range-with-default.relative-duration-4"]').should('be.checked')
    })
  })

  describe('User defined defaults', () => {
    beforeEach(() => {
      cy.visit(platformPath)
    })

    it('should save the relative date range as user defined defaults', () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=next-month`)
        expect(location.search).to.contain(`filters.field1.start=`)
        expect(location.search).to.contain(`filters.field1.end=`)
      })
      cy.get('#dpr-selected-filters')
        .children()
        .each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Next month')
              break
            default:
              break
          }
        })

      cy.get(`#dpr-save-user-defaults`).click()

      cy.location().should((location) => {
        expect(location.search).to.contain('defaultsSaved=true')
      })

      cy.get(`#dpr-save-user-defaults`).contains('Update defaults')
      cy.get('#dpr-remove-user-defaults').should('exist')

      cy.get('#dpr-selected-filters')
        .children()
        .each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Next month')
              break
            default:
              break
          }
        })
    })

    it('should pre-fill the filter values with the saved defaults next visit', () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=next-month`)
        expect(location.search).to.contain(`filters.field1.start=`)
        expect(location.search).to.contain(`filters.field1.end=`)
        expect(location.search).not.to.contain(`defaultsSaved=true`)
      })

      cy.get(`#dpr-save-user-defaults`).contains('Update defaults')
      cy.get('#dpr-remove-user-defaults').should('exist')

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

      cy.get('#tab_field1-relative-range').click()
      cy.get('input[id="filters.field1.relative-duration-7"]').should('be.checked')
    })

    it('should update the saved defaults', () => {
      cy.get('#tab_field1-relative-range').click()
      cy.get('input[id="filters.field1.relative-duration-4"]').click()

      cy.get(`#dpr-save-user-defaults`).click()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=last-week`)
        expect(location.search).to.contain(`filters.field1.start=`)
        expect(location.search).to.contain(`filters.field1.end=`)
      })

      cy.get('#dpr-selected-filters')
        .children()
        .each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Last week')
              break
            default:
              break
          }
        })

      cy.reload()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=last-week`)
        expect(location.search).to.contain(`filters.field1.start=`)
        expect(location.search).to.contain(`filters.field1.end=`)
      })
    })

    it('should remove the save defaults', () => {
      cy.get(`#dpr-remove-user-defaults`).click()

      cy.location().should((location) => {
        expect(location.search).contain(`filters.field1.relative-duration=next-month`)
      })
    })
  })
})
