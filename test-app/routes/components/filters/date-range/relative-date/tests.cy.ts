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
      cy.get('#tab_relative-date-range-date-picker').click()
      cy.get('input[id="filters.relative-date-range.start"]').should('not.have.value', '')
      cy.get('input[id="filters.relative-date-range.end"]').should('not.have.value', '')
      cy.get('input[id="filters.relative-date-range.start"]')
        .invoke('val')
        .then((dateValue) => {
          expect(dateValue).to.match(/\d{2}\/\d{2}\/\d{4}/)
        })

      cy.get('input[id="filters.relative-date-range.end"]')
        .invoke('val')
        .then((dateValue) => {
          expect(dateValue).to.match(/\d{2}\/\d{2}\/\d{4}/)
        })

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
      cy.get('#tab_relative-date-range-relative-range').click()
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

      cy.get('#tab_relative-date-range-date-picker').click()
      cy.get('input[id="filters.relative-date-range.start"]').should('have.value', '')
      cy.get('input[id="filters.relative-date-range.end"]').should('have.value', '')
    })

    it('should set the relative date to yesterday', () => {
      cy.get('#tab_relative-date-range-relative-range').click()
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
      cy.get('#tab_relative-date-range-relative-range').click()
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
      cy.get('#tab_relative-date-range-relative-range').click()
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
      cy.get('#tab_relative-date-range-relative-range').click()
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
      cy.get('#tab_relative-date-range-relative-range').click()
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
      cy.get('#tab_relative-date-range-relative-range').click()
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

  describe('User defined defaults', () => {
    beforeEach(() => {
      cy.visit(platformPath)
    })

    it('should save the relative date range as user defined defaults', () => {
      cy.get('#tab_field1-relative-range').click()
      cy.get('input[id="filters.field1.relative-duration-2"]').click()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=yesterday`)
        expect(location.search).to.contain(`filters.field1.start=`)
        expect(location.search).to.contain(`filters.field1.end=`)
      })
      cy.get('#dpr-selected-filters')
        .children()
        .each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Yesterday')
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
              cy.wrap(filter).contains('Yesterday')
              break
            default:
              break
          }
        })
    })

    it('should pre-fill the filter values with the saved defaults next visit', () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=yesterday`)
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
            cy.wrap(filter).contains('Yesterday')
            break
          default:
            break
        }
      })

      cy.get('#tab_field1-relative-range').click()
      cy.get('input[id="filters.field1.relative-duration-2"]').should('be.checked')
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
        expect(location.search).not.to.contain(`filters.field1.relative-duration=`)
        expect(location.search).not.to.contain(`filters.field1.start=`)
        expect(location.search).not.to.contain(`filters.field1.end=`)
      })
    })
  })

  describe('validation', () => {
    beforeEach(() => {
      cy.visit(platformPath)
    })

    it('should display validation messages', () => {
      cy.get('input[name="filters.field1.start"]').clear().blur()
      cy.get('input[name="filters.field1.end"]').clear().blur()

      cy.get('#async-request-report-button').click()

      cy.get('p.govuk-error-message').eq(0).contains('Relative date-range start is required')
      cy.get('p.govuk-error-message').eq(1).contains('Relative date-range end is required')
      cy.get('#query-error-summary').should('be.visible')
    })
  })
})
