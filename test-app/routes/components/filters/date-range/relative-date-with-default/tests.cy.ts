context('Inputs: Relative date range with defaults', () => {
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
      cy.findByRole('textbox', { name: 'From' }).should('not.have.value', '')
      cy.findByRole('textbox', { name: 'To' }).should('not.have.value', '')
    })

    it('should initialise the relative date', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Last week' }).should('be.checked')
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

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
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

      cy.findByRole('button', { name: 'Save current filter values as defaults for this report' })
        .should('exist')
        .click()

      cy.location().should((location) => {
        expect(location.search).to.contain('defaultsSaved=true')
      })

      cy.findByRole('button', { name: 'Update defaults' }).should('exist')

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
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
    })

    it('should pre-fill the filter values with the saved defaults next visit', () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=next-month`)
        expect(location.search).to.contain(`filters.field1.start=`)
        expect(location.search).to.contain(`filters.field1.end=`)
        expect(location.search).not.to.contain(`defaultsSaved=true`)
      })

      cy.findByRole('button', { name: 'Update defaults' }).should('exist')

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
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

      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Next month' }).should('be.checked')
    })

    it('should update the saved defaults', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Last week' }).check()
      cy.findByRole('button', { name: 'Update defaults' }).should('exist').click()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=last-week`)
        expect(location.search).to.contain(`filters.field1.start=`)
        expect(location.search).to.contain(`filters.field1.end=`)
      })

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Last week')
              break
            default:
              break
          }
        })
      })

      cy.reload()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=last-week`)
        expect(location.search).to.contain(`filters.field1.start=`)
        expect(location.search).to.contain(`filters.field1.end=`)
      })
    })

    it('should remove the save defaults', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('button', { name: 'Delete defaults' }).click().should('exist')

      cy.location().should((location) => {
        expect(location.search).contain(`filters.field1.relative-duration=next-month`)
      })
    })
  })
})
