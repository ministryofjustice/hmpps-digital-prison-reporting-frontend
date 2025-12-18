context('Inputs: date range with min and max', () => {
  const path = '/components/filters/date-range/min-max-date-range'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  const expectMinValues = () => {
    cy.findByRole('textbox', { name: 'From' }).should('have.value', '01/02/2003')
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
    cy.findByRole('textbox', { name: 'To' }).should('have.value', '04/05/2007')
    cy.location().should((location) => {
      expect(location.search).to.contain(`filters.date-range-min-max.end=2007-05-04`)
    })
    cy.findByLabelText(/Selected filters.*/i).within(() => {
      cy.findAllByRole('link').each((filter, index) => {
        switch (index) {
          case 0:
            cy.wrap(filter).contains('Date-range, with min and max end')
            cy.wrap(filter).contains('04/05/2007')
            break
          default:
            break
        }
      })
    })
  }

  describe('Setting the value via the input', () => {
    beforeEach(() => {
      cy.visit(path)
    })

    it('should set the start value to the min value if date is before min value', () => {
      cy.findByRole('textbox', { name: 'From' }).clear().type('02/05/2000').blur()
      expectMinValues()
    })

    it('should set the end value to the max value if date is after max value', () => {
      cy.findByRole('textbox', { name: 'To' }).clear().type('05/07/2025').blur()
      expectMaxValues()
    })

    it('should set the start value correctly is value is after the min date', () => {
      cy.findByRole('textbox', { name: 'From' }).clear().type('03/06/2004').blur()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.date-range-min-max.start=2004-06-03`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
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
    })

    it('should set the end value correctly is value is before the max date', () => {
      cy.findByRole('textbox', { name: 'To' }).clear().type('06/11/2005').blur()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.date-range-min-max.end=2005-11-06`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
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
  })

  describe('Min max helper buttons', () => {
    beforeEach(() => {
      cy.visit(path)
    })

    it('should set the min value when the min helper button is clicked', () => {
      cy.findByRole('link', { name: /Set value to minimum date/ }).click()
      expectMinValues()
    })

    it('should set the max value when the max helper button is clicked', () => {
      cy.findByRole('link', { name: /Set value to maximum date/ }).click()
      expectMaxValues()
    })
  })
})
